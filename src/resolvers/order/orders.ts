import { Context } from "../../context";
import { user } from "../user/userUtils";

type OrderArgs = {
  orderId: number;
}

type CheckoutSessionArgs = {
  checkoutSessionId: string;
}

const resolvers = {
  Query: {
    orders: async (_parent: any, _args: any, context: Context) => {
      const currentUser = await user(context);

      if (!currentUser) { throw Error("Please login"); }

      return context.prisma.order.findMany({
        where: {
          userId: currentUser.id
        },
        include: { 
          products: true 
        }
      });
    },
    order: async (_parent: any, args: OrderArgs, context: Context) => {
      return context.prisma.order.findUnique({
        where: {
          id: args.orderId
        },
        include: {
          products: true
        },
        rejectOnNotFound: (() => {
          throw new Error("Order not found");
        })
      });
    },
    createPaymentSession: async (_parent: any, _args: any, context: Context) => {
      const currentUser = await user(context);

      const lineItems = currentUser.cart?.products.map(product => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
            },
            unit_amount: product.oneUnitPrice * 100,
          },
          quantity: product.quantity
        }
      });
      
      const session = await context.stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: lineItems,
        success_url: `http://localhost:3000/successful-payment?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: "http://localhost:3000/"
      });

      return {url: session.url};
    },
    checkoutSession: async (_parent: any, args: CheckoutSessionArgs, context: Context) => {
      const session = await context.stripe.checkout.sessions.retrieve(args.checkoutSessionId);
      
      let paymentSuccess = false;
      switch (session.payment_status) {
        case "paid":
          paymentSuccess = true;
          break;
        case "unpaid":
          paymentSuccess = false;
          break;
      }
      
      return { 
        id: session.id,
        customerEmail: session.customer_details?.email,
        paymentSuccess: paymentSuccess
      }
    }
  }
};

export default resolvers;