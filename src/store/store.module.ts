import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { FileUploadService } from '../common/fileupload/fileupload.service';

@Module({
  controllers: [StoreController],
  providers: [StoreService, FileUploadService]
})
export class StoreModule { }
