---
version: 1
slug: "src-app"
primary_target: "src/app"
related_targets: []
---

# Surface brief: App Acadêmico (mobile + desktop)

Scope: todo o app (src/app). Mode: Operate.
Audience: aluno da Inatel (persona Lucas) e o professor avaliando em projetor.
Task: consultar avisos, notas, frequência, horários; acompanhar nível, medalhas e posição no ranking normalizado.
Constraints: identidade do app real (prints); sem emoji; sem travessão; sem texto óbvio; paleta enxuta.
Structure locked by the user (question round, no concept roll needed because the brief pins the world and the structure):
desktop com sidebar fixa; mobile com menu lateral do app real e barra inferior de 4 atalhos.

## Direction contract

THESIS: O app oficial da Inatel, só que afinado: mesma casca escura e azul-marinho, com dados no lugar de frases. Recusa o template de app gamificado colorido (cards arco-íris, glows, pódio de blocos com degradê).

OWN-WORLD: Preto do app real como base, superfícies em cinza grafite, cabeçalho azul-marinho #1d3b5a, menu cinza com cabeçalho em degradê azul. Um azul de ação. Dourado só para conquista. Metais dessaturados de uma mesma família (bronze, prata, ouro, platina) nas medalhas. Linhas finas, listas em vez de cards, números tabulares, ícones lucide de traço 1.75.

STORY: Lucas abre o app, vê nível e posição sem ler nada, toca numa medalha e entende a regra e o que falta, filtra o ranking por laboratório e vê onde está.

FIRST VIEWPORT: Desktop: sidebar 264px à esquerda (logo Inatel, aluno com nível, seções do menu), barra superior azul-marinho com o título, conteúdo em duas colunas (principal + painel de detalhe fixo de 360px). Mobile: cabeçalho azul-marinho com menu, conteúdo em coluna única, barra inferior com Avisos, Conquistas, Ranking, Horários; detalhes em bottom sheet.

FORM: Interface do app oficial (familiar primeiro), posição 1 da lista; sem seed key, estrutura travada pelo usuário na rodada de perguntas.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
