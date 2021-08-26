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
        const record = await context.prisma.record.findUnique({
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

        if (context.userId !== null) {
          const { userId } = context.userId;

          await context.prisma.searchRecord.create({
            data: {
              name: record.name,
              userId: userId
            }
          });
        }

        return record;
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

        if (records !== [] && records.length > 0) {
          minPrice = records.reduce((min, record) => (record.price < min ? record.price : min), records[0].price);
          maxPrice = records.reduce((max, record) => (record.price > max ? record.price : max), records[0].price);
        }

        if (context.userId !== null && records !== [] && records.length > 0) {
          const { userId } = context.userId;

          records.map(async (record) => {
            await context.prisma.searchRecord.create({
              data: {
                name: record.name,
                userId: userId
              }
            });
          });
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
          },
          include: {
            artist: true
          }
        });
      },
      recommendedRecords: async (_parent: any, _args: any, context: Context) => {
        const latestRecords = () => {
          return context.prisma.record.findMany({
            include: {
              artist: true
            },
            orderBy: {
              releaseDate: "desc"
            },
            take: 5
          });
        }

        if (context.userId !== null) {
          const { userId } = context.userId;

          const searchRecords = await context.prisma.searchRecord.findMany({
            where: {
              userId: userId
            },
            distinct: ["name"],
            select: {
              name: true
            },
            orderBy: {
              id: "desc"
            },
            take: 5
          });

          const names = searchRecords.map(word => {return word.name});

          if (searchRecords && searchRecords.length < 1) {
            return latestRecords();
          }

          return context.prisma.record.findMany({
            where: {
              name: {
                in: names
              }
            },
            include: {
              artist: true
            },
            take: searchRecords.length > 5 ? 5 : searchRecords.length   
          });
        }
        else {
          return latestRecords();
        }
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