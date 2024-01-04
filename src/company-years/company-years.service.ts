import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyYearsEntity } from './entity/company-years.entity';
import { CompanyYearsDto, CompanyYearsSearchDto } from './dto';
import { ResponseTools } from '../common/utils/response-tools';

@Injectable()
export class CompanyYearsService {
  @InjectRepository(CompanyYearsEntity)
  private readonly companyYearsRepository: Repository<CompanyYearsEntity>;

  async findByYears(
    companyId: string,
    years: string,
  ): Promise<CompanyYearsEntity> {
    return this.companyYearsRepository.findOneBy({
      companyId,
      years,
      isDelete: false,
    });
  }

  async checkYearsRepeatByCompanyId(
    companyId: string,
    years: string,
    isAdd: boolean,
  ): Promise<boolean> {
    const checkByDB = await this.findByYears(companyId, years);
    if (checkByDB && (isAdd || checkByDB?.years !== years)) {
      ResponseTools.fail('年份重复,请检查后重试!');
      return false;
    }
    return true;
  }

  async create(createCompanyYears: CompanyYearsDto): Promise<boolean> {
    const { years, companyId } = createCompanyYears;
    await this.checkYearsRepeatByCompanyId(companyId, years, true);

    const companyYears = await this.companyYearsRepository.save(
      createCompanyYears,
    );
    if (!companyYears) {
      return false;
    }
    return true;
  }

  async edit(editCompanyYears: CompanyYearsDto): Promise<boolean> {
    const { id, ...info } = editCompanyYears;

    await this.checkYearsRepeatByCompanyId(info.companyId, info.years, false);

    const { affected } = await this.companyYearsRepository.update(id, info);
    return affected === 1;
  }

  async details(id: string): Promise<CompanyYearsEntity> {
    const companyYears = await this.companyYearsRepository.findOneBy({ id });
    if (!companyYears) {
      ResponseTools.fail('未找到对应详情数据!');
    }
    return companyYears;
  }

  async search(search: CompanyYearsSearchDto): Promise<CompanyYearsEntity> {
    const companyYears = await this.companyYearsRepository.findOneBy({
      ...search,
    });
    if (!companyYears) {
      ResponseTools.fail('');
    }
    return companyYears;
  }
}
