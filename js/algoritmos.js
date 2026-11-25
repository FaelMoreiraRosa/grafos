/**
 * algoritmos.js
 * BFS e DFS implementados de forma a registrar cada passo,
 * para que a interface possa reproduzi-los como animação.
 *
 * Cada passo tem o formato:
 *   { atual, concluidos, naEstrutura, arvore, estrutura, ordem }
 */
(function () {
  'use strict';

  /**
   * Gera os passos de uma busca em grafo.
   * @param {'bfs'|'dfs'} tipo       Algoritmo (fila para BFS, pilha para DFS).
   * @param {number[][]} adjacencia  Lista de adjacência.
   * @param {number} inicio          Vértice inicial.
   * @returns {object[]} Lista de passos.
   */
  function gerarPassos(tipo, adjacencia, inicio = 0) {
    const ehBfs = tipo === 'bfs';
    const passos = [];
    const descobertos = new Set(); // usado pela BFS ao enfileirar
    const visitados = new Set();   // usado pela DFS ao desempilhar
    const concluidos = [];
    const arvore = [];

    // Cada item guarda o vértice e quem o descobriu (pai), para montar a árvore.
    let estrutura = [{ v: inicio, pai: -1 }];
    if (ehBfs) descobertos.add(inicio);

    const registrar = (atual) => {
      passos.push({
        atual,
        concluidos: [...concluidos],
        naEstrutura: estrutura.map((i) => i.v).filter((v) => v !== atual && !concluidos.includes(v)),
        arvore: arvore.map((aresta) => [...aresta]),
        estrutura: estrutura.map((i) => i.v),
        ordem: [...concluidos, atual],
      });
    };

    while (estrutura.length > 0) {
      const { v: u, pai } = ehBfs ? estrutura.shift() : estrutura.pop();

      if (!ehBfs) {
        if (visitados.has(u)) continue;
        visitados.add(u);
      }
      if (pai >= 0) arvore.push([pai, u]);

      if (ehBfs) {
        adjacencia[u].forEach((viz) => {
          if (!descobertos.has(viz)) {
            descobertos.add(viz);
            estrutura.push({ v: viz, pai: u });
          }
        });
      } else {
        // Empilha na ordem inversa para visitar os menores índices primeiro.
        [...adjacencia[u]].reverse().forEach((viz) => {
          if (!visitados.has(viz)) estrutura.push({ v: viz, pai: u });
        });
      }

      registrar(u);
      concluidos.push(u);
    }

    // Passo final: tudo concluído.
    passos.push({
      atual: -1,
      concluidos: [...concluidos],
      naEstrutura: [],
      arvore: arvore.map((aresta) => [...aresta]),
      estrutura: [],
      ordem: [...concluidos],
    });

    return passos;
  }

  window.Grafos = window.Grafos || {};
  window.Grafos.algoritmos = { gerarPassos };
})();
