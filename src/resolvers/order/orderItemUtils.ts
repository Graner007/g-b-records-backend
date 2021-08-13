import { Context } from '../../context';

type AddOrderItemType = {
    name: string;
    albumCover: string;
    price: number;
    quantity: number;
    orderId: number | undefined;
}

export const addOrderItem = async (args: AddOrderItemType, context: Context) => {
    const newOrderItem = await context.prisma.orderItem.create({
        data: {
          name: args.name,
          albumCover: args.albumCover,
          price: args.price,
          quantity: args.quantity,
          order: {
            connect: {
              id: args.orderId
            }
          }
        }
    });

    return newOrderItem;
}