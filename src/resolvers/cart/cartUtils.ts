import { Context } from '../../context';

export const cart = async (context: Context) => {
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
        rejectOnNotFound: (() => {
          throw new Error("Cart not found");
        })
    });

    return user.cart;
}