import { Context } from "../context";

type DropdownArgs = {
    type: "artist" | "genre";
}

const resolvers = {
    Query: {
      dropdown: async (_parent: any, args: DropdownArgs, context: Context) => {
        return args.type === "artist" ? await context.prisma.artist.findMany({ select: { id: true, name: true } }) : await context.prisma.genre.findMany({ select: { id: true, name: true } });
      }
    }
};

export default resolvers;