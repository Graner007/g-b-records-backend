import { Context } from '../../context';
import { addCartItem, deleteCartItem, incrementCartItemQuantity, deleteAllCartItemForUser } from "./cartItemUtils";
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
            data: {
              quantity: args.cartItemQuantity,
              price: args.cartItemQuantity * cartItem.oneUnitPrice
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
          product.oneUnitPrice === args.price &&
          product.quantity > 0
        );

        if (cartItem) {
          return incrementCartItemQuantity({ cartItemId: cartItem.id, ontUnitprice: cartItem.oneUnitPrice }, context);
        }
        else {
          return addCartItem({ 
            name: args.name, 
            albumCover: args.albumCover, 
            price: args.price, 
            cartId: currentUser.cart?.id 
          }, context);
        }
      },
      deleteAllCartItemForUser
    },
    Subscription: {
      newCartItem: async (_parent: any, _args: any, context: Context) => {
        subscribe: () => context.pubsub.asyncIterator("NEW_CART_ITEM");
      }
    }
};

export default resolvers;