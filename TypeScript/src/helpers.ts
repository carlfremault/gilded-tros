import {
  categoryDepreciationFactors,
  MAX_QUALITY,
  MIN_QUALITY,
} from "./constants";
import type { Item } from "./item";
import { ItemCategory } from "./types";

const hasExpired = (item: Item): boolean => item.sellIn < 0;

export const calculateUpdatedQuality = (
  item: Item,
  category: ItemCategory,
): number => {
  if (category === ItemCategory.BackstagePass) {
    return calculateBackstagePassQuality(item);
  }

  const expirationPenalty = hasExpired(item) ? 2 : 1;
  const depreciationAmount =
    (categoryDepreciationFactors[category] || 1) * expirationPenalty;

  return Math.max(
    MIN_QUALITY,
    Math.min(MAX_QUALITY, item.quality - depreciationAmount),
  );
};

const calculateBackstagePassQuality = (item: Item): number => {
  if (item.sellIn < 0) {
    return MIN_QUALITY;
  } else if (item.sellIn <= 5) {
    return Math.min(MAX_QUALITY, item.quality + 3);
  } else if (item.sellIn <= 10) {
    return Math.min(MAX_QUALITY, item.quality + 2);
  } else {
    return Math.min(MAX_QUALITY, item.quality + 1);
  }
};
