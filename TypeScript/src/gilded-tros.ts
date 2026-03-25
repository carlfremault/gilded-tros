import { Item } from "./item";

// QUALITY
const MAX_QUALITY = 50;
const MIN_QUALITY = 0;
const LEGENDARY_QUALITY = 80;

// ITEMS
const LEGENDARY_ITEMS = ["B-DAWG Keychain"];
const WELL_AGING_ITEMS = ["Good Wine"];
const BACKSTAGE_PASSES = [
  "Backstage passes for Re:Factor",
  "Backstage passes for HAXX",
];

const isLegendaryItem = (item: Item): boolean =>
  LEGENDARY_ITEMS.includes(item.name);
const isWellAgingItem = (item: Item): boolean =>
  WELL_AGING_ITEMS.includes(item.name);
const isBackstagePass = (item: Item): boolean =>
  BACKSTAGE_PASSES.includes(item.name);

const hasExpired = (item: Item): boolean => item.sellIn < 0;

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

  if (hasExpired(item)) {
    return {
      ...item,
      quality: Math.max(MIN_QUALITY, item.quality - 2),
    };
  }

  return {
    ...item,
    quality: Math.max(MIN_QUALITY, item.quality - 1),
  };
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
