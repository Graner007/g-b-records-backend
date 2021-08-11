import { Context } from "../context";

type toggleProductInWhislistType = {
  recordId: number;
}

const resolvers = {
    Query: {
      wishlists: async (_parent: any, _args: any, context: Context) => {
        return context.prisma.wishlist.findMany({
          include: { products: true }
        });
      },
      wishlist: async (_parent: any, _args: any, context: Context) => {
        const { userId } = context.userId;

        return context.prisma.wishlist.findUnique({ 
          where: { 
            userId: userId
          },
          include: {
            products: true
          }
        });
      }
    },
    Mutation: {
      toggleProductInWhislist: async (_parent: any, args: toggleProductInWhislistType, context: Context) => {
        const { userId } = context.userId;

        const user = await context.prisma.user.findUnique({ 
          where: { 
            id: userId
          },
          select: { 
            wishlist: { 
              select: {
                id: true,
                products: true
              }
            } 
        }});

        const record = user?.wishlist?.products.find(product => product.id === args.recordId);

        if (!record) {
          return context.prisma.wishlist.update({ 
            where: { 
              id: user?.wishlist?.id
            },
            select: {
              products: true
            },
            data: { 
              products: { 
                connect: { 
                  id: args.recordId 
                }
              } 
            } 
          });
        }
        else {
          return context.prisma.wishlist.update({ 
            where: { 
              id: user?.wishlist?.id
            },
            select: {
              products: true
            },
            data: { 
              products: { 
                disconnect: {
                  id: args.recordId 
                }
              } 
            } 
          });
        }
      }
    }
};

export default resolvers;