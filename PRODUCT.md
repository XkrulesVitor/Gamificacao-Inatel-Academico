# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Alunos de graduação da Inatel. A persona da User Story é Lucas, Engenharia de Software, 4º período, com rotina intensa de disciplinas e projetos práticos em laboratório. Ele abre o app entre aulas e laboratórios, no celular, para checar avisos, notas, frequência e horários. Na versão desktop o mesmo aluno usa o portal no notebook ou num computador do laboratório, e o professor avalia o protótipo projetado em sala.

## Product Purpose

Protótipo acadêmico da disciplina S05 (Interface Homem-Máquina) sobre o tema "o que mudar no aplicativo acadêmico". Mantém a navegação do App Acadêmico da Inatel, enxuga o menu e adiciona o módulo de gamificação de Suporte Estudantil: Conquistas por medalhas e Ranking proporcional por créditos e presença em laboratórios. Sucesso: o aluno entende em segundos seu nível, o que falta para a próxima medalha e sua posição justa entre colegas.

## Positioning

Ranking normalizado: Pontos Ponderados = (Total de Pontos ÷ Créditos Matriculados) × Fator de Presença em Labs, com peso por laboratório. Quem cursa menos disciplinas não fica em desvantagem, e assiduidade em laboratório pesa mais.

## Operating Context

Uso rápido no celular entre aulas (consulta de segundos), instalado como PWA. No desktop, uso com mouse e teclado em tela larga, e apresentação em projetor. Os artefatos de origem são a User Story, a HTA ("como será") e o Diagrama de Classes do aluno, além de prints do app real.

## Capabilities and Constraints

- Sem backend e sem banco de dados: todos os dados são mock e fictícios; sessão mock em localStorage.
- Next.js 16 (App Router), React 19, Tailwind CSS 4, deploy na Vercel a partir do GitHub.
- Rotas: perfis salvos, login, Avisos, Conquistas, Ranking, Notas, Frequência, Coeficientes, Provas, Horários de Aula, Monitores, Configurações.
- Menu enxuto: itens de baixo uso do app real foram removidos.
- Mobile: menu lateral do app real mais barra inferior com Avisos, Conquistas, Ranking e Horários.
- Desktop: sidebar fixa com as mesmas seções do menu, conteúdo em colunas.

## Brand Commitments

- Fidelidade à identidade do app real (prints em `../prints`): fundo preto, cabeçalho azul-marinho, menu lateral cinza com seções, cabeçalho do menu em degradê azul, logotipo "Inatel" em azul itálico, grade de horários com coluna de horas azul.
- Paleta enxuta: azul para ações e seleção, dourado apenas para conquistas.
- Preferências do autor: nenhum emoji (sempre ícones), nenhum travessão no texto, nada de texto óbvio ou sobrando.

## Evidence on Hand

- Prints do app real: `../prints/*.jpeg` (perfis salvos, login, avisos, menu, horários, monitores).
- Artefatos: `../docs/` (User Story e HTA, Diagrama de Classes, slides da aula).
- Não existem dados reais de alunos, notas ou ranking; nada disso pode ser apresentado como real.

## Product Principles

1. Familiar primeiro: quem usa o app oficial reconhece a navegação na hora.
2. O número fala: posição, pontos e progresso aparecem como dado, sem frase explicando.
3. Justiça visível: a fórmula e o próprio cálculo do aluno estão sempre a um toque.
4. Cor com significado: dourado só para conquista, azul só para ação e seleção.

## Accessibility & Inclusion

Contraste AA no tema escuro, alvos de toque de 44px, foco visível, navegação por teclado no desktop, respeito a `prefers-reduced-motion`.
