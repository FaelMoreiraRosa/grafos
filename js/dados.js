/**
 * dados.js
 * Define o grafo usado na página: posições dos vértices, arestas
 * e a lista de adjacência derivada delas.
 */
(function () {
  'use strict';

  // Posição (x, y) de cada vértice dentro do SVG. O índice é o rótulo do vértice.
  const vertices = [
    [60, 150], [180, 60], [180, 240], [300, 150],
    [300, 250], [420, 70], [490, 200],
  ];

  // Arestas não direcionadas, como pares [origem, destino].
  const arestas = [
    [0, 1], [0, 2], [1, 3], [2, 3],
    [2, 4], [3, 5], [4, 6], [5, 6],
  ];

  /** Constrói a lista de adjacência (vizinhos ordenados de cada vértice). */
  function construirAdjacencia(qtdVertices, listaArestas) {
    const adj = Array.from({ length: qtdVertices }, () => []);
    listaArestas.forEach(([a, b]) => {
      adj[a].push(b);
      adj[b].push(a);
    });
    adj.forEach((vizinhos) => vizinhos.sort((x, y) => x - y));
    return adj;
  }

  window.Grafos = window.Grafos || {};
  window.Grafos.dados = {
    vertices,
    arestas,
    adjacencia: construirAdjacencia(vertices.length, arestas),
  };
})();
