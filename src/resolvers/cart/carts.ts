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
        if (context.userId !== null) {
          const cart = await context.prisma.cart.findUnique({
            where: {
              userId: context.userId
            },
            include: {
              products: true
            },
            rejectOnNotFound: (() => {
              throw new Error("Cart not found");
            })
          });
  
          let grandTotal = 0;
          if (cart.products && cart.products.length > 0) {
            cart.products.forEach(product => grandTotal += product.oneUnitPrice * product.quantity);
          }
  
          return { 
            id: cart.id,
            grandTotal: grandTotal,
            products: cart.products
          };
        }

        throw new Error("Please Login");
      }
    }
};

export default resolvers;