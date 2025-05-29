import {
  Table,
  Column,
  Model,
  DataType,
} from 'sequelize-typescript';

@Table({
  tableName: 'audit_trails',
  timestamps: true, // auto-manages createdAt & updatedAt
})
export class AuditTrail extends Model<AuditTrail> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  rowId: number;

  @Column({ type: DataType.STRING, allowNull: false })
  action: 'CREATE' | 'UPDATE' | 'DELETE';

  @Column({ type: DataType.JSON, allowNull: true })
  current_data: Record<string, any> | null;

  @Column({ type: DataType.JSON, allowNull: true })
  previous_data: Record<string, any> | null;

  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;
}
