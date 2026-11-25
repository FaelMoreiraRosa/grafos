# Grafos na prática

Página didática sobre grafos com simulação animada de BFS (largura) e DFS (profundidade).
Inspirada no capítulo de grafos do livro de André Backes (Linguagem C).

## Como usar
Abra o `index.html` no navegador. Não precisa instalar nada nem rodar servidor.

## Estrutura
```
grafos/
├── index.html          # estrutura da página
├── css/
│   └── style.css       # estilos (tema claro/escuro automático)
└── js/
    ├── dados.js        # vértices, arestas e lista de adjacência
    ├── algoritmos.js   # BFS e DFS que registram cada passo
    ├── interface.js    # desenho do SVG, tabelas e painéis
    └── main.js         # controlador (botões e temporizador)
```
A ordem dos `<script>` no HTML importa: cada arquivo usa o anterior,
compartilhando o objeto global `window.Grafos`.
# grafos
