import { Context } from '../../context';
import { user } from '../user/userUtils';

type AddOrderType = {
  address: string;
  payment: number;
  productNumber: number;
}

type OrderType = {
  orderId: number;
}

export const order = async (args: OrderType, context: Context) => {    
    const order = await context.prisma.order.findUnique({
        where: {
          id: args.orderId
        },
        include: {
          products: true
        },
        rejectOnNotFound: (() => {
          throw new Error("Orders not found");
        })
    });

    return order;
}

export const addOrder = async (args: AddOrderType, context: Context) => {
  const currentUser = await user(context);

  const order = await context.prisma.order.create({
    data: {
      address: args.address,
      payment: args.payment,
      productNumber: args.productNumber,
      user: {
        connect: {
          id: currentUser.id
        }
      }
    }
  });

  return order;
}