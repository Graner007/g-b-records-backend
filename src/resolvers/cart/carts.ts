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
          cart.products.forEach(product => grandTotal += product.price);
        }

        return { cart, grandTotal };
      }
    }
};

export default resolvers;