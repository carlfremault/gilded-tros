import { Item } from "./item";

enum ItemCategory {
  Regular,
  WellAging,
  BackstagePass,
  Legendary,
  Smelly,
}

const categoryDepreciationFactors: Record<ItemCategory, number> = {
  [ItemCategory.Regular]: 1,
  [ItemCategory.WellAging]: -1, // quality increases over time
  [ItemCategory.BackstagePass]: 0, // handled separately due to complex rules
  [ItemCategory.Legendary]: 0, // does not degrade
  [ItemCategory.Smelly]: 2, // degrades twice as fast
};

const categoryMapping: Record<string, ItemCategory> = {
  "B-DAWG Keychain": ItemCategory.Legendary,
  "Good Wine": ItemCategory.WellAging,
  "Backstage passes for Re:Factor": ItemCategory.BackstagePass,
  "Backstage passes for HAXX": ItemCategory.BackstagePass,
  "Duplicate Code": ItemCategory.Smelly,
  "Long Methods": ItemCategory.Smelly,
  "Ugly Variable Names": ItemCategory.Smelly,
};

const getCategoryForItem = (item: Item): ItemCategory => {
  return categoryMapping[item.name] || ItemCategory.Regular;
};

// Constants - QUALITY
const MAX_QUALITY = 50;
const MIN_QUALITY = 0;

// Helper functions
const hasExpired = (item: Item): boolean => item.sellIn < 0;

const calculateUpdatedQuality = (
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

export class GildedTros {
  constructor(public items: Array<Item>) {}

  public updateQuality(): void {
    for (const item of this.items) {
      const itemCategory = getCategoryForItem(item);
      if (itemCategory === ItemCategory.Legendary) {
        continue;
      }
      item.sellIn -= 1;
      item.quality = calculateUpdatedQuality(item, itemCategory);
    }
  }
}
