import {
  Column,
  DataType,
  Model,
  Table,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Store } from './store.entity';
import { Merchant } from './merchant.entity';

@Table({ tableName: 'testimonials', timestamps: true })
export class Testimonial extends Model<Testimonial> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  testimonials_uuid: string;

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => Store)
  @Column({ type: DataType.INTEGER, allowNull: false })
  storeId: number;

  @BelongsTo(() => Store)
  store: Store;


  @Column({
    type: DataType.STRING,
    defaultValue: "What Our Customers Say",
  })
  heading: string;

  @Column({
    type: DataType.STRING,
    defaultValue:
      "Don't just take our word for it. Here's what our customers have to say about their shopping experience.",
  })
  subHeading: string;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  status: string; // "Verified" or "Not Verified"

  @Column(DataType.TEXT)
  testimonial: string;

  @Column(DataType.STRING)
  imageUrl: string;

  @Column(DataType.INTEGER)
  rating: number; // 1-5

  @ForeignKey(() => Merchant) // Foreign key pointing to the Merchant table
  @Column({ type: DataType.INTEGER, allowNull: false })
  merchantId: number;

  @BelongsTo(() => Merchant)
  merchant: Merchant;
}
