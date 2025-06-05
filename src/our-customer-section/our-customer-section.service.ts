import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOurCustomerSectionDto } from './dto/create-our-customer-section.dto';
import { UpdateOurCustomerSectionDto } from './dto/update-our-customer-section.dto';
import { Testimonial } from 'src/database/entity/ourCustomer.entity';
import { Store } from 'src/database/entity/store.entity';
import { Merchant } from 'src/database/entity/merchant.entity';
import { User } from 'src/database/entity/user.entity';
import { UpdateVisibilityDto } from './dto/updateVisibility.dto';

@Injectable()
export class OurCustomerSectionService {
  constructor(
    @Inject('OUR_CUSTOMER_REPOSITORY')
    private readonly ourCustomerRepository: typeof Testimonial,
    @Inject('STORE_REPOSITORY')
    private readonly storeRepository: typeof Store,

    @Inject('MERCHANT_REPOSITORY')
    private readonly merchantRepository: typeof Merchant,
    
  ) { }

  async create(data: any): Promise<Testimonial> {
    const { user_id, uuid } = data;

    const store = await this.storeRepository.findOne({ where: { ownerId: user_id } });

    if (!store) {
      throw new NotFoundException(`Store with owner ID ${user_id} not found.`);
    }

      // Step 3: Validate merchant
        const merchant = await this.merchantRepository.findOne({
          where: { userId: user_id, storeId: store.id },
        });
    
        if (!merchant) {
          throw new NotFoundException(
            `Merchant not found in store ${store.id}.`,
          );
        }

    const testimonial: any = await this.ourCustomerRepository.create({
      ...data,
      storeId: store.dataValues.id,
      merchantId: merchant.id
    }, 
    {
      context: { userId : uuid },
      individualHooks: true,
    } as any,
    );

    return testimonial;
  }


  async findOne(id: number) {

    // const store = await this.storeRepository.findOne({ where: { ownerId: id } });

    // if (!store) {
    //   throw new NotFoundException(`Store with owner ID ${id} not found.`);
    // }

    const customersData = await this.ourCustomerRepository.findAll({ where: { storeId: id} })

    if (!customersData) {
      return []
    }
    return customersData


  }

  async update(id: number, updateDto: UpdateOurCustomerSectionDto): Promise<Testimonial> {
    const testimonial = await this.ourCustomerRepository.findByPk(id);

    if (!testimonial) {
      throw new NotFoundException(`Testimonial with ID ${id} not found.`);
    }

    await testimonial.update({...updateDto}, 
      {
      context: { userId : updateDto.uuid },
      individualHooks: true,
    } as any
    );

    return testimonial;
  }


  async remove(id: number, uuid: string): Promise<{ message: string; remaining: any[] }> {
  const testimonial = await this.ourCustomerRepository.findByPk(id);

  if (!testimonial) {
    throw new NotFoundException(`Testimonial with ID ${id} not found.`);
  }

  await testimonial.destroy(
    {
      context: { userId : uuid },
      individualHooks: true,
    } as any
  );

  // Fetch remaining testimonials
  const remaining = await this.ourCustomerRepository.findAll();

  return {
    message: `Testimonial with ID ${id} deleted successfully.`,
    remaining,
  };
}



   async removeImage(uuid: any): Promise<{ message: string }> {
      // const banner = await this.ourCustomerRepository.findOne({
      //   where: { testimonials_uuid: uuid },
      // });
    
      // if (!banner) {
      //   throw new NotFoundException('Banner not found');
      // }
    
  
      await this.ourCustomerRepository.update(
        // @ts-ignore
        { imageUrl: null },
        { where: { testimonials_uuid: uuid } }
      );
    
      return { message: 'Image URL removed from banner successfully' };
    }
    

    async updateVisibility(id: number, updateVisibilityDto: UpdateVisibilityDto) {
  const record = await this.ourCustomerRepository.findOne({
      where: { storeId: id},
    });


  if (!record) {
    throw new NotFoundException('Record not found');
  }

  const updatedRecord = await record.update({ showOnUI: updateVisibilityDto.showOnUI });

  return { message: 'Visibility updated successfully', data: updatedRecord };
}
}
