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

    let grandTotal = 0;
    if (user.cart && user.cart.products && user.cart.products.length > 0) {
      user.cart.products.forEach(product => grandTotal += product.oneUnitPrice * product.quantity);
    }
  
    return { 
      id: user.cart?.id,
      grandTotal: grandTotal,
      products: user.cart?.products
    };
}