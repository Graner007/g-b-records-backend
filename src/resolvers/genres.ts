import { Context } from "../context";

const resolvers = {
    Query: {
      genres: async (_parent: any, _args: any, context: Context) => {
        return context.prisma.genre.findMany({
          include: { 
            records: true 
          }
        });
      }
    }
};

export default resolvers;