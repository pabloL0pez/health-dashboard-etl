import { ClaimCategoryType, ClaimVerificationStatusType } from "@core/health-dashboard";

export type FilterId = 'influencer' | 'date' | 'category' | 'status';

export interface FilterOption<T> {
  value: T;
  label: string;
  isSelected: boolean;
}

interface Filter<T, K> {
  id: T;
  label: string;
  options: FilterOption<K>[];
}

export type FilterBase = Filter<'influencer' | 'date', string>;
export type FilterCategory = Filter<'category', ClaimCategoryType>;
export type FilterStatus = Filter<'status', ClaimVerificationStatusType>;

export type FilterConfig = FilterBase | FilterCategory | FilterStatus;