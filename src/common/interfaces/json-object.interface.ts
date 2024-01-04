// object值类型
export type ObjectValue = string | number | boolean;

// object数据类型
export interface JsonObject {
  [k: string]: ObjectValue | ObjectValue[];
}
