/**
 * main.js
 * Controlador: liga os botões da página aos algoritmos e à interface.
 */
(function () {
  'use strict';

  const { adjacencia } = window.Grafos.dados;
  const { gerarPassos } = window.Grafos.algoritmos;
  const ui = window.Grafos.interface;

  const INTERVALO_MS = 1100;

  const el = {
    algoritmo: document.getElementById('algoritmo'),
    executar: document.getElementById('btn-executar'),
    passo: document.getElementById('btn-passo'),
    reiniciar: document.getElementById('btn-reiniciar'),
    estrutura: document.getElementById('estrutura'),
    ordem: document.getElementById('ordem'),
  };

  let passos = [];
  let indice = -1;
  let temporizador = null;

  const terminou = () => indice >= passos.length - 1;

  function pausar() {
    clearInterval(temporizador);
    temporizador = null;
    el.executar.textContent = '▶ Executar';
  }

  function reiniciar() {
    pausar();
    passos = gerarPassos(el.algoritmo.value, adjacencia);
    indice = -1;
    ui.limpar(el.estrutura, el.ordem);
  }

  /** Avança um passo. Retorna false quando não há mais passos. */
  function avancar() {
    if (terminou()) {
      pausar();
      return false;
    }
    indice += 1;
    ui.mostrarPasso(passos[indice], el.algoritmo.value, el.estrutura, el.ordem);
    return true;
  }

  function alternarExecucao() {
    if (temporizador) return pausar();
    if (terminou()) reiniciar();
    el.executar.textContent = '⏸ Pausar';
    avancar();
    temporizador = setInterval(avancar, INTERVALO_MS);
  }

  function passoManual() {
    pausar();
    if (terminou()) reiniciar();
    avancar();
  }

  // Inicialização
  ui.desenharGrafo();
  ui.desenharMatriz(document.getElementById('matriz'));
  ui.desenharLista(document.getElementById('lista'));

  el.executar.addEventListener('click', alternarExecucao);
  el.passo.addEventListener('click', passoManual);
  el.reiniciar.addEventListener('click', reiniciar);
  el.algoritmo.addEventListener('change', reiniciar);

  reiniciar();
})();
