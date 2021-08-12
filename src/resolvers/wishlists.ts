import { Context } from "../context";
import { user } from "./user/userUtils";
import { addCartItem, incrementCartItemQuantity } from "./cart/cartItemUtils";
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
              await incrementCartItemQuantity({ cartItemId: cartItem.id }, context);
            }
            else {
              const newCartItem = await addCartItem({ 
                name: product.name, 
                albumCover: product.albumCover, 
                price: product.price, 
                cartId: currentUser.cart?.id 
              }, context);
    
              await context.pubsub.publish("NEW_CART_ITEM", newCartItem);
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