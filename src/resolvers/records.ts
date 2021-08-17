import { Context } from "../context";

type CategoryType = {
  filter: string;
  skip: number;
  take: number;
  orderBy: 
    { name: "asc" | "desc" } | 
    { price: "asc" | "desc" } | 
    { releaseDate: "asc" | "desc" };
}

type RecordType = {
  recordId: number;
}

type RecordsBetweenTwoPrice = {
  min: number;
  max: number;
}

type SearchRecordsType = {
  searchPhrase: string;
  skip: number;
  take: number;
}

const resolvers = {
    Query: {
      records: async (_parent: any, _args: any, context: Context) => {
        return context.prisma.record.findMany({
          include: { 
            artist: true,
            genres: true, 
            wishlist: true 
          }
        });
      },
      record: async (_parent: any, args: RecordType, context: Context) => {
        return context.prisma.record.findUnique({
          where: {
            id: args.recordId
          },
          include: { 
            artist: true, 
            genres: true, 
            wishlist: true 
          },
          rejectOnNotFound: () => {
            throw new Error("Record not found");
          }
        });
      },
      category: async (_parent: any, args: CategoryType, context: Context) => {
        const where = {
          OR: [
            {artist: {
              name: {
                equals: args.filter
              }
            }},
            {genres: {
              some: {
                name: {
                  equals: args.filter
                }
              }
            }}
          ]
        }

        const records = await context.prisma.record.findMany({
            where,
            include: {
              artist: true,
              genres: true
            },
            skip: args.skip, 
            take: args.take, 
            orderBy: args.orderBy
        });

        const count = await context.prisma.record.count({where});

        let minPrice = 0;
        let maxPrice = 0;

        if (records) {
          minPrice = records.reduce((min, record) => (record.price < min ? record.price : min), records[0].price);
          maxPrice = records.reduce((max, record) => (record.price > max ? record.price : max), records[0].price);
        }

        return { records, count, minPrice, maxPrice };
      },
      recordsBetweenTwoPrice: async (_parent: any, args: RecordsBetweenTwoPrice, context: Context) => {
        return context.prisma.record.findMany({
          where: {
            price: {
              gt: args.min,
              lt: args.max
            }
          },
          orderBy: { 
            price: "desc"
           }
        });
      },
      searchRecords: async (_parent: any, args: SearchRecordsType, context: Context) => {
        return context.prisma.record.findMany({
          where: {
            name: {
              contains: args.searchPhrase
            }
          },
          orderBy: { 
            price: "desc"
          }
        });
      }
    }
};

export default resolvers;