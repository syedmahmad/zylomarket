import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  DataType,
  AutoIncrement,
  PrimaryKey,
} from 'sequelize-typescript';
import { User } from './user.entity';
import { Product } from './product.entity';
import { Merchant } from './merchant.entity';

@Table({ tableName: 'cart_items' })
export class CartItem extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  cart_item_uuid: string;

  @ForeignKey(() => Product)
  @Column
  productId: number;

  @Column
  quantity: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Product)
  product: Product;

  @ForeignKey(() => Merchant) // Foreign key pointing to the Merchant table
  @Column({ type: DataType.INTEGER, allowNull: false })
  merchantId: number;

  @BelongsTo(() => Merchant)
  merchant: Merchant;

  @Column({ type: DataType.STRING, allowNull: false })
  guestId: string;

}
