import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dtos/order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() dto: OrderDto) {
    return await this.orderService.createOrder(dto);
  }

  @Get()
  async getOrder(@Query('page') page: string) {
    return await this.orderService.getOrder(+page ?? 1);
  }
}
