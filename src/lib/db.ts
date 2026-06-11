import { kv } from "@vercel/kv";

/**
 * Persistência real usando Vercel KV (Redis).
 * Chave: user:favorites:{email}
 * Valor: Array de strings (slugs)
 */

export async function getFavoritesFromDB(email: string): Promise<string[]> {
  try {
    const favorites = await kv.get<string[]>(`user:favorites:${email}`);
    return favorites || [];
  } catch (error) {
    console.error("[KV] Erro ao buscar favoritos:", error);
    return [];
  }
}

export async function saveFavoritesToDB(email: string, slugs: string[]): Promise<boolean> {
  try {
    await kv.set(`user:favorites:${email}`, slugs);
    return true;
  } catch (error) {
    console.error("[KV] Erro ao salvar favoritos:", error);
    return false;
  }
}
