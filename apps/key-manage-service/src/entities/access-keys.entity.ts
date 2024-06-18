import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Generated,
  } from 'typeorm';
  
  @Entity({ name: 'access-keys' })
  export class AccessKeys {
    @PrimaryGeneratedColumn('uuid')
    userId: string;
  
    @Column({ nullable: false, unique: true})
    username: string;
  
    @Column({ nullable: false })
    @Generated('uuid')
    accessKey: string;
  
    @Column({ nullable: false })
    reqPerMin: number;
  
    @Column({ nullable: false, type: 'timestamptz' })
    keyExpireAt: Date;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;
  
  }