import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join, resolve } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileEntity } from './entity/file.entity';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { StaffModule } from '../staff/staff.module';
import { ImportRecordsEntity } from './entity/import-records.entity';
import { CompanyAttributeModule } from '../company-attribute/company-attribute.module';
import { CompanyModule } from '../company/company.module';
import { VirtualGrantModule } from '../virtual-grant/virtual-grant.module';
import { FlowDetailsModule } from '../flow-details/flow-details.module';
import { MainCompanyModule } from '../main-company/main-company.module';
import { PrimitiveGrantModule } from '../primitive-grant/primitive-grant.module';
import { ShareholderModule } from '../shareholder/shareholder.module';

const Moment = require('moment');

@Module({
  imports: [
    TypeOrmModule.forFeature([FileEntity, ImportRecordsEntity]),
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, done) => {
          if (!file) return done(new Error('Upload file error'), null);
          const dir = join(process.cwd(), `./uploads`);
          if (!existsSync(dir)) {
            mkdirSync(dir);
          }
          return done(null, resolve(process.cwd(), dir));
        },
        filename: (req, file, cb) => {
          const { originalname } = file;
          const fileName = decodeURIComponent(originalname);
          return cb(null, `${Moment().valueOf()}-${fileName}`);
        },
      }),
    }),
    StaffModule,
    CompanyAttributeModule,
    CompanyModule,
    VirtualGrantModule,
    FlowDetailsModule,
    MainCompanyModule,
    PrimitiveGrantModule,
    ShareholderModule,
  ],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
