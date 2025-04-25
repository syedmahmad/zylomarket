import { Testimonial } from "src/database/entity/ourCustomer.entity";

export const ourCustomerProvider = [
  {
    provide: 'OUR_CUSTOMER_REPOSITORY',
    useValue: Testimonial,
  },
];
