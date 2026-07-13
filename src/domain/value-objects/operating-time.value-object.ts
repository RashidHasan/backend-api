export const operatingDays = ['sat', 'sun', 'mon', 'tue', 'wed', 'thr', 'fri'];

export interface OperatingTimeDayItem {
  name: string;
  checked: boolean;
  times: string[][];
}

export class OperatingTimeAttribute {
  editable: boolean = true;
  items: OperatingTimeDayItem[] = [];

  constructor(partial?: Partial<OperatingTimeAttribute>) {
    if (partial) {
      this.editable = partial.editable ?? true;
      this.items = partial.items ?? [];
    }
  }
}

export interface OperatingTimeAttributeModel {
  data: OperatingTimeAttribute;
}
