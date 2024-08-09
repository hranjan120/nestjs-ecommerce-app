import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { StoreService } from './store.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from '../common/fileupload/fileupload.service';

/*-----------*/
@Controller('store')
export class StoreController {
    constructor(private readonly storeService: StoreService, private readonly fileUploadService: FileUploadService) { }


    @Get()
    async sayHello() {
        return this.storeService.getHello();
    }

    @Post('file-upload')
    @UseInterceptors(FileInterceptor('userfile'))
    async uploadFileToS3(@UploadedFile() file: Express.Multer.File) {
        return this.fileUploadService.uploadFile(file);
    }

}
