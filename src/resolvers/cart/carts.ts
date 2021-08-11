import { Context } from '../../context';

const resolvers = {
    Query: {
      carts: async (_parent: any, _args: any, context: Context) => {
        return context.prisma.cart.findMany({
            include: { 
              products: true 
            }
        });
      },
      cart: async (_parent: any, _args: any, context: Context) => {
        const { userId } = context.userId;
        
        return context.prisma.user.findUnique({
            where: {
              id: userId
            },
            select: {
              cart: {
                include: {
                  products: true
                }
              }
            },
            rejectOnNotFound: (() => {
              throw new Error("Cart not found");
            })
        });
      }
    }
};

export default resolvers;