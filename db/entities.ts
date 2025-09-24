import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';

@Entity()
export class WatchedProduct {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  url!: string;

  @Column()
  selectorWithPrice!: string;

  @Column('float')
  targetPrice!: number;
}

@Entity()
export class PriceHistory {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => WatchedProduct)
  product!: WatchedProduct;

  @Column('float')
  price!: number;

  @CreateDateColumn()
  checkedAt!: Date;
}
