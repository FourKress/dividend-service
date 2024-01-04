import {
  Controller,
  Post,
  HttpStatus,
  HttpCode,
  UseInterceptors,
  UploadedFile,
  Body,
  Get,
  Query,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';

import { FileService } from './file.service';
import { FileVo, ImportFailedPageVo, ImportRecordsPageVo } from './vo';
import { ImportDetailsPageDto, ImportRecordsPageDto } from './dto';
import { NoAuth } from '../common/decorators/no-auth.decorator';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('templateCode') templateCode: string,
  ): Promise<FileVo> {
    const fileResult = await this.fileService.uploadFile(file, templateCode);
    return new FileVo(fileResult);
  }

  @NoAuth()
  @Post('uploadTemplate')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  async uploadTemplate(
    @UploadedFile() file: Express.Multer.File,
    @Body('templateCode') templateCode: string,
  ): Promise<FileVo> {
    const fileResult = await this.fileService.uploadFile(file, templateCode);
    return new FileVo(fileResult);
  }

  @Post('delete')
  @HttpCode(HttpStatus.OK)
  async deleteFile(@Body('fileId') fileId: string): Promise<boolean> {
    return await this.fileService.deleteFile(fileId);
  }

  @Get('deleteAll')
  @HttpCode(HttpStatus.OK)
  async deleteAllFile(@Query('prefix') prefix: string): Promise<boolean> {
    return await this.fileService.deleteAllFile(prefix);
  }

  @Get('download')
  async downloadFile(
    @Query('fileId') fileId: string,
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.fileService.downloadFile(fileId);
    res.setHeader('Content-Type', 'application/octet-stream');
    return {
      stream: result.pipe(res),
      isDownload: true,
    };
  }

  @Get('downloadTemplate')
  async downloadTemplate(
    @Query('templateCode') templateCode: string,
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.fileService.downloadTemplate(templateCode);
    res.setHeader('Content-Type', 'application/octet-stream');
    return {
      stream: result.pipe(res),
      isDownload: true,
    };
  }

  @Post('preview')
  @HttpCode(HttpStatus.OK)
  async previewFile(@Body('fileId') fileId: string): Promise<string> {
    return await this.fileService.previewFile(fileId);
  }

  @Post('info')
  @HttpCode(HttpStatus.OK)
  async getFileInfo(@Body() id: string): Promise<FileVo> {
    return await this.fileService.getFileInfo(id);
  }

  @Post('files')
  @HttpCode(HttpStatus.OK)
  async getFiles(@Body('ids') ids: string[]): Promise<FileVo[]> {
    return await this.fileService.getFiles(ids);
  }

  @Post('subFiles')
  @HttpCode(HttpStatus.OK)
  async getSubFiles(@Body('id') id: string): Promise<FileVo[]> {
    return await this.fileService.getSubFiles(id);
  }

  @NoAuth()
  @Post('import')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  async importFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('templateCode') templateCode: string,
  ): Promise<any> {
    const fileResult = await this.fileService.importFile(file, templateCode);
    return fileResult;
  }

  @Post('import-records')
  @HttpCode(HttpStatus.OK)
  async getImportRecords(
    @Body() pageSearch: ImportRecordsPageDto,
  ): Promise<ImportRecordsPageVo> {
    const page = await this.fileService.getImportRecords(pageSearch);
    return new ImportRecordsPageVo(page);
  }

  @Post('import-details')
  @HttpCode(HttpStatus.OK)
  async getImportFailed(
    @Body() pageSearch: ImportDetailsPageDto,
  ): Promise<ImportFailedPageVo> {
    const page = await this.fileService.getImportDetails(pageSearch);
    return new ImportFailedPageVo(page);
  }
}
