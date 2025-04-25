import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOurCustomerSectionDto } from './dto/create-our-customer-section.dto';
import { UpdateOurCustomerSectionDto } from './dto/update-our-customer-section.dto';
import { Testimonial } from 'src/database/entity/ourCustomer.entity';
import { Store } from 'src/database/entity/store.entity';

@Injectable()
export class OurCustomerSectionService {
  constructor(
    @Inject('OUR_CUSTOMER_REPOSITORY')
    private readonly ourCustomerRepository: typeof Testimonial,
    @Inject('STORE_REPOSITORY')
    private readonly storeRepository: typeof Store
  ) { }

  async create(data: any): Promise<Testimonial> {
    const { userId } = data;

    const store = await this.storeRepository.findOne({ where: { ownerId: userId } });

    if (!store) {
      throw new NotFoundException(`Store with owner ID ${userId} not found.`);
    }

    return this.ourCustomerRepository.create({
      ...data,
      storeId: store.dataValues.id
    }
    );
  }


  async findOne(id: number) {

    const store = await this.storeRepository.findOne({ where: { ownerId: id } });

    if (!store) {
      throw new NotFoundException(`Store with owner ID ${id} not found.`);
    }

    const customersData = await this.ourCustomerRepository.findAll({ where: { storeId: store.dataValues.id } })

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

    await testimonial.update(updateDto);

    return testimonial;
  }


  async remove(id: number): Promise<{ message: string }> {
    const testimonial = await this.ourCustomerRepository.findByPk(id);

    if (!testimonial) {
      throw new NotFoundException(`Testimonial with ID ${id} not found.`);
    }

    await testimonial.destroy();

    return { message: `Testimonial with ID ${id} deleted successfully.` };
  }

}
