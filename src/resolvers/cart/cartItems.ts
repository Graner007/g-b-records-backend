import { Context } from '../../context';

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
        const { userId } = context.userId;

        const user = await context.prisma.user.findUnique({
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
          rejectOnNotFound: () => {
            throw new Error("Cart not found");
          }
        });

        const cartItem = user.cart?.products.find(product => product.id === args.cartItemId);

        if (cartItem) {
          return context.prisma.cartItem.delete({
            where: {
              id: args.cartItemId,
            }
          });
        }
        else {
          throw new Error("CartItem can not be deleted");
        }
      },
      updateCartItemQuantity: async (_parent: any, args: UpdateCartItemQuantityType, context: Context) => {
        if (args.cartItemQuantity === 0) {
          return context.prisma.cartItem.delete({
            where: {
              id: args.cartItemId
            }
          });
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
      },
      addCartItem: async (_parent: any, args: AddCartItemType, context: Context) => {
        const { userId } = context.userId;

        const user = await context.prisma.user.findUnique({
          where: {
            id: userId
          },
          include: {
            cart: {
              include: {
                products: true
              }
            }
          },
          rejectOnNotFound: () => {
            throw new Error("Cart not found");
          }
        });

        const cartItem = user.cart?.products.find(product => 
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
                  id: user.cart?.id
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