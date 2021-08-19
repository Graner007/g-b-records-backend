import { Context } from "../context";

const resolvers = {
    Query: {
      imageSlider: async (_parent: any, _args: any, context: Context) => {
        return context.prisma.media.findMany({
          where: {
            type: {
              contains: "imageSlider"
            }
          }
        });
      }
    }
};

export default resolvers;