import { Context } from '../../context';
import { user } from '../user/userUtils';
import { cart } from './cartUtils';

type AddCartItemType = {
    name: string;
    albumCover: string;
    price: number;
    cartId: number | undefined;
    leftInStock: number;
}

type CartItemType = {
    cartItemId: number;
}

type IncrementCartItemQuantityArgs = {
  cartItemId: number;
  ontUnitprice: number;
}

export const addCartItem = async (args: AddCartItemType, context: Context) => {
    return context.prisma.cartItem.create({
        data: {
          name: args.name,
          albumCover: args.albumCover,
          oneUnitPrice: args.price,
          price: args.price,
          leftInStock: args.leftInStock,
          quantity: 1,
          cart: {
            connect: {
              id: args.cartId
            }
          }
        }
    });
}

export const deleteCartItem = async (args: CartItemType, context: Context) => {
    return context.prisma.cartItem.delete({
        where: {
          id: args.cartItemId,
        }
    });
}

export const incrementCartItemQuantity = async (args: IncrementCartItemQuantityArgs, context: Context) => {
    return context.prisma.cartItem.update({
        where: {
          id: args.cartItemId
        },
        data: {
          quantity: {
            increment: 1
          },
          price: {
            increment: args.ontUnitprice
          }
        }
    });
}

export const deleteAllCartItemForUser = async (context: Context) => {
  const currentUser = await user(context);

  await context.prisma.cartItem.deleteMany({
    where: {
      cartId: currentUser.cart?.id
    }
  });

  const userCart = await cart(context); 

  return userCart;
}