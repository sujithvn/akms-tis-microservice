import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, getConnection, getConnectionManager } from 'typeorm';

import { AccessKeys  } from './entities/access-keys.entity';
import { CreateUserDto, UpdateUserDto, DeleteKeyUserDto } from '@app/common';

import { KeyManageServiceService } from './key-manage-service.service';
import { KeyManageServiceController } from './key-manage-service.controller';

describe('User Module Integration', () => {
  let controller: KeyManageServiceController;
  let connection: Connection;

  // * connect to db
  beforeAll(async () => {
    const kmsModule: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'postgres',
                database: 'postgres',
                entities: [AccessKeys],
                synchronize: true,
            }),
            }),
        TypeOrmModule.forFeature([AccessKeys]),
      ],
      providers: [KeyManageServiceService],
      controllers: [KeyManageServiceController],
    }).compile();

    controller = kmsModule.get<KeyManageServiceController>(KeyManageServiceController);
    connection = kmsModule.get<Connection>(Connection);
  });

  // * close & clear db
  afterAll(async () => {
    await connection.createQueryBuilder().delete().from(AccessKeys).execute();
    await connection.close();
  });

  describe('CRUD User', () => {
    const payload: CreateUserDto = {
        username: "User1",
        reqPerMin: 20,
        keyExpireAt: new Date("2024-06-19T12:00:00.000Z")
    };

    let userFromDb: AccessKeys;

    // * create user
    it('Should create a new user', async () => {
      const res: AccessKeys = await controller.createUser(payload);
      userFromDb = res;

      expect(res.isActive).toBe(true);
      expect(res.accessKey).not.toBeNull();
      expect(res.username).toBe(payload.username);
    });

  });
});