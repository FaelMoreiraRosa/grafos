/**
 * interface.js
 * Tudo que mexe no DOM: desenhar o SVG, as tabelas e atualizar os painéis.
 * Não conhece os algoritmos, só sabe desenhar um "passo".
 */
(function () {
  'use strict';

  const SVG_NS = 'http://www.w3.org/2000/svg';
  const { vertices, arestas, adjacencia } = window.Grafos.dados;

  const svg = document.getElementById('grafo');
  const elArestas = {};  // chave "a-b" -> <line>
  const elVertices = []; // índice -> <g>

  /** Cria um elemento SVG com atributos. */
  function criarSvg(tag, atributos) {
    const el = document.createElementNS(SVG_NS, tag);
    Object.entries(atributos).forEach(([k, v]) => el.setAttribute(k, v));
    return el;
  }

  /** Desenha arestas e vértices uma única vez. */
  function desenharGrafo() {
    arestas.forEach(([a, b]) => {
      const linha = criarSvg('line', {
        class: 'aresta',
        x1: vertices[a][0], y1: vertices[a][1],
        x2: vertices[b][0], y2: vertices[b][1],
      });
      svg.appendChild(linha);
      elArestas[`${a}-${b}`] = linha;
      elArestas[`${b}-${a}`] = linha;
    });

    vertices.forEach(([x, y], i) => {
      const grupo = criarSvg('g', { class: 'vertice' });
      const circulo = criarSvg('circle', { cx: x, cy: y, r: 22 });
      const texto = criarSvg('text', { x, y });
      texto.textContent = i;
      grupo.append(circulo, texto);
      svg.appendChild(grupo);
      elVertices.push(grupo);
    });
  }

  /** Monta a matriz de adjacência em uma tabela HTML. */
  function desenharMatriz(container) {
    const cabecalho = vertices.map((_, i) => `<th scope="col">${i}</th>`).join('');
    const linhas = vertices.map((_, i) => {
      const celulas = vertices
        .map((_, j) => (adjacencia[i].includes(j) ? '<td class="um">1</td>' : '<td>0</td>'))
        .join('');
      return `<tr><th scope="row">${i}</th>${celulas}</tr>`;
    });
    container.innerHTML = `<table><tr><th></th>${cabecalho}</tr>${linhas.join('')}</table>`;
  }

  /** Monta a lista de adjacência. */
  function desenharLista(container) {
    container.innerHTML = adjacencia
      .map((vizinhos, i) => `<div class="painel">${i} → ${vizinhos.join(', ')}</div>`)
      .join('');
  }

  /** Remove todo destaque do grafo e limpa os painéis. */
  function limpar(painelEstrutura, painelOrdem) {
    elVertices.forEach((v) => (v.setAttribute('class', 'vertice')));
    Object.values(elArestas).forEach((l) => l.setAttribute('class', 'aresta'));
    painelEstrutura.textContent = 'Estrutura: —';
    painelOrdem.textContent = 'Ordem de visita: —';
  }

  /** Aplica um passo do algoritmo na tela. */
  function mostrarPasso(passo, tipo, painelEstrutura, painelOrdem) {
    elVertices.forEach((el, i) => {
      let estado = '';
      if (passo.atual === i) estado = ' atual';
      else if (passo.concluidos.includes(i)) estado = ' concluido';
      else if (passo.naEstrutura.includes(i)) estado = ' na-estrutura';
      el.setAttribute('class', `vertice${estado}`);
    });

    Object.values(elArestas).forEach((l) => l.setAttribute('class', 'aresta'));
    passo.arvore.forEach(([a, b]) => elArestas[`${a}-${b}`].setAttribute('class', 'aresta arvore'));

    const nome = tipo === 'bfs' ? 'Fila' : 'Pilha';
    const conteudo = passo.estrutura.length ? `[${passo.estrutura.join(', ')}]` : 'vazia';
    painelEstrutura.textContent = `${nome}: ${conteudo}`;
    painelOrdem.textContent = `Ordem de visita: ${passo.ordem.length ? passo.ordem.join(' → ') : '—'}`;
  }

  window.Grafos = window.Grafos || {};
  window.Grafos.interface = { desenharGrafo, desenharMatriz, desenharLista, limpar, mostrarPasso };
})();
