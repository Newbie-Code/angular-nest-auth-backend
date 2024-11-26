import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

import { CreateUserDto, UpdateAuthDto, LoginDto, RegisterUserDto } from './dto';
import { AuthGuard } from './guards/auth.guard';
import { LoginResponse } from './interfaces/login-response';

import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('/register')
  register(@Body() registerUserDto: RegisterUserDto){
    return this.authService.register(registerUserDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto){
    return this.authService.login(loginDto);
  }

  @UseGuards( AuthGuard )
  @Get()
  findAll( @Request() req: Request ) {
    const user = req['user'];
    // return user;
    return this.authService.findAll();
  }

  @UseGuards( AuthGuard )
  @Get('/check-token')
  async checkToken( @Request() req: Request ): Promise<LoginResponse>{
    const user = req['user'] as User;
    const token = this.authService.getJWT({id: user._id});
    return {
      user,
      token: token
    };
  }




  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
