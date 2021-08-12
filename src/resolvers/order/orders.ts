import { Context } from "../../context";
import { user } from "../user/userUtils";

type OrderType = {
  orderId: number;
}

const resolvers = {
  Query: {
    orders: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.order.findMany({
        include: { 
          products: true 
        }
      });
    },
    order: async (_parent: any, args: OrderType, context: Context) => {
      const { userId } = context.userId;

      return context.prisma.user.findUnique({
          where: {
            id: userId
          },
          select: {
            orders: {
              where: {
                id: args.orderId
              },
              include: {
                products: true
              }
            }
          },
          rejectOnNotFound: (() => {
            throw new Error("Order not found!");
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
            unit_amount: product.price,
          },
          quantity: product.quantity,
        }
      });
      
      const session = await context.stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: lineItems,
        success_url: "http://localhost:3000/successful-payment",
        cancel_url: "http://localhost:3000/"
      });

      return session.url;
    }
  }
};

export default resolvers;