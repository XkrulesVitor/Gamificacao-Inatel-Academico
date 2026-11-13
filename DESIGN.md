---
name: Acadêmico Inatel
description: "App acadêmico da Inatel em dois temas compostos: institucional premium, um bloco azul-marinho, emblemas e metais desenhados, ouro só para conquista."
colors:
  bg: "#080b10"
  surface-1: "#0f141b"
  surface-2: "#151b24"
  surface-3: "#1d2530"
  surface-4: "#28313e"
  line: "#1e2631"
  line-strong: "#2e3947"
  fg: "#eef2f7"
  muted: "#9ba7b6"
  subtle: "#6c7889"
  header: "#0f2a47"
  header-2: "#173d66"
  on-header: "#ffffff"
  on-header-muted: "#b9c9dc"
  navy-deep: "#123a66"
  brand: "#3d86e6"
  sidebar: "#0b1017"
  sidebar-fg: "#dfe6ee"
  sidebar-muted: "#7f8b9b"
  sidebar-active: "#172131"
  accent: "#5b9cf0"
  primary: "#1f6fd1"
  primary-hover: "#2b7ce0"
  on-primary: "#ffffff"
  gold: "#e8b64a"
  gold-ink: "#f0c25e"
  bronze: "#c99168"
  silver: "#c3cad6"
  platinum: "#a9dbe8"
  danger: "#ff6b61"
  success: "#45c58a"
  light-bg: "#f2f4f8"
  light-surface-1: "#ffffff"
  light-surface-2: "#f5f7fa"
  light-surface-3: "#eaeef3"
  light-surface-4: "#dde3eb"
  light-line: "#e2e7ee"
  light-line-strong: "#cdd5e0"
  light-fg: "#0e1724"
  light-muted: "#536074"
  light-subtle: "#7f8ba0"
  light-header: "#12345a"
  light-header-2: "#1b4a7d"
  light-on-header-muted: "#c3d3e6"
  light-navy-deep: "#154a85"
  light-brand: "#1a63c4"
  light-sidebar: "#ffffff"
  light-sidebar-fg: "#1b2633"
  light-sidebar-muted: "#6b778a"
  light-sidebar-active: "#e9f1fc"
  light-accent: "#1a63c4"
  light-primary: "#1a63c4"
  light-primary-hover: "#1556ab"
  light-gold: "#dca42b"
  light-gold-ink: "#8f6407"
  light-bronze: "#a8693c"
  light-silver: "#7f8a99"
  light-platinum: "#3f93ab"
  light-danger: "#d13b30"
  light-success: "#1d8a59"
typography:
  brand:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "88px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.025em"
  display:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "64px"
    fontWeight: 600
    lineHeight: 0.9
    letterSpacing: "-0.03em"
  numeral:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "34px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "26px"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  header-title:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "22px"
    fontWeight: 500
    lineHeight: 1.25
  title:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: 1.375
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.5
  caption:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.3
rounded:
  card: "14px"
  control: "10px"
  sheet: "22px"
  pill: "9999px"
spacing:
  gutter: "16px"
  gutter-lg: "24px"
  gutter-xl: "32px"
  panel: "20px"
  row: "12px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    height: "44px"
    padding: "0 16px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.control}"
    height: "44px"
  button-secondary:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.fg}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    height: "44px"
    padding: "0 16px"
  button-secondary-hover:
    backgroundColor: "{colors.surface-3}"
    textColor: "{colors.fg}"
    rounded: "{rounded.control}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.accent}"
    rounded: "{rounded.control}"
    height: "44px"
    padding: "0 16px"
  panel:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.fg}"
    rounded: "{rounded.card}"
    padding: "{spacing.panel}"
  panel-brand:
    backgroundColor: "{colors.header}"
    textColor: "{colors.on-header}"
    rounded: "{rounded.card}"
    padding: "{spacing.panel}"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: "36px"
    padding: "0 14px"
  badge-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.gold-ink}"
    rounded: "{rounded.pill}"
    height: "24px"
    padding: "0 10px"
  progress-bar:
    backgroundColor: "{colors.surface-3}"
    rounded: "{rounded.pill}"
    height: "6px"
  nav-item:
    backgroundColor: "{colors.sidebar-active}"
    textColor: "{colors.sidebar-fg}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    height: "44px"
    padding: "0 12px"
  bottom-sheet:
    backgroundColor: "{colors.surface-2}"
    rounded: "{rounded.sheet}"
---

# Design System: Acadêmico Inatel

## Overview

**Creative North Star: "O Boletim Condecorado"**

O v3 mantém o dado como protagonista e acrescenta o que faltava ao boletim: acabamento. A casca é institucional e premium, em dois temas compostos (escuro e claro), não invertidos. A personalidade não vem de cor nem de enfeite de tela, vem de objetos desenhados com cuidado: o escudo de nível, a medalha com fita e metal, a moeda do top 3, o anel de progresso. Esses emblemas são onde o sistema gasta toda a sua ornamentação.

O azul-marinho (`header`, `header-2`) é a única região de cor grande: barra superior, cabeçalho da sidebar, cartão de nível e painel de marca da entrada. O resto da tela é neutro com leve tom azul (matiz próximo de 250), nos dois temas. A paleta é restrita: neutros, um azul de ação, ouro, metais dessaturados e dois estados. O ouro é só de conquista. Sobre superfície neutra o texto dourado usa `gold-ink`; sobre o azul-marinho usa `gold`.

O movimento é pouco e autoral: cada tela tem um momento coreografado (o escudo recebe um brilho, a linha de evolução se desenha, as ondas da entrada se traçam, o anel de uma medalha bloqueada fecha até o progresso) e os números-chave são contados de zero até o valor. Todo o resto responde a estado em 150 ms. O sistema recusa o template de app gamificado: cards arco-íris, glows, pódio de blocos, roxo, verde-água, laranja, emoji, rótulo em caixa alta acima de título.

**Key Characteristics:**
- Dois temas com os mesmos nomes de token, trocados por `[data-theme]`; preferência sistema, claro ou escuro, aplicada antes da primeira pintura.
- Um bloco grande de cor, o azul-marinho; o resto é neutro azulado.
- Um azul de ação (`primary` em preenchimento, `accent` em texto e ícone).
- Ouro só para conquista; metais dessaturados só para raridade e top 3.
- Emblemas desenhados em SVG com degradês de metal, não ícones soltos.
- Um momento de movimento autoral por tela e números contados; o resto em 150 ms.
- Números tabulares em formato pt-BR em todo dado.
- Ícones lucide de traço 1.75, nenhum emoji.

## Colors

Duas paletas com a mesma estrutura. Os tokens vivem em `src/app/globals.css`: o tema escuro é o padrão em `:root` e `[data-theme="dark"]`; o claro sobrescreve em `[data-theme="light"]`. As chaves do frontmatter sem prefixo são os valores do tema escuro; as chaves com prefixo `light-` são os valores do tema claro. `on-header`, `on-primary`, `shadow-card` e `shadow-pop` são descritos abaixo. O mapeamento para utilitários está em `@theme inline` (`--color-<nome>`).

### Primary
- **Azul de ação** (`primary` #1f6fd1 escuro, #1a63c4 claro): fundo do botão primário, do avatar do aluno logado e do contador de avisos. Hover em `primary-hover` (#2b7ce0 escuro, #1556ab claro). O texto sobre ele é `on-primary` (#ffffff nos dois temas).
- **Azul de seleção** (`accent` #5b9cf0 escuro, #1a63c4 claro): texto de ação, ícone e item ativo do menu, aba ativa, chip selecionado, linha do gráfico de evolução, ponto de não lido, contorno de foco de 2px, cursor de campo e seleção de texto (a 35%). No claro coincide com `primary`.

### Secondary
- **Azul-marinho do cabeçalho** (`header` #0f2a47 escuro, #12345a claro): início do degradê da barra superior, do cabeçalho da sidebar, do cartão de nível, do bloco de gamificação da Início, do painel de marca da entrada e da fita das medalhas.
- **Azul-marinho 2** (`header-2` #173d66 escuro, #1b4a7d claro): fim do degradê do azul-marinho e campo do escudo de nível. O degradê `header` para `header-2` é o único gradiente de superfície do sistema.
- **Texto sobre o azul-marinho** (`on-header` #ffffff nos dois temas; `on-header-muted` #b9c9dc escuro, #c3d3e6 claro): títulos, datas e rótulos dentro das regiões azul-marinho.
- **Azul profundo** (`navy-deep` #123a66 escuro, #154a85 claro): reservado à coluna de horas da grade de horários.
- **Azul do logotipo** (`brand` #3d86e6 escuro, #1a63c4 claro): logotipo "Inatel" em itálico. Sobre o azul-marinho o logotipo vai em branco. Não é cor de ação.

### Tertiary
- **Superfícies do menu** (`sidebar` #0b1017 escuro, #ffffff claro; `sidebar-active` #172131 escuro, #e9f1fc claro): fundo da sidebar e do drawer, e fundo do item ativo ou em hover. Texto em `sidebar-fg` (#dfe6ee escuro, #1b2633 claro) e ícone inativo em `sidebar-muted` (#7f8b9b escuro, #6b778a claro). O token `drawer` é alias de `sidebar`.

### Neutral
- **Fundo** (`bg` #080b10 escuro, #f2f4f8 claro): fundo da página.
- **Superfície 1** (`surface-1` #0f141b escuro, #ffffff claro): painel, lista, barra inferior e campo do aluno no ranking.
- **Superfície 2** (`surface-2` #151b24 escuro, #f5f7fa claro): botão secundário, bottom sheet, caixa da fórmula e hover de linha.
- **Superfície 3** (`surface-3` #1d2530 escuro, #eaeef3 claro): trilho de progresso, avatar neutro, active de linha e face de medalha bloqueada.
- **Superfície 4** (`surface-4` #28313e escuro, #dde3eb claro): barra de rolagem, anel de medalha bloqueada no claro e indicador de carrossel inativo.
- **Linha** (`line` #1e2631 escuro, #e2e7ee claro): separador de lista e borda de painel.
- **Linha forte** (`line-strong` #2e3947 escuro, #cdd5e0 claro): contorno de chip e de botão secundário, vão da disputa.
- **Texto** (`fg` #eef2f7 escuro, #0e1724 claro): texto principal e títulos.
- **Texto secundário** (`muted` #9ba7b6 escuro, #536074 claro): rótulos, datas, unidades.
- **Texto terciário** (`subtle` #6c7889 escuro, #7f8ba0 claro): item inativo da barra inferior, eixo do gráfico e termos da fórmula.

### Achievement and rarity
- **Ouro** (`gold` #e8b64a escuro, #dca42b claro): pontos sobre o azul-marinho, anel e aro do escudo de nível, trilha de XP, ponto do top 3, meta de medalha. É preenchimento e texto sobre azul-marinho.
- **Tinta do ouro** (`gold-ink` #f0c25e escuro, #8f6407 claro): o ouro como texto ou ícone sobre superfície neutra ("Top 3", "Você lidera", ícone de Conquistas e Ranking, selo "Desbloqueada"). No claro é escurecido para manter contraste.
- **Metais de raridade** (`bronze` #c99168 escuro, #a8693c claro; `silver` #c3cad6 escuro, #7f8a99 claro; `platinum` #a9dbe8 escuro, #3f93ab claro): ponto de raridade, medalha e moedas de 2º e 3º lugares. No claro os tokens são escurecidos para servir de texto; a arte clareia o token via `--m` (ver Medalha) para continuar parecendo metal.

### State
- **Erro** (`danger` #ff6b61 escuro, #d13b30 claro): erro de login, aviso importante, nota abaixo de 60 e faltas perto do limite.
- **Sucesso** (`success` #45c58a escuro, #1d8a59 claro): subida de posição ("Subiu 2", "subiu 2").

### Named Rules
**A Regra do Azul Único.** O azul-marinho é a única região de cor grande de cada tela. Um segundo bloco de cor grande, em qualquer matiz, quebra a regra. O azul de ação marca ação e seleção e não decora título, fundo de seção nem ícone.

**A Regra do Ouro Conquistado.** Ouro só aparece onde há conquista ou progresso de gamificação: pontos, nível, medalha, top 3 e meta de medalha. Sobre superfície neutra o texto dourado é `gold-ink`; sobre o azul-marinho é `gold`. O ponto de aviso não lido no sino usa `danger`, porque é alerta e não conquista.

**A Regra dos Dois Temas.** Todo componente usa tokens, nunca hex, e funciona nos dois temas com os mesmos nomes. Toda cor nova nasce nos dois blocos de `globals.css` ao mesmo tempo. O tema claro não é o escuro invertido: neutros azulados claros, azul-marinho mais saturado, ouro escurecido para texto.

## Typography

**Display Font:** Inter (com `ui-sans-serif`, `system-ui`, `-apple-system`, Segoe UI, Roboto, sans-serif), via `next/font/google` na variável `--font-inter`.
**Body Font:** Inter, a mesma família.
**Label/Mono Font:** nenhuma monoespaçada. Números usam Inter com `font-variant-numeric: tabular-nums`, pela classe `.num`. O `body` ativa `cv11` e `ss01`.

**Character:** Sans neutra e legível. O peso e o tamanho do numeral fazem a hierarquia: dados grandes e firmes, rótulos pequenos e calmos. A escala abaixo lista todos os degraus em uso no build; cada um existe por um papel e nenhum é intermediário solto.

### Hierarchy
- **Marca** (800 itálico, 76px, 88px em `xl`, line-height 1): só o logotipo "Inatel" no painel de marca da entrada. Em outras telas o logotipo tem 26px (sidebar) e herda o peso 800.
- **Display** (600, 56px no mobile, 64px no desktop, line-height 0.9, tracking -0.03em): a posição no ranking ("4º"). Sempre com `.num`.
- **Numeral** (600, 30px, 32px, 34px, tracking -0.025em, line-height 1): pontos do nível (30px no resumo desktop, 34px no bloco de gamificação da Início), saudação ("Olá, Lucas", 26px mobile e 30px desktop) e demais números-chave. 28px é o numeral da posição no bloco de gamificação. O degrau de 32px é um numeral intermediário presente no build. Com `.num` e contados de zero.
- **Headline** (600, 21px, 26px, tracking -0.025em): título do aviso aberto (21px no sheet, 26px no leitor) e saudação da Início. Os termos da fórmula do Cálculo usam 19px. No cabeçalho, o título de página (500, 19px no mobile, 22px no desktop) é o **header-title**.
- **Title** (600, 15px, 16px, 17px): títulos de seção (`SectionHeading` 15px, 16px no desktop), nome da aula (17px), "Hoje" (17px), nome de medalha.
- **Body** (400 e 500, 14px, 15px, 16px, 17px): descrições e textos de aviso (15px na lista, 16px no leitor compacto, 17px no leitor desktop com line-height 1.7 e largura máxima de 68ch). 14px em metadados densos e linhas do menu desktop.
- **Label** (500 e 600, 12px, 13px): rótulos de chip, curso, cabeçalhos de tabela, unidades "pts", selos.
- **Caption** (500, 11px): eixo do gráfico, termos da fórmula, rótulo da barra inferior, "Top 3" na régua, intervalo da faixa de pontuação. Nunca em texto corrido.

### Named Rules
**A Regra do Número Tabular.** Todo dado numérico recebe `.num`. Formato pt-BR: milhar com ponto (1.420), decimal com vírgula (87,0), percentual sem espaço (97%), ordinal com º (4º).

**A Regra do Número Contado.** Número-chave de uma tela (pontos, posição, pontuação) é contado de zero até o valor uma vez ao montar, por `useCountUp` (0,8 a 1,1 s, `--ease-out-expo`). Tabelas inteiras não contam. Com `prefers-reduced-motion` o valor final aparece direto.

**A Regra da Escala Fechada.** Tamanho de fonte novo só entra se for um dos degraus acima. O tamanho de 76px e 88px é exclusivo do logotipo da entrada.

## Layout

O corte é 1024px (`lg`), o mesmo do app real. Abaixo vale o mobile; a partir dele, o desktop. `xl` em 1280px.

**Desktop (≥1024px):**
- Sidebar fixa de 248px em `lg` e 264px em `xl`: cabeçalho de 64px em degradê azul-marinho com o logotipo em branco e "Acadêmico", lista de seis itens, e rodapé com o cartão do aluno (iniciais em `primary` dentro de anel de nível em ouro) e "Sair".
- Barra superior de 64px em degradê azul-marinho (`header` para `header-2`), com título à esquerda, data por extenso abaixo, e à direita o botão de tema e o sino de avisos com ponto `danger` quando há não lidos.
- Página de largura máxima 1240px, padding lateral de 24px (`lg`) e 32px (`xl`), topo de 24px e 32px, respiro inferior de 56px.
- `SplitLayout`: coluna fluida e painel lateral sticky de 300px em `lg` e 360px em `xl`, gap de 24px e 32px.
- Início: coluna principal (saudação com alertas e linha do tempo de "Hoje") e coluna lateral (bloco de gamificação e avisos recentes). A linha do tempo tem coluna de horário de 64px à esquerda e marca de "agora" com ponto e fio em `accent`.
- Avisos: lista de 360px (400px em `xl`) e leitor sticky ao lado.
- Entrada: duas colunas, painel de marca de 44% (máximo 680px) à esquerda e conteúdo de até 380px à direita.

**Mobile (<1024px):**
- Cabeçalho de 56px em degradê azul-marinho, com menu de 40px, título, botão de tema e sino. Área segura superior respeitada.
- Drawer com 84% da largura (máximo 312px), mesma lista de seis itens, com cabeçalho do usuário em degradê.
- Coluna única, padding lateral de 16px, topo de 16px.
- Barra inferior de 64px com cinco destinos de mesma largura: Início, Desempenho, Conquistas, Ranking, Agenda. Avisos fica no sino do cabeçalho e no drawer. Respeita a área segura inferior.
- Aulas de hoje em carrossel com snap (cartões de 86% da largura, máximo 360px) e indicadores; detalhe em bottom sheet de até 88dvh.

**Menu (seis itens):** Início, Avisos, Conquistas e Ranking, Desempenho, Agenda e Configurações. Desempenho agrupa Notas, Frequência e Coeficientes em abas; Agenda agrupa Horários, Provas e Monitores. Configurações fica separada por linha e traz o seletor de tema (Sistema, Claro, Escuro).

## Elevation & Depth

Híbrido contido. Painéis e listas repousam com uma sombra suave de cartão; camadas que flutuam (popover de ajuda) usam a sombra de pop; véus escurecem o fundo atrás de drawer e sheet. Cor e linha de 1px continuam fazendo a maior parte da separação.

### Shadow Vocabulary
- **Cartão** (`--shadow-card`): escuro `0 1px 0 rgba(255,255,255,0.03) inset, 0 8px 24px -12px rgba(0,0,0,0.6)`; claro `0 1px 2px rgba(16,32,56,0.05), 0 8px 24px -14px rgba(16,32,56,0.18)`. Em `Panel`, listas de aviso, cartão de aula, cartão de gamificação, herói de posição, top 3 e cartão de nível.
- **Pop** (`--shadow-pop`): escuro `0 24px 48px -16px rgba(0,0,0,0.7)`; claro `0 24px 48px -16px rgba(16,32,56,0.28)`. Só no popover de ajuda das medalhas.
- **Borda do drawer** (`8px 0 32px rgba(0,0,0,0.5)`): drawer mobile sobre o véu.
- **Véus**: `bg-black/60` atrás do drawer, `bg-black/70` atrás do bottom sheet.
- **Sombra de arte**: os emblemas têm `feDropShadow` interno (escudo 0,35; medalha 0,26; moeda `0 1px 2px rgba(0,0,0,0.18)`) para parecerem objetos. Não é sombra de interface.
- **Brilho de metal** (`.sheen`): `linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.22) 50%, transparent 65%)` em fundo de 220%, deslocado por `--animate-sheen` (1,1 s, `--ease-out-expo`). É um efeito do sistema, aplicado só sobre medalha conquistada (no hover e foco da medalha, ou uma vez ao montar). O escudo de nível usa o mesmo gesto em SVG com branco a 55% no pico.

### Named Rules
**A Regra da Sombra de Cartão.** `shadow-card` é a única sombra de repouso e só vai em superfície que agrupa um bloco real. Estado se mostra com borda ou cor; hover não eleva. Sem glow, sem borda luminosa.

## Shapes

Três raios e um de sheet. `card` de 14px (`--radius-card`) para painéis, cartões e regiões azul-marinho. `control` de 10px (`--radius-control`) para botões, campo de busca, itens de menu e linhas tocáveis. Pílula de 9999px para chip, selo, barra de progresso, avatar, selo de remetente e botão de cabeçalho. Bottom sheet com 22px nos cantos superiores.

Silhuetas de arte são o que dá identidade: o escudo de nível (viewBox 64 por 72, aro de ouro, campo azul-marinho, fio interno e divisa), a medalha circular com aro, parede, face abaulada e fita em duas tiras, a moeda de metal do top 3 e o anel de progresso. Linhas de ranking e disputa usam 10px (`control`); a faixa de pontuação do Top 3 usa o mesmo raio.

## Components

Componentes são sóbrios; os emblemas é que carregam personalidade. Painel sobre `surface-1` com linha e sombra de cartão; ação clara; chip em contorno.

**A Regra da Lista antes do Card.** Dados repetidos são listas com separadores de `line`. `Panel` só agrupa um bloco real, e card dentro de card é proibido. As exceções medidas são o cartão de aula dentro da linha do tempo e o top 3, cada um uma unidade de dado.

### Buttons
- **Shape:** `control` 10px, altura 44px.
- **Primary:** fundo `primary`, texto `on-primary`, peso 500 em 15px, padding horizontal de 16px (20px nos links de ação), sombra `shadow-sm` leve. Hover em `primary-hover` em 150 ms; active escala a 0,99 (0,98 nos links).
- **Secondary:** fundo `surface-2`, borda de 1px `line-strong`, texto `fg`, hover `surface-3`. É o botão dos atalhos Conquistas e Ranking, com ícone em `gold-ink`.
- **Ghost:** texto `accent`, hover com `accent` a 10%. Ações de baixa ênfase ("Ver todos", "Semana").
- **Foco:** contorno de 2px em `accent` com offset de 2px, global.

### Chips (filtros)
- **Style:** pílula, borda de 1px `line-strong`, fundo transparente, texto `muted`, 13px peso 500. Altura de 36px, abaixo do alvo de 44px; é dívida registrada, não padrão.
- **State:** selecionado com borda `accent` a 60%, fundo `accent` a 15%, texto `fg` e `aria-pressed`. No mobile o grupo rola na horizontal sem barra; no desktop quebra linha.

### Cards / Containers
- **Corner Style:** `card` 14px. **Background:** `surface-1`. **Border:** 1px `line`. **Shadow:** `shadow-card`.
- **Padding interno:** 16px (`p-4`), 20px (`p-5`) e 24px no herói de posição em `xl`.
- **Região azul-marinho (panel-brand):** degradê `header` para `header-2`, texto `on-header`, anel interno de 1px `on-header` a 10%. Usada no cartão de nível e no topo do bloco de gamificação. Na Início, o topo do bloco de gamificação leva ondas concêntricas finas (círculos de 1px em branco com opacidade de 9% a 4%).

### Badges
- **Style:** pílula de 24px, texto 12px peso 600, fundo a 12% ou 15% da cor do tom. Tons: neutro (`muted` sobre `surface-3`), accent, gold (texto `gold-ink`) e danger.

### Selo de remetente
Círculo de 32px ou 40px com ícone lucide e anel de 1px interno no tom do remetente: accent para CRA, gold (`gold-ink`) para Suporte Estudantil, neutro para os demais. Substitui avatar de letra em Avisos e Início.

### Progress
- **Barra simples:** trilho de 6px em `surface-3`, preenchimento `accent`, `gold` para meta de medalha, `danger` para limite estourado. Preenche em 500 ms.
- **Trilha de XP:** barra de 10px do nível 1 ao 9 sobre o azul-marinho, com vãos de 3px por máscara em cada marco de nível, trecho do nível atual realçado, preenchimento em degradê de ouro, animada em 0,9 s.
- **Anel:** círculo de traço de 3px a 4px, com fundo de `surface-3` (ou branco a 14% sobre azul-marinho) e arco em `gold` ou `accent`, desenhado em 0,8 s.

### Emblema de nível (EmblemaNivel)
Escudo em SVG: aro em degradê de ouro, campo em degradê `header-2` para `header` escurecido, fio interno de ouro a 50%, divisa no alto e o número em `on-header`, 700. Um brilho branco passa uma vez ao montar (1,1 s). Tamanhos: 57 por 64px no mobile, 75 por 84px no desktop.

### Medalha (MedalEmblem)
- **Conquistada:** disco metálico com aro em degradê, parede interna, face abaulada com brilho elíptico, ícone lucide gravado (traço 2) em tom do metal e fita em duas tiras azul-marinho com filete do metal. O tom do metal é `--m`: no escuro é o token direto; no claro é o token clareado por `color-mix` (bronze 74%, prata 50%, ouro 90%, platina 42% sobre branco). O `.sheen` passa no hover, no foco ou uma vez ao montar.
- **Bloqueada:** disco cinza (`surface-2` a `surface-3`), ícone em `subtle`, anel de progresso em volta (trilho `surface-4` no claro e `surface-3` no escuro, arco `accent` de 3,2 de traço) e cadeado discreto no fecho. O anel é o dado.
- **Moeda de metal (MoedaMetal):** círculo com degradê radial, aro interno e o número da posição, no top 3 e na tabela de raridades. 1º ouro, 2º prata, 3º bronze.

### Herói de posição
Cartão de três colunas em `xl` (220px, fluida, 300px): posição em Display contada até o valor, pontuação, selo de variação (verde para subiu); evolução no geral como gráfico SVG de linha (eixo invertido, 1º no topo, linha de `accent` que se desenha em 0,8 s, ponto final preenchido e faixa tracejada de Top 3 em `gold`, rótulo em `gold-ink`); e a disputa como escada (acima, você, abaixo) com a distância em pontos entre cada um. Em filtros que não são o geral, a evolução dá lugar a uma régua de pontuações com o Top 3 em ouro e você em `accent`.

### Top 3 e Cálculo
- **Top 3:** três cartões de 14px, o 1º um degrau acima, cada um com moeda de metal, nome, curso e pontuação. Sem blocos de pódio esticados.
- **Cálculo:** a fórmula como fração real (pontos sobre créditos), vezes presença, igual à pontuação, dentro de caixa `surface-2`, com `role="math"` e a explicação do fator de presença e da normalização em lista de `line`. Sempre visível.

### Navigation
- **Item de menu (sidebar e drawer):** 44px, ícone de 20px. Inativo: texto `sidebar-fg`, ícone `sidebar-muted`. Ativo: fundo `sidebar-active`, texto `fg` peso 500, ícone `accent` e barra de 3px em `accent` na borda esquerda. Contador de avisos em pílula `accent` com texto `on-primary`.
- **Cabeçalho:** botões de 40px redondos com texto `on-header` e hover em branco a 10%; o tema alterna entre sol e lua.
- **Barra inferior:** 64px, fundo `surface-1` a 95% com blur, ícone de 20px dentro de pílula de 48 por 28px. Ativo: texto `fg`, ícone `accent`, pílula `accent` a 15% que desliza entre destinos por mola (rigidez 520, amortecimento 40). Inativo: `subtle`. Rótulo em 11px.
- **SectionTabs (Desempenho, Agenda, Conquistas e Ranking):** sticky no topo, 48px, texto 15px, indicador de 2px em `accent` que desliza entre as abas pela mesma mola.
- **Seletor de tema:** controle segmentado (Sistema, Claro, Escuro) em Configurações, com indicador deslizante.

### Linha do tempo de hoje
Cada aula é um cartão de 14px (borda `accent` a 45% e anel a 15% quando é a próxima ou está acontecendo, opacidade 60% quando encerrada), com código, tipo, nome, local, pílulas de faltas e média (vermelhas perto do limite) e, quando há prova, faixa de `accent` no topo. O horário fica na coluna de 64px à esquerda e a marca de "agora" divide passado e futuro.

### Iconography
Lucide React, `strokeWidth` 1.75 como padrão. Exceções medidas: 1.5 no perfil do cabeçalho do usuário, 2 e 2.25 em setas e selos pequenos, 2 a 2.4 dentro dos emblemas. Tamanhos: 20px no menu, 21 a 24px no cabeçalho, 14px em pílulas. Nenhum emoji, nenhum caractere como ícone.

### Motion
`--ease-out-expo` (cubic-bezier(0.16, 1, 0.3, 1)) é o easing de tudo que entra.
- **Entrada de seção** (`--animate-enter`, 0,24 s): 6px de deslocamento vertical e opacidade, ao trocar de seção (não entre abas).
- **Momento autoral por tela:** brilho do escudo (1,1 s), desenho da linha de evolução (0,8 s), ondas da entrada (10 anéis, 1,1 s, só na primeira tela da visita), anel de progresso da medalha bloqueada (0,8 s), brilho `--animate-sheen` (1,1 s).
- **Número contado:** `useCountUp`, 0,8 a 1,1 s.
- **Estado:** cor, fundo e borda em 150 ms; indicadores e painéis em 200 ms.
- **Drawer e sheet:** mola (amortecimento 34, rigidez 380); véus em 180 ms. A barra de progresso simples leva 500 ms.
- `prefers-reduced-motion` reduz animações e transições a 0,01 ms em `globals.css`, e os componentes com `motion` desenham o estado final direto.

**A Regra do Movimento Autoral.** Cada tela tem no máximo um momento coreografado, que acontece uma vez ao montar, e nenhum movimento decorativo em laço. Todo o resto responde a estado.

### Entrada (login e perfis)
No desktop, painel de marca à esquerda em degradê azul-marinho com ondas concêntricas finas saindo do canto inferior direito e três pontos de sinal, logotipo em branco de 76px (88px em `xl`) e rodapé "Protótipo acadêmico, dados fictícios". No mobile, barra "Acadêmico" e coluna central. O conteúdo sobe em sequência curta (0,45 s, intervalo de 0,06 s).

## Do's and Don'ts

### Do:
- **Do** usar tokens, nunca hex, e conferir cada tela nos dois temas.
- **Do** usar o degradê `header` para `header-2` só nas regiões azul-marinho (barra superior, cabeçalho da sidebar, cartão de nível, topo do bloco de gamificação, painel de marca, cabeçalho do drawer).
- **Do** usar `primary` para preenchimento de ação e `accent` para texto, ícone e estado.
- **Do** reservar ouro para pontos, nível, medalha, top 3 e meta de medalha: `gold` sobre azul-marinho, `gold-ink` sobre superfície neutra.
- **Do** desenhar conquista como objeto (escudo, medalha, moeda, anel), com degradê de metal e `--m` no claro clareado.
- **Do** marcar cada número com `.num`, formatá-lo em pt-BR e contar o número-chave da tela com `useCountUp`.
- **Do** manter a fórmula do ranking visível ao lado da pontuação do aluno.
- **Do** manter alvos de toque em 44px, foco visível com contorno de 2px em `accent` e rótulos acessíveis nos emblemas decorativos (`aria-hidden` no SVG, texto ao lado).
- **Do** usar sentence case em títulos e rótulos.
- **Do** usar só os degraus da escala tipográfica registrada.

### Don't:
- **Don't** usar ouro em botão, link, aviso comum ou destaque decorativo.
- **Don't** criar uma segunda região de cor grande ou usar roxo, verde-água, laranja ou cor por pessoa.
- **Don't** colocar card dentro de card, nem usar `Panel` para um item de lista.
- **Don't** usar glow, borda luminosa, gradiente em painel neutro ou pódio de blocos; o único degradê de superfície é o azul-marinho.
- **Don't** escrever rótulo em caixa alta acima de título.
- **Don't** usar emoji nem travessão no texto.
- **Don't** usar bronze, prata ou platina fora de medalha e de 2º e 3º lugares.
- **Don't** usar ícone de caractere ou de fonte: só lucide, e só SVG desenhado nos emblemas.
- **Don't** animar em laço, nem encadear mais de um momento coreografado por tela, nem passar de 250 ms em transição de interface (exceções medidas: preenchimento de barra a 500 ms e os momentos autorais).
- **Don't** repetir fora de token valores soltos do build, como o branco a 14% do trilho do anel de nível e o `rgba(255,255,255,0.04)` do inset da sombra de cartão: ambos vivem em seus componentes e no `globals.css`, e novas telas usam os tokens.
- **Don't** usar o texto de 11px em corpo de leitura nem os 76px e 88px fora do logotipo da entrada.
