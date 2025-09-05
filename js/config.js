// Game-wide constants and emoji sets.
export const EMOJIS = {
  wizard: "🧙‍♂️",
  animals: ["🐑","🐷","🐄","🐔","🐺","🦊","🐍"],
  food: ["🍗","🍖","🍔","🥩","🍎","🥐"],
  projectiles: { fire: "🔥", ice: "❄️", electric: "⚡", star: "⭐" },
};

export const ELEMENTS = ["fire", "ice", "electric", "star"]; // order used for cycling

export const SETTINGS = {
  playfieldPadding: 12,
  wizard: { speed: 180, size: 28, fireCooldown: 0.35, damage: 1, projCount: 1 },
  enemy: { speed: 60, size: 28, hp: 2, spawnEvery: [0.9, 1.8] },
  projectile: { speed: 360, size: 22, life: 1.4 },
  pickup: { size: 24, life: 12 },
  xp: { perPickup: 12, baseToLevel: 50, growth: 1.2 },
};
