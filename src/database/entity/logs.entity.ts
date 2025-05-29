import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'logs',
  timestamps: true, // auto-manages createdAt & updatedAt
  indexes: [
    { fields: ['method'] },
    { fields: ['url'] },
    { fields: ['createdAt'] },
  ],
})
export class Log extends Model<Log> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  requestBody: object;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  responseBody: object;

  @Column({
    type: DataType.STRING(2048), // safe limit for URLs
    allowNull: false,
  })
  url: string;

  @Column({
    type: DataType.STRING(10), // GET, POST, etc.
    allowNull: false,
  })
  method: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  statusCode: number;
}
