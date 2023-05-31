// ---------------------
// nom de l'arxiu es jugador.js
/**
 * constructor classe jugador
 */
export default class Jugador {
  /**
   * constructor dels jugadors
   * @param{object} cartes
   * @param {object}div1
   * @param {object}div2
   * @param {object}div3
   * @param {object}div4
   */
  constructor(cartes, div1, div2, div3, div4) {
    this.ma=[];
    this.taula=[];
    this.numcartes=cartes;
    this.div1 = div1;
    this.div2 = div2;
    this.div3 = div3;
    this.div4 = div4;
    this.comprovant = [
      {col: '', infectat: ''},
      {col: '', infectat: ''},
      {col: '', infectat: ''},
      {col: '', infectat: ''},
      {col: '', infectat: ''},
    ];
    this.dropZones = [
      {element: this.div1, color: '', infectat: 0,
        inmunitat: false, ocupat: false, deshabilitat: false, array: []},
      {element: this.div2, color: '', infectat: 0,
        inmunitat: false, ocupat: false, deshabilitat: false, array: []},
      {element: this.div3, color: '', infectat: 0,
        inmunitat: false, ocupat: false, deshabilitat: false, array: []},
      {element: this.div4, color: '', infectat: 0,
        inmunitat: false, ocupat: false, deshabilitat: false, array: []},
    ];
  }
}
