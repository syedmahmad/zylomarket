import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { Product } from './product.entity';

@Table({ tableName: 'product_images' })
export class ProductImage extends Model<ProductImage> {

  @PrimaryKey
      @AutoIncrement
      @Column(DataType.INTEGER)
      declare id: number;
      
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productId: number;

  @BelongsTo(() => Product)
  product: Product;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  imageUrl: string;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  product_imageUrl_uuid: string;
}
