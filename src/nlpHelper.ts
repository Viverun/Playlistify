import { log } from 'apify';
import { NLPPlaylistIntent } from './types';

/**
 * Optional NLP helper for interpreting natural language playlist requests
 * Can integrate with OpenAI, Gemini, or other LLM services
 * 
 * Example: "Create a mellow Sunday morning playlist" 
 * -> { mood: 'mellow', activity: 'morning', suggestedSeeds: { genres: ['acoustic', 'folk'] } }
 */

// Mood to genre mappings
const MOOD_GENRE_MAP: Record<string, string[]> = {
  happy: ['pop', 'dance', 'funk'],
  sad: ['blues', 'indie', 'acoustic'],
  energetic: ['electronic', 'rock', 'metal'],
  calm: ['ambient', 'classical', 'chill'],
  mellow: ['folk', 'acoustic', 'jazz'],
  romantic: ['r-n-b', 'soul', 'romance'],
  party: ['dance', 'edm', 'hip-hop'],
  focus: ['classical', 'ambient', 'study'],
  workout: ['rock', 'metal', 'electronic'],
};

const ACTIVITY_GENRE_MAP: Record<string, string[]> = {
  morning: ['acoustic', 'folk', 'indie'],
  night: ['electronic', 'ambient', 'chill'],
  workout: ['rock', 'electronic', 'metal'],
  study: ['classical', 'ambient', 'lo-fi'],
  party: ['dance', 'hip-hop', 'pop'],
  sleep: ['ambient', 'classical', 'chill'],
  driving: ['rock', 'pop', 'country'],
};

/**
 * Parse natural language intent without calling external APIs
 * Simple keyword matching approach
 */
export function parsePlaylistIntent(description: string): NLPPlaylistIntent {
  const lower = description.toLowerCase();
  const intent: NLPPlaylistIntent = {};

  // Detect mood keywords
  for (const [mood, genres] of Object.entries(MOOD_GENRE_MAP)) {
    if (lower.includes(mood)) {
      intent.mood = mood;
      intent.suggestedSeeds = { genres };
      break;
    }
  }

  // Detect activity keywords
  for (const [activity, genres] of Object.entries(ACTIVITY_GENRE_MAP)) {
    if (lower.includes(activity)) {
      intent.activity = activity;
      if (!intent.suggestedSeeds) {
        intent.suggestedSeeds = { genres };
      } else {
        // Merge genres
        intent.suggestedSeeds.genres = [
          ...(intent.suggestedSeeds.genres || []),
          ...genres,
        ].slice(0, 5);
      }
      break;
    }
  }

  // Detect explicit genre mentions
  const commonGenres = ['rock', 'pop', 'jazz', 'classical', 'electronic', 'hip-hop', 'country', 'metal', 'indie', 'folk'];
  const detectedGenres: string[] = [];
  for (const genre of commonGenres) {
    if (lower.includes(genre)) {
      detectedGenres.push(genre);
    }
  }
  if (detectedGenres.length > 0) {
    intent.genre = detectedGenres.join(', ');
    if (!intent.suggestedSeeds) {
      intent.suggestedSeeds = { genres: detectedGenres.slice(0, 5) };
    }
  }

  log.info('Parsed NLP intent', { description, intent });
  return intent;
}

/**
 * Optional: Call OpenAI/Gemini for more sophisticated NLP
 * Requires API key in environment (OPENAI_API_KEY or GOOGLE_API_KEY)
 */
export async function parsePlaylistIntentWithLLM(description: string): Promise<NLPPlaylistIntent> {
  // Placeholder for LLM integration
  // You can implement this using OpenAI SDK or Google Generative AI
  
  log.info('LLM-based NLP not yet implemented, falling back to keyword matching');
  return parsePlaylistIntent(description);
}

export default {
  parsePlaylistIntent,
  parsePlaylistIntentWithLLM,
};
