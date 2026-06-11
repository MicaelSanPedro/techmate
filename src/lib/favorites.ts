import { getFavoritesFromDB, saveFavoritesToDB } from "./db";

const GIST_FILENAME = "techmate-favorites.json";
const GIST_DESCRIPTION = "TechMate Blog Favorites";

interface FavoritesData {
  favorites: string[];
}

interface GistFile {
  filename: string;
  content: string | null;
}

interface GistListItem {
  id: string;
  description: string;
  files: Record<string, GistFile>;
}

/**
 * Find our TechMate gist ID from the list API.
 */
async function findGistId(accessToken: string): Promise<string | null> {
  const res = await fetch("https://api.github.com/gists?per_page=100", {
    headers: { Authorization: `Bearer ${accessToken}`, Accept: "application/vnd.github.v3+json" },
  });
  if (!res.ok) {
    console.error("[findGistId] GitHub API error:", res.status, res.statusText);
    return null;
  }
  const gists: GistListItem[] = await res.json();
  const gist = gists.find(
    (g) => g.description === GIST_DESCRIPTION && g.files[GIST_FILENAME]
  );
  return gist?.id || null;
}

/**
 * Fetch a single gist by ID — this returns file content.
 */
async function fetchGistById(accessToken: string, gistId: string): Promise<{ id: string; data: FavoritesData } | null> {
  const res = await fetch(`https://api.github.com/gists/${gistId}`, {
    headers: { Authorization: `Bearer ${accessToken}`, Accept: "application/vnd.github.v3+json" },
  });
  if (!res.ok) {
    console.error("[fetchGistById] GitHub API error:", res.status, res.statusText);
    return null;
  }
  const gist: GistListItem = await res.json();
  const file = gist.files[GIST_FILENAME];
  if (!file?.content) {
    console.error("[fetchGistById] File found but content is null/empty");
    return null;
  }
  try {
    const data: FavoritesData = JSON.parse(file.content);
    return { id: gist.id, data };
  } catch (error) {
    console.error("[fetchGistById] Failed to parse JSON:", error);
    return null;
  }
}

/**
 * Find our gist and fetch its content.
 */
async function getGist(accessToken: string): Promise<{ id: string; data: FavoritesData } | null> {
  try {
    const gistId = await findGistId(accessToken);
    if (!gistId) return null;
    return await fetchGistById(accessToken, gistId);
  } catch (error) {
    console.error("[getGist] Error:", error);
    return null;
  }
}

async function createGist(accessToken: string, data: FavoritesData): Promise<string | null> {
  try {
    const res = await fetch("https://api.github.com/gists", {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, Accept: "application/vnd.github.v3+json" },
      body: JSON.stringify({
        description: GIST_DESCRIPTION,
        public: false,
        files: { [GIST_FILENAME]: { content: JSON.stringify(data) } },
      }),
    });
    if (!res.ok) {
      console.error("[createGist] GitHub API error:", res.status, res.statusText);
      return null;
    }
    const gist = await res.json();
    return gist.id;
  } catch (error) {
    console.error("[createGist] Error:", error);
    return null;
  }
}

async function updateGist(accessToken: string, gistId: string, data: FavoritesData): Promise<boolean> {
  try {
    const res = await fetch(`https://api.github.com/gists/${gistId}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${accessToken}`, Accept: "application/vnd.github.v3+json" },
      body: JSON.stringify({
        files: { [GIST_FILENAME]: { content: JSON.stringify(data) } },
      }),
    });
    return res.ok;
  } catch (error) {
    console.error("[updateGist] Error:", error);
    return false;
  }
}

// ─── UNIFIED FAVORITES SYSTEM ───

export async function getFavorites(user: { provider?: string; accessToken?: string; email?: string }): Promise<string[]> {
  if (user.provider === "github" && user.accessToken) {
    const gist = await getGist(user.accessToken);
    return gist ? gist.data.favorites : [];
  } 
  
  if (user.provider === "google" && user.email) {
    return await getFavoritesFromDB(user.email);
  }

  return [];
}

export async function toggleFavorite(user: { provider?: string; accessToken?: string; email?: string }, slug: string): Promise<boolean> {
  const favorites = await getFavorites(user);
  const index = favorites.indexOf(slug);
  
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(slug);
  }

  const isFavorite = index === -1;

  if (user.provider === "github" && user.accessToken) {
    const gist = await getGist(user.accessToken);
    const data = { favorites };
    if (gist) {
      await updateGist(user.accessToken, gist.id, data);
    } else {
      await createGist(user.accessToken, data);
    }
    return isFavorite;
  }

  if (user.provider === "google" && user.email) {
    await saveFavoritesToDB(user.email, favorites);
    return isFavorite;
  }

  return isFavorite;
}
