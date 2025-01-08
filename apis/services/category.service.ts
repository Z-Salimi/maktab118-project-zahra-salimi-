import axios from "axios";
import { urls } from "../urls";

type getCategoryByIdType = (id: string) => Promise<ICategory>;
export const getCategoryById: getCategoryByIdType = async (id) => {
  try {
    const response = await axios.get<{ data: ICategory }>(
      `${urls.categories.All}/${id}`
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching category:", error.response?.data);
    } else {
      console.error("Unknown error:", error);
    }
    throw new Error("Failed to fetch category");
  }
};

export const getCategoryList = async (
  page = 1,
  limit = 10
): Promise<{ categories: ICategory[]; total: number }> => {
  try {
    const response = await axios.get(urls.categories.All, {
      params: { page, limit },
    });
    const categories = response.data.data.categories;
    const total = response.data.total;
    return { categories, total };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching categories:", error.response?.data);
    } else {
      console.error("Unknown error:", error);
    }
    throw new Error("Failed to fetch categories");
  }
};
