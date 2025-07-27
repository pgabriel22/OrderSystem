// src/constants/dishConstants.js

export const DISH_TYPES = {
  MAIN: 0,
  SECOND: 1,
  ADDONS: 2,
};

export const DISH_TYPE_LABELS = {
  [DISH_TYPES.MAIN]: "Main Dish",
  [DISH_TYPES.SECOND]: "Side/Second Dish",
  [DISH_TYPES.ADDONS]: "Add-ons",
};

export const DISH_TYPE_OPTIONS = [
  { value: DISH_TYPES.MAIN, label: "Main Dish" },
  { value: DISH_TYPES.SECOND, label: "Side/Second Dish" },
  { value: DISH_TYPES.ADDONS, label: "Add-ons" },
];
