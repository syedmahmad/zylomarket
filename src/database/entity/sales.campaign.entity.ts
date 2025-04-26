// sales.campaign.entity.ts
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
import { CampaignProduct } from './campaign.product.entity';

@Table({ tableName: 'sales_campaigns', timestamps: true })
export class SalesCampaign extends Model<SalesCampaign> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  sales_campaigns_uuid: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  description: string;

  @Column({ type: DataType.STRING, allowNull: true })
  bannerImageUrl: string;

  @Column({ type: DataType.DATE, allowNull: false })
  startDate: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  endDate: Date;

  @ForeignKey(() => Store)
  @Column({ type: DataType.INTEGER, allowNull: false })
  storeId: number;

  @BelongsTo(() => Store)
  store: Store;

  @HasMany(() => CampaignProduct)
  campaignProducts: CampaignProduct[];
}
