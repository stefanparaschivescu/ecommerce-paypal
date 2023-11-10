import { ProductPrice } from "../../types/types";

export const seller: Array<{ name: string }> = [
    { name: "eMAG" },
    { name: "Flanco" },
    { name: "Altex" },
    { name: "QuickMobile" },
    { name: "iStyle" },
    { name: "MediaGalaxy" },
];

export const country: Array<{ name: string }> = [
    { name: "Romania" },
    { name: "Bulgaria" },
    { name: "USA" },
    { name: "China" },
    { name: "Germany" },
    { name: "France" },
];

export const price: Array<ProductPrice> = [
    { id: 1, name: "any", array: [1, 10000] },
    { id: 2, name: "15 - 25 $", array: [15, 25] },
    { id: 3, name: "25 - 40 $", array: [25, 40] },
    { id: 4, name: "40 - 90 $", array: [40, 90] },
    { id: 5, name: "90 - 175 $", array: [90, 175] },
    { id: 6, name: "250+ $", array: [175, 10000] }
];
