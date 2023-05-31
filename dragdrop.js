/**
 * classe de draganddrop conte funcions per el correcte funcionament d'aquest
 */
export default class Dragdrop {
  /**
   * constructor del draganddrop
   * @param{object} joc
   * @param {object}organs
   * @param {htmlelement}organsm
   * @param {htmlelement}divcartes
   * @param {htmlelement}divcartesm
   */
  constructor(joc, organs, organsm, divcartes, divcartesm) {
    this.joc = joc;
    this.organs=organs;
    this.organsm=organsm;
    this.divcartes=divcartes;
    this.divcartesm=divcartesm;
    this.descartes= 3;
    this.red = false;
    this.green = false;
    this.blue = false;
    this.yellow = false;
    this.multi = false;
    this.redm = false;
    this.greenm = false;
    this.bluem = false;
    this.yellowm = false;
    this.multim = false;
  }

  /**
   * funcio de quant es posa un organ
   * @param{Object} image
   * @param{Object} zona
   */
  passarorg(image, zona) {
    const zonaocup = zona.ocupat;
    const color = image.getAttribute('color');
    if (zonaocup === false) {
      if (this.joc.torn === 1) {
        if (this.organs !==0) {
          this.comprobantjugador1(zona, image, color);
        }
      } else if ( this.joc.torn === 2) {
        if (this.organsm !==0) {
          this.comprobantjugador2(zona, image, color);
        }
      }
      console.log(zona);
    }
  }

  /**
   * funcio per comprovar jugador1
   * @param{object} zona
   * @param {object}image
   * @param {string}color
   */
  comprobantjugador1(zona, image, color) {
    if (color === 'vermell' && this.red === false) {
      this.posarimatge(zona, image, false);
      this.red =true;
      zona.ocupat = true;
      zona.color = color;
      this.organs --;
    } else if (color === 'verd' && this.green === false) {
      this.posarimatge(zona, image, false);
      this.green =true;
      zona.ocupat = true;
      zona.color = color;
      this.organs --;
    } else if (color === 'blau' && this.blue === false) {
      this.posarimatge(zona, image, false);
      this.blue = true;
      zona.ocupat = true;
      zona.color = color;
      this.organs --;
    } else if (color === 'groc' && this.yellow === false) {
      this.posarimatge(zona, image, false);
      this.yellow = true;
      zona.ocupat = true;
      zona.color = color;
      this.organs --;
    } else if (color === 'multi' && this.multi === false) {
      this.posarimatge(zona, image, false);
      this.multi= true;
      zona.ocupat = true;
      zona.color = color;
      this.organs--;
    }
  }

  /**
   * comprovant jugador2
   * @param{object} zona
   * @param{object} image
   * @param{string} color
   */
  comprobantjugador2(zona, image, color) {
    if (color === 'vermell' && this.redm === false) {
      this.posarimatge(zona, image, false);
      this.redm =true;
      zona.ocupat = true;
      zona.color = color;
      this.organsm --;
    } else if (color === 'verd' && this.greenm === false) {
      this.posarimatge(zona, image, false);
      this.greenm =true;
      zona.ocupat = true;
      zona.color = color;
      this.organsm --;
    } else if (color === 'blau' && this.bluem === false) {
      this.posarimatge(zona, image, false);
      this.bluem = true;
      zona.ocupat = true;
      zona.color = color;
      this.organsm --;
    } else if (color === 'groc' && this.yellowm === false) {
      this.posarimatge(zona, image, false);
      this.yellowm = true;
      zona.ocupat = true;
      zona.color = color;
      this.organsm --;
    } else if (color === 'multi' && this.multim === false) {
      this.posarimatge(zona, image, false);
      this.multim = true;
      zona.ocupat = true;
      zona.color = color;
      this.organsm--;
    }
  }

  /**
   * funcio que s'utilitza al posar un virus
   * @param{object} image
   * @param{object} zona
   */
  posarvirus(image, zona) {
    const zonacol = zona.color;
    const imgcol = image.getAttribute('color');
    const multi = 'multi';
    if (zonacol === imgcol && zona.ocupat === true) {
      this.estilvirus(image, zona);
    } else if ( zonacol=== multi && zona.ocupat === true) {
      this.estilvirus(image, zona);
    }
    console.log(zona);
  }

  /**
   * funcio que posa estils a les cartes i te la logica de quant es infectada
   * @param{object} image
   * @param{object} zona
   */
  estilvirus(image, zona) {
    if (zona.inmunitat === false) {
      this.posarimatge(zona, image, false);
      zona.infectat--;
      if (zona.infectat === -1) {
        image.classList.add('primeracarta');
      } else if (zona.infectat === -2) {
        const imatges = zona.element.querySelectorAll('img');
        zona.ocupat = false;
        zona.infectat = 0;
        zona.color = '';
        imatges.forEach(function(imatges) {
          imatges.parentNode.removeChild(imatges);
        });
      } else if (zona.infectat === 0) {
        const imatges = zona.element.querySelectorAll(
            'img[tipus="virus"], img[tipus="cura"]');
        imatges.forEach(function(imatges) {
          imatges.parentNode.removeChild(imatges);
        });
      }
    }
  }

  /**
   * funcio que funciona al moment de posar una cura
   * @param{object} image
   * @param {object}zona
   */
  posarcures(image, zona) {
    const zonacol = zona.color;
    const imgcol = image.getAttribute('color');
    const multi = 'multi';
    if (zonacol === imgcol && zona.ocupat === true) {
      this.esilcures(zona, image);
    } else if ( multi === imgcol && zona.ocupat === true) {
      this.esilcures(zona, image);
    }
    console.log(zona);
  }

  /**
   * funcio que s'encarrega de la logica de les cures i els seus estils
   * @param{object} zona
   * @param{object} image
   */
  esilcures(zona, image) {
    this.posarimatge(zona, image, false);
    zona.infectat++;
    if (zona.infectat === 1) {
      image.classList.add('primeracarta');
    } else if (zona.infectat === 2) {
      image.classList.add('segonacarta');
      zona.inmunitat = true;
    } else if (zona.infectat === 0) {
      const imatges = zona.element.querySelectorAll(
          'img[tipus="virus"], img[tipus="cura"]');
      imatges.forEach(function(imagen) {
        imagen.parentNode.removeChild(imagen);
      });
    }
  }

  /**
   * funcio que s'encarrega de trobar l'id del array
   * @param{array} array
   * @param{int} id
   * @return {number}
   */
  findIndexById(array, id) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        return i;
      }
    }
    return -1;
  }

  /**
   * funcio que s'encarrega de posar les imatges en tots els divs
   * @param{object} zona
   * @param{object} image
   * @param{boolean} desc
   */
  posarimatge(zona, image, desc) {
    if (desc === false) {
      const zonael = zona.element;
      zonael.appendChild(image);
      if ( this.joc.torn === 1) {
        this.joc.jugador.numcartes--;
      } else if (this.joc.torn === 2) {
        this.joc.maquina.numcartes--;
      }
      const imageId = parseInt(image.getAttribute('id'));
      const index = this.findIndexById(this.joc.jugador.ma, imageId);
      if (index !== -1) {
        const cartaEliminada = this.joc.jugador.ma.splice(index, 1)[0];
        zona.array.push(cartaEliminada);
      }
      this.joc.robar();
      image.draggable = false;
      this.comprovaciog();
      this.joc.cambiarTorn();
    } else if ( desc === true) {
      const descdiv = document.getElementById('descartar');
      descdiv.appendChild(image);
      image.classList.add('descartats');
      image.draggable = false;
      this.descartes --;
      if (this.joc.torn === 1) {
        this.joc.jugador.numcartes --;
        for (const dropZone of this.joc.jugador.dropZones) {
          dropZone.deshabilitat = true;
        }
      } else if (this.joc.torn === 2) {
        this.joc.maquina.numcartes --;
        for (const dropZone of this.joc.maquina.dropZones) {
          dropZone.deshabilitat = true;
        }
      }
      if (this.descartes ===0) {
        this.descartes =3;
        this.joc.robar();
        this.comprovaciog();
        this.joc.cambiarTorn();
      }
    }
  }

  /**
   * funcio de la comprovacio dels divs si estan be o no per
   * guuanyar (no furula)
   */
  comprovaciog() {
    const guanyar = false;
    if ( this.joc.torn ===1 && guanyar === false) {
      const dropZones = this.joc.jugador.dropZones;
      for (let i = 0; i < dropZones.length; i++) {
        const zona = dropZones[i];
        if (zona.color === '' || zona.infectat < 0 || zona.infectat > 2) {
          return false;
        }
      }
      console.log('no haguanyat');
    } else if (this.joc.torn ===2 && guanyar === false) {
      const dropZones = this.joc.maquina.dropZones;
      for (let i = 0; i < dropZones.length; i++) {
        const zona = dropZones[i];
        if (zona.color === '' || zona.infectat < 0 || zona.infectat > 2) {
          return false;
        }
      }
      console.log('no haguanyat');
    }
    if (guanyar === true) {
      const div = document.getElementById('amagat');
      if ( this.joc.torn ===1) {
        div.innerHTML = 'jugador1 ha guanyat';
      } else if (this.joc.torn ===2) {
        div.innerHTML = 'jugador2 ha guanyat';
      }
      div.classList.add('guanyador');
      console.log('haguanyat');
    }
  }
}

