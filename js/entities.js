import { EMOJIS } from "./config.js";
import { uid } from "./utils.js";

// DOM-backed entities. DOM is simpler than canvas and fits emoji gameplay.
class Entity {
  constructor(x, y, type, cls, emoji) {
    this.id = uid();
    this.x = x; this.y = y; this.vx = 0; this.vy = 0; this.type = type; this.dead = false;
    this.dom = document.createElement("div");
    this.dom.className = `actor ${cls}`;
    this.dom.textContent = emoji;
  }
  mount(parent) { parent.appendChild(this.dom); }
  unmount() { this.dom.remove(); }
  draw() { this.dom.style.left = `${this.x}px`; this.dom.style.top = `${this.y}px`; }
}

export class Wizard extends Entity {
  constructor(x, y) {
    super(x, y, "wizard", "wizard", EMOJIS.wizard);
    this.hp = 100; this.element = "fire";
    this.stats = { speed: 180, fireCooldown: 0.35, damage: 1, projCount: 1 };
    this.cool = 0;
  }
}

export class Enemy extends Entity {
  constructor(x, y) {
    super(x, y, "enemy", "enemy", EMOJIS.animals[(Math.random()*EMOJIS.animals.length)|0]);
    this.hp = 2;
  }
}

export class Projectile extends Entity {
  constructor(x, y, vx, vy, element) {
    super(x, y, "projectile", "projectile", EMOJIS.projectiles[element]);
    this.vx = vx; this.vy = vy; this.life = 1.4; this.element = element; this.damage = 1;
  }
}

export class Pickup extends Entity {
  constructor(x, y) {
    super(x, y, "pickup", "pickup", EMOJIS.food[(Math.random()*EMOJIS.food.length)|0]);
    this.life = 12;
  }
}
