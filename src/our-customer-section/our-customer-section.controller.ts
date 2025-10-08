import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OurCustomerSectionService } from './our-customer-section.service';
import { CreateOurCustomerSectionDto } from './dto/create-our-customer-section.dto';
import { UpdateOurCustomerSectionDto } from './dto/update-our-customer-section.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateVisibilityDto } from './dto/updateVisibility.dto';

@Controller('our-customer-section')
export class OurCustomerSectionController {
  constructor(
    private readonly ourCustomerSectionService: OurCustomerSectionService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createOurCustomerSectionDto: CreateOurCustomerSectionDto) {
    return this.ourCustomerSectionService.create(createOurCustomerSectionDto);
  }

  @Get('by-id/:id')
  findOneForAdmin(@Param('id') id: string) {
    return this.ourCustomerSectionService.findOneForAdmin(id);
  }

  @Get(':domain')
  findOne(@Param('domain') domain: string) {
    return this.ourCustomerSectionService.findOne(domain);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Body() updateOurCustomerSectionDto: UpdateOurCustomerSectionDto,
  ) {
    return this.ourCustomerSectionService.update(
      +id,
      updateOurCustomerSectionDto,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string, @Query('uuid') uuid: string) {
    return this.ourCustomerSectionService.remove(+id, uuid);
  }
  @Delete('image')
  @UseGuards(AuthGuard('jwt'))
  async deleteImage(@Query('uuid') uuid: string) {
    return this.ourCustomerSectionService.removeImage(+uuid);
  }

  @Patch('visibility/:id')
  @UseGuards(AuthGuard('jwt'))
  async updateVisibility(
    @Body() updateVisibilityDto: UpdateVisibilityDto,
    @Param('id') userId: number,
  ) {
    return this.ourCustomerSectionService.updateVisibility(
      updateVisibilityDto,
      +userId,
    );
  }
}
