import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffDto, StaffPageDto } from './dto';
import { StaffPageVo, StaffVo, StaffListVo } from './vo';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post('create')
  @HttpCode(HttpStatus.OK)
  async create(@Body() createStaff: StaffDto): Promise<boolean> {
    return await this.staffService.create(createStaff);
  }

  @Post('edit')
  @HttpCode(HttpStatus.OK)
  async edit(@Body() editStaff: StaffDto): Promise<boolean> {
    return await this.staffService.edit(editStaff);
  }

  @Post('details')
  @HttpCode(HttpStatus.OK)
  async details(@Body('id') id: string): Promise<StaffVo> {
    const staff = await this.staffService.details(id);
    return new StaffVo(staff);
  }

  @Post('page')
  @HttpCode(HttpStatus.OK)
  async getPageList(@Body() pageSearch: StaffPageDto): Promise<StaffPageVo> {
    const records = await this.staffService.getPageList(pageSearch);
    return new StaffPageVo(records);
  }

  @Get('list')
  @HttpCode(HttpStatus.OK)
  async getList(): Promise<StaffListVo> {
    const records = await this.staffService.getList();
    return new StaffListVo(records);
  }
}
