import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Store } from './store.entity';
import { ProductImage } from './product.images.entity';


@Table({ tableName: 'products' })
export class Product extends Model<Product> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'Product Name', // Optionally set default

  })
  name: string;

  @Column(DataType.TEXT)
  description: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    defaultValue: 0.0, // Default value for price

  })
  price: number;

  @Column(DataType.STRING)
  imageUrl: string;

  @Column({
    type: DataType.INTEGER,  // Correct for an integer column in the database
    defaultValue: 0,  // Default value for stock
    allowNull: false,  // Prevent stock from being null
  })
  stock: number;  // TypeScript type is `number`, but Sequelize will ensure it is an integer


  @ForeignKey(() => Store)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  storeId: number;

  @HasMany(() => ProductImage)
  images: ProductImage[];
  
  @BelongsTo(() => Store)
  store: Store;
}
