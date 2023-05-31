// ---------------------
// nom de l'arxiu es game.js
import Organ from './organ.js';
import Cura from './cures.js';
import Virus from './virus.js';

/**
 * constructor de la classe game
 */
export default class Game {
  /**
   * constructor del game
   * @param{object} baralla
   * @param{object} jugador
   * @param{object} maquina
   */
  constructor( baralla, jugador, maquina) {
    this.baralla = baralla;
    this.jugador = jugador;
    this.maquina = maquina;
    this.torn = 1;
    this.descartes = [];
  }

  /**
   * funcio per barrejar les cartes
   */
  barrejarbaralla() {
    this.baralla.barrejar();
  }

  /**
   * funcio per canviar el torn
   */
  cambiarTorn() {
    const p = document.getElementById('torn');
    const jugador1 = document.getElementById('j1');
    const jugador2 = document.getElementById('j2');
    if (this.torn === 1) {
      this.torn = 2;
      console.log(this.torn);
      const div = document.getElementById('cartes');
      const divm = document.getElementById('cartesm');
      this.imatgesdrag(div, divm);
      p.innerHTML = 'Jugador2';
      jugador2.classList.add('bordevermell');
      jugador1.classList.remove('bordevermell');
      for (const dropZone of this.jugador.dropZones) {
        dropZone.deshabilitat = false;
      }
      for (const dropZone of this.maquina.dropZones) {
        dropZone.deshabilitat = false;
      }
      this.robar();
    } else if (this.torn === 2) {
      this.torn = 1;
      console.log(this.torn);
      const div = document.getElementById('cartes');
      const divm = document.getElementById('cartesm');
      this.imatgesdrag(divm, div);
      p.innerHTML = 'Jugador1';
      jugador1.classList.add('bordevermell');
      jugador2.classList.remove('bordevermell');
      this.robar();
      for (const dropZone of this.jugador.dropZones) {
        dropZone.deshabilitat = false;
      }
      for (const dropZone of this.maquina.dropZones) {
        dropZone.deshabilitat = false;
      }
    }
  }

  /**
   * funcio per posar totes les imatges dels divs dragable o trurel
   * @param{object} div
   * @param{object} divm
   */
  imatgesdrag(div, divm) {
    let imatges = div.getElementsByTagName('img');
    for (let i = 0; i < imatges.length; i++) {
      imatges[i].setAttribute('draggable', 'false');
    }
    imatges = divm.getElementsByTagName('img');
    for (let i = 0; i < imatges.length; i++) {
      imatges[i].setAttribute('draggable', 'true');
    }
  }
  /**
   * funcio per afegir les cartes en el seu div repectiu
   */
  treurecarta() {
    const bllargada= this.baralla.cartes.length;
    const ultimaCarta= this.baralla.cartes[bllargada-1];
    const image = ultimaCarta.imatge;
    this.baralla.cartes.pop();
    this.jugador.ma.push(ultimaCarta);
    const imatge = document.createElement('img');
    imatge.src = image;
    const id = ultimaCarta.id;
    imatge.setAttribute('id', id);
    const tipus = ultimaCarta.tipus;
    imatge.setAttribute('tipus', tipus);
    const color = ultimaCarta.color;
    imatge.setAttribute('color', color);
    if ( this.torn === 1) {
      const div = document.getElementById('cartes');
      div.appendChild(imatge);
      imatge.draggable = true;
      if (ultimaCarta instanceof Organ) {
        this.drageventorg(imatge);
      } else if ( ultimaCarta instanceof Cura) {
        this.drageventcur(imatge);
      } else if ( ultimaCarta instanceof Virus) {
        this.drageventvir(imatge);
      }
    } else if ( this.torn ===2) {
      const div = document.getElementById('cartesm');
      div.appendChild(imatge);
      imatge.draggable = false;
      if (ultimaCarta instanceof Organ) {
        this.drageventorg(imatge);
      } else if ( ultimaCarta instanceof Cura) {
        this.drageventcur(imatge);
      } else if ( ultimaCarta instanceof Virus) {
        this.drageventvir(imatge);
      }
    }
  }

  /**
     * funcio per robar totes les cartes que et faltin fins arribar a 3
     */
  robar() {
    if (this.torn === 1) {
      while (this.jugador.numcartes !== 3) {
        this.treurecarta();
        this.jugador.numcartes ++;
      }
    } else if (this.torn ===2) {
      while (this.maquina.numcartes !== 3) {
        this.treurecarta();
        this.maquina.numcartes ++;
      }
    }
  }

  /**
   * funcio per afegir els controladors de events al pillar cartes
   * @param{object}imatge
   */
  drageventorg(imatge) {
    imatge.addEventListener('dragstart', function(e) {
      e.dataTransfer.setData('text/plain', e.target.id);
      if ( this.torn ===1) {
        for (const dropZone of this.jugador.dropZones) {
          if (dropZone.ocupat === false) {
            dropZone.element.classList.add('bordevermell');
          } else if (dropZone.color ==='') {
            dropZone.element.classList.add('bordevermell');
          }
        }
      } else if ( this.torn ===2) {
        for (const dropZone of this.maquina.dropZones) {
          if (dropZone.ocupat === false) {
            dropZone.element.classList.add('bordevermell');
          } else if (dropZone.color ==='') {
            dropZone.element.classList.add('bordevermell');
          }
        }
      }
    }.bind(this));
    imatge.addEventListener('dragend', function(e) {
      this.treureestils();
    }.bind(this));
  }

  /**
   * funcio per posar els dragevents de les cures
   * @param{object} imatge
   */
  drageventcur(imatge) {
    imatge.addEventListener('dragstart', function(e) {
      e.dataTransfer.setData('text/plain', e.target.id);
      if ( this.torn === 1) {
        this.afegirestilsjug(imatge);
      } else if (this.torn === 2) {
        this.afegirestilsma(imatge);
      }
    }.bind(this));
    imatge.addEventListener('dragend', function(e) {
      this.treureestils();
    }.bind(this));
  }

  /**
   * funcio per posar els dragevents dels virus
   * @param {object}imatge
   */
  drageventvir(imatge) {
    imatge.addEventListener('dragstart', function(e) {
      e.dataTransfer.setData('text/plain', e.target.id);
      if ( this.torn === 1) {
        this.afegirestilsma(imatge);
      } else if (this.torn === 2) {
        this.afegirestilsjug(imatge);
      }
    }.bind(this));
    imatge.addEventListener('dragend', function(e) {
      this.treureestils();
    }.bind(this));
  }

  /**
   * funcio per treure els estils
   */
  treureestils() {
    this.jugador.div1.classList.remove('bordevermell');
    this.jugador.div2.classList.remove('bordevermell');
    this.jugador.div3.classList.remove('bordevermell');
    this.jugador.div4.classList.remove('bordevermell');
    this.maquina.div1.classList.remove('bordevermell');
    this.maquina.div2.classList.remove('bordevermell');
    this.maquina.div3.classList.remove('bordevermell');
    this.maquina.div4.classList.remove('bordevermell');
  }

  /**
   * funcio per afegir estils al jugador
   * @param{object} imatge
   */
  afegirestilsjug(imatge) {
    for (const dropZone of this.jugador.dropZones) {
      if (dropZone.ocupat === true &&
          dropZone.color === imatge.getAttribute('color')) {
        dropZone.element.classList.add('bordevermell');
      } else if (dropZone.ocupat === true &&
          imatge.getAttribute('color')==='multi') {
        dropZone.element.classList.add('bordevermell');
      }
    }
  }

  /**
   * funcio per afegir estils maquina
   * @param{object} imatge
   */
  afegirestilsma(imatge) {
    for (const dropZone of this.maquina.dropZones) {
      if (dropZone.ocupat === true &&
          dropZone.color === imatge.getAttribute('color')) {
        dropZone.element.classList.add('bordevermell');
      } else if (dropZone.ocupat === true &&
          imatge.getAttribute('color')==='multi') {
        dropZone.element.classList.add('bordevermell');
      }
    }
  }
}
