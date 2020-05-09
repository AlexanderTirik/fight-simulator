import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    let pressed = new Set();

    const firstHealthBar = document.getElementById('left-fighter-indicator');
    const secondHealthBar = document.getElementById('right-fighter-indicator');

    const firstHealth = firstFighter.health;
    const secondHealth = secondFighter.health;

    document.addEventListener('keydown', function (event) {
      if (
        event.code === controls.PlayerOneAttack &&
        !pressed.has(controls.PlayerOneBlock) &&
        !pressed.has(controls.PlayerTwoBlock) &&
        !event.repeat
      ) {
        secondFighter.health -= getDamage(firstFighter, secondFighter);
        const secondPercentHealth =
          secondFighter.health > 0 ? Math.floor((secondFighter.health / secondHealth) * 100) : 0;
        secondHealthBar.style.width = `${secondPercentHealth}%`;
        if (secondFighter.health <= 0) resolve(firstFighter)
      }

      if (
        event.code === controls.PlayerTwoAttack &&
        !pressed.has(controls.PlayerTwoBlock) &&
        !pressed.has(controls.PlayerOneBlock) &&
        !event.repeat
      ) {
        firstFighter.health -= getDamage(secondFighter, firstFighter);
        const firstPercentHealth = firstFighter.health > 0 ? Math.floor((firstFighter.health / firstHealth) * 100) : 0;
        firstHealthBar.style.width = `${firstPercentHealth}%`;
        if (firstFighter.health <= 0) resolve(secondFighter)
      }

      if (event.code === controls.PlayerOneBlock && !event.repeat) {
        pressed.add(event.code);
      }

      if (event.code === controls.PlayerTwoBlock && !event.repeat) {
        pressed.add(event.code);
      }
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
