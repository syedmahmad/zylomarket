import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/database/entity/product.entity';
import { ProductImage } from 'src/database/entity/product.images.entity';
import { Store } from 'src/database/entity/store.entity';
import { SalesCampaign } from 'src/database/entity/sales.campaign.entity';  // Import the SalesCampaign entity
import { CampaignProduct } from 'src/database/entity/campaign.product.entity'; // Import CampaignProduct entity
import { Merchant } from 'src/database/entity/merchant.entity';
import { User } from 'src/database/entity/user.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: typeof Product,
    @Inject('PRODUCT_IMAGE_REPOSITORY')
    private productImageRepository: typeof ProductImage,
    @Inject('STORE_REPOSITORY')
    private storeRepository: typeof Store,
    @Inject('SALES_CAMPAIGN_REPOSITORY')
    private salesCampaignRepository: typeof SalesCampaign,  
    @Inject('CAMPAIGN_PRODUCT_REPOSITORY')
    private campaignProductRepository: typeof CampaignProduct,  

    @Inject ('MERCHANT_REPOSITORY')
    private merchantRepository: typeof Merchant,

    @Inject('USER_REPOSITORY')
    private userRepository: typeof User
  ) { }

  async create(createProductDto: any, ownerId: number) {
    const store = await this.storeRepository.findOne({ where: { ownerId } });
  
    if (!store) {
      throw new NotFoundException(`Store with owner ID ${ownerId} not found.`);
    }

    const userInfo = await this.userRepository.findByPk(ownerId);

    if(!userInfo) {
      throw new NotFoundException(`Store owner with ID ${userInfo} not found.`);
    }

    const userId = userInfo.dataValues?.users_uuid ;

    const merchantInfo = await this.merchantRepository.findOne({where : {userId: ownerId, storeId: store.id}})
    if(!merchantInfo) {
      throw new NotFoundException(`Merchant with owner ID ${ownerId} not found.`);
    }
  
    const {
      imageUrls,
      isOnSale,
      saleTitle,
      bannerImageUrl,
      saleDescription,
      startDate,
      endDate,
      ...productData
    } = createProductDto;
  
    // Create product with reference to the store
    const product: any = await this.productRepository.create({
      ...productData,
      storeId: store.id,
      merchantId: merchantInfo.id,
      isOnSale: isOnSale === 1 ? true : false, // Convert to boolean
    }, {
      context: { userId },
      individualHooks: true, 
    } as any);
  
    // Save image URLs if provided
    if (Array.isArray(imageUrls) && imageUrls.length > 0) {
      const imageRecords: any = imageUrls.map((url) => ({
        productId: product.id,
        imageUrl: url,
      }));
      await this.productImageRepository.bulkCreate(imageRecords);
    }
  
    // Handle sale association if the product is on sale
    if (isOnSale) {
      // Validate required sale fields
      if (!saleTitle || !startDate || !endDate) {
        throw new BadRequestException(
          `Sale fields (title, startDate, endDate) are required when isOnSale is true.`
        );
      }
  
      // Create sales campaign
      const salesCampaign: any = await this.salesCampaignRepository.create({
        title: saleTitle,
        description: saleDescription,
        startDate,
        bannerImageUrl: bannerImageUrl || null,
        endDate,
        storeId: store.id,
      } as SalesCampaign,  {
      context: { userId },
      individualHooks: true, 
    } as any);
  
      // Associate the product with the campaign
      await this.campaignProductRepository.create({
        productId: product.id,
        salesCampaignId: salesCampaign.id,
      } as CampaignProduct, {
      context: { userId },
      individualHooks: true, 
    } as any);
    }
  
    return product;
  }

  async findAllForAdmin(id: number): Promise<Product[]> {
    const store = await this.storeRepository.findOne({
      where: { ownerId: id },
    });
    if (!store) {
      throw new NotFoundException(`Store with ID ${id} not found`);
    }

    return await this.productRepository.findAll({
      where: { storeId: id },
      include: { all: true },
    });
  }

  
  async findAll(id: number): Promise<Product[]> {
    // const store = await this.storeRepository.findOne({
    //   where: { ownerId: id },
    // });
    // if (!store) {
    //   throw new NotFoundException(`Store with ID ${id} not found`);
    // }

    return await this.productRepository.findAll({
      where: { storeId: id },
      include: { all: true },
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findByPk(id, {
      include: { all: true },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: any, uuid: string): Promise<Product> {
    const product = await this.findOne(id);
    const userId = uuid;

    // Destructure the DTO to separate images and other data
    const { images, imagesToRemove, ...updatedData } = updateProductDto;

    // Update product data
    await product.update(updatedData, {
        context: { userId },
        individualHooks: true,
    });

    // Handle image updates if they exist in the DTO
    if (images || imagesToRemove) {
        // First remove images that need to be deleted
        if (imagesToRemove && imagesToRemove.length > 0) {
            await this.productImageRepository.destroy({
                where: {
                    productId: id,
                    imageUrl: imagesToRemove,
                },
                context: { userId },
                individualHooks: true,
            }as any);
        }

        // Then add new images
        if (images && images.length > 0) {
            const existingImages = await this.productImageRepository.findAll({
                where: { productId: id },
            });

            const existingUrls = existingImages.map(img => img.imageUrl);
            const newImages = images.filter(img => !existingUrls.includes(img.imageUrl));

            if (newImages.length > 0) {
                await this.productImageRepository.bulkCreate(
                    newImages.map(image => ({
                        productId: id,
                        imageUrl: image.imageUrl,
                    })),
                    {
                        context: { userId },
                        individualHooks: true,
                    }as any
                );
            }
        }
    }

    // Handle sale status updates (your existing code)
    const { isSaleOn, salesCampaignId } = updateProductDto;
    if (isSaleOn !== undefined) {
        if (isSaleOn && salesCampaignId) {
            const salesCampaign = await this.salesCampaignRepository.findByPk(salesCampaignId);
            if (!salesCampaign) {
                throw new NotFoundException(`Sales campaign with ID ${salesCampaignId} not found`);
            }

            const existingCampaignProduct = await this.campaignProductRepository.findOne({
                where: {
                    productId: product.dataValues.id,
                    salesCampaignId,
                },
            });

            if (!existingCampaignProduct) {
                await this.campaignProductRepository.create({
                    productId: product.dataValues.id,
                    salesCampaignId,
                } as CampaignProduct, {
                    context: { userId },
                    individualHooks: true,
                } as any);
            }
        } else {
            await this.campaignProductRepository.destroy({
                where: {
                    productId: product.dataValues.id,
                    salesCampaignId,
                },
                context: { userId },
                individualHooks: true,
            } as any);
        }
    }

    return product;
}

  async remove(id: number, uuid: string): Promise<{ message: string }> {
    const product = await this.findOne(id);
    const userId = uuid;
  
    // 1. Remove any campaign-product associations first
    await this.campaignProductRepository.destroy({
      where: { productId: id },
    });
  
    // 2. Delete associated product images
    await this.productImageRepository.destroy({
      where: { productId: id }});
  
    // 3. Now safely delete the product itself
    await product.destroy(
      {individualHooks: true,
      context: { userId },
    } as any
    );
  
    return { message: `Product with ID ${id} has been removed.` };
  }
  
}
