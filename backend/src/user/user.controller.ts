import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { ApiTags , ApiBearerAuth} from '@nestjs/swagger';


@ApiTags('User')
@Controller('user')
export class UserController {


    constructor(private userService:UserService){}


    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get("/me")
    async me(@GetUser("email") email:string){        
        return await this.userService.findByEmail(email)
    }
    
}
