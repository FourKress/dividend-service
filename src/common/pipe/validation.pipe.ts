import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  Logger,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ResponseTools } from '../utils/response-tools';

@Injectable()
export class ValidationPipe implements PipeTransform {
  private readonly logger = new Logger('ValidationPipe');
  async transform(value: any, metadata: ArgumentMetadata) {
    const metaType = metadata.metatype;
    if (!metaType || !this.toValidate(metaType)) {
      return value;
    }
    // 将对象转换为 Class 来验证
    const object = plainToClass(metaType, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      let msg;
      const constraints =
        errors[0].constraints || errors[0]?.children[0]?.constraints;
      if (constraints) {
        msg = Object.values(constraints)[0];
      } else {
        msg = this.recursionLookErrorMsg(errors[0].children[0].children);
      }
      const errMessage = `参数校验: ${msg}`;
      this.logger.error(errMessage);
      ResponseTools.fail(errMessage);
    }
    return value;
  }

  private toValidate(metaType: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object, Date];
    return !types.includes(metaType);
  }

  private recursionLookErrorMsg(target: any): any {
    if (target['children']?.length) {
      this.recursionLookErrorMsg(target['children'][0]);
    }
    const msg = Object.values(target[0].constraints)[0];
    return msg;
  }
}
