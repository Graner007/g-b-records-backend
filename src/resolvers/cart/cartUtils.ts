import { Context } from '../../context';

export const cart = async (context: Context) => {
    const user = await context.prisma.user.findUnique({
        where: {
          id: context.userId
        },
        select: {
          cart: {
            include: {
              products: true
            }
          }
        },
        rejectOnNotFound: (() => {
          throw new Error("Cart not found");
        })
    });

    return user.cart;
}