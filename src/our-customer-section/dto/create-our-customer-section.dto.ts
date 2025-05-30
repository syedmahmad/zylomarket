import { IsString, IsUrl, IsInt, Min, Max, IsIn, IsNumber } from 'class-validator';

export class CreateOurCustomerSectionDto {

    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsIn(['Verified', 'Not Verified'])
    status: string;

    @IsString()
    testimonial: string;

    @IsUrl()
    imageUrl: string;

    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;
    
 @IsString()
  uuid: string;
}
