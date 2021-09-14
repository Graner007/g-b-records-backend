import { Artist, Wishlist, Genre } from ".prisma/client";
import { Context } from "../../context";

import { user } from "../user/userUtils";
import { getRecordsWithInWishlistField, latestRecords } from "./recordUtils";

type CategoryType = {
  filter: string;
  skip: number;
  take: number;
  orderBy: 
    { name: "asc" | "desc" } | 
    { price: "asc" | "desc" } | 
    { releaseDate: "asc" | "desc" };
  min: number;
  max: number;
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

type RecordByNameArgs = {
  recordName: string;
}

export type Record = {
  id: number;
  name: string;
  description: string;
  releaseDate: Date;
  albumCover: string;
  price: number;
  artist: Artist;
  genres?: Genre[];
  wishlist?: Wishlist[];
  isInWishlist: boolean;
}

const resolvers = {
    Query: {
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
          await context.prisma.searchRecord.create({
            data: {
              name: record.name,
              userId: context.userId
            }
          });
        }

        return record;
      },
      recordByName: async (_parent: any, args: RecordByNameArgs, context: Context) => {
        const record = await context.prisma.record.findUnique({
          where: {
            name: args.recordName,
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
          await context.prisma.searchRecord.create({
            data: {
              name: record.name,
              userId: context.userId
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
            }},
          ],
          AND: {
            price: {
              gt: args.min,
              lt: args.max
            }
          }
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
          const currentUser = await user(context);

          records.map(async (record) => {
            await context.prisma.searchRecord.create({
              data: {
                name: record.name,
                userId: context.userId
              }
            });
          });

          const newRecords = getRecordsWithInWishlistField(records, currentUser.wishlist!.products);

          return { records: newRecords, count, minPrice, maxPrice };
        }
        else {
          return { records, count, minPrice, maxPrice };
        }
      },
      recordsBetweenTwoPrice: async (_parent: any, args: RecordsBetweenTwoPrice, context: Context) => {
        const records = await context.prisma.record.findMany({
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
          },
          take: 10
        });

        if (context.userId !== null) {
          const currentUser = await user(context);
          
          return getRecordsWithInWishlistField(records, currentUser.wishlist!.products);
        }
        else {
          return records;
        }
      },
      recommendedRecords: async (_parent: any, _args: any, context: Context) => {
        if (context.userId !== null) {
          const currentUser = await user(context);

          const searchRecords = await context.prisma.searchRecord.findMany({
            where: {
              userId: context.userId
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
            return latestRecords(context);
          }

          const recommendedRecords = await context.prisma.record.findMany({
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

          return getRecordsWithInWishlistField(recommendedRecords, currentUser.wishlist!.products);
        }
        else {
          return latestRecords(context);
        }
      },
      searchRecords: async (_parent: any, args: SearchRecordsType, context: Context) => {
        return context.prisma.record.findMany({
          where: {
            name: {
              contains: args.searchPhrase
            }
          },
          include: {
            artist: {
              select: {
                name: true
              }
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