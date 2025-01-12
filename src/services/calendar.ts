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
      categoryE: category,
      colorType,
      date,
      detailFood,
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getCalendarByDate = async (date: string) => {
  return await api.get(`/api/calendar/daily?date=${date}`);
};

export const getMontlyCalendar = async (month: number, year: number) => {
  return await api.get(`/api/calendar/monthly?month=${month}&year=${year}`);
};
