// Normalized keyboard input. Mobile can be added later with on-screen controls.
export function setupInput(el) {
  const keys = new Set();
  const on = (e) => { keys.add(e.key.toLowerCase()); };
  const off = (e) => { keys.delete(e.key.toLowerCase()); };
  window.addEventListener("keydown", on);
  window.addEventListener("keyup", off);

  // Prevent page scroll on arrows/space when focused inside game.
  el.addEventListener("keydown", (e) => {
    const block = [" ", "arrowup", "arrowdown", "arrowleft", "arrowright"]; if (block.includes(e.key.toLowerCase())) e.preventDefault();
  });

  return {
    keys,
    isDown(k) { return keys.has(k); },
    destroy() { window.removeEventListener("keydown", on); window.removeEventListener("keyup", off); },
  };
}

