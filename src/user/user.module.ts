import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './schemas/users.schema';
import { RedisModule } from '../common/module/redis/redis.module';
import { OpenSearchModule } from '../common/module/opensearch/opensearch.module';
import { KafkaModule } from '../common/module/kafka/kafka.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]), RedisModule, OpenSearchModule, KafkaModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
