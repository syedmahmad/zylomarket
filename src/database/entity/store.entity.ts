import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './user.entity';

@Table({
  tableName: 'stores',
  timestamps: true,
})
export class Store extends Model<Store> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  stores_uuid: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  logoUrl: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  domain: string; // e.g. mycoolstore.yourplatform.com

   @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  contactNumber: string; 


     @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  location: string; 

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare ownerId: number;

  @BelongsTo(() => User)
  owner: User;
}
