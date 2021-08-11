import { Context } from "../context";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { APP_SECRET } from "../utils";

type Auth = {
  email: string;
  password: string;
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
        const { userId } = context.userId;

        return context.prisma.user.findUnique({ 
          where: { 
            id: parseInt(userId) }, 
          include: { 
            cart: true, 
            orders: { 
              select: {
                products: true,
                productNumber: true
              } 
            }, 
            wishlist: { 
              select: {
                products: true
              } 
            }
          },
          rejectOnNotFound: () => {
            throw new Error("User or Order or Wishlist not found!");
          }
        });
      }
    },
    Mutation: {
      signup: async (_parent: any, args: Auth, context: Context) => {
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
    }
};

export default resolvers;