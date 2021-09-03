import { Context } from "../context";
import { user } from "./user/userUtils";
import { cart } from "./cart/cartUtils";

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
        if (context.userId !== null) {
          return context.prisma.wishlist.findUnique({ 
            where: { 
              userId: context.userId
            },
            include: {
              products: {
                include: {
                  artist: {
                    select: {
                      name: true
                    }
                  }
                }
              }
            }
          });
        }

        throw new Error("Please Login");
      }
    },
    Mutation: {
      toggleProductInWhislist: async (_parent: any, args: toggleProductInWhislistType, context: Context) => {
        const currentUser = await user(context);

        const record = currentUser.wishlist?.products.find(product => product.id === args.recordId);

        if (!record) {
          const wishlist = await context.prisma.wishlist.update({ 
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

          const operationType = "add";

          return { wishlist, operationType };
        }
        else {
          const wishlist = await context.prisma.wishlist.update({ 
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

          const operationType = "remove";

          return { wishlist, operationType };
        }
      },
      addAllProductsToCart: async (_parent: any, _args: any, context: Context) => {
        const currentUser = await user(context);

        if (currentUser.wishlist?.products !== []) {
          currentUser.wishlist?.products.forEach(async product => {
            const cartItem = currentUser.cart?.products.find(record => 
              product.name === record.name && 
              product.albumCover === record.albumCover && 
              product.price === record.price &&
              record.quantity > 0
            );
    
            if (cartItem) {
              await context.prisma.cartItem.update({
                where: {
                  id: cartItem.id
                },
                data: {
                  quantity: {
                    increment: 1
                  }
                }
            });
            }
            else {
              await context.prisma.cartItem.create({
                data: {
                  name: product.name,
                  albumCover: product.albumCover,
                  price: product.price,
                  quantity: 1,
                  cart: {
                    connect: {
                      id: currentUser.cart?.id
                    }
                  }
                }
            });
            }
          });

          const userCart = await cart(context); 

          return userCart;
        }
        else {
          throw new Error("Wishlist is empty");
        }
      }
    }
};

export default resolvers;