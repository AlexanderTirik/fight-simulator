import { controls } from '../../constants/controls';
import { fighters } from '../helpers/mockData';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    let pressed = new Set();

    const leftFighter = createCombatFighter(firstFighter, 'left');
    const rightFighter = createCombatFighter(secondFighter, 'right');

    function keyDown(event) {
      if (!event.repat) pressed.add(event.code);

      // First attack
      if (
        event.code === controls.PlayerOneAttack &&
        !pressed.has(controls.PlayerOneBlock) &&
        !pressed.has(controls.PlayerTwoBlock) &&
        !event.repeat
      ) {
        Hit(leftFighter, rightFighter);
      }

      // Second attack
      if (
        event.code === controls.PlayerTwoAttack &&
        !pressed.has(controls.PlayerTwoBlock) &&
        !pressed.has(controls.PlayerOneBlock) &&
        !event.repeat
      ) {
        Hit(rightFighter, leftFighter);
      }

      if (controls.PlayerOneCriticalHitCombination.every((code) => pressed.has(code))) {
        const resultCrit = Hit(leftFighter, rightFighter, true);
        if (!resultCrit) {
          controls.PlayerOneCriticalHitCombination.forEach((code) => pressed.delete(code));
        }
      }

      if (controls.PlayerTwoCriticalHitCombination.every((code) => pressed.has(code))) {
        const resultCrit = Hit(rightFighter, leftFighter, true);
        if (!resultCrit) {
          controls.PlayerTwoCriticalHitCombination.forEach((code) => pressed.delete(code));
        }
      }

      if (rightFighter.health <= 0) {
        Win(firstFighter);
      }
      if (leftFighter.health <= 0) {
        Win(secondFighter);
      }
    }

    document.addEventListener('keydown', keyDown);

    function keyUp(event) {
      pressed.delete(event.code);
    }

    document.addEventListener('keyup', keyUp);

    function Win(winner) {
      document.removeEventListener('keydown', keyDown);
      document.removeEventListener('keyup', keyUp);

      resolve(winner);
    }
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

export function Hit(attacker, defender, isCrit = false) {
  if (isCrit) {
    const dateNow = new Date();
    if (dateNow - attacker.coolDownCrit > 10000) {
      defender.health -= attacker.attack * 2;
      attacker.coolDownCrit = dateNow;
    } else {
      return false;
    }
  } else {
    defender.health -= getDamage(attacker, defender);
  }
  const percentHealth = defender.health > 0 ? Math.floor((defender.health / defender.fullHealth) * 100) : 0;
  defender.healthBar.style.width = `${percentHealth}%`;
  return true;
}

export function createCombatFighter(fighter, position) {
  return {
    ...fighter,
    fullHealth: fighter.health,
    coolDownCrit: new Date() - 11000,
    healthBar: document.getElementById(`${position}-fighter-indicator`),
  };
}
