import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from '@nestjs/passport';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Query('id') id: string,
    @Body() createProductDto: CreateProductDto
  ) {
    return this.productService.create(createProductDto, +id);
  }
  

@Get('admin')
  findAllProductForAdmin(@Query('id') id: string) {
    return this.productService.findAllForAdmin(+id);
  }

  @Get()
  findAllByStore(@Query('id') id: string) {
    return this.productService.findAll(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @Query('uuid') uuid: string) {
    return this.productService.update(+id, updateProductDto,uuid);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string,  @Query('uuid') uuid: string) {
    console.log('uuid',uuid)
    return this.productService.remove(+id, uuid);
  }

  // ✅ Upload Route
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads', // you can also use cloud storage instead
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      },
    }),
  }))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const imageUrl = `${process.env.BASE_URL || 'http://localhost:3000'}/uploads/${file.filename}`;
    return { url: imageUrl };
  }
}
