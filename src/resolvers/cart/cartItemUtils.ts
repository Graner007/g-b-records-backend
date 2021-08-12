import { Context } from '../../context';

type DeleteCartItemType = {
    cartItemId: number;
}

export const deleteCartItem = async (args: DeleteCartItemType, context: Context) => {
    const deletedCartItem = await context.prisma.cartItem.delete({
        where: {
          id: args.cartItemId,
        }
    });

    return deletedCartItem;
}