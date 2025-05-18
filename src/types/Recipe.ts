export type Recipe = {
  id: string;
  ingredients: string[];
  feature?: string;
  createdAt: string; // ISO string
  result: string;    // AI cevabı veya tarif metni
};