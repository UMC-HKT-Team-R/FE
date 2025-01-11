import { FoodType } from "@/constants/food-type";
import { api } from "./api";

export const createCalendar = async (
  data: FormData,
  category: string,
  colorType: FoodType,
  date: string,
  detailFood: string
) => {
  return await api.post(`/api/calendar`, data, {
    params: {
      category,
      colorType,
      date,
      detailFood,
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
