const GIST_FILENAME = "techmate-favorites.json";
const GIST_DESCRIPTION = "TechMate Blog Favorites";

interface FavoritesData {
  favorites: string[];
}

interface GistFile {
  filename: string;
  content: string;
}

interface GistItem {
  id: string;
  description: string;
  files: Record<string, GistFile>;
}

async function getGist(accessToken: string): Promise<{ id: string; data: FavoritesData } | null> {
  try {
    const res = await fetch("https://api.github.com/gists", {
      headers: { Authorization: `Bearer ${accessToken}`, Accept: "application/vnd.github.v3+json" },
    });
    if (!res.ok) {
      console.error("[getGist] GitHub API error:", res.status, res.statusText);
      return null;
    }
    const gists: GistItem[] = await res.json();
    const gist = gists.find((g) => g.description === GIST_DESCRIPTION && g.files[GIST_FILENAME]);
    if (!gist) return null;
    const content = JSON.parse(gist.files[GIST_FILENAME].content);
    return { id: gist.id, data: content };
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

export async function getFavorites(accessToken: string): Promise<string[]> {
  const gist = await getGist(accessToken);
  return gist ? gist.data.favorites : [];
}

export async function toggleFavorite(accessToken: string, slug: string): Promise<boolean> {
  const gist = await getGist(accessToken);
  const favorites: string[] = gist ? gist.data.favorites : [];
  const index = favorites.indexOf(slug);
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(slug);
  }
  const data: FavoritesData = { favorites };
  let success = false;
  if (gist) {
    success = await updateGist(accessToken, gist.id, data);
  } else {
    const newId = await createGist(accessToken, data);
    success = !!newId;
  }
  // Only return the toggled state if the save was successful
  if (!success) {
    console.error("[toggleFavorite] Failed to save favorites to Gist");
    // Revert — return current state (not toggled)
    return index > -1; // was favorited, remove failed, still favorited
  }
  return index === -1; // returns true if added, false if removed
}
