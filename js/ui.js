// HUD + panel toggling. DOM-only to keep it simple.
export function setupUI({ onToggle, onCycleElement }) {
  const toggleBtn = document.getElementById("togglePanel");
  const cycleBtn = document.getElementById("cycleElement");
  const layout = document.getElementById("layout");

  toggleBtn.onclick = () => {
    layout.classList.toggle("collapsed");
    const expanded = !layout.classList.contains("collapsed");
    toggleBtn.setAttribute("aria-expanded", String(expanded));
    onToggle?.(expanded);
  };

  cycleBtn.onclick = () => onCycleElement?.();

  return {
    writeHUD({ hp, level, sp, element, score, xpPct }) {
      document.getElementById("hp").textContent = Math.max(0, hp).toString();
      document.getElementById("level").textContent = level.toString();
      document.getElementById("sp").textContent = sp.toString();
      document.getElementById("element").textContent = element[0].toUpperCase() + element.slice(1);
      document.getElementById("score").textContent = score.toString();
      document.getElementById("xpfill").style.width = xpPct + "%";
    }
  };
}

