import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/db';
import { RegisterDto } from '../auth/dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getBuyerByEmail(email: string) {
    return await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });
  }

  async create(body: RegisterDto) {
    const user = await this.prismaService.user.create({
      data: body,
    });
    return user
  }
}
