import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  if (fighter) {

    const fighterName = createElement({
      tagName: 'div',
      className: 'fighter-preview___name',
    });
    fighterName.innerText = fighter.name;

    const fighterImg = createElement({
      tagName: 'img',
      className: 'fighter-preview___img',
    });
    fighterImg.src = fighter.source;
    if (position == "right")
      fighterImg.style.transform = "scale(-1, 1)"

    const fighterDesc = createElement({
      tagName: 'div',
      className: 'fighter-preview___description',
    });

    const fighterHealth = createElement({
      tagName: 'div',
      className: 'fighter-preview___data',
    });
    fighterHealth.innerText = 'Health: ' + fighter.health;
    fighterDesc.append(fighterHealth);

    const fighterAttack = createElement({
      tagName: 'div',
      className: 'fighter-preview___data',
    });
    fighterAttack.innerText = 'Attack: ' + fighter.attack;
    fighterDesc.append(fighterAttack);

    const fighterDefense = createElement({
      tagName: 'div',
      className: 'fighter-preview___data',
    });
    fighterDefense.innerText = 'Defense: ' + fighter.defense;
    fighterDesc.append(fighterDefense);

    fighterElement.append(fighterName);
    fighterElement.append(fighterImg);
    fighterElement.append(fighterDesc);
  }

  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = {
    src: source,
    title: name,
    alt: name,
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
