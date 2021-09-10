import { Artist } from "@prisma/client";
import { Context } from "../../context";
import { user } from "../user/userUtils";

import { Record as newRecordType } from "./records";

type Record = {
    id: number;
    name: string;
    description: string;
    releaseDate: Date;
    albumCover: string;
    price: number;
    artist: Artist;
}

export const getRecordsWithInWishlistField = (records: Record[], wishlistProducts: Record[]) => {
    const wishlistProductsIds = wishlistProducts.map(product => { return product.id }); 
    const newRecords: newRecordType[] = []; 
    
    for (let record of records) {
        if (wishlistProductsIds!.includes(record.id)) {
            newRecords.push({
                id: record.id,
                name: record.name,
                description: record.description,
                albumCover: record.albumCover,
                releaseDate: record.releaseDate,
                price: record.price,
                artist: record.artist,
                isInWishlist: true
            });
        }
        else {
            newRecords.push({
                id: record.id,
                name: record.name,
                description: record.description,
                albumCover: record.albumCover,
                releaseDate: record.releaseDate,
                price: record.price,
                artist: record.artist,
                isInWishlist: false
            });
        }
    }

    return newRecords;
}

export const latestRecords = async (context: Context) => {
    const newestRecords = await context.prisma.record.findMany({
      include: {
        artist: true
      },
      orderBy: {
        releaseDate: "desc"
      },
      take: 5
    });

    if (context.userId !== null) {
      const currentUser = await user(context);
      
      return getRecordsWithInWishlistField(newestRecords, currentUser.wishlist!.products);
    }
    else {
      return newestRecords;
    }
}

export const getRecordById = async (args: { recordId: number }, context: Context) => {
  return context.prisma.record.findUnique({
    where: {
      id: args.recordId
    },
    rejectOnNotFound: () => {
      throw new Error("Record not found");
    }
  });
}

export const getRecordByName = async (args: { recordName: string }, context: Context) => {
  return context.prisma.record.findUnique({
    where: {
      name: args.recordName
    },
    rejectOnNotFound: () => {
      throw new Error("Record not found");
    }
  });
}