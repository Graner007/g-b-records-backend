import { Context } from "../../context";

export const user = async (context: Context) => {
    if (context.userId !== null) {
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
                products: {
                  include: {
                    artist: true
                  }
                }
            }
          }
        },
        rejectOnNotFound: () => {
          throw new Error("User, Cart, Order or Wishlist not found!");
        }
      });
    }

    throw new Error("Please Login");
};