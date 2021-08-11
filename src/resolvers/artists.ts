import { Context } from "../context";

const resolvers = {
  Query: {
    artists: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.artist.findMany({
        include: { 
          records: true 
        }
      });
    }
  }
};

export default resolvers;