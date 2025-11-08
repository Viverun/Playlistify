// Type definitions for MCP requests and Spotify data structures

export interface MCPRequest {
  tool: 'search-track' | 'recommend' | 'create-playlist';
  input: Record<string, any>;
}

export interface MCPResponse {
  status: 'success' | 'error';
  data?: any;
  message?: string;
  timestamp?: string;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ id: string; name: string }>;
  album: { id: string; name: string };
  uri: string;
  external_urls: { spotify: string };
  duration_ms: number;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  uri: string;
  external_urls: { spotify: string };
}

export interface SearchTrackInput {
  query: string;
  limit?: number;
}

export interface RecommendInput {
  seedArtists?: string[];
  seedGenres?: string[];
  seedTracks?: string[];
  limit?: number;
}

export interface CreatePlaylistInput {
  name: string;
  description?: string;
  trackUris: string[];
  userId?: string;
  public?: boolean;
}

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export interface NLPPlaylistIntent {
  mood?: string;
  genre?: string;
  activity?: string;
  suggestedSeeds?: {
    genres?: string[];
    artists?: string[];
  };
}
