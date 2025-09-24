import { describe, expect, test } from "@jest/globals";
import { toPrice } from "./toPrice";

describe("toPrice", () => {
  describe("converts european continental forma", () => {
    test("1.234,56 €", () => expect(toPrice("1.234,56 €")).toBe(1234.56));
    test("1 234,56 €", () => expect(toPrice("1 234,56 €")).toBe(1234.56));
    test("1234,56 €", () => expect(toPrice("1234,56 €")).toBe(1234.56));
    test("1.234,5 €", () => expect(toPrice("1.234,5 €")).toBe(1234.5));
    test("1.234,€", () => expect(toPrice("1.234,€")).toBe(1234));
    test("1 234,€", () => expect(toPrice("1 234,€")).toBe(1234));
    test("1234,€", () => expect(toPrice("1234,€")).toBe(1234));

    test("1.234,56", () => expect(toPrice("1.234,56")).toBe(1234.56));
    test("1 234,56", () => expect(toPrice("1 234,56")).toBe(1234.56));
    test("1234,56", () => expect(toPrice("1234,56")).toBe(1234.56));
    test("1.234,5", () => expect(toPrice("1.234,5")).toBe(1234.5));
    test("1.234,", () => expect(toPrice("1.234,")).toBe(1234));
    test("1 234,", () => expect(toPrice("1 234,")).toBe(1234));
    test("1234", () => expect(toPrice("1234,")).toBe(1234));
  });

  describe("converts US format with dot", () => {
    test("$1,234.56", () => expect(toPrice("$1,234.56")).toBe(1234.56));
    test("$1,234.5", () => expect(toPrice("$1,234.5")).toBe(1234.5));
    test("$1,234.00", () => expect(toPrice("$1,234.00")).toBe(1234));
    test("$1234.56", () => expect(toPrice("$1234.56")).toBe(1234.56));
    test("$1234.5", () => expect(toPrice("$1234.5")).toBe(1234.5));
    test("$1234.00", () => expect(toPrice("$1234.00")).toBe(1234));

    test("1,234.56", () => expect(toPrice("1,234.56")).toBe(1234.56));
    test("1,234.5", () => expect(toPrice("1,234.5")).toBe(1234.5));
    test("1,234.00", () => expect(toPrice("1,234.00")).toBe(1234));
    test("1234.56", () => expect(toPrice("1234.56")).toBe(1234.56));
    test("1234.5", () => expect(toPrice("1234.5")).toBe(1234.5));
    test("1234.00", () => expect(toPrice("1234.00")).toBe(1234));
  });

  describe("handles edge cases", () => {
    test("€0,99", () => expect(toPrice("€0,99")).toBe(0.99));
    test("$0.99", () => expect(toPrice("$0.99")).toBe(0.99));
    test("1,234", () => expect(toPrice("1,234")).toBe(1234));
    test("1.234", () => expect(toPrice("1.234")).toBe(1.234));
  });
});
