// Tiny skill-tree with flat nodes. Each node grants an upgrade once.
import { ELEMENTS } from "./config.js";

const makeNode = (id, title, desc, branch, apply) => ({ id, title, desc, branch, apply, taken: false });

export function createSkillTree(mountEl, onSpend) {
  const nodes = [
    makeNode("fire-dmg", "Fire • Burn Up", "+1 damage to 🔥", "Fire", (g) => { g.wizard.stats.damage += 1; }),
    makeNode("fire-rate", "Fire • Quick Cast", "-10% 🔥 cooldown", "Fire", (g) => { g.wizard.stats.fireCooldown *= 0.9; }),
    makeNode("ice-slow", "Ice • Chill", "Ice slows enemies (mild)", "Ice", (g) => { g.effects.iceSlow = Math.min(0.6, (g.effects.iceSlow||0)+0.15); }),
    makeNode("ice-rate", "Ice • Crisp Bolts", "+1 projectile on ❄️", "Ice", (g) => { g.wizard.stats.projCount += 1; }),
    makeNode("elec-chain", "Electric • Chain", "Small chance to arc ⚡", "Electric", (g) => { g.effects.chainChance = Math.min(.5, (g.effects.chainChance||0)+.12); }),
    makeNode("elec-speed", "Electric • Swift", "+10% move speed", "Electric", (g) => { g.wizard.stats.speed *= 1.1; }),
    makeNode("star-multi", "Star • Constellation", "+1 projectile on ⭐", "Star", (g) => { g.wizard.stats.projCount += 1; }),
    makeNode("star-ult", "Star • Nova", "Unlocks rare nova proc", "Star", (g) => { g.effects.starNova = true; }),
  ];

  render(nodes, mountEl, onSpend);

  return {
    nodes,
    trySpend(id, game) {
      const n = nodes.find(x => x.id === id);
      if (!n || n.taken || game.state.skillPoints <= 0) return false;
      n.taken = true; n.apply(game); game.state.skillPoints -= 1; onSpend?.(); return true;
    }
  };
}

function render(nodes, mountEl, onSpend) {
  mountEl.innerHTML = "";
  const branches = Array.from(new Set(nodes.map(n => n.branch)));
  for (const b of branches) {
    const h = document.createElement("div"); h.className = "branch"; h.textContent = b; mountEl.appendChild(h);
    for (const n of nodes.filter(n => n.branch === b)) {
      const d = document.createElement("div"); d.className = "node"; d.dataset.id = n.id;
      d.innerHTML = `<h4>${n.title}</h4><div class="desc">${n.desc}</div>`;
      const actions = document.createElement("div"); actions.className = "actions";
      const btn = document.createElement("button"); btn.textContent = "+1";
      const badge = document.createElement("span"); badge.className = "badge"; badge.textContent = "Unspent";
      actions.append(btn, badge); d.appendChild(actions); mountEl.appendChild(d);
      btn.onclick = () => onSpend?.(n.id);
      n._badge = badge; n._btn = btn;
    }
  }
}

export function refreshSkillBadges(tree, game) {
  for (const n of tree.nodes) {
    n._badge.textContent = n.taken ? "Taken" : (game.state.skillPoints > 0 ? "Ready" : "Need SP");
    n._btn.disabled = n.taken || game.state.skillPoints <= 0;
  }
}
