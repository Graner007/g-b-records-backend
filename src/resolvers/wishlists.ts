import { Context } from "../context";
import { user } from "./user/userUtils";

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
        const currentUser = await user(context);

        const record = currentUser.wishlist?.products.find(product => product.id === args.recordId);

        if (!record) {
          return context.prisma.wishlist.update({ 
            where: { 
              id: currentUser.wishlist?.id
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
              id: currentUser.wishlist?.id
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