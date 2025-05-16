import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({ allowNull: false })
  name: string;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  users_uuid: string;

  @Column({ unique: true, allowNull: false })
  email: string;

  @Column({ allowNull: true })
  password: string;

  @Column({ allowNull: true })
  provider: string; // 'google' or 'local'

  @Column({ allowNull: true })
  profilePic: string;

  // Add these new fields for Google auth
  @Column({ allowNull: true, field: 'google_id' })
  googleId: string;

  @Column({ allowNull: true, field: 'first_name' })
  firstName: string;

  @Column({ allowNull: true, field: 'last_name' })
  lastName: string;

@Column({ allowNull: true })
otpCode: string;

@Column({ allowNull: true })
otpExpiresAt: Date;

@Column({ defaultValue: false })
emailVerified: boolean;
}
