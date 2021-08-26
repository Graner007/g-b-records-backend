import { Context } from "../../context";

export const user = async (context: Context) => {
    return context.prisma.user.findUnique({ 
      where: { 
        id: context.userId
      }, 
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
};