/**
 * Simple test suite for Spotify MCP Actor
 * Run with: npm test (after adding test script to package.json)
 */

import { parsePlaylistIntent } from "./nlpHelper";

// Mock test framework (can replace with Jest/Mocha later)
function test(name: string, fn: () => void | Promise<void>): void {
  try {
    const result = fn();
    if (result instanceof Promise) {
      result
        .then(() => console.log(`✓ ${name}`))
        .catch((err) => console.error(`✗ ${name}: ${err.message}`));
    } else {
      console.log(`✓ ${name}`);
    }
  } catch (err: any) {
    console.error(`✗ ${name}: ${err.message}`);
  }
}

function assertEquals(actual: any, expected: any, message?: string): void {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(
      message ||
        `Expected ${JSON.stringify(expected)} but got ${JSON.stringify(actual)}`
    );
  }
}

function assertContains(array: any[], item: any, message?: string): void {
  if (!array.includes(item)) {
    throw new Error(message || `Expected array to contain ${item}`);
  }
}

// NLP Helper Tests
console.log("\n=== NLP Helper Tests ===\n");

test("parsePlaylistIntent detects happy mood", () => {
  const intent = parsePlaylistIntent("create a happy playlist");
  assertEquals(intent.mood, "happy");
  assertContains(intent.suggestedSeeds?.genres || [], "pop");
});

test("parsePlaylistIntent detects workout activity", () => {
  const intent = parsePlaylistIntent("music for my workout");
  assertEquals(intent.activity, "workout");
  assertContains(intent.suggestedSeeds?.genres || [], "rock");
});

test("parsePlaylistIntent detects explicit genres", () => {
  const intent = parsePlaylistIntent("I want some jazz and blues music");
  assertContains(intent.genre?.split(", ") || [], "jazz");
  assertContains(intent.genre?.split(", ") || [], "blues");
});

test("parsePlaylistIntent handles mixed keywords", () => {
  const intent = parsePlaylistIntent("calm study music");
  assertEquals(intent.mood, "calm");
  assertEquals(intent.activity, "study");
});

test("parsePlaylistIntent returns empty for no matches", () => {
  const intent = parsePlaylistIntent("random text with no keywords");
  assertEquals(intent, {});
});

// Cache Tests (basic)
console.log("\n=== Cache Tests ===\n");

test("Cache stores and retrieves values", () => {
  const { SimpleCache } = require("./cache");
  const cache = new SimpleCache(5, 1000);

  cache.set("key1", "value1");
  const value = cache.get("key1");
  assertEquals(value, "value1");
});

test("Cache returns null for missing keys", () => {
  const { SimpleCache } = require("./cache");
  const cache = new SimpleCache(5, 1000);

  const value = cache.get("nonexistent");
  assertEquals(value, null);
});

test("Cache respects max size (LRU)", () => {
  const { SimpleCache } = require("./cache");
  const cache = new SimpleCache(2, 10000);

  cache.set("key1", "value1");
  cache.set("key2", "value2");
  cache.set("key3", "value3"); // Should evict key1

  assertEquals(cache.get("key1"), null, "First key should be evicted");
  assertEquals(cache.get("key2"), "value2", "Second key should exist");
  assertEquals(cache.get("key3"), "value3", "Third key should exist");
});

// Rate Limiter Tests
console.log("\n=== Rate Limiter Tests ===\n");

test("Rate limiter allows requests within limit", () => {
  const { default: RateLimiter } = require("./rateLimiter");
  const limiter = new RateLimiter(10, 5);

  const allowed = limiter.consume(5);
  assertEquals(allowed, true, "Should allow consumption within limit");
});

test("Rate limiter blocks requests exceeding limit", () => {
  const { default: RateLimiter } = require("./rateLimiter");
  const limiter = new RateLimiter(10, 5);

  limiter.consume(10); // Consume all tokens
  const blocked = limiter.consume(1);
  assertEquals(blocked, false, "Should block when limit exceeded");
});

test("Rate limiter refills tokens over time", async () => {
  const { default: RateLimiter } = require("./rateLimiter");
  const limiter = new RateLimiter(10, 100); // Fast refill for testing

  limiter.consume(10); // Consume all
  await new Promise((resolve) => setTimeout(resolve, 150)); // Wait for refill

  const allowed = limiter.consume(5);
  assertEquals(allowed, true, "Should allow after refill");
});

console.log("\n=== All Tests Complete ===\n");
