import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    HasMany,
    AutoIncrement,
    PrimaryKey,
  } from 'sequelize-typescript';
  import { User } from './user.entity';
  import { Store } from './store.entity';
  import { Product } from './product.entity';
import { CartItem } from './addToCart.entity';
import { Testimonial } from './ourCustomer.entity';

  
  @Table({ tableName: 'merchants', timestamps: true })
  export class Merchant extends Model<Merchant> {
    @Column({
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
    })
    merchant_uuid: string;
  
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;
  
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;
  
    @BelongsTo(() => User)
    user: User;
  
    @ForeignKey(() => Store)
    @Column({ type: DataType.INTEGER, allowNull: false })
    storeId: number;
  
    @BelongsTo(() => Store)
    store: Store;
  
    // Adding relationship with Products
    @HasMany(() => Product)
    products: Product[];
  
    // Adding relationship with Testimonials
    @HasMany(() => Testimonial)
    testimonials: Testimonial[];
  
    // Adding relationship with CartItems (track sold products)
    @HasMany(() => CartItem)
    cartItems: CartItem[];
  
    // Add fields to track aggregate information like total sales
    @Column({
      type: DataType.INTEGER,
      defaultValue: 0, // total sales count
    })
    totalSalesCount: number;
  
    @Column({
      type: DataType.FLOAT,
      defaultValue: 0, // total sales value
    })
    totalSalesValue: number;
  
    @Column({
      type: DataType.INTEGER,
      defaultValue: 0, // total number of products sold
    })
    totalProductsSold: number;
  
    // You can add other aggregate fields you might find useful
  }
  