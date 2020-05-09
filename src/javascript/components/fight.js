import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    let pressed = new Set();

    const firstHealthBar = document.getElementById('left-fighter-indicator');
    const secondHealthBar = document.getElementById('right-fighter-indicator');

    const firstHealth = firstFighter.health;
    const secondHealth = secondFighter.health;

    document.addEventListener('keydown', function (event) {
      pressed.add(event.code);

      // First attack
      if (
        event.code === controls.PlayerOneAttack &&
        !pressed.has(controls.PlayerOneBlock) &&
        !pressed.has(controls.PlayerTwoBlock) &&
        !event.repeat
      ) {
        Hit(firstFighter, secondFighter, secondHealth, secondHealthBar);
      }

      // Second attack
      if (
        event.code === controls.PlayerTwoAttack &&
        !pressed.has(controls.PlayerTwoBlock) &&
        !pressed.has(controls.PlayerOneBlock) &&
        !event.repeat
      ) {
        Hit(secondFighter, firstFighter, firstHealth, firstHealthBar);
      }

      if (controls.PlayerOneCriticalHitCombination.every((code) => pressed.has(code))) {
        Hit(firstFighter, secondFighter, secondHealth, secondHealthBar, true);
      }

      if (controls.PlayerTwoCriticalHitCombination.every((code) => pressed.has(code))) {
        Hit(secondFighter, firstFighter, firstHealth, firstHealthBar, true);
      }

      if (secondFighter.health <= 0) resolve(firstFighter);
      if (firstFighter.health <= 0) resolve(secondFighter);
    });

    document.addEventListener('keyup', function (event) {
      pressed.delete(event.code);
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

export function Hit(attacker, defender, fullHealth, healthBar, isCrit = false) {
  if (isCrit) {
    defender.health -= attacker.attack * 2;
  } else {
    defender.health -= getDamage(attacker, defender);
  }
  const percentHealth = defender.health > 0 ? Math.floor((defender.health / fullHealth) * 100) : 0;
  healthBar.style.width = `${percentHealth}%`;
}
