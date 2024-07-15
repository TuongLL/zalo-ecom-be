import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto, UpdateOrderStatusDto } from './dtos/order.dto';
import { Public } from 'src/core/decorators';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() dto: OrderDto) {
    return await this.orderService.createOrder(dto);
  }

  @Get()
  async getOrder(@Query('page') page: string) {
    return await this.orderService.getOrder(page ? +page : 1);
  }

  @Get('phone/:phone')
  @Public()
  async getOrderByPhone(@Param('phone') phone: string) {
    return await this.orderService.getOrderByPhone(phone);
  }

  @Patch(':id')
  async updateOrder(
    @Body() dto: UpdateOrderStatusDto,
    @Param('id') id: string,
  ) {
    return await this.orderService.updateOrderStatus(id, dto);
  }
}
