import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        return {
          connectionFactory: (connection) => {
            if (connection.readyState === 1) {
              console.log('Mongodb Connected successfully');
            }
            connection.on('disconnected', () => {
              console.log('Mongodb disconnected');
            });
            connection.on('error', (error: string) => {
              console.log('Mongodb connection failed!: ', error);
            });

            return connection;
          },
          uri: process.env.MONGODB_URL,
        };
      },
    })
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule { }
