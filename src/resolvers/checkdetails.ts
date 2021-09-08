import { Context } from "../context";
import { user } from "./user/userUtils";

const resolvers = {
    Mutation: {
      addCheckoutDetail: async (_parent: any, _args: any, context: Context) => {
        const currentUser = await user(context);
      }
    }
};

export default resolvers;