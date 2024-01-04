import { Injectable } from '@nestjs/common';
import { JsonObject } from '../common/interfaces/json-object.interface';
import * as ALLEnum from '../common/enum';

@Injectable()
export class EnumService {
  private readonly allEnum = ALLEnum;

  async batch(codes: string[]): Promise<JsonObject> {
    const enumConfig = {};
    codes.forEach((code) => {
      const key = code.replace('Enum', '2CnEnum');
      const targetEnum = this.allEnum[key];
      const enumValue = Object.keys(targetEnum)
        .filter((d) => isNaN(Number(d)))
        .map((d) => {
          return {
            label: d,
            value: targetEnum[d],
          };
        });
      enumConfig[code] = enumValue;
    });

    return enumConfig;
  }
}
