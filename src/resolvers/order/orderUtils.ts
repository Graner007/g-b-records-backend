import { Context } from '../../context';

export const order = async (context: Context) => {
    const { userId } = context.userId;
    
    const user = await context.prisma.user.findUnique({
        where: {
          id: userId
        },
        select: {
          orders: {
            include: {
              products: true
            }
          }
        },
        rejectOnNotFound: (() => {
          throw new Error("Orders not found");
        })
    });

    return user.orders;
}