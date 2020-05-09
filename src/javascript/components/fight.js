import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    // resolve the promise with the winner when fight is over
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
