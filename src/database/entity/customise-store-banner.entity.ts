// src/modules/store-customisation/entities/customise-store-banner.entity.ts

import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    PrimaryKey,
    AutoIncrement,
    Default,
} from 'sequelize-typescript';
import { Store } from './store.entity';

export enum TextPosition {
    LEFT = 'left',
    CENTER = 'center',
    RIGHT = 'right',
}

@Table({ tableName: 'customise_store_banners', timestamps: true })
export class CustomiseStoreBanner extends Model<CustomiseStoreBanner> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;

    @ForeignKey(() => Store)
    @Column({ type: DataType.INTEGER, allowNull: false })
    storeId: number;

    @BelongsTo(() => Store)
    store: Store;

    @Column({ type: DataType.STRING, allowNull: false })
    title: string;

    @Column({ type: DataType.TEXT, allowNull: true })
    description?: string;

    @Column({ type: DataType.STRING, allowNull: true })
    imageUrl?: string;

    @Column({ type: DataType.STRING, allowNull: true })
    buttonText?: string;

    @Column({ type: DataType.STRING, allowNull: true })
    buttonLink?: string;

    @Column({
        type: DataType.ENUM(...Object.values(TextPosition)),
        allowNull: true,
        defaultValue: TextPosition.LEFT,
    })
    textPosition?: TextPosition;

    @Default(true)
    @Column({ type: DataType.BOOLEAN })
    isActive: boolean;
}
