// why-shop-with-us.model.ts
import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  BelongsTo,
  HasMany,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { Store } from './store.entity';
import { WhyShopFeature } from './why-shop-feature.entity';


@Table({ tableName: 'why_shop_sections' })
export class WhyShopSection extends Model<WhyShopSection> {

  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  uuid: string;
  
  @Column({ type: DataType.STRING, allowNull: false })
  sectionTitle: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;

  @ForeignKey(() => Store)
  @Column({ type: DataType.INTEGER, allowNull: false })
  storeId: number;

  @BelongsTo(() => Store)
  store: Store;

  @HasMany(() => WhyShopFeature)
  features: WhyShopFeature[];
}
