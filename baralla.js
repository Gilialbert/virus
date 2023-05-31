import Organ from './organ.js';
import Virus from './virus.js';
import Cura from './cures.js';
// ---------------------
// nom de l'arxiu es baralla.js
export default class Baralla {
  constructor() {
    this.cartes = [];
  }
  crearcartes() {
    const organ = new Organ();
    const virus = new Virus();
    const cura = new Cura();

    organ.crearOrgans();
    virus.crearVirus();
    cura.crearCura();

    this.cartes= [...organ.arrayorg, ...virus.arrayvirus, ...cura.arraycures];
  }

  barrejar() {
    const bllargada = this.cartes.length;
    for (let i = bllargada - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i+1));
      [this.cartes[i], this.cartes[j]] = [this.cartes[j], this.cartes[i]];
    }
  }
}
