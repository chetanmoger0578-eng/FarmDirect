import { Farmer, Product } from "../types";

const API_URL = "http://localhost:3000/api";

export const getFarmers = async (): Promise<Farmer[]> => {
    const response = await fetch(`${API_URL}/farmers`);
    if (!response.ok) {
        throw new Error("Failed to fetch farmers");
    }
    return response.json();
};

export const getProducts = async (category?: string): Promise<Product[]> => {
    const url = category && category !== "All"
        ? `${API_URL}/products?category=${encodeURIComponent(category)}`
        : `${API_URL}/products`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    return response.json();
};

export const getFarmerById = async (id: string): Promise<Farmer> => {
    const response = await fetch(`${API_URL}/farmers/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch farmer");
    }
    return response.json();
};
