---
name: Acadêmico Inatel
description: "Casca escura do app oficial da Inatel, com dados no lugar de frases, azul-marinho no topo e um só azul de ação."
colors:
  bg: "#000000"
  surface-1: "#0f0f11"
  surface-2: "#17171a"
  surface-3: "#222226"
  surface-4: "#2c2c31"
  drawer: "#2b2b2e"
  line: "#232327"
  line-strong: "#36363b"
  fg: "#f4f4f6"
  muted: "#a3a3aa"
  subtle: "#6f6f77"
  header: "#1d3b5a"
  navy-deep: "#0d3f73"
  brand: "#1f6fd1"
  accent: "#4b8fe8"
  primary: "#0b5cbf"
  primary-hover: "#1468d1"
  gold: "#e5b443"
  bronze: "#c08a5a"
  silver: "#b9c0cb"
  platinum: "#a9d6e5"
  danger: "#ff6b5e"
typography:
  display:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "48px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "normal"
  headline:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "22px"
    fontWeight: 500
    letterSpacing: "normal"
  title:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    letterSpacing: "normal"
rounded:
  card: "12px"
  control: "10px"
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
    textColor: "#ffffff"
    rounded: "{rounded.control}"
    height: "44px"
    padding: "0 16px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "#ffffff"
    rounded: "{rounded.control}"
    height: "44px"
  button-secondary:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.fg}"
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
    rounded: "{rounded.card}"
    padding: "{spacing.panel}"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.pill}"
  progress-bar:
    backgroundColor: "{colors.surface-3}"
    rounded: "{rounded.pill}"
    height: "6px"
---

# Design System: Acadêmico Inatel

## Overview

**Creative North Star: "O Boletim Afinado"**

O app é o acadêmico oficial da Inatel afinado para o módulo de gamificação. A casca é a do app real: fundo preto (`bg`), cabeçalho azul-marinho (`header`), menu cinza (`drawer`) com cabeçalho em degradê azul. Sobre essa casca, a informação aparece como dado: nível, pontos, posição e fórmula em números tabulares, sem frase explicando o que o número já diz. O aluno lê um boletim, não uma vitrine.

A densidade é a de um boletim: listas com linhas finas de 1px (`line`), separadores e poucas superfícies. O sistema recusa o template de app gamificado colorido, com cards arco-íris, glows, pódio de blocos com degradê, roxo, verde-água ou laranja. O dourado é reservado à conquista e o azul à ação e à seleção. Nenhum emoji, nenhum travessão no texto, nenhum rótulo em caixa alta acima de título.

**Key Characteristics:**
- Preto e grafite como base, azul-marinho só no topo e na coluna de horas.
- Um azul de ação; dourado só para conquista.
- Listas e tabelas antes de cards.
- Números tabulares e formato pt-BR em todo dado.
- Ícones lucide de traço 1.75, nenhum emoji.
- Movimento só como resposta a estado, de 150 a 250 ms.

## Colors

Paleta de base escura com quatro papéis: base e superfícies, ação, conquista com metais de raridade, e estado. As chaves do frontmatter são os nomes dos tokens de `src/app/globals.css` (bloco `@theme`) sem o prefixo `--color-`.

### Primary
- **Azul de ação** (`primary` #0b5cbf): fundo do botão primário e do avatar do aluno logado (`Avatar` com `eu`). Hover em `primary-hover` (#1468d1).
- **Azul de seleção** (`accent` #4b8fe8): texto de ação, ícone e item ativo do menu, aba ativa, chip selecionado (borda a 60% e fundo a 15%), barra de progresso padrão, contorno de foco de 2px e cursor de campo. É o mesmo azul de ação em intensidade de texto.

### Secondary
- **Azul-marinho do cabeçalho** (`header` #1d3b5a): barra superior do desktop, cabeçalho do mobile e cabeçalho da sidebar com o logotipo.
- **Azul da coluna de horas** (`navy-deep` #0d3f73): coluna de horas na grade de horários. Só aparece ali.
- **Cinza do menu** (`drawer` #2b2b2e): sidebar do desktop e drawer do mobile.

### Tertiary
- **Azul do logotipo** (`brand` #1f6fd1): logotipo "Inatel" em itálico. Não é cor de ação.

### Neutral
- **Preto** (`bg` #000000): fundo da página.
- **Grafite 1** (`surface-1` #0f0f11): painel (Panel), tabela e bloco de lista.
- **Grafite 2** (`surface-2` #17171a): botão secundário, bottom sheet e linha de ranking em foco.
- **Grafite 3** (`surface-3` #222226): trilho da barra de progresso, avatar neutro e hover de botão secundário.
- **Grafite 4** (`surface-4` #2c2c31): barra de rolagem e selo de cadeado da medalha bloqueada.
- **Linha** (`line` #232327): separadores de lista e borda de painel.
- **Linha forte** (`line-strong` #36363b): contorno de chip e de botão secundário.
- **Texto** (`fg` #f4f4f6): texto principal e títulos.
- **Texto secundário** (`muted` #a3a3aa): rótulos, datas, unidades e cabeçalhos de tabela.
- **Texto terciário** (`subtle` #6f6f77): itens inativos da barra inferior e medalha bloqueada.

### Achievement and rarity
- **Dourado de conquista** (`gold` #e5b443): pontos, nível, medalha desbloqueada, 1º lugar e meta de medalha.
- **Metais de raridade** (`bronze` #c08a5a, `silver` #b9c0cb, `platinum` #a9d6e5): anel e ícone da medalha por raridade e 2º e 3º lugares do ranking. São metais dessaturados da mesma família, com saturação e luminosidade próximas.

### State
- **Vermelho de erro** (`danger` #ff6b5e): erro de login, aviso importante do CRA e nota abaixo de 60.

### Named Rules
**A Regra da Voz Única.** O azul marca ação e seleção. Não é decoração de título, fundo de seção nem ícone de enfeite.

**A Regra do Ouro Conquistado.** Dourado só aparece onde há conquista ou progresso de gamificação: pontos, nível, medalha, 1º lugar e meta de medalha. Dourado em botão, link ou aviso comum quebra a regra.

## Typography

**Display Font:** Inter (com `ui-sans-serif`, `system-ui`, `-apple-system`, Segoe UI, Roboto, sans-serif), carregada por `next/font/google` na variável `--font-inter`.
**Body Font:** Inter, a mesma família.
**Label/Mono Font:** nenhuma fonte monoespaçada. Os números usam Inter com `font-variant-numeric: tabular-nums`, pela classe `.num`.

**Character:** Sans neutra e legível em tela pequena. O peso decide a hierarquia; o tamanho quase não muda, porque a informação é dado. Ativa o conjunto de estilo `cv11` e `ss01` no `body`.

### Hierarchy
- **Display** (600, 48px no desktop com line-height 1, 36px no mobile): a posição no ranking ("4º") e os grandes números de conquista ("97%"). Sempre com `.num`.
- **Headline** (500, 22px no desktop; 400, 20px no mobile): título da página no cabeçalho, vindo da rota.
- **Title** (600, 15px; 16px no desktop): títulos de seção (`SectionHeading`) e nomes de medalha.
- **Body** (400, 15px; 14px em trechos densos): descrições e textos de aviso. Line-height herdado do preflight do Tailwind (1.5).
- **Label** (500, 13px; 12px em metadados, 11px só na barra inferior): rótulos de chip, curso e período, cabeçalhos de tabela.

### Named Rules
**A Regra do Número Tabular.** Todo dado numérico recebe a classe num. Formato pt-BR: milhar com ponto (1.420), decimal com vírgula (87,0), percentual sem espaço (97%), ordinal com º (4º).

## Layout

O corte é em 1024px (`lg`), o mesmo do app real. Abaixo dele vale o modelo mobile; a partir dele, o desktop.

**Desktop (≥1024px):**
- Sidebar fixa à esquerda: 232px em `lg`, 264px em `xl` (≥1280px). Cabeçalho de 64px em `header` com o logotipo, cabeçalho do usuário com degradê, seções do menu e o botão "Sair" de 48px fixo no rodapé.
- Barra superior de 64px em `header`, com o título da página à esquerda e padding horizontal de 32px.
- Página com largura máxima de 1240px, padding de 24px (`lg`) e 32px (`xl`) nas laterais e no topo, e 56px de respiro inferior.
- `SplitLayout`: coluna principal fluida e painel de detalhe fixo de 300px em `lg` e 360px em `xl`, com gap de 24px e 32px. O painel é sticky a 24px ou 32px do topo.

**Mobile (<1024px):**
- Cabeçalho de 56px em `header`, com botão de menu de 44px (alvo de toque) e área segura superior.
- Drawer de menu com 84% da largura, no máximo 312px, deslizando da esquerda. É a mesma lista da sidebar.
- Coluna única com padding lateral de 16px e topo de 16px.
- Barra inferior de 64px com quatro atalhos de mesma largura: Avisos, Conquistas, Ranking e Horários. Respeita a área segura inferior.
- Detalhe em bottom sheet: até 88dvh de altura, cantos superiores de 22px, puxador de 36px por 4px.

## Elevation & Depth

O sistema é plano. A profundidade vem de tom, do degradê de superfícies (`bg`, `surface-1` a `surface-4`) e de linhas de 1px (`line`, `line-strong`). Há uma única sombra, na borda do drawer mobile, sobre um véu escuro.

### Shadow Vocabulary
- **Borda do drawer** (`box-shadow: 8px 0 32px rgba(0,0,0,0.5)`): só no menu mobile, sobre o véu.
- **Véu do drawer** (`rgba(0,0,0,0.6)`, `bg-black/60`) e **véu do bottom sheet** (`rgba(0,0,0,0.7)`, `bg-black/70`): cobrem a tela atrás de uma camada de navegação ou detalhe.

### Named Rules
**A Regra do Plano por Padrão.** Superfícies são planas em repouso. Estado se mostra com borda ou cor, não com elevação. A única sombra é a borda do drawer mobile.

## Shapes

Três raios. `card` de 12px (`--radius-card`) para painéis. `control` de 10px (`--radius-control`) para botões e campo de busca. Pílula de 9999px para chip, badge, barra de progresso, bolha de ícone e medalha. A separação entre blocos é feita por linha de 1px e por lista, não por contorno de caixa.

Formas de medalha são círculos perfeitos com anel de 3px no metal da raridade e anel interno de 1px a 30% de opacidade. O cadeado de medalha bloqueada é um selo circular de `surface-4` no canto inferior direito.

Linhas de ranking usam 8px (`rounded-lg`) e a tile de conquista usa 12px (`rounded-xl`). São desvios do sistema de três raios, não regra.

## Components

Componentes são discretos e funcionais: o botão é claro, o chip é contorno, o painel é grafite com linha. Nenhum tem sombra.

**A Regra da Lista antes do Card.** Dados repetidos são listas ou tabelas com separadores. Panel só agrupa um bloco real, e card dentro de card é proibido.

### Buttons
- **Shape:** `control` 10px (`--radius-control`), altura de 44px como alvo de toque.
- **Primary:** fundo `primary` (#0b5cbf), texto branco, peso 500 em 15px, padding horizontal de 16px. Usado para Autenticar, Abrir e confirmações. O build tem uma borda #1e5fa0 fora de token: ver Don'ts.
- **Hover / Focus:** hover troca só o fundo para `primary-hover` em 150ms. Foco visível é contorno de 2px em `accent`, com offset de 2px. Active escala a 0.99.
- **Secondary:** fundo `surface-2`, borda de 1px `line-strong`, texto `fg`; hover em `surface-3`.
- **Ghost:** texto `accent`, hover com fundo de `accent` a 10%. Para ações de baixa ênfase dentro de listas.

### Chips (filtros)
- **Style:** pílula, borda de 1px `line-strong`, fundo transparente, texto `muted`, peso 500 em 13px. A altura atual é de 36px, abaixo do alvo de 44px definido em PRODUCT.md. A regra vale; o valor do chip é dívida, não padrão.
- **State:** selecionado usa borda `accent` a 60%, fundo `accent` a 15% e texto `fg`, marcado com `aria-pressed`. No mobile o grupo rola na horizontal sem barra visível; no desktop quebra linha.

### Cards / Containers
- **Corner Style:** `card` 12px.
- **Background:** `surface-1`.
- **Shadow Strategy:** nenhuma; ver Elevation & Depth.
- **Border:** 1px `line`.
- **Internal Padding:** 20px (`p-5`) no painel de detalhe e no bloco "Sua posição"; 16px (`p-4`) nos blocos menores.
- Panel só agrupa um bloco real: resumo, painel de detalhe, cálculo. Card dentro de card é proibido. Dados repetidos são listas ou tabelas com separadores de `line`: avisos, notas, frequência, horários, monitores e ranking.

### Badges
- **Style:** pílula de 24px de altura, texto 12px com peso 600. Tons: neutro (`muted` sobre `surface-3`), accent, gold e danger, cada um com fundo a 15% da cor do tom.
- **Uso:** rótulo curto como "Você" (accent), "Desbloqueada" (gold) e avisos importantes (danger).

### Progress
- **Style:** trilho de 6px em `surface-3`, pílula. Preenchimento padrão em `accent`; em `gold` para meta de medalha; em `danger` para limite estourado. O preenchimento anima em 500 ms.

### Medal (MedalEmblem)
- **Style:** disco de `surface-3` com anel de 3px no metal da raridade, em gradiente vertical que escurece até 62%, e anel interno de 1px. O ícone lucide fica centralizado a 42% do tamanho do emblema, na cor do metal.
- **Bloqueada:** anel e ícone passam a `subtle`, com opacidade de 60%, e recebem o selo de cadeado.
- **Tamanho:** 56px nas listas; maior no painel de detalhe.

### Navigation
- **Sidebar item:** 40px de altura no desktop (14px, 15px em `xl`) e 48px no drawer. Ícone de 20px em `muted`, ativo em `accent`. Ativo: fundo branco a 8% e texto branco. Hover: fundo branco a 4%.
- **Títulos de seção do menu:** sentence case, 13px, em cinza claro.
- **Barra inferior (mobile):** quatro atalhos de 64px. Ícone de 20px dentro de pílula de 48 por 28px. Ativo: texto `fg`, pílula de `accent` a 15%, ícone `accent`. Inativo: `subtle`. Rótulo em 11px, peso 500.
- **Abas Conquistas e Ranking:** 48px de altura, texto 15px, indicador de 2px em `accent` que desliza entre as abas em 200ms.

### Resumo de nível (signature)
Faixa com o círculo do nível (36px no mobile, 48px no desktop, anel `gold`), título do nível, barra de progresso em `accent` até o próximo nível e três números: medalhas (6/12), posição (4º) e presença em laboratório (97%). O bloco do nível fica à esquerda, a barra no meio e os números à direita.

### Painel "Sua posição" (signature)
Posição em Display, pontuação com unidade "pts", a disputa com quem está logo acima e logo abaixo (setas lucide com a diferença) e a fórmula em uma linha: (pontos ÷ créditos) × presença = pontuação. A fórmula fica sempre visível, sem clique, para que o aluno confira o próprio cálculo.

### Iconography
Lucide React com `strokeWidth` de 1.75 em todo lugar. Exceções medidas: 1.5 no ícone de perfil do cabeçalho do usuário e 2 no selo de nível e no cadeado. Tamanhos: 20px (`size-5`) no menu e na barra inferior, 24px (`size-6`) nas ações do cabeçalho, 14px (`size-3.5`) dentro de pílulas. Nenhum emoji, nenhum caractere como ícone, nenhum ícone de fonte.

### Motion
Movimento responde a estado. `--ease-out-expo` (cubic-bezier(0.16, 1, 0.3, 1)) é o easing de entrada, e `--animate-enter` (0.22s) entra o conteúdo com 4px de deslocamento vertical e opacidade.
- Cor, fundo e borda: 150ms.
- Indicador de aba e transições de painel: 200ms, easeOut.
- Barra de progresso: 500ms ao preencher, a única exceção medida.
- Bottom sheet e drawer: mola (damping 34, stiffness 380). Véus: 180ms.
- `prefers-reduced-motion` reduz animações e transições a 0.01ms em `globals.css`.

**A Regra do Movimento de Estado.** Movimento responde a hover, seleção e abertura. Transições de interface ficam entre 150 e 250 ms, e a barra de progresso é a única exceção medida (500 ms).

## Do's and Don'ts

### Do:
- Do usar primary (#0b5cbf) para botão preenchido e accent (#4b8fe8) para texto, ícone e estado de ação.
- Do reservar gold (#e5b443) para pontos, nível, medalhas, 1º lugar e metas de medalha.
- Do marcar cada número com a classe num e formatá-lo em pt-BR (1.420, 87,0, 97%, 4º).
- Do usar lista ou tabela com separadores de line para dados repetidos.
- Do manter a fórmula do ranking sempre visível ao lado da pontuação do aluno.
- Do manter alvos de toque em 44px e foco visível com contorno de 2px em accent.
- Do usar sentence case em títulos e rótulos.
- Do usar o degradê azul apenas no cabeçalho do usuário do menu, como no app real.

### Don't:
- Don't usar dourado em botão, link, aviso comum ou destaque decorativo.
- Don't usar roxo, verde-água, laranja ou cor por pessoa.
- Don't colocar card dentro de card, nem usar Panel para um item de lista.
- Don't usar sombra de cartão, glow, borda luminosa ou gradiente em painéis ou pódios de blocos.
- Don't escrever rótulo em caixa alta acima de título (kicker ou eyebrow).
- Don't usar emoji nem travessão no texto.
- Don't usar bronze, prata ou platina fora de medalha e de 2º e 3º lugares.
- Don't usar ícone de caractere ou de fonte: só lucide.
- Don't animar fora de estado nem passar de 250 ms em transição de interface.
- Don't repetir os valores fora de token do build (#17457f, #0b63d6, #1e5fa0, #e4e4e7, #c9c9cf, #b4b4ba) em novas telas: use os tokens.
