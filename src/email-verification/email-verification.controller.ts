import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmailService } from './email-verification.service';

// import { CreateEmailVerificationDto } from './dto/create-email-verification.dto';
// import { UpdateEmailVerificationDto } from './dto/update-email-verification.dto';

@Controller('email-verification')
export class EmailVerificationController {
  constructor(private readonly emailVerificationService: EmailService) {}

  // @Post()
  // create(@Body() createEmailVerificationDto: any) {
  //   return this.emailVerificationService.create(createEmailVerificationDto);
  // }

  // @Get()
  // findAll() {
  //   return this.emailVerificationService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.emailVerificationService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateEmailVerificationDto: any) {
  //   return this.emailVerificationService.update(+id, updateEmailVerificationDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.emailVerificationService.remove(+id);
  // }
}
