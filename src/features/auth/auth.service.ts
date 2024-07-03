import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef
} from '@nestjs/common';

import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { environments } from 'src/environments/environments';

import { User } from '@prisma/client';
import { UserService } from '../user/user.service';
import { TokenResponse, UserPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validate(email: string, password: string): Promise<User> {
    const user = await this.userService.getBuyerByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    if (password != user.password) {
      throw new BadRequestException('Incorrect password', {
        cause: new Error(),
        description: 'ERR_INCORRECT_PASSWORD',
      });
    }

    return user;
  }

 

  async login(user: User): Promise<TokenResponse & { user: Partial<User> }> {
    const payload: UserPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    let refresh_token: string;

    if (environments.accessTokenExpiration) {
      refresh_token = await this.jwtService.signAsync(
        payload,
        this.getRefreshTokenOptions(),
      );
    }

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      access_token: await this.jwtService.signAsync(
        payload,
        this.getAccessTokenOptions(),
      ),
      refresh_token,
    };
  }

  getRefreshTokenOptions(): JwtSignOptions {
    return this.getTokenOptions('refresh');
  }

  getAccessTokenOptions(): JwtSignOptions {
    return this.getTokenOptions('access');
  }
  private getTokenOptions(type: 'refresh' | 'access') {
    const options: JwtSignOptions = {
      secret: environments[type + 'TokenSecret'],
    };

    const expiration = environments[type + 'TokenExpiration'];

    if (expiration) {
      options.expiresIn = expiration;
    }

    return options;
  }
}
