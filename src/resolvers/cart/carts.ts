import { Context } from '../../context';
import { cart } from "./cartUtils";

const resolvers = {
    Query: {
      carts: async (_parent: any, _args: any, context: Context) => {
        return context.prisma.cart.findMany({
            include: { 
              products: true 
            }
        });
      },
      cart
    }
};

export default resolvers;