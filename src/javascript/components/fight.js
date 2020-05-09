import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    let pressed = new Set();

    const firstHealthBar = document.getElementById('left-fighter-indicator');
    const secondHealthBar = document.getElementById('right-fighter-indicator');

    const firstHealth = firstFighter.health;
    const secondHealth = secondFighter.health;

    document.addEventListener('keydown', function (event) {
      // First attack
      if (
        event.code === controls.PlayerOneAttack &&
        !pressed.has(controls.PlayerOneBlock) &&
        !pressed.has(controls.PlayerTwoBlock) &&
        !event.repeat
      ) {
        Hit(firstFighter, secondFighter, secondHealth, secondHealthBar);
        if (secondFighter.health <= 0) resolve(firstFighter);
      }

      // Second attack
      if (
        event.code === controls.PlayerTwoAttack &&
        !pressed.has(controls.PlayerTwoBlock) &&
        !pressed.has(controls.PlayerOneBlock) &&
        !event.repeat
      ) {
        Hit(secondFighter, firstFighter, firstHealth, firstHealthBar);
        if (firstFighter.health <= 0) resolve(secondFighter);
      }

      // First block
      if (event.code === controls.PlayerOneBlock && !event.repeat) {
        pressed.add(event.code);
      }

      // Second block
      if (event.code === controls.PlayerTwoBlock && !event.repeat) {
        pressed.add(event.code);
      }

      // // First crit
      // if (event.code === controls.)
    });
    document.addEventListener('keyup', function (event) {
      if (event.code === controls.PlayerOneBlock || event.code === controls.PlayerTwoBlock) {
        pressed.delete(event.code);
      }
    });
  });
}

export function getDamage(attacker, defender) {
  const damage = getHitPower(attacker) - getBlockPower(defender);
  return damage < 0 ? 0 : damage;
}

export function getHitPower(fighter) {
  const attack = fighter.attack;
  const criticalHitChance = 1 + Math.random();
  const power = attack * criticalHitChance;
  return power;
}

export function getBlockPower(fighter) {
  const defense = fighter.defense;
  const dodgeChance = 1 + Math.random();
  const power = defense * dodgeChance;
  return power;
}

export function Hit(attacker, defender, fullHealth, healthBar) {
  defender.health -= getDamage(attacker, defender);
  const percentHealth = defender.health > 0 ? Math.floor((defender.health / fullHealth) * 100) : 0;
  healthBar.style.width = `${percentHealth}%`;
}
