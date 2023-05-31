import Carta from './carta.js';
// ---------------------
// nom de l'arxiu es virus.js
/**
 * classe virus
 */
export default class Virus extends Carta {
  constructor(color, imatge, id, tipus) {
    super(color, imatge, id, tipus);
    this.arrayvirus = [];
  }

  /**
   * funcio per crear tots els virus
   */
  crearVirus() {
    let id = 22;
    for (const color of Carta.colors) {
      if (color === 'multi') {
        this.arrayvirus.push(new Virus(color, `./imatges/virus/${color}.png`,
            id, 'virus'));
        id ++;
      } else {
        for (let i = 0; i < 4; i++) {
          this.arrayvirus.push(new Virus(color, `./imatges/virus/${color}.png`,
              id, 'virus'));
          id++;
        }
      }
    }
  }
}
