import { categoryMapping } from "./constants";
import { calculateUpdatedQuality } from "./helpers";
import { Item } from "./item";
import { ItemCategory } from "./types";

export class GildedTros {
  constructor(public items: Array<Item>) {}

  private getCategoryForItem(item: Item): ItemCategory {
    return categoryMapping[item.name] || ItemCategory.Regular;
  }

  public updateQuality(): void {
    for (const item of this.items) {
      const category = this.getCategoryForItem(item);
      if (category === ItemCategory.Legendary) {
        continue;
      }
      item.sellIn -= 1;
      item.quality = calculateUpdatedQuality(item, category);
    }
  }
}
