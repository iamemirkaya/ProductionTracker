import type { Product } from "../models/product";
import type { Shift } from "../models/shift";
import type { Workshop } from "../models/workshop";
import type { Option } from "../shared/types/option";


export function mapWorkshopsToOptions(workshops: Workshop[] = []): Option[] {
  return workshops.map((w) => ({
    id: w.id,
    name: w.name,
  }));
}

export function mapShiftsToOptions(shift: Shift[] = []): Option[] {
  return shift.map((s) => ({
    id: s.id,
    name: s.name,
  }));
}

export function mapProductsToOptions(product: Product[] = []): Option[] {
  return product.map((p) => ({
    id: p.id,
    name: p.name,
  }));
}