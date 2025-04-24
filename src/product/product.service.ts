import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/database/entity/product.entity';
import { ProductImage } from 'src/database/entity/product.images.entity';
import { Store } from 'src/database/entity/store.entity';
import { SalesCampaign } from 'src/database/entity/sales.campaign.entity';  // Import the SalesCampaign entity
import { CampaignProduct } from 'src/database/entity/campaign.product.entity'; // Import CampaignProduct entity

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
  ) { }

  async create(createProductDto: any, ownerId: number) {
    const store = await this.storeRepository.findOne({ where: { ownerId } });
  
    if (!store) {
      throw new NotFoundException(`Store with owner ID ${ownerId} not found.`);
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
    const product = await this.productRepository.create({
      ...productData,
      storeId: store.id,
      isOnSale: isOnSale === 1 ? true : false, // Convert to boolean
    });
  
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
      const salesCampaign = await this.salesCampaignRepository.create({
        title: saleTitle,
        description: saleDescription,
        startDate,
        bannerImageUrl: bannerImageUrl || null,
        endDate,
        storeId: store.id,
      } as SalesCampaign);
  
      // Associate the product with the campaign
      await this.campaignProductRepository.create({
        productId: product.id,
        salesCampaignId: salesCampaign.id,
      } as CampaignProduct);
    }
  
    return product;
  }

  async findAll(id: number): Promise<Product[]> {
    const store = await this.storeRepository.findOne({
      where: { ownerId: id },
    });
    if (!store) {
      throw new NotFoundException(`Store with ID ${id} not found`);
    }

    return await this.productRepository.findAll({
      where: { storeId: store.dataValues.id },
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

  async update(id: number, updateProductDto: any): Promise<Product> {
    const product = await this.findOne(id);
    
    // If the product's sale status is being updated, handle that as well
    const { isSaleOn, salesCampaignId, ...updatedData } = updateProductDto;
    
    // Update product data
    await product.update(updatedData);

    if (isSaleOn !== undefined) {
      if (isSaleOn && salesCampaignId) {
        // If isSaleOn is true, link the product to a sales campaign
        const salesCampaign = await this.salesCampaignRepository.findByPk(salesCampaignId);
        if (!salesCampaign) {
          throw new NotFoundException(`Sales campaign with ID ${salesCampaignId} not found`);
        }

        // Check if this product is already linked to the campaign to avoid duplicates
        const existingCampaignProduct = await this.campaignProductRepository.findOne({
          where: {
            productId: product.dataValues.id,
            salesCampaignId,
          },
        });

        if (!existingCampaignProduct) {
          // Create a new link if it doesn't exist
          await this.campaignProductRepository.create({
            productId: product.dataValues.id,
            salesCampaignId,
            // You can add discountPercentage or salePrice if needed
          } as CampaignProduct);
        }
      } else {
        // If the sale is being turned off, remove the link from CampaignProduct
        await this.campaignProductRepository.destroy({
          where: {
            productId: product.dataValues.id,
            salesCampaignId,
          },
        });
      }
    }

    return product;
  }

  async remove(id: number): Promise<{ message: string }> {
    const product = await this.findOne(id);
  
    // 1. Remove any campaign-product associations first
    await this.campaignProductRepository.destroy({
      where: { productId: id },
    });
  
    // 2. Delete associated product images
    await this.productImageRepository.destroy({
      where: { productId: id },
    });
  
    // 3. Now safely delete the product itself
    await product.destroy();
  
    return { message: `Product with ID ${id} has been removed.` };
  }
  
}
