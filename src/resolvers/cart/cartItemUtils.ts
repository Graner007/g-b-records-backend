import { Context } from '../../context';

type AddCartItemType = {
    name: string;
    albumCover: string;
    price: number;
    cartId: number | undefined;
}

type CartItemType = {
    cartItemId: number;
}

export const addCartItem = async (args: AddCartItemType, context: Context) => {
    const newCartItem = await context.prisma.cartItem.create({
        data: {
          name: args.name,
          albumCover: args.albumCover,
          price: args.price,
          quantity: 1,
          cart: {
            connect: {
              id: args.cartId
            }
          }
        }
    });

    return newCartItem;
}

export const deleteCartItem = async (args: CartItemType, context: Context) => {
    const deletedCartItem = await context.prisma.cartItem.delete({
        where: {
          id: args.cartItemId,
        }
    });

    return deletedCartItem;
}

export const incrementCartItemQuantity = async (args: CartItemType, context: Context) => {
    const incrementedCartItem = await context.prisma.cartItem.update({
        where: {
          id: args.cartItemId
        },
        data: {
          quantity: {
            increment: 1
          }
        }
    });

    return incrementedCartItem;
}