import { Item } from "./item";

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
const decreaseSellIn = (item: Item): Item => {
  if (isLegendaryItem(item)) {
    return item;
  }
  return { ...item, sellIn: item.sellIn - 1 };
};

const updateQuality = (item: Item): Item => {
  if (isLegendaryItem(item)) {
    return item;
  }

  const depreciationfactor = calculateDepreciationFactor(item);

  return {
    ...item,
    quality: Math.max(
      MIN_QUALITY,
      Math.min(MAX_QUALITY, item.quality - depreciationfactor),
    ),
  };
};

const calculateDepreciationFactor = (item: Item): number => {
  let depreciationFactor = 1;

  if (isBackstagePass(item)) {
    if (item.sellIn > 10) {
      depreciationFactor = -1; // negative factors increase quality
    } else if (item.sellIn > 5) {
      depreciationFactor = -2;
    } else if (item.sellIn >= 0) {
      depreciationFactor = -3;
    } else {
      depreciationFactor = item.quality; // drop to 0 after the event
    }
    return depreciationFactor;
  }

  if (isWellAgingItem(item)) {
    depreciationFactor = -1; // negative factors increase quality
  }

  if (isSmellyItem(item)) {
    depreciationFactor = depreciationFactor * 2; // smelly items degrade twice as fast
  }

  if (hasExpired(item)) {
    depreciationFactor = depreciationFactor * 2;
  }

  return depreciationFactor;
};

export class GildedTros {
  constructor(public items: Array<Item>) {}

  public updateQuality(): void {
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      item = decreaseSellIn(item);
      item = updateQuality(item);
      this.items[i] = item;
    }
  }
}
