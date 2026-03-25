import { ItemCategory } from "./types";

// Constants - QUALITY
export const MAX_QUALITY = 50;
export const MIN_QUALITY = 0;

// Mappings
export const categoryDepreciationFactors: Record<ItemCategory, number> = {
  [ItemCategory.Regular]: 1,
  [ItemCategory.WellAging]: -1, // quality increases over time
  [ItemCategory.BackstagePass]: 0, // handled separately due to complex rules
  [ItemCategory.Legendary]: 0, // does not degrade
  [ItemCategory.Smelly]: 2, // degrades twice as fast
};

export const categoryMapping: Record<string, ItemCategory> = {
  "B-DAWG Keychain": ItemCategory.Legendary,
  "Good Wine": ItemCategory.WellAging,
  "Backstage passes for Re:Factor": ItemCategory.BackstagePass,
  "Backstage passes for HAXX": ItemCategory.BackstagePass,
  "Duplicate Code": ItemCategory.Smelly,
  "Long Methods": ItemCategory.Smelly,
  "Ugly Variable Names": ItemCategory.Smelly,
};
