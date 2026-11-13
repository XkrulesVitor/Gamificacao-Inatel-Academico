---
version: 1
slug: "src-app"
primary_target: "src/app"
related_targets: []
---

# Surface brief: App Acadêmico (mobile + desktop), v3

Scope: todo o app (src/app). Mode: Operate.
Audience: aluno da Inatel (persona Lucas) e o professor avaliando em projetor.
Task: abrir o app e ver o dia (Início), consultar avisos, desempenho e agenda; acompanhar nível, medalhas e posição no ranking normalizado.
Constraints: identidade do app real (prints) sem se prender 100% a ela; temas claro e escuro; sem emoji; sem travessão; sem texto óbvio; paleta enxuta.
Structure locked by the user (two question rounds): desktop com sidebar fixa; menu de 6 itens (Início, Avisos, Conquistas e Ranking, Desempenho com abas, Agenda com abas, Configurações); mobile com menu lateral e barra inferior de 5 destinos (Início, Desempenho, Conquistas, Ranking, Agenda), Avisos no sino do cabeçalho; tela Início pelo wireframe da aula (S13, páginas 42 e 43); tema segue o sistema com troca no cabeçalho e em Configurações.

## Direction contract

THESIS: O Acadêmico da Inatel modernizado com acabamento premium e institucional: personalidade vinda de objetos bem desenhados (brasão de nível, medalhas de metal com fita, gráfico de evolução) e de números contados, nunca de cor gritante. Recusa o app gamificado colorido e também a versão neutra sem alma.

OWN-WORLD: Neutros com leve tom azul nos dois temas; azul-marinho em degradê como única região grande de cor (cabeçalho, cartão de nível, painel de marca); um azul de ação; ouro só para conquista (texto em gold-ink no neutro, gold sobre azul-marinho); metais dessaturados só para raridade e top 3. Cards com borda fina e sombra suave, Inter com números tabulares, ícones lucide de traço 1.75.

STORY: Lucas abre o app e vê o dia: próxima aula, prova chegando, medalha perto. Em Conquistas e Ranking entende nível, regra da próxima medalha e sua posição justa, e vê que subiu.

FIRST VIEWPORT: Desktop: sidebar 248 a 264px (marca, 6 itens, cartão do aluno com anel de nível), cabeçalho azul-marinho com título e data, conteúdo em duas colunas (principal e painel lateral). Mobile: cabeçalho com menu, tema e sino, conteúdo em coluna única, barra inferior de 5 destinos, detalhes em bottom sheet.

FORM: Interface do app oficial modernizada (familiar primeiro, premium no acabamento), posição 1; sem seed key, estrutura travada pelo usuário nas rodadas de perguntas. Wireframe aplicado na Início: média da disciplina no lugar do CR por disciplina (o CR global está em Desempenho, Coeficientes).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
