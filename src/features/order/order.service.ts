import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db';
import { OrderDto, UpdateOrderStatusDto } from './dtos/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prismaServie: PrismaService) {}

  async createOrder(body: OrderDto) {
    return await this.prismaServie.$transaction(async (prisma) => {
      const order = await prisma.order.create({
        data: {
          name: body.name,
          phone: body.phone,
          address: body.address,
          total: body.total,
        },
      });
      await prisma.orderItem.createMany({
        data: body.items.map((item) => ({
          orderId: order.id,
          productVariantId: item.variantId,
          quantity: item.quantity,
          price: item.price,
          productId: item.productId,
          image: item.image,
          discountPrice: item.discountPrice,
          name: item.name,
        })),
      });
      return order;
    });
  }

  async getOrder(page: number = 1) {
    return await this.prismaServie.order.findMany({
      skip: (page - 1) * 10,
      take: 10,
      include: {
        OrderItem: true,
      },
    });
  }
  async updateOrderStatus(id: string, body: UpdateOrderStatusDto) {
    return await this.prismaServie.order.update({
      where: {
        id,
      },
      data: {
        status: body.status,
      },
    });
  }

  async getOrderByPhone(phone: string) {
    console.log(phone)
    return await this.prismaServie.order.findMany({
      where: {
        phone,
      },
      include: {
        OrderItem: true,
      },
    });
  }
}
