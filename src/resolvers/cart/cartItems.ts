import { Context } from '../../context';
import { deleteCartItem } from "./cartItemUtils";
import { user } from "../user/userUtils";

type UpdateCartItemQuantityType = {
  cartItemId: number;
  cartItemQuantity: number;
}

type DeleteCartItemType = {
  cartItemId: number;
}

type AddCartItemType = {
  name: string;
  albumCover: string;
  price: number;
}

const resolvers = {
    Query: {
      cartItems: async (_parent: any, _args: any, context: Context) => {
        return context.prisma.cartItem.findMany();
      }
    },
    Mutation: {
      deleteCartItem: async (_parent: any, args: DeleteCartItemType, context: Context) => {
        const currentUser = await user(context);

        const cartItem = currentUser.cart?.products.find(product => product.id === args.cartItemId);

        if (cartItem) {
          return deleteCartItem({cartItemId: args.cartItemId}, context);
        }
        else {
          throw new Error("CartItem can not be deleted");
        }
      },
      updateCartItemQuantity: async (_parent: any, args: UpdateCartItemQuantityType, context: Context) => {
        const currentUser = await user(context);

        const cartItem = currentUser.cart?.products.find(product => product.id === args.cartItemId);

        if (cartItem) {
          if (args.cartItemQuantity === 0) {
            return deleteCartItem({cartItemId: args.cartItemId}, context);
          }
  
          return context.prisma.cartItem.update({
            where: {
              id: args.cartItemId
            },
            select: {
              name: true,
              quantity: true
            },
            data: {
              quantity: args.cartItemQuantity
            }
          });
        }
        else {
          throw new Error("CartItem can not be updated");
        }
      },
      addCartItem: async (_parent: any, args: AddCartItemType, context: Context) => {
        const currentUser = await user(context);

        const cartItem = currentUser.cart?.products.find(product => 
          product.name === args.name && 
          product.albumCover === args.albumCover && 
          product.price === args.price &&
          product.quantity > 0
        );

        if (cartItem) {
          return context.prisma.cartItem.update({
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
          const newCartItem = await context.prisma.cartItem.create({
            data: {
              name: args.name,
              albumCover: args.albumCover,
              price: args.price,
              quantity: 1,
              cart: {
                connect: {
                  id: currentUser.cart?.id
                }
              }
            }
          });

          await context.pubsub.publish("NEW_CART_ITEM", newCartItem);

          return newCartItem;
        }
      }
    },
    Subscription: {
      newCartItem: async (_parent: any, _args: any, context: Context) => {
        subscribe: () => context.pubsub.asyncIterator("NEW_CART_ITEM");
      }
    }
};

export default resolvers;