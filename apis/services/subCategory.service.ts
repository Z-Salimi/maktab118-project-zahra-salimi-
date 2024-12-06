import axios from "axios";
import { urls } from "../urls";

type getSubCategoryByIdType = (id: string) => Promise<ISubCategory>;
export const getSubCategoryById: getSubCategoryByIdType = async (id) => {
  try {
    const response = await axios.get<{ data: ISubCategory }>(
      `${urls.subCategories.byId}/${id}`
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
