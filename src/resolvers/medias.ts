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
      },
      decade: async (_parent: any, _args: any, context: Context) => {
        return context.prisma.media.findMany({
          where: {
            type: {
              contains: "decade"
            }
          }
        });
      }
    }
};

export default resolvers;