import { Table, Model, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.entity';
import { Product } from './product.entity';

@Table({ tableName: 'cart_items' })
export class CartItem extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Product)
  @Column
  productId: number;

  @Column
  quantity: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Product)
  product: Product;
}
