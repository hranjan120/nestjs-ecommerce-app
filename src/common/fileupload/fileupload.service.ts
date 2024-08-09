import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, ObjectCannedACL } from '@aws-sdk/client-s3';


/*
*--------------------
*/

@Injectable()
export class FileUploadService {
    constructor() { }

    AWS_S3_BUCKET = process.env.BUCKET_NAME;

    s3BucketConfig = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY,
        },
    });

    async uploadFile(file: Express.Multer.File) {
        const { originalname } = file;
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];

        if (!allowedMimeTypes.includes(file.mimetype)) {
            return { success: false, message: `${file.mimetype} File type not allowed`, data: null }
        }

        return await this.s3UploadMethod(file.buffer, originalname, file.mimetype);
    }

    async s3UploadMethod(file: Buffer, name: string, mimetype: string) {
        try {
            const fileExt = name.split('.').pop();
            const newFileName = `tempdata/${Date.now().toString()}${Math.random().toString(36).slice(2, 7)}.${fileExt}`;
            const uploadParams = {
                ACL: ObjectCannedACL.public_read,
                Body: file,
                Bucket: this.AWS_S3_BUCKET,
                Key: newFileName,
                ContentType: mimetype,
            };

            const command = new PutObjectCommand(uploadParams);
            const response = await this.s3BucketConfig.send(command);
            return { success: true, message: 'File uploaded', data: newFileName, response }
        } catch (e) {
            return { success: false, message: e, data: null }
        }
    }
}
