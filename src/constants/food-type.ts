export const FOOD_TYPE = {
  WHITE: "WHITE" as const,
  BLACK: "BLACK" as const,
};

export type FoodType = keyof typeof FOOD_TYPE;
