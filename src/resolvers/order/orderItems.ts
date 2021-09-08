import { Context } from "../../context";
import { deleteAllCartItemForUser } from "../cart/cartItemUtils";
import { user } from "../user/userUtils";
import { addOrderItem } from "./orderItemUtils";
import { addOrder, order } from "./orderUtils";

const resolvers = {
    Query: {
      orderItems: async (_parent: any, _args: any, context: Context) => {
        return context.prisma.orderItem.findMany();
      }
    },
    Mutation: {
      successfulPayment: async (_parent: any, _args: any, context: Context) => {
        const currentUser = await user(context);

        if (currentUser.cart?.products !== []) {
          let payment = 0;
          let productNumber = 0;

          currentUser.cart?.products.forEach(product => {
            payment += product.price * product.quantity;
            productNumber++;
          });

          const checkoutDetail = await context.prisma.checkoutDetail.findMany({
            where: {
              userId: currentUser.id
            },
            orderBy: {
              id: "desc"
            },
            take: 1
          });
  
          const newOrder = await addOrder({
            address: checkoutDetail[0].address, 
            payment: payment, 
            productNumber: productNumber
            }, context);
  
          currentUser.cart?.products.map(product => {
            addOrderItem({
              name: product.name, 
              albumCover: product.albumCover, 
              price: product.price,
              quantity: product.quantity,
              orderId: newOrder.id
            }, context);
          });
  
          await deleteAllCartItemForUser(context);
  
          return order({ orderId: newOrder.id }, context);
        }
        else {
          throw new Error("Cart is empty");
        }
      }
    }
};

export default resolvers;