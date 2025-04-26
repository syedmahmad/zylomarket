// why-shop-feature.model.ts
import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  BelongsTo,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { WhyShopSection } from './why-shop-with-us.entity';

@Table({ tableName: 'why_shop_features' })
export class WhyShopFeature extends Model<WhyShopFeature> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  uuid: string;

  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;

  @ForeignKey(() => WhyShopSection)
  @Column({ type: DataType.INTEGER, allowNull: false })
  sectionId: number;

  @BelongsTo(() => WhyShopSection)
  section: WhyShopSection;
}
