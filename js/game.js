import { SETTINGS, ELEMENTS } from "./config.js";
import { rand, clamp, choice, dist2 } from "./utils.js";
import { Wizard, Enemy, Projectile, Pickup } from "./entities.js";

export class Game {
  constructor(rootEl) {
    this.root = rootEl; this.bounds = rootEl.getBoundingClientRect();
    this.entities = new Map(); this.enemies = []; this.projectiles = []; this.pickups = [];
    this.effects = { iceSlow: 0, chainChance: 0, starNova: false };
    this.state = { score: 0, xp: 0, level: 1, skillPoints: 0, nextLevelAt: SETTINGS.xp.baseToLevel };
    this.wizard = new Wizard(this.bounds.width/2, this.bounds.height/2);
    this.add(this.wizard);

    this.spawnTimer = 0; this.keys = null; this.elementIndex = 0;
  }

  setInput(keys) { this.keys = keys; }

  add(e) { e.mount(this.root); this.entities.set(e.id, e); return e; }
  remove(e) { e.dead = true; e.unmount(); this.entities.delete(e.id); }

  size() { this.bounds = this.root.getBoundingClientRect(); return this.bounds; }

  cycleElement() {
    this.elementIndex = (this.elementIndex + 1) % ELEMENTS.length;
    this.wizard.element = ELEMENTS[this.elementIndex];
  }

  moveWizard(dt) {
    const w = this.wizard; if (!this.keys) return;
    let ax = 0, ay = 0;
    if (this.keys.isDown("arrowleft") || this.keys.isDown("a")) ax -= 1;
    if (this.keys.isDown("arrowright") || this.keys.isDown("d")) ax += 1;
    if (this.keys.isDown("arrowup") || this.keys.isDown("w")) ay -= 1;
    if (this.keys.isDown("arrowdown") || this.keys.isDown("s")) ay += 1;

    const sp = w.stats.speed; const len = Math.hypot(ax, ay) || 1;
    w.x = clamp(w.x + (ax/len) * sp * dt, SETTINGS.playfieldPadding, this.bounds.width - SETTINGS.playfieldPadding);
    w.y = clamp(w.y + (ay/len) * sp * dt, SETTINGS.playfieldPadding, this.bounds.height - SETTINGS.playfieldPadding);
  }

  tryFire(dt) {
    const w = this.wizard; w.cool -= dt;
    if (!(this.keys?.isDown(" ") || this.keys?.isDown("space"))) return;
    if (w.cool > 0) return;
    w.cool = w.stats.fireCooldown;
    const shots = Math.max(1, w.stats.projCount);
    const spread = Math.min(Math.PI/5, 0.2 * (shots-1));
    const baseAngle = Math.atan2(0,1); // right
    for (let i=0;i<shots;i++) {
      const t = shots === 1 ? 0 : -spread + (2*spread) * (i/(shots-1));
      const angle = baseAngle + t;
      const vx = Math.cos(angle) * SETTINGS.projectile.speed;
      const vy = Math.sin(angle) * SETTIN
