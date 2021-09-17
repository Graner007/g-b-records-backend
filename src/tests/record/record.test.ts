import { Record } from ".prisma/client";
import { gql } from "apollo-server-express";
 
import { apolloServer } from '../../mocks/apolloServer';
import { createTestClient } from "../index";

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
  
    test('should equal recommended records length', async () => {
        const { query } = createTestClient({
          apolloServer
        });
        
        const expectedLength = 5;
        const { data } = await query<RecommendedRecordsType>(RECOMMENDED_RECORDS);

        expect(data?.recommendedRecords).toHaveLength(expectedLength);
    });
});