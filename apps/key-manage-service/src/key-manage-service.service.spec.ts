import { Test, TestingModule } from '@nestjs/testing';
import { KeyManageServiceService } from './key-manage-service.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AccessKeys } from './entities/access-keys.entity';
import { CreateUserDto } from '@app/common';

describe('KeyManageServiceService', () => {
  let service: KeyManageServiceService;

  class MockAccessKeysRepository {
    async create(createUserDto: CreateUserDto): Promise<AccessKeys> {
      const accessKeys = new AccessKeys();
      accessKeys.username = createUserDto.username;
      accessKeys.reqPerMin = createUserDto.reqPerMin;
      accessKeys.keyExpireAt = createUserDto.keyExpireAt;
      accessKeys.accessKey = '018f0b9f-744e-4f22-b1d9-ed1759c2c5d3';
      accessKeys.isActive = true;
      return accessKeys;
    }

    async save(accessKeys: AccessKeys): Promise<AccessKeys> {
      return accessKeys;
    }
  }

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KeyManageServiceService,
        {
          provide: getRepositoryToken(AccessKeys),
          useClass: MockAccessKeysRepository,
        },
      ],
    }).compile();

    service = module.get<KeyManageServiceService>(KeyManageServiceService);
  });

  describe('Service should be defined', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });
  
  describe('create', () => {
    it('should return an access key', async () => {
      const createUserDto: CreateUserDto = {
        username: 'test',
        reqPerMin: 10,
        keyExpireAt: new Date("2024-06-19T12:00:00.000Z")
      };

      const accessKey: AccessKeys = await service.createUser(createUserDto);

      expect(accessKey).toBeDefined();
      expect(accessKey.username).toBe(createUserDto.username);
      expect(accessKey.reqPerMin).toBe(createUserDto.reqPerMin);
      expect(accessKey.accessKey).toBeDefined();
      expect(accessKey.isActive).toBe(true);
    });
  });


});
