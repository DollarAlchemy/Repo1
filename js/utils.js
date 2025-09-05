// Small helpers kept here to avoid clutter elsewhere.
export const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
export const rand = (a, b) => a + Math.random() * (b - a);
export const choice = (arr) => arr[(Math.random() * arr.length) | 0];
export const dist2 = (a, b) => {
  const dx = a.x - b.x, dy = a.y - b.y; return dx*dx + dy*dy;
};
export const uid = (() => { let i = 0; return () => (++i).toString(36); })();

