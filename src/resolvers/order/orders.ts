import { Context } from "../../context";

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
  }
};

export default resolvers;