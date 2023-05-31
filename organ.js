import Carta from './carta.js';
// ---------------------
// Nom de l'arxiu es organ.js
/**
 * classe organ
 */
export default class Organ extends Carta {
  /**
   * constructor dels organs
   * @param{string} color
   * @param{object} imatge
   * @param {int}id
   * @param {string}tipus
   */
  constructor(color, imatge, id, tipus) {
    super(color, imatge, id, tipus);
    this.arrayorg =[];
  }
  crearOrgans() {
    let id = 1;
    for (const color of Carta.colors) {
      if (color === 'multi') {
        this.arrayorg.push(new Organ(color, `./imatges/organ/${color}.png`,
            id, 'organ', 0, false,
        ));
        id ++;
      } else {
        for (let i = 0; i < 5; i++) {
          this.arrayorg.push(new Organ(color, `./imatges/organ/${color}.png`,
              id, 'organ', 0, false,
          ));
          id++;
        }
      }
    }
  }
}


