import { Context } from "../context";
import { user } from "./user/userUtils";

type AddCheckoutDetailArgs = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  zipcode: number;
  country: string;
  telephone: string;
}

const resolvers = {
    Mutation: {
      addCheckoutDetail: async (_parent: any, args: AddCheckoutDetailArgs, context: Context) => {
        const currentUser = await user(context);

        return context.prisma.checkoutDetail.create({
          data: {
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email,
            address: args.address,
            zipcode: args.zipcode,
            country: args.country,
            phone: args.telephone,
            userId: currentUser.id
          }
        });
      }
    }
};

export default resolvers;