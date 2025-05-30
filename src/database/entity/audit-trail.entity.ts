import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  timestamps: true,
})
export class AuditTrail extends Model<AuditTrail> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  table: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  rowId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  action: string;

  @Column({
    type: DataType.JSON,
  })
  current_data: string | null;

  @Column({
    type: DataType.JSON,
  })
  previous_data: string | null;

    @Column({
    type: DataType.UUID,
    allowNull: true, // optional: make it `false` if you always expect a user
  })
  userId: string | null;
}
