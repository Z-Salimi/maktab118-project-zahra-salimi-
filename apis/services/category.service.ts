import axios from "axios";
import { urls } from "../urls";

type getCategoryByIdType = (id: string) => Promise<ICategory>;
export const getCategoryById: getCategoryByIdType = async (id) => {
  try {
    const response = await axios.get<{ data: ICategory }>(
      `${urls.categories.byId}/${id}`
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
