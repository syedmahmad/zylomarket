import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  Unique,
} from 'sequelize-typescript';
import { Store } from './store.entity';

@Table({
  tableName: 'store_themes',
  timestamps: true,
})
export class StoreTheme extends Model<StoreTheme> {
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
    uuid: string;

  @Unique
  @ForeignKey(() => Store)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare storeId: number;

  @BelongsTo(() => Store)
  store: Store;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
   themeId: string; // 'light', 'dark', etc. — frontend identifier

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string; // Display name

  @Column(DataType.STRING)
  primary: string;

  @Column(DataType.STRING)
  secondary: string;

  @Column(DataType.STRING)
  background: string;

  @Column(DataType.STRING)
  text: string;

  @Column(DataType.STRING)
  accent: string;
}
