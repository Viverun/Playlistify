import SpotifyWebApi from "spotify-web-api-node";
import { log } from "apify";
import { searchCache, recommendCache } from "./cache";
import { SpotifyTrack, MCPResponse } from "./types";

let spotifyApi: SpotifyWebApi;
let tokenExpiresAt = 0;

export function initializeSpotify(
  clientId: string,
  clientSecret: string,
  refreshToken: string
) {
  spotifyApi = new SpotifyWebApi({
    clientId,
    clientSecret,
  });
  spotifyApi.setRefreshToken(refreshToken);
  log.info("Spotify API initialized");
}



async function ensureAccessToken(): Promise<string> {
  if (!spotifyApi) {
    throw new Error("Spotify API not initialized. Call initializeSpotify() first.");
  }

  // Only refresh if token is expired or about to expire (within 60 seconds)
  if (Date.now() < tokenExpiresAt - 60000) {
    log.debug("Using cached access token");
    return spotifyApi.getAccessToken() || "";
  }


  try {
    const data = await spotifyApi.refreshAccessToken();
    const accessToken = data.body["access_token"];
    const expiresIn = data.body["expires_in"] || 3600;

    spotifyApi.setAccessToken(accessToken);
    tokenExpiresAt = Date.now() + expiresIn * 1000;

    log.info("Spotify access token refreshed", { expiresIn });
    return accessToken;
  } catch (err: any) {
    log.error("Failed to refresh Spotify access token", {
      error: err?.message || err,
    });
    throw new Error(
      `Spotify authentication failed: ${err?.message || "Unknown error"}`
    );
  }
}

/**
 * Search for tracks on Spotify with caching
 */
export async function searchTracks(
  query: string,
  limit = 20
): Promise<MCPResponse> {
  try {
    if (!query || query.trim().length === 0) {
      return {
        status: "error",
        message: "Query parameter is required and cannot be empty",
      };
    }

    const cacheKey = `search:${query}:${limit}`;
    const cached = searchCache.get(cacheKey);
    if (cached) {
      log.info("Returning cached search results", { query });
      return cached;
    }

    await ensureAccessToken();
    const res = await spotifyApi.searchTracks(query, { limit });
    const items = res.body.tracks?.items || [];

    const tracks: SpotifyTrack[] = items.map((t: any) => ({
      id: t.id,
      name: t.name,
      artists: t.artists.map((a: any) => ({ id: a.id, name: a.name })),
      album: { id: t.album.id, name: t.album.name },
      uri: t.uri,
      external_urls: t.external_urls,
      duration_ms: t.duration_ms,
    }));

    const response: MCPResponse = {
      status: "success",
      data: { tracks, count: tracks.length },
      timestamp: new Date().toISOString(),
    };

    searchCache.set(cacheKey, response);
    log.info("Search completed", { query, resultCount: tracks.length });

    return response;
  } catch (err: any) {
    log.error("Search tracks failed", { query, error: err?.message || err });
    return {
      status: "error",
      message: `Search failed: ${err?.message || String(err)}`,
    };
  }
}

/**
 * Get track recommendations with caching
 */
export async function getRecommendations(
  seedArtists?: string[],
  seedGenres?: string[],
  seedTracks?: string[],
  limit = 20
): Promise<MCPResponse> {
  try {
    await ensureAccessToken();

    const params: any = { limit };
    if (seedArtists && seedArtists.length)
      params.seed_artists = seedArtists.slice(0, 5);
    if (seedGenres && seedGenres.length)
      params.seed_genres = seedGenres.slice(0, 5);
    if (seedTracks && seedTracks.length)
      params.seed_tracks = seedTracks.slice(0, 5);

    // Spotify requires at least one seed
    if (!params.seed_artists && !params.seed_genres && !params.seed_tracks) {
      params.seed_genres = ["pop"];
      log.info("No seeds provided, defaulting to pop genre");
    }

    // Create cache key from params
    const cacheKey = `recommend:${JSON.stringify(params)}`;
    const cached = recommendCache.get(cacheKey);
    if (cached) {
      log.info("Returning cached recommendations");
      return cached;
    }

    const res = await spotifyApi.getRecommendations(params);
    const tracks: SpotifyTrack[] = (res.body.tracks || []).map((t: any) => ({
      id: t.id,
      name: t.name,
      artists: t.artists.map((a: any) => ({ id: a.id, name: a.name })),
      album: { id: t.album.id, name: t.album.name },
      uri: t.uri,
      external_urls: t.external_urls,
      duration_ms: t.duration_ms,
    }));

    const response: MCPResponse = {
      status: "success",
      data: { tracks, count: tracks.length, seeds: params },
      timestamp: new Date().toISOString(),
    };

    recommendCache.set(cacheKey, response);
    log.info("Recommendations completed", {
      seedCount: Object.keys(params).length - 1,
      resultCount: tracks.length,
    });

    return response;
  } catch (err: any) {
    log.error("Get recommendations failed", { error: err?.message || err });
    return {
      status: "error",
      message: `Recommendations failed: ${err?.message || String(err)}`,
    };
  }
}

/**
 * Create a playlist and optionally add tracks
 */
export async function createPlaylist(
  userId: string | undefined,
  name: string,
  description: string,
  trackUris: string[],
  isPublic = false
): Promise<MCPResponse> {
  try {
    if (!name || name.trim().length === 0) {
      return {
        status: "error",
        message: "Playlist name is required and cannot be empty",
      };
    }

    await ensureAccessToken();

    const createRes = await spotifyApi.createPlaylist(name, {
      description:
        description || `Created via MCP on ${new Date().toLocaleDateString()}`,
      public: isPublic,
    });

    const playlist = createRes.body;
    log.info("Playlist created", {
      playlistId: playlist.id,
      name: playlist.name,
    });

    // Add tracks if provided
    if (trackUris && trackUris.length > 0) {
      // Spotify API accepts up to 100 tracks per request
      const chunks: string[][] = [];
      for (let i = 0; i < trackUris.length; i += 100) {
        chunks.push(trackUris.slice(i, i + 100));
      }

      for (const chunk of chunks) {
        await spotifyApi.addTracksToPlaylist(playlist.id, chunk);
      }

      log.info("Tracks added to playlist", {
        playlistId: playlist.id,
        trackCount: trackUris.length,
      });
    }

    return {
      status: "success",
      data: {
        playlist: {
          id: playlist.id,
          name: playlist.name,
          description: playlist.description,
          uri: playlist.uri,
          external_urls: playlist.external_urls,
          trackCount: trackUris.length,
        },
      },
      timestamp: new Date().toISOString(),
    };
  } catch (err: any) {
    return {
      status: "error",
      message: `Create playlist failed: ${err?.message || String(err)}`,
    };
  }
}

export default { searchTracks, getRecommendations, createPlaylist, initializeSpotify };

