import { Item } from "../src/item";
import { GildedTros } from "../src/gilded-tros";

describe("GildedTrosTest", () => {
  describe("Regular items", () => {
    it("should decrease sellIn and quality by 1 before sellIn date", () => {
      const items: Item[] = [new Item("foo", 10, 10)];
      const app: GildedTros = new GildedTros(items);
      app.updateQuality();
      expect(app.items[0].sellIn).toEqual(9);
      expect(app.items[0].quality).toEqual(9);
    });

    it("should decrease sellIn by 1 and quality by 2 after sellIn date", () => {
      const items: Item[] = [new Item("foo", 0, 10)];
      const app: GildedTros = new GildedTros(items);
      app.updateQuality();
      expect(app.items[0].sellIn).toEqual(-1);
      expect(app.items[0].quality).toEqual(8);
    });

    it("should not degrade quality below 0", () => {
      const items: Item[] = [new Item("foo", 10, 0)];
      const app: GildedTros = new GildedTros(items);
      app.updateQuality();
      expect(app.items[0].sellIn).toEqual(9);
      expect(app.items[0].quality).toEqual(0);
    });
  });

  describe("Good Wine", () => {
    it("should decrease sellIn by 1 and increase quality by 1 before sellIn date", () => {
      const items: Item[] = [new Item("Good Wine", 10, 10)];
      const app: GildedTros = new GildedTros(items);
      app.updateQuality();
      expect(app.items[0].sellIn).toEqual(9);
      expect(app.items[0].quality).toEqual(11);
    });

    it("should decrease sellIn by 1 and increase quality by 2 after sellIn date", () => {
      const items: Item[] = [new Item("Good Wine", 0, 10)];
      const app: GildedTros = new GildedTros(items);
      app.updateQuality();
      expect(app.items[0].sellIn).toEqual(-1);
      expect(app.items[0].quality).toEqual(12);
    });

    it("should not increase quality above 50", () => {
      const items: Item[] = [new Item("Good Wine", 10, 50)];
      const app: GildedTros = new GildedTros(items);
      app.updateQuality();
      expect(app.items[0].sellIn).toEqual(9);
      expect(app.items[0].quality).toEqual(50);
    });
  });

  describe("B-DAWG Keychain", () => {
    it("should not change quality or sellIn", () => {
      const items: Item[] = [new Item("B-DAWG Keychain", 10, 80)];
      const app: GildedTros = new GildedTros(items);
      app.updateQuality();
      expect(app.items[0].sellIn).toEqual(10);
      expect(app.items[0].quality).toEqual(80);
    });
  });

  describe("Backstage passes", () => {
    it("should decrease sellIn by 1 and increase quality by 1 when sellIn is greater than 10", () => {
      const items: Item[] = [
        new Item("Backstage passes for Re:Factor", 15, 20),
      ];
      const app: GildedTros = new GildedTros(items);
      app.updateQuality();
      expect(app.items[0].sellIn).toEqual(14);
      expect(app.items[0].quality).toEqual(21);
    });

    it("should decrease sellIn by 1 and increase quality by 2 when sellIn is between 6 and 10", () => {
      const items: Item[] = [
        new Item("Backstage passes for Re:Factor", 10, 20),
      ];
      const app: GildedTros = new GildedTros(items);
      app.updateQuality();
      expect(app.items[0].sellIn).toEqual(9);
      expect(app.items[0].quality).toEqual(22);
    });

    it("should decrease sellIn by 1 and increase quality by 3 when sellIn is between 0 and 5", () => {
      const items: Item[] = [new Item("Backstage passes for Re:Factor", 5, 20)];
      const app: GildedTros = new GildedTros(items);
      app.updateQuality();
      expect(app.items[0].sellIn).toEqual(4);
      expect(app.items[0].quality).toEqual(23);
    });

    it("should decrease sellIn by 1 and drop quality to 0 after the event", () => {
      const items: Item[] = [new Item("Backstage passes for Re:Factor", 0, 20)];
      const app: GildedTros = new GildedTros(items);
      app.updateQuality();
      expect(app.items[0].sellIn).toEqual(-1);
      expect(app.items[0].quality).toEqual(0);
    });

    it("should not increase quality above 50", () => {
      const items: Item[] = [new Item("Backstage passes for Re:Factor", 5, 49)];
      const app: GildedTros = new GildedTros(items);
      app.updateQuality();
      expect(app.items[0].sellIn).toEqual(4);
      expect(app.items[0].quality).toEqual(50);
    });
  });
});
