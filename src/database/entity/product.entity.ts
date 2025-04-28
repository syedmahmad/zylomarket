import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { Store } from './store.entity';
import { ProductImage } from './product.images.entity';
import { Merchant } from './merchant.entity';

@Table({ tableName: 'products' })
export class Product extends Model<Product> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  product_uuid: string;

  @Column(DataType.TEXT)
  description: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    defaultValue: 0.0, // Default value for price
  })
  price: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
    allowNull: false,
  })
  status: number;

  @Column({
    type: 'DECIMAL',
    defaultValue: 0,
  })
  discount: number;

  @Column({
    type: DataType.INTEGER, // Correct for an integer column in the database
    defaultValue: 0, // Default value for stock
    allowNull: false, // Prevent stock from being null
  })
  stock: number; // TypeScript type is `number`, but Sequelize will ensure it is an integer

  @Column({ defaultValue: false })
  isOnSale: boolean;

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

  @ForeignKey(() => Merchant) // Foreign key pointing to the Merchant table
  @Column({ type: DataType.INTEGER, allowNull: false })
  merchantId: number;

  @BelongsTo(() => Merchant)
  merchant: Merchant;
}
