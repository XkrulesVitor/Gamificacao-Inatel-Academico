<div align="center">

<img src="docs/screenshots/v2/d04-ranking.png" alt="Ranking na versão desktop: sidebar, pódio, tabela e painel Sua posição" width="100%">

<table align="center">
  <tr>
    <td align="center"><img src="docs/screenshots/v2/m03-avisos.png" width="200" alt="Avisos no celular"></td>
    <td align="center"><img src="docs/screenshots/v2/m05-conquistas.png" width="200" alt="Conquistas no celular"></td>
    <td align="center"><img src="docs/screenshots/v2/m08-ranking.png" width="200" alt="Ranking no celular"></td>
  </tr>
</table>

# App Acadêmico Inatel + Gamificação

**Conquistas por medalhas e ranking proporcional por créditos e presença em laboratórios, dentro da navegação do app Acadêmico. Versão 2, com desktop real.**

<br>

![Next.js](https://img.shields.io/badge/Next.js_16-111111?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-2F5D95?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-1E293B?style=flat-square&logo=tailwindcss&logoColor=38BDF8)
![PWA](https://img.shields.io/badge/PWA-3F3F46?style=flat-square&logo=pwa&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-111111?style=flat-square&logo=vercel&logoColor=white)

<br>

### [Abrir o app](https://gamificacao-inatel-academico.vercel.app) &nbsp;·&nbsp; [Código](https://github.com/XkrulesVitor/Gamificacao-Inatel-Academico)

<sub>S05 / S205 · Interface Homem-Máquina · Engenharia de Software · Inatel</sub>

</div>

---

## Sumário

1. [Sobre](#sobre)
2. [Acesse](#acesse)
3. [Telas](#telas)
4. [O que mudou na v2](#o-que-mudou-na-v2)
5. [User Story](#user-story)
6. [HTA → implementação](#hta--implementação)
7. [Diagrama de Classes](#diagrama-de-classes)
8. [Ranking justo](#ranking-justo)
9. [Medalhas e níveis](#medalhas-e-níveis)
10. [Navegação](#navegação)
11. [Design system](#design-system)
12. [Heurísticas de Nielsen](#heurísticas-de-nielsen)
13. [PWA](#pwa)
14. [Tecnologias e arquitetura](#tecnologias-e-arquitetura)
15. [Rodando localmente](#rodando-localmente)
16. [Como foi feito](#como-foi-feito)
17. [Aviso](#aviso)
18. [Autor](#autor)

---

## Sobre

Trabalho da disciplina S05 / S205 Interface Homem-Máquina. Tema da turma: "O que mudar no aplicativo acadêmico". Eixo escolhido: Suporte Estudantil, com gamificação e engajamento entre alunos.

| Item | Detalhe |
|---|---|
| Tipo | Protótipo navegável, 100% mockado |
| Backend e banco | Não há. Páginas estáticas, sessão fake no `localStorage` |
| Base visual | App Acadêmico da Inatel: fundo preto, cabeçalho azul-marinho, menu cinza por seções |
| Artefatos de origem | User Story, HTA e Diagrama de Classes |
| Plataformas | Celular (PWA) e desktop |

Entregas:

- **Conquistas:** 12 medalhas (6 conquistadas, 6 bloqueadas) em quatro raridades, com regra e progresso.
- **Ranking proporcional:** pontos divididos por créditos e ponderados pela presença em laboratórios.
- **Filtros:** geral, curso, período e três laboratórios, com a posição do aluno destacada.
- **Social:** pódio, Disputa (quem está acima e abaixo), medalhas de colaboração, privacidade do nome.
- **Telas acadêmicas:** Notas, Frequência, Coeficientes, Provas, Horários de Aula e Monitores.
- **PWA** instalável com offline básico.

---

## Acesse

<div align="center">

<a href="https://gamificacao-inatel-academico.vercel.app"><img src="docs/screenshots/qrcode.png" alt="QR code para abrir o app" width="160"></a>

**[gamificacao-inatel-academico.vercel.app](https://gamificacao-inatel-academico.vercel.app)**

</div>

### Conta demo

1. Em **Perfis Salvos**, toque em **Lucas Andrade Ferreira · GES-412**.
   Alternativa: **Outro Usuário**, curso **Engenharia de Software**, matrícula **412**.
2. Digite qualquer senha.

> [!WARNING]
> Não digite sua senha real. Nada é enviado a servidor. A sessão é um flag no `localStorage` e qualquer senha é aceita.

---

## Telas

### Desktop (1440 px)

<table align="center">
  <tr>
    <td align="center" valign="top"><img src="docs/screenshots/v2/d01-perfis-salvos.png" width="420" alt="Perfis Salvos no desktop"><br><sub><b>Perfis Salvos</b><br>entrada</sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v2/d02-avisos.png" width="420" alt="Avisos no desktop"><br><sub><b>Avisos</b><br>caixa de entrada com leitor</sub></td>
  </tr>
  <tr>
    <td align="center" valign="top"><img src="docs/screenshots/v2/d03-conquistas.png" width="420" alt="Conquistas no desktop"><br><sub><b>Conquistas</b><br>grade e painel da medalha</sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v2/d04-ranking.png" width="420" alt="Ranking no desktop"><br><sub><b>Ranking</b><br>pódio, tabela, Sua posição, Cálculo</sub></td>
  </tr>
  <tr>
    <td align="center" valign="top"><img src="docs/screenshots/v2/d05-ranking-lab.png" width="420" alt="Ranking filtrado por laboratório"><br><sub><b>Ranking por laboratório</b><br>chip de laboratório ativo</sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v2/d06-notas.png" width="420" alt="Notas no desktop"><br><sub><b>Notas</b><br>tabela</sub></td>
  </tr>
  <tr>
    <td align="center" valign="top"><img src="docs/screenshots/v2/d07-frequencia.png" width="420" alt="Frequência no desktop"><br><sub><b>Frequência</b><br>tabela</sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v2/d08-coeficientes.png" width="420" alt="Coeficientes no desktop"><br><sub><b>Coeficientes</b></sub></td>
  </tr>
  <tr>
    <td align="center" valign="top"><img src="docs/screenshots/v2/d09-provas.png" width="420" alt="Provas no desktop"><br><sub><b>Provas</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v2/d10-horarios.png" width="420" alt="Horários de Aula no desktop"><br><sub><b>Horários de Aula</b><br>grade e painel da aula</sub></td>
  </tr>
  <tr>
    <td align="center" valign="top"><img src="docs/screenshots/v2/d11-monitores.png" width="420" alt="Monitores no desktop"><br><sub><b>Monitores</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v2/d12-configuracoes.png" width="420" alt="Configurações no desktop"><br><sub><b>Configurações</b><br>privacidade e sobre</sub></td>
  </tr>
</table>

### Mobile (390 px)

<table align="center">
  <tr>
    <td align="center" valign="top"><img src="docs/screenshots/v2/m01-perfis-salvos.png" width="200" alt="Perfis Salvos"><br><sub><b>Perfis Salvos</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v2/m02-login.png" width="200" alt="Login"><br><sub><b>Login</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v2/m03-avisos.png" width="200" alt="Avisos"><br><sub><b>Avisos</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v2/m04-menu.png" width="200" alt="Menu lateral"><br><sub><b>Menu lateral</b></sub></td>
  </tr>
  <tr>
    <td align="center" valign="top"><img src="docs/screenshots/v2/m05-conquistas.png" width="200" alt="Conquistas"><br><sub><b>Conquistas</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v2/m06-medalha-bloqueada.png" width="200" alt="Medalha bloqueada"><br><sub><b>Medalha bloqueada</b><br>bottom sheet</sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v2/m07-medalha-conquistada.png" width="200" alt="Medalha conquistada"><br><sub><b>Medalha conquistada</b><br>bottom sheet</sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v2/m08-ranking.png" width="200" alt="Ranking"><br><sub><b>Ranking</b></sub></td>
  </tr>
  <tr>
    <td align="center" valign="top"><img src="docs/screenshots/v2/m09-ranking-lista.png" width="200" alt="Lista do ranking"><br><sub><b>Classificação</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v2/m10-ranking-lab.png" width="200" alt="Ranking por laboratório"><br><sub><b>Por laboratório</b><br>E08 · L1</sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v2/m11-notas.png" width="200" alt="Notas"><br><sub><b>Notas</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v2/m12-frequencia.png" width="200" alt="Frequência"><br><sub><b>Frequência</b></sub></td>
  </tr>
  <tr>
    <td align="center" valign="top"><img src="docs/screenshots/v2/m13-coeficientes.png" width="200" alt="Coeficientes"><br><sub><b>Coeficientes</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v2/m14-provas.png" width="200" alt="Provas"><br><sub><b>Provas</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v2/m15-horarios.png" width="200" alt="Horários de Aula"><br><sub><b>Horários</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v2/m16-horario-detalhe.png" width="200" alt="Detalhe da aula"><br><sub><b>Detalhe da aula</b><br>bottom sheet</sub></td>
  </tr>
  <tr>
    <td align="center" valign="top"><img src="docs/screenshots/v2/m17-monitores.png" width="200" alt="Monitores"><br><sub><b>Monitores</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v2/m18-configuracoes.png" width="200" alt="Configurações"><br><sub><b>Configurações</b></sub></td>
    <td></td>
    <td></td>
  </tr>
</table>

---

## O que mudou na v2

| Área | v1 | v2 |
|---|---|---|
| Desktop | Moldura de celular | Layout real: sidebar fixa (264 px, ou 232 px entre 1024 e 1279 px), barra superior azul-marinho, conteúdo em colunas com painel de detalhe |
| Sidebar | Não existia | Mesmas seções do menu do app, cabeçalho do aluno em degradê azul |
| Mobile | Menu lateral | Menu lateral do app real, barra inferior (Avisos, Conquistas, Ranking, Horários) e detalhes em bottom sheet |
| Avisos | Lista | Caixa de entrada com leitor ao lado e resumo do aluno |
| Conquistas | Grade de cards | Grade de emblemas SVG e painel da medalha com regra, progresso e atividade recente |
| Ranking | Menu suspenso | Filtro em chips, pódio sóbrio, painéis Sua posição, Disputa e Cálculo |
| Notas e Frequência | Cards | Tabelas |
| Horários | Grade com sheet | Grade com painel da aula no desktop e bottom sheet no mobile |
| Visual | Cores variadas | Design system enxuto (ver [Design system](#design-system)) |
| Texto | Emojis nos títulos | Nenhum emoji, nenhum travessão |

Detalhes:

- **Medalhas:** emblema SVG próprio. Anel no metal da raridade. Bloqueadas em cinza, com cadeado e barra de progresso.
- **Ranking:** chips Geral, Meu curso, 4º período, S05 · L1, E08 · L1 e F03 · L4. Equação do cálculo com rótulos. Comparação "Sem normalização 11º → 4º".
- **Processo:** skill de design Impeccable, com `PRODUCT.md`, contrato de direção, detector sem achados e revisão final independente. Veja [Como foi feito](#como-foi-feito).

---

## User Story

**Persona: Lucas**, estudante de Engenharia, 4º período, com rotina intensa de disciplinas e projetos práticos em laboratório.

> **COMO** Lucas, um estudante de Engenharia engajado em evoluir seu desempenho,
> **EU QUERO** visualizar minhas conquistas por medalhas na aba **"Conquistas"** e consultar minha classificação proporcional por créditos e presença em laboratórios na aba **"Ranking"** dentro do App Inatel,
> **PARA QUE** eu mantenha a motivação ao longo do semestre, compreenda claramente os critérios para desbloqueio de novas badges e compita de forma justa com outros estudantes.

---

## HTA → implementação

A Análise Hierárquica de Tarefas (Annett & Duncan, 1967) descreve o "como será" do uso do módulo.

```text
0. Acompanhar Desempenho Gamificado              plano 1 > 2 / 3
├── 1. Acessar Módulo
│   ├── 1.1 Login no App                          ● pré-requisito
│   └── 1.2 Abrir Menu
├── 2. Explorar Conquistas
│   ├── A. Ver Medalhas
│   └── B. Requisitos                             * iteração
└── 3. Consultar Ranking
    ├── 3.1 Ver Pontos
    └── 3.2 Filtrar Labs                          ○ opcional
```

| Nó da HTA | Onde está no app | Rota | Componente / arquivo |
|---|---|---|---|
| **0.** Acompanhar Desempenho Gamificado | Resumo de nível e duas abas no topo do módulo | `/gamificacao` | `gamificacao/nivel-resumo.tsx`, `abas.tsx` |
| **1.1** Login no App | Perfis Salvos e Login com validação | `/` e `/login` | `app/page.tsx`, `app/login/page.tsx`, `session-provider.tsx` |
| **1.2** Abrir Menu | Sidebar fixa no desktop. No mobile, menu lateral e barra inferior com Conquistas e Ranking. Seção Suporte Estudantil com selo de novidade | `/avisos` | `shell/sidebar.tsx`, `shell/app-drawer.tsx`, `shell/bottom-tabs.tsx`, `shell/nav-list.tsx`, `lib/nav.ts` |
| **2.** Explorar Conquistas | Grade com filtro Todas, Conquistadas, Bloqueadas | `/gamificacao/conquistas` | `gamificacao/medal-emblem.tsx` |
| **2.A** Ver Medalhas | Emblemas por raridade. Bloqueadas em cinza com cadeado | `/gamificacao/conquistas` | `medal-emblem.tsx` |
| **2.B** Requisitos *(iteração)* | Painel lateral no desktop e bottom sheet no mobile, com regra, progresso e pendência. O botão de ajuda explica o sistema | `/gamificacao/conquistas` | `medal-detail.tsx`, `ajuda-medalhas.tsx`, `ui/bottom-sheet.tsx` |
| **3.** Consultar Ranking | Pódio, tabela, painel Sua posição e Disputa | `/gamificacao/ranking` | `podio.tsx`, `lista-ranking.tsx`, `posicao-painel.tsx`, `lib/ranking.ts` |
| **3.1** Ver Pontos | Pontuação ponderada por aluno e Cálculo com a conta do próprio usuário | `/gamificacao/ranking` | `lista-ranking.tsx`, `posicao-painel.tsx` |
| **3.2** Filtrar Labs *(opcional)* | Chips de visão e de laboratório. A lista recarrega e destaca o aluno | `/gamificacao/ranking` | `lib/ranking.ts` (`opcoesFiltro`, `carregarRanking`) |

Recomendações da HTA implementadas:

- Cálculo normalizado do ranking (créditos e presença).
- Atalho para o módulo na home, na barra inferior e na sidebar.
- Medalhas bloqueadas em cinza, com progresso percentual e regra pendente.
- Filtro por curso, período e laboratório, com recarregamento instantâneo.
- Peso maior para assiduidade em laboratórios.

---

## Diagrama de Classes

Fluxo de informações do módulo, reproduzido em Mermaid.

```mermaid
classDiagram
    direction LR

    class Aluno {
        -String nome
        -String matricula
        -int pontos
        +autenticar()
    }
    class ModuloGamificacao {
        -String abaAtiva
        +abrirConquistas()
        +abrirRanking()
    }
    class Medalha {
        -String nome
        -String requisito
        -boolean desbloqueada
        +verRequisitos()
    }
    class Ranking {
        -Filtro filtro
        +carregar()
        +filtrar(filtro)
    }
    class Laboratorio {
        -String nome
        -float peso
    }

    Aluno "1" --> "1" ModuloGamificacao : acessa
    Aluno "1" --> "0..*" Medalha : conquista
    ModuloGamificacao "1" o-- "0..*" Medalha : exibe
    ModuloGamificacao "1" *-- "1" Ranking : contém
    Ranking "1" --> "0..*" Aluno : classifica
    Ranking "1" --> "0..1" Laboratorio : filtra por
```

| Diagrama | Implementação |
|---|---|
| `Aluno`, `Medalha`, `Laboratorio` | Interfaces em `src/lib/types.ts`, estendidas para as telas acadêmicas |
| `Ranking.carregar()` e `filtrar(filtro)` | Função única `carregarRanking(filtro)` em `src/lib/ranking.ts` |
| `Ranking` ◆ `ModuloGamificacao` | A aba Ranking só existe no módulo. Ranking e Conquistas compartilham `gamificacao/layout.tsx` |
| `abaAtiva`, `abrirConquistas()`, `abrirRanking()` | Rotas `/gamificacao/*` com abas (`abas.tsx`). A aba ativa é a rota atual |
| `ModuloGamificacao` ◇ `Medalha` | O módulo exibe as medalhas, mas elas existem à parte (`mock/gamificacao.ts`) |
| `Medalha.verRequisitos()` | Painel ou bottom sheet em `medal-detail.tsx` |
| `Aluno.autenticar()` | Sessão fake em `session-provider.tsx`, flag no `localStorage` |
| `Laboratorio.peso` | S05 · L1 ×1,2, E08 · L1 ×1,5, F03 · L4 ×1,3 |

---

## Ranking justo

Ranking por pontos brutos favorece quem cursa mais matérias. O protótipo normaliza:

```text
Pontos Ponderados = (Total de Pontos ÷ Créditos Matriculados) × Fator de Presença em Labs

Fator de Presença = 0,5 + presença        (de 0,5 a 1,5)
```

- Dividir por créditos evita favorecer quem cursa mais matérias.
- O fator de presença dá peso à assiduidade nos laboratórios práticos.
- Filtro por laboratório: usa pontos, créditos e presença daquele laboratório e multiplica pelo peso do lab.

Exemplo: Lucas → (1.420 ÷ 24) × 1,47 = **87,0** → 4º geral.

| Aluno | Pontos brutos | Créditos | Presença em labs | Posição só por pontos | Pontos ponderados | Posição no ranking |
|---|---:|---:|---:|:---:|---:|:---:|
| Marina Costa Lima | 980 | 14 | 100% | 16º | **105,0** | **1º** |
| **Lucas Andrade Ferreira** (você) | 1.420 | 24 | 97% | 11º | **87,0** | **4º** |
| Gabriel Souza | 1.710 | 28 | 92% | 4º | **86,7** | **5º** |
| Ana Júlia Prado | 2.050 | 32 | 80% | 1º | **83,3** | **6º** |
| Isabela Duarte | 1.980 | 30 | 70% | 2º | **79,2** | **7º** |

Sem normalização, Lucas ficaria em 11º. No painel Cálculo do desktop, a linha "Sem normalização 11º → 4º" mostra essa diferença.

---

## Medalhas e níveis

12 medalhas: 6 conquistadas e 6 bloqueadas. Cada raridade vale pontos ao desbloquear.

| Raridade | Pontos |
|---|---:|
| Bronze | 50 |
| Prata | 100 |
| Ouro | 200 |
| Platina | 400 |

<details>
<summary><b>Ver as 12 medalhas</b></summary>

<br>

**Conquistadas (6)**

| Medalha | Raridade |
|---|---|
| Nota 100 | Ouro |
| Largada Perfeita | Bronze |
| Madrugador | Prata |
| Maratona de Labs | Prata |
| Top 10 do Curso | Prata |
| Sempre no Prazo | Bronze |

**Bloqueadas (6)**

| Medalha | Raridade | Progresso |
|---|---|---:|
| Frequência Plena em Labs | Platina | 97% |
| CR > 85 | Ouro | 95% |
| Sequência Imbatível | Ouro | 66% |
| Parceiro de Monitoria | Bronze | 60% |
| Espírito de Equipe | Prata | 66% |
| Pódio Geral | Platina | 0% |

</details>

| Nível | Título | Pontos mínimos |
|:---:|---|---:|
| 1 | Calouro | 0 |
| 2 | Curioso | 150 |
| 3 | Dedicado | 350 |
| 4 | Persistente | 600 |
| 5 | Destaque | 900 |
| **6** | **Veterano de Labs** (Lucas, 1.420 pts) | 1.250 |
| 7 | Engenheiro Júnior | 1.650 |
| 8 | Referência | 2.100 |
| 9 | Lenda do Inatel | 2.600 |

Dimensão social: Disputa (distância para quem está acima e abaixo), pódio, medalhas de colaboração e a preferência "Exibir meu nome no ranking" em Configurações.

---

## Navegação

O menu mantém as seções do app real, sem os itens de baixo uso (heurística 8).

| Seção | Itens |
|---|---|
| Mensagens Acadêmicas | Avisos |
| **Suporte Estudantil** | **Conquistas**, **Ranking** (novos) |
| Aproveitamento Escolar | Notas, Frequência, Coeficientes |
| Calendários e Horários | Provas, Horários de Aula, Horários de Monitores |
| Outras Opções | Configurações, Sair |

| Plataforma | Estrutura |
|---|---|
| Desktop (a partir de 1024 px) | Sidebar fixa com todas as seções |
| Mobile | Menu lateral com todas as seções e barra inferior com Avisos, Conquistas, Ranking e Horários |

<details>
<summary><b>Itens removidos do menu original (14)</b></summary>

<br>

- Material Didático
- Plano de Ensino
- Histórico
- Atividades Complementares (Avaliações, Frequência, Eletivas, Obrigatórias)
- Calendário Acadêmico
- Eventos Inatel
- Reposições
- Cronograma de Aula
- Tesouraria
- Consulta de Pedidos
- Avaliação Docente
- Pesquisa Institucional
- Central de Cópias
- Requerimentos

Lista em `itensRemovidos`, `src/lib/nav.ts`.

</details>

---

## Design system

Paleta enxuta, definida como tokens em `@theme` no `src/app/globals.css`.

| Token | Valor | Papel |
|---|---|---|
| `--color-bg` | `#000000` | Fundo do app, como no app real |
| `--color-surface-1` a `-4` | `#0f0f11` a `#2c2c31` | Superfícies grafite: painéis, linhas, chips |
| `--color-drawer` | `#2b2b2e` | Fundo do menu lateral e da sidebar |
| `--color-line`, `--color-line-strong` | `#232327`, `#36363b` | Divisórias finas no lugar de cards |
| `--color-fg`, `--color-muted`, `--color-subtle` | `#f4f4f6`, `#a3a3aa`, `#6f6f77` | Texto principal, secundário e terciário |
| `--color-header` | `#1d3b5a` | Barra superior azul-marinho |
| `--color-brand`, `--color-primary` | `#1f6fd1`, `#0b5cbf` | Único azul de ação: botão, seleção, foco |
| `--color-gold` | `#e5b443` | Somente conquista: nível, pontos ganhos, selo |
| `--color-bronze`, `-silver`, `-platinum` | `#c08a5a`, `#b9c0cb`, `#a9d6e5` | Metais dessaturados só para raridade e pódio |
| `--color-danger`, `--color-success` | `#ff6b5e`, `#4cc38a` | Estados de erro e de aprovação |

Regras de craft:

- Ícones lucide, traço 1.75.
- Números tabulares em pontos, notas e horas.
- Listas e tabelas no lugar de cards aninhados.
- Pódio com degraus neutros, sem degradê.
- Alvos de toque de 44 px, foco visível, `prefers-reduced-motion` respeitado.
- Nenhum emoji, nenhum travessão.

---

## Heurísticas de Nielsen

| # | Heurística | Exemplo no app |
|:---:|---|---|
| 1 | Visibilidade do status do sistema | Resumo de nível com barra de progresso, painel Sua posição (4º de 20), progresso nas medalhas bloqueadas |
| 2 | Correspondência com o mundo real | Créditos, presença, laboratório, NP1 e NP2. Grade de horários como a do app |
| 3 | Controle e liberdade do usuário | Bottom sheets fecham com X, ESC ou arrastando. Chips de filtro reversíveis |
| 4 | Consistência e padrões | Mesmas seções e identidade do app oficial (Lei de Jakob) |
| 5 | Prevenção de erros | Validação dos campos no login e confirmação ao sair |
| 6 | Reconhecimento em vez de memorização | Regra visível no painel da medalha. Cálculo exibido com os números do aluno |
| 7 | Flexibilidade e eficiência | Barra inferior com 4 atalhos, sidebar fixa no desktop, atalhos do PWA |
| 8 | Design estético e minimalista | Menu sem 14 itens de baixo uso, paleta enxuta, dados no lugar de frases |
| 9 | Recuperação de erros | Mensagens construtivas no login |
| 10 | Ajuda e documentação | Botão de ajuda nas medalhas e painel Cálculo no ranking |

---

## PWA

- **Manifest** (`src/app/manifest.ts`): ícones `any` e `maskable`, atalhos para Conquistas, Ranking e Avisos.
- **Service worker próprio** (`public/sw.js`), sem dependências, registrado só em produção.
- Safe-areas do iPhone respeitadas.

| Tipo de requisição | Estratégia |
|---|---|
| Navegação | network-first, fallback para cache e depois `public/offline.html` |
| Estáticos (`/_next/static/`, `/icons/`) | cache-first |
| Demais da mesma origem | stale-while-revalidate |

| Plataforma | Instalação |
|---|---|
| Android (Chrome) | Menu ⋮, Instalar app |
| iPhone (Safari) | Compartilhar, Adicionar à Tela de Início |
| Desktop | Abre no layout desktop, com sidebar |

---

## Tecnologias e arquitetura

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16.4 (App Router, Turbopack, páginas estáticas) |
| UI | React 19.3 |
| Linguagem | TypeScript 5 |
| Estilo | Tailwind CSS 4.3, tokens em `@theme` |
| Animações | motion 14 |
| Ícones | lucide-react, clsx |
| Hospedagem | Vercel, deploy a cada push na `main` |

```text
.
├── PRODUCT.md                          # produto, usuários, princípios
├── .impeccable/                        # surfaces/ (contrato de direção) e review/
├── src
│   ├── app
│   │   ├── page.tsx                    # / · Perfis Salvos
│   │   ├── login/
│   │   ├── (app)
│   │   │   ├── avisos/
│   │   │   ├── gamificacao/
│   │   │   │   ├── conquistas/
│   │   │   │   └── ranking/
│   │   │   ├── notas/
│   │   │   ├── frequencia/
│   │   │   ├── coeficientes/
│   │   │   ├── provas/
│   │   │   ├── horarios/
│   │   │   ├── monitores/
│   │   │   └── configuracoes/
│   │   ├── globals.css                 # tokens do design system
│   │   └── manifest.ts
│   ├── components
│   │   ├── shell/                      # app-shell, sidebar, nav-list, user-block,
│   │   │                               # bottom-tabs, app-drawer
│   │   ├── ui/                         # bottom-sheet, portal, primitives
│   │   ├── gamificacao/                # medal-emblem, medal-detail, podio,
│   │   │                               # lista-ranking, posicao-painel, nivel-resumo
│   │   ├── avisos/
│   │   ├── entrada/
│   │   ├── academico/
│   │   └── configuracoes/
│   └── lib
│       ├── types.ts                    # modelo de dados (Diagrama de Classes)
│       ├── ranking.ts                  # fórmula e carregarRanking(filtro)
│       ├── nav.ts                      # menu, barra inferior, itens removidos
│       ├── use-media.ts                # breakpoint desktop (1024 px)
│       ├── format.ts
│       └── mock/                       # aluno.ts, gamificacao.ts
├── public                              # sw.js, offline.html, icons/
├── scripts/gerar-icones.mjs
└── docs/screenshots/                   # qrcode.png e v2/ (d01 a d12, m01 a m18)
```

Dados mockados: disciplinas com os códigos da grade real (S05 Interface Homem-Máquina, S01 Banco de Dados, E08 Eletrônica Digital, F03 Física III, M05 Probabilidade e Estatística, G04 Empreendedorismo e Inovação). Nomes, professores, notas e alunos do ranking são fictícios.

---

## Rodando localmente

Pré-requisito: Node.js 20 ou superior.

```bash
git clone https://github.com/XkrulesVitor/Gamificacao-Inatel-Academico.git
cd Gamificacao-Inatel-Academico
npm install
npm run dev
```

| Comando | O que faz |
|---|---|
| `npm run dev` | Desenvolvimento em http://localhost:3000 |
| `npm run build && npm start` | Build de produção (o service worker só funciona assim) |
| `npm run lint` | ESLint |
| `node scripts/gerar-icones.mjs` | Regenera os ícones do PWA |

---

## Como foi feito

Feito com Claude Code, em modelo diretor e subagentes. A v2 seguiu a skill de design **Impeccable**: `PRODUCT.md`, contrato de direção em `.impeccable/surfaces/src-app.md`, regras de craft, detector sem achados e revisão final independente.

**Claude Opus 5.5** foi diretor de design e revisor: base, shell responsivo, design system e validação por prints em 390 e 1440 px.

| Modelo | Entrega |
|---|---|
| Claude Sonnet 5.5 | Conquistas e Ranking (v2) |
| Claude Sonnet 5.5 | Perfis Salvos, Login, Avisos e Configurações (v2) |
| Claude Haiku 5.5 | Telas acadêmicas (v2) |
| Claude Sonnet 5.5 | Revisão final e este README |
| Claude Haiku 5.5 | PWA: manifest, service worker, ícones (v1) |

---

## Aviso

Protótipo acadêmico não oficial, sem vínculo com o Inatel. Marca e nome pertencem à instituição. Todos os dados são fictícios. Não digite senhas reais.

---

## Autor

**Vitor Hugo Felipe Noronha**

| | |
|---|---|
| Matrícula | GES 708 |
| Curso | Engenharia de Software, Inatel |
| Disciplina | S05 Interface Homem-Máquina |
| GitHub | [@XkrulesVitor](https://github.com/XkrulesVitor) |
