import { Context } from "../../context";

export const user = async (_parent: any, _args: any, context: Context) => {
    const { userId } = context.userId;

    return context.prisma.user.findUnique({ 
      where: { 
        id: parseInt(userId) }, 
      include: { 
        cart: {
            include: {
                products: true
            }
        },
        orders: { 
          include: {
              products: true
          }
        }, 
        wishlist: { 
          include: {
              products: true
          }
        }
      },
      rejectOnNotFound: () => {
        throw new Error("User, Cart, Order or Wishlist not found!");
      }
    });
}