import axios from "axios";
import { urls } from "../urls";

type getSubCategoryByIdType = (id: string) => Promise<ISubCategory>;
export const getSubCategoryById: getSubCategoryByIdType = async (id) => {
  try {
    const response = await axios.get<{ data: ISubCategory }>(
      `${urls.subCategories.All}/${id}`
    );
    console.log("Response:", response.data.data);
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

export const getSubCategoryList = async (
  page = 1,
  limit = 10
): Promise<{ subCategories: ISubCategory[]; total: number }> => {
  try {
    const response = await axios.get(urls.subCategories.All, {
      params: { page, limit },
    });
    const subCategories = response.data.data.subcategories;
    console.log('subbbb', subCategories);
    
    const total = response.data.total;
    return { subCategories, total };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching categories:", error.response?.data);
    } else {
      console.error("Unknown error:", error);
    }
    throw new Error("Failed to fetch categories");
  }
};