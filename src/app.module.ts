import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './db';
import { AuthModule } from './features/auth/auth.module';
import { UserModule } from './features/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './features/product/product.module';
import { CategoryModule } from './features/category/category.module';
import { CommentModule } from './features/comment/comment.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    ProductModule,
    CategoryModule,
    CommentModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
