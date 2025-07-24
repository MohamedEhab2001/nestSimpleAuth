import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignupDto } from './dto/signup.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
    constructor(private userService: UserService , private jwtService: JwtService) {}
  
    async signup(dto: SignupDto) {
      const existingUser = await this.userService.findByEmail(dto.email);
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }
      const hashedPassword = await argon2.hash(dto.password);
      const user = await this.userService.createUser(dto.email, hashedPassword,dto.name);
      const payload = {
        sub: user._id,
        email: user.email,
      };
      const token = await this.jwtService.signAsync(payload);
      return { access_token: token };
    }

    async signin(dto: SigninDto) {
      const user = await this.userService.findByEmail(dto.email , true);
      if (!user) {
        throw new BadRequestException('Invalid credentials');
      }
  
      const passwordValid = await argon2.verify(user.password, dto.password);
      if (!passwordValid) {
        throw new BadRequestException('Invalid credentials');
      }
            
  
      const payload = {
        sub: user._id,
        email: user.email,
      };
  
      const token = await this.jwtService.signAsync(payload);
  
      return {
        access_token: token,
      };
    }
}