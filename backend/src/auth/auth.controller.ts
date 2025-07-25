import { Body, Controller, Post  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post('signup')
        async signup(@Body() dto: SignupDto) {
      return this.authService.signup(dto);
    }


    @Post('signin')
    async signin(@Body() dto: SigninDto) {
      return this.authService.signin(dto);
    }
}
