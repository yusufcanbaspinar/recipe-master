import axios from 'axios';
import API_BASE_URL from './config';

export async function suggestRecipe(payload: {
  ingredients: string[];
  extra?: string;
  servings?: number;
  calorie_limit?: number;
  max_time?: number;
}) {
  const response = await axios.post(`${API_BASE_URL}/recipes/suggest`, payload);
  return response.data;
}