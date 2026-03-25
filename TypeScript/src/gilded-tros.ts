import { Item } from "./item";

enum ItemCategory {
  Regular,
  WellAging,
  BackstagePass,
  Legendary,
  Smelly,
}

interface CategorizedItem extends Item {
  category: ItemCategory;
}

const itemCategoryDepreciationFactors: Record<ItemCategory, number> = {
  [ItemCategory.Regular]: 1,
  [ItemCategory.WellAging]: -1, // quality increases over time
  [ItemCategory.BackstagePass]: 0, // handled separately due to complex rules
  [ItemCategory.Legendary]: 0, // does not degrade
  [ItemCategory.Smelly]: 2, // degrades twice as fast
};

// Constants - QUALITY
const MAX_QUALITY = 50;
const MIN_QUALITY = 0;
const LEGENDARY_QUALITY = 80;

// Constants - ITEMS
const LEGENDARY_ITEMS = ["B-DAWG Keychain"];
const WELL_AGING_ITEMS = ["Good Wine"];
const BACKSTAGE_PASSES = [
  "Backstage passes for Re:Factor",
  "Backstage passes for HAXX",
];
const SMELLY_ITEMS = ["Duplicate Code", "Long Methods", "Ugly Variable Names"];

// Checks
const isLegendaryItem = (item: Item): boolean =>
  LEGENDARY_ITEMS.includes(item.name);
const isWellAgingItem = (item: Item): boolean =>
  WELL_AGING_ITEMS.includes(item.name);
const isBackstagePass = (item: Item): boolean =>
  BACKSTAGE_PASSES.includes(item.name);
const isSmellyItem = (item: Item): boolean => SMELLY_ITEMS.includes(item.name);

const hasExpired = (item: Item): boolean => item.sellIn < 0;

// Helper functions
const decreaseSellIn = (item: CategorizedItem): CategorizedItem => {
  if (item.category === ItemCategory.Legendary) {
    return item;
  }
  return { ...item, sellIn: item.sellIn - 1 };
};

const updateItemQuality = (item: CategorizedItem): CategorizedItem => {
  return {
    ...item,
    quality: calculateUpdatedQuality(item),
  };
};

const calculateUpdatedQuality = (item: CategorizedItem): number => {
  if (item.category === ItemCategory.Legendary) {
    return LEGENDARY_QUALITY;
  }

  if (item.category === ItemCategory.BackstagePass) {
    return calculateBackstagePassQuality(item);
  }

  const expirationPenalty = hasExpired(item) ? 2 : 1;
  const depreciationAmount =
    (itemCategoryDepreciationFactors[item.category] || 1) * expirationPenalty;

  return Math.max(
    MIN_QUALITY,
    Math.min(MAX_QUALITY, item.quality - depreciationAmount),
  );
};

const calculateBackstagePassQuality = (item: CategorizedItem): number => {
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
  private categorizedItems: CategorizedItem[];

  constructor(public items: Array<Item>) {
    this.categorizedItems = this.items.map((item) => {
      let category: ItemCategory = ItemCategory.Regular;
      if (isLegendaryItem(item)) {
        category = ItemCategory.Legendary;
      } else if (isWellAgingItem(item)) {
        category = ItemCategory.WellAging;
      } else if (isBackstagePass(item)) {
        category = ItemCategory.BackstagePass;
      } else if (isSmellyItem(item)) {
        category = ItemCategory.Smelly;
      }
      return { ...item, category };
    });
  }

  public updateQuality(): void {
    this.categorizedItems = this.categorizedItems.map((item) => {
      const updatedItem = decreaseSellIn(item);
      return updateItemQuality(updatedItem);
    });
    this.items = this.categorizedItems.map(({ category, ...item }) => item);
  }
}
