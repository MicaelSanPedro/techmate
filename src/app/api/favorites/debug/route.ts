import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  const result: Record<string, unknown> = {};

  result.hasSession = !!session;
  result.hasUser = !!session?.user;
  result.hasAccessToken = !!session?.user?.accessToken;
  result.userName = session?.user?.name || null;
  result.userLogin = session?.user?.login || null;
  result.userEmail = session?.user?.email || null;
  result.accessTokenPrefix = session?.user?.accessToken ? session.user.accessToken.substring(0, 8) + "..." : null;

  // Try to list gists
  if (session?.user?.accessToken) {
    try {
      const gistRes = await fetch("https://api.github.com/gists?per_page=100", {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      result.gistListStatus = gistRes.status;
      result.gistListOk = gistRes.ok;

      if (gistRes.ok) {
        const gists: Array<{ id: string; description: string; files: Record<string, unknown> }> = await gistRes.json();
        result.totalGists = gists.length;

        // Find our gist
        const ourGist = gists.find(
          (g) => g.description === "TechMate Blog Favorites" && g.files["techmate-favorites.json"]
        );

        result.foundOurGist = !!ourGist;
        if (ourGist) {
          result.ourGistId = ourGist.id;
          result.ourGistDescription = ourGist.description;
          const file = ourGist.files["techmate-favorites.json"] as { content?: string };
          result.ourGistFileContent = file?.content || null;
        } else {
          result.allGistDescriptions = gists.map((g) => g.description);
        }

        // Also try with a raw token scope check
        const scopesRes = await fetch("https://api.github.com/user", {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        });
        if (scopesRes.ok) {
          result.tokenScopes = scopesRes.headers.get("X-OAuth-Scopes") || "none";
        }
      }
    } catch (error) {
      result.gistError = error instanceof Error ? error.message : String(error);
    }
  }

  return NextResponse.json(result, {
    headers: { "Content-Type": "application/json" },
  });
}
