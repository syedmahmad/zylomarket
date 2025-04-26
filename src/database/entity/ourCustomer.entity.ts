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
}
