import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Context } from "../../context";
import { APP_SECRET } from "../../utils";

type Auth = {
  email: string;
  password: string;
}

type EditUserDetailsType = {
  firstName: string;
  lastName: string;
  address: string;
  zipcode: number;
  telephone: string;
  country: string;
}

const resolvers = {
    Query: {
      users: async (_parent: any, _args: any, context: Context) => {
        return context.prisma.user.findMany({
          include: { 
            cart: true, 
            orders: true, 
            wishlist: true 
          }
        });
      },
      user: async (_parent: any, _args: any, context: Context) => {
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
      }
    },
    Mutation: {
      signup: async (_parent: any, args: Auth, context: Context) => {
        const userIsExists = await context.prisma.user.findUnique({ where: { email: args.email } });
        if (userIsExists) { throw new Error('User already created!'); }

        const password = await bcrypt.hash(args.password, 10);

        const user = await context.prisma.user.create({ 
          data: { 
            email: args.email,
            password: password,
            cart: {
              create: {}
            },
            wishlist: {
              create: {}
            }
          } 
        });
        const token = jwt.sign({ userId: user.id }, APP_SECRET);

        return { token, user }
      },
      login: async (_parent: any, args: Auth, context: Context) => {
        const user = await context.prisma.user.findUnique({ where: { email: args.email } });
        if (!user) { throw new Error('No such user found'); }

        const valid = await bcrypt.compare(args.password, user.password);
        if (!valid) { throw new Error('Invalid password'); }

        const token = jwt.sign({ userId: user.id }, APP_SECRET);

        return { token, user }
      },
      editUserDetails: async (_parent: any, args: EditUserDetailsType, context: Context) => {
        const { userId } = context.userId;
        
        const editedUser = await context.prisma.user.update({
          where: {
            id: userId
          },
          data: {
            firstName: args.firstName,
            lastName: args.lastName,
            address: args.address,
            telephone: args.telephone,
            zipcode: args.zipcode,
            country: args.country
          }
        });

        return editedUser;
      }
    }
};

export default resolvers;