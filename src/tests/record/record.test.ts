import { Artist } from ".prisma/client";
import { gql } from "apollo-server-express";
 
import { apolloServer } from '../../mocks/apolloServer';
import { createTestClient } from "../index";
import { getRecordsWithInWishlistField, Record } from "../../resolvers/record/recordUtils";

describe('createTestClient', () => {

    beforeAll(async () => {
        await apolloServer.start();
    });

    afterAll(async () => {
        await apolloServer.stop();
    });

    const RECOMMENDED_RECORDS = gql`
      query RecommendedRecords {
        recommendedRecords {
          name
          price
          albumCover
        }
      }
    `;

    type RecommendedRecordsType = {
      recommendedRecords: Record[];
    }

    const RECORDS_BETWEEN_TWO_PRICE = gql`
      query RecordsBetweenTwoPriceQuery(
        $min: Int!
        $max: Int!
      ) {
        recordsBetweenTwoPrice(min: $min, max: $max) {
            id
            name
            price
            albumCover
            artist {
                id
                name
            }
            isInWishlist
        }
      }
    `;

    type RecordsBetweenTwoPriceType = {
      recordsBetweenTwoPrice: Record[];
    }

    type RecordsBetweenTwoPriceVars = {
      min: number;
      max: number;
    }
  
    test('should equal recommended records length', async () => {
        const { query } = createTestClient({
          apolloServer
        });
        
        const expectedLength = 5;
        const { data } = await query<RecommendedRecordsType>(RECOMMENDED_RECORDS);

        expect(data?.recommendedRecords).toHaveLength(expectedLength);
    });

    test('should contain property isIsWishlist', async () => {
      const Elvis: Artist = {
        id: 1,
        name: "Elvis Presley"
      }

      const records: Record[] = [
        {
          id: 1,
          name: "Elvis",
          description: "text",
          albumCover: "link",
          releaseDate: new Date(),
          artist: Elvis,
          leftInStock: 10,
          price: 20
        },
        {
          id: 2,
          name: "Elvis Is Back!",
          description: "text",
          albumCover: "link",
          releaseDate: new Date(),
          artist: Elvis,
          leftInStock: 9,
          price: 22
        },
        {
          id: 3,
          name: "Loving you",
          description: "text",
          albumCover: "link",
          releaseDate: new Date(),
          artist: Elvis,
          leftInStock: 6,
          price: 30
        },
      ];

      const userWishlistRecords: Record[] = [
        {
          id: 1,
          name: "Elvis",
          description: "text",
          albumCover: "link",
          releaseDate: new Date(),
          artist: Elvis,
          leftInStock: 10,
          price: 20
        }
      ];
      
      const resultRecords = getRecordsWithInWishlistField(records, userWishlistRecords);

      expect(resultRecords).toHaveLength(records.length);

      resultRecords.forEach(record => {
        expect(record).toHaveProperty("isInWishlist");
      });

      expect(resultRecords[0]).toHaveProperty("isInWishlist", true);
  });

  test('should return record between two price', async () => {
    const { query } = createTestClient({
      apolloServer
    });

    const min = 5;
    const max = 20;
    
    const { data } = await query<RecordsBetweenTwoPriceType, RecordsBetweenTwoPriceVars>(RECORDS_BETWEEN_TWO_PRICE, {
      variables: {
        min: min,
        max: max
      }
    });

    data?.recordsBetweenTwoPrice.forEach(record => {
      expect(record.price).toBeGreaterThan(min);
      expect(record.price).toBeLessThan(max);
    });
});
});