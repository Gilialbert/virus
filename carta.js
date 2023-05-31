// ---------------------
// nom de l'arxiu es carta.js
/**
 * classe carta "pare" de les classes virus cura  i organ
 */
export default class Carta {
  static colors = ['groc', 'verd', 'vermell', 'blau', 'multi'];

  /**
   * constructor de la classe carta
   * @param{string} color
   * @param {object}imatge
   * @param {int}id
   * @param {string}tipus
   */
  constructor( color, imatge, id, tipus) {
    this.color = color;
    this.imatge = imatge;
    this.id = id;
    this.tipus = tipus;
  }
}
