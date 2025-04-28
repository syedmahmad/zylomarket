// campaign.product.entity.ts
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  Unique,
  AutoIncrement,
  PrimaryKey,
} from 'sequelize-typescript';
import { Product } from './product.entity';
import { SalesCampaign } from './sales.campaign.entity';

@Table({ tableName: 'campaign_products', timestamps: true })
export class CampaignProduct extends Model<CampaignProduct> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  campaign_product_uuid: string;

  @ForeignKey(() => SalesCampaign)
  @Column({ type: DataType.INTEGER, allowNull: false })
  salesCampaignId: number;

  @BelongsTo(() => SalesCampaign)
  salesCampaign: SalesCampaign;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  productId: number;

  @BelongsTo(() => Product)
  product: Product;

  @Column({ type: DataType.FLOAT, allowNull: true })
  discountPercentage: number;

  @Column({ type: DataType.FLOAT, allowNull: true })
  salePrice: number;

  @Unique('campaign_product_unique')
  @Column({ type: DataType.STRING })
  uniqueTag: string; // optional workaround if you want a unique composite key
}
