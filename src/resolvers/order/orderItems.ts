import { Context } from "../../context";

const resolvers = {
    Query: {
      orderItems: async (_parent: any, _args: any, context: Context) => {
        return context.prisma.orderItem.findMany();
      }
    }
};

export default resolvers;