import Baralla from './baralla.js';
import Jugador from './jugador.js';
import Game from './game.js';
import Dragdrop from './dragdrop.js';
const baralla = new Baralla();
baralla.crearcartes();
console.log(baralla);
const jugador1 = new Jugador(
    0,
    document.getElementById('div1'),
    document.getElementById('div2'),
    document.getElementById('div3'),
    document.getElementById('div4'),
);
const maquina = new Jugador(
    0,
    document.getElementById('div1m'),
    document.getElementById('div2m'),
    document.getElementById('div3m'),
    document.getElementById('div4m'),
);
const joc = new Game(baralla, jugador1, maquina);
const dragdrop = new Dragdrop(
    joc,
    4,
    4,
    document.getElementById('taulell'),
    document.getElementById('taulellm'),
);
const descart = document.getElementById('descartar');

window.addEventListener('DOMContentLoaded', function() {
  joc.barrejarbaralla();
  joc.robar();
  joc.cambiarTorn();
  joc.robar();
  joc.cambiarTorn();
  document.getElementById('boto').addEventListener('click', () =>
    joc.cambiarTorn());
  console.log(joc);
  // Agregar controlador de eventos para el dragstart en las imágenes
  dragdrop.divcartes.addEventListener('dragstart', function(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
  });
  dragdrop.divcartesm.addEventListener('dragstart', function(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
  });
  // controlador de events del jugador
  for (const dropZone of joc.jugador.dropZones) {
    dropZone.element.addEventListener('dragenter', function(e) {
      e.preventDefault();
    });
    dropZone.element.addEventListener('dragover', function(e) {
      e.preventDefault();
    });
    dropZone.element.addEventListener('drop', function(e) {
      e.preventDefault();
      const imageId = e.dataTransfer.getData('text/plain');
      const image = document.getElementById(imageId);
      if (image.getAttribute('tipus') === 'organ' && joc.torn === 1 &&
          dropZone.deshabilitat === false) {
        dragdrop.passarorg(image, dropZone);
      } else if (image.getAttribute('tipus') === 'virus' && joc.torn === 2 &&
        dropZone.deshabilitat === false) {
        dragdrop.posarvirus(image, dropZone);
      } else if (image.getAttribute('tipus') === 'cura' && joc .torn === 1 &&
          dropZone.deshabilitat === false) {
        dragdrop.posarcures(image, dropZone);
      }
    });
  }
  // controlador d'events jugador 2
  for (const dropZone of joc.maquina.dropZones) {
    dropZone.element.addEventListener('dragenter', function(e) {
      e.preventDefault();
    });
    dropZone.element.addEventListener('dragover', function(e) {
      e.preventDefault();
    });
    dropZone.element.addEventListener('drop', function(e) {
      e.preventDefault();
      const imageId = e.dataTransfer.getData('text/plain');
      const image = document.getElementById(imageId);
      if (image.getAttribute('tipus') === 'organ' && joc.torn === 2 &&
          dropZone.deshabilitat === false) {
        dragdrop.passarorg(image, dropZone);
      } else if (image.getAttribute('tipus') === 'virus' && joc.torn === 1 &&
          dropZone.deshabilitat === false) {
        dragdrop.posarvirus(image, dropZone);
      } else if (image.getAttribute('tipus') === 'cura' && joc.torn ===2 &&
          dropZone.deshabilitat === false) {
        dragdrop.posarcures(image, dropZone);
      }
    });
  }
  descart.addEventListener('dragenter', function(e) {
    e.preventDefault();
  });
  descart.addEventListener('dragover', function(e) {
    e.preventDefault();
  });
  descart.addEventListener('drop', function(e) {
    e.preventDefault();
    const imageId = e.dataTransfer.getData('text/plain');
    const image = document.getElementById(imageId);
    if (image.getAttribute('tipus') === 'organ') {
      dragdrop.posarimatge(null, image, true);
    } else if (image.getAttribute('tipus') === 'virus') {
      dragdrop.posarimatge(null, image, true);
    } else if (image.getAttribute('tipus') === 'cura') {
      dragdrop.posarimatge(null, image, true);
    }
  });
});

