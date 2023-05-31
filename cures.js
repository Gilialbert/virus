import Carta from './carta.js';
// ---------------------
// Nom de l'arixiu es cures.js
/**
 * classe cura
 */
export default class Cura extends Carta {
  /**
   * constructor classe cura
   * @param{string} color
   * @param {object}imatge
   * @param {int}id
   * @param {string}tipus
   */
  constructor(color, imatge, id, tipus) {
    super(color, imatge, id, tipus);
    this.arraycures =[];
  }

  /**
   * funcio per crear les cures
   */
  crearCura() {
    let id =39;
    for (const color of Carta.colors) {
      for (let i = 0; i < 4; i++) {
        this.arraycures.push(new Cura(color, `./imatges/cura/${color}.png`,
            id, 'cura'));
        id++;
      }
    }
  }
}
