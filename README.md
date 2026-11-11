<div align="center">

<img src="docs/screenshots/capa.png" alt="Capa do projeto: três celulares mostrando Avisos, Conquistas e Ranking do App Acadêmico Inatel com Gamificação" width="100%">

# App Acadêmico Inatel + Gamificação

**Protótipo mobile de conquistas por medalhas e ranking proporcional por créditos e presença em laboratórios, dentro da navegação padrão do app Acadêmico.**

<br>

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

<br>

### [📱 Abrir o app online](https://gamificacao-inatel-academico.vercel.app) &nbsp;·&nbsp; [💻 Ver código](https://github.com/XkrulesVitor/Gamificacao-Inatel-Academico)

<sub>Trabalho de **S05 / S205 · Interface Homem-Máquina** · Engenharia de Software · Inatel</sub>

</div>

---

## 📑 Sumário

1. [Sobre](#-sobre)
2. [Acesse online](#-acesse-online)
3. [Telas](#-telas)
4. [User Story](#-user-story)
5. [HTA → implementação](#-hta--implementação)
6. [Diagrama de Classes](#-diagrama-de-classes)
7. [Ranking justo](#-ranking-justo)
8. [Medalhas e níveis](#-medalhas-e-níveis)
9. [Navegação: o que mudou no menu](#-navegação-o-que-mudou-no-menu)
10. [Heurísticas de Nielsen](#-heurísticas-de-nielsen)
11. [PWA](#-pwa)
12. [Tecnologias e arquitetura](#-tecnologias-e-arquitetura)
13. [Rodando localmente](#-rodando-localmente)
14. [Como foi feito](#-como-foi-feito)
15. [Aviso](#-aviso)
16. [Autor](#-autor)

---

## 🎯 Sobre

Projeto da disciplina **S05 / S205 — Interface Homem-Máquina** (Inatel, Engenharia de Software). O tema da turma foi **"O que mudar no aplicativo acadêmico"**. O eixo escolhido foi **Suporte Estudantil → Gamificação e engajamento acadêmico**, com foco na integração e na gamificação entre alunos.

O resultado é um **protótipo mobile mocado**, sem backend e sem banco de dados. Ele segue a navegação padrão do app Acadêmico da Inatel (tema escuro, cabeçalho azul-marinho, menu lateral dividido em seções). Algumas opções do menu foram removidas, e as telas idealizadas nos artefatos da disciplina (User Story, HTA e Diagrama de Classes) foram adicionadas.

O que o protótipo entrega:

- **Conquistas**: 12 medalhas (6 conquistadas, 6 bloqueadas) em quatro raridades, com regra de desbloqueio e progresso percentual visíveis.
- **Ranking proporcional**: a pontuação considera créditos matriculados e presença em laboratórios, para a comparação ser justa entre quem cursa cargas diferentes.
- **Filtro por curso, período ou laboratório**, com a posição do usuário destacada.
- **Dimensão social**: card "Disputa" (quem está logo acima e abaixo), pódio, medalhas de colaboração e preferência de privacidade.
- **Telas acadêmicas** (Notas, Frequência, Coeficientes, Provas, Horários, Monitores) para o módulo viver dentro de um app completo.
- **PWA instalável** com funcionamento offline básico.

---

## 🌐 Acesse online

<div align="center">

<a href="https://gamificacao-inatel-academico.vercel.app"><img src="docs/screenshots/qrcode.png" alt="QR code para abrir o app online" width="180"></a>

**[https://gamificacao-inatel-academico.vercel.app](https://gamificacao-inatel-academico.vercel.app)**

<sub>Aponte a câmera do celular para o QR code. Deploy automático a cada push na branch `main`.</sub>

</div>

### 🔑 Conta demo

1. Na tela **Perfis Salvos**, toque em **Lucas Andrade Ferreira · GES-412**.
   Alternativa: toque em **Outro Usuário**, escolha **Engenharia de Software** e informe a matrícula **412**.
2. Digite **qualquer senha**.

> [!WARNING]
> **Não digite sua senha real.** Nada é enviado a servidor. A "sessão" é apenas um flag no `localStorage` do navegador e qualquer senha é aceita.

> [!TIP]
> No celular, instale o app (veja [PWA](#-pwa)). No desktop, ele aparece dentro de uma moldura de celular.

---

## 📸 Telas

### 🚪 Entrada

<table align="center">
  <tr>
    <td align="center" valign="top"><img src="docs/screenshots/01-perfis-salvos.png" width="240" alt="Perfis Salvos"><br><sub><b>Perfis Salvos</b><br>escolha do perfil</sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/02-login.png" width="240" alt="Login"><br><sub><b>Login</b><br>com validação e mensagens de erro</sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/03-avisos-home.png" width="240" alt="Avisos"><br><sub><b>Avisos (home)</b><br>com atalho para Conquistas e Ranking</sub></td>
  </tr>
  <tr>
    <td align="center" valign="top"><img src="docs/screenshots/04-menu-lateral.png" width="240" alt="Menu lateral"><br><sub><b>Menu lateral</b><br>enxuto, com o item novo</sub></td>
    <td></td>
    <td></td>
  </tr>
</table>

### 🏅 Gamificação — Conquistas

<table align="center">
  <tr>
    <td align="center" valign="top"><img src="docs/screenshots/05-conquistas.png" width="240" alt="Conquistas"><br><sub><b>Conquistas</b><br>resumo de nível e abas</sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/06-conquistas-grade.png" width="240" alt="Grade de medalhas"><br><sub><b>Grade de medalhas</b><br>filtro Todas / Conquistadas / Bloqueadas</sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/07-medalha-bloqueada.png" width="240" alt="Medalha bloqueada"><br><sub><b>Medalha bloqueada</b><br>regra pendente e % de progresso</sub></td>
  </tr>
  <tr>
    <td align="center" valign="top"><img src="docs/screenshots/08-medalha-conquistada.png" width="240" alt="Medalha conquistada"><br><sub><b>Medalha conquistada</b><br>data e origem da conquista</sub></td>
    <td></td>
    <td></td>
  </tr>
</table>

### 🏆 Gamificação — Ranking

<table align="center">
  <tr>
    <td align="center" valign="top"><img src="docs/screenshots/09-ranking.png" width="240" alt="Ranking"><br><sub><b>Ranking</b><br>pódio e classificação</sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/10-ranking-formula.png" width="240" alt="Como é calculado"><br><sub><b>Como é calculado</b><br>fórmula com a conta do próprio aluno</sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/11-ranking-filtro.png" width="240" alt="Filtro do ranking"><br><sub><b>Filtro</b><br>menu suspenso por visão e laboratório</sub></td>
  </tr>
  <tr>
    <td align="center" valign="top"><img src="docs/screenshots/12-ranking-lab.png" width="240" alt="Ranking por laboratório"><br><sub><b>Ranking por laboratório</b><br>lista recarregada com o peso do lab</sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/13-ranking-disputa.png" width="240" alt="Disputa"><br><sub><b>Disputa</b><br>distância para quem está acima e abaixo</sub></td>
    <td></td>
  </tr>
</table>

### 📚 Telas acadêmicas

<table align="center">
  <tr>
    <td align="center" valign="top"><img src="docs/screenshots/14-notas.png" width="240" alt="Notas"><br><sub><b>Notas</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/15-frequencia.png" width="240" alt="Frequência"><br><sub><b>Frequência</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/16-coeficientes.png" width="240" alt="Coeficientes"><br><sub><b>Coeficientes</b></sub></td>
  </tr>
  <tr>
    <td align="center" valign="top"><img src="docs/screenshots/17-provas.png" width="240" alt="Provas"><br><sub><b>Provas</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/18-horarios.png" width="240" alt="Horários de Aula"><br><sub><b>Horários de Aula</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/19-monitores.png" width="240" alt="Horários de Monitores"><br><sub><b>Horários de Monitores</b></sub></td>
  </tr>
  <tr>
    <td align="center" valign="top"><img src="docs/screenshots/20-configuracoes.png" width="240" alt="Configurações"><br><sub><b>Configurações</b><br>privacidade e sobre o protótipo</sub></td>
    <td></td>
    <td></td>
  </tr>
</table>

### 🖥️ Versão desktop

No desktop o app é exibido dentro de uma moldura de celular.

<table align="center">
  <tr>
    <td align="center" valign="top"><img src="docs/screenshots/desktop-avisos.png" width="300" alt="Avisos no desktop"><br><sub><b>Avisos</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/desktop-conquistas.png" width="300" alt="Conquistas no desktop"><br><sub><b>Conquistas</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/desktop-ranking.png" width="300" alt="Ranking no desktop"><br><sub><b>Ranking</b></sub></td>
  </tr>
</table>

---

## 📝 User Story

**Persona: Lucas**, estudante de Engenharia, 4º período, com rotina intensa de disciplinas e projetos práticos em laboratório.

> **COMO** Lucas, um estudante de Engenharia engajado em evoluir seu desempenho,
> **EU QUERO** visualizar minhas conquistas por medalhas na aba **"Conquistas"** e consultar minha classificação proporcional por créditos e presença em laboratórios na aba **"Ranking"** dentro do App Inatel,
> **PARA QUE** eu mantenha a motivação ao longo do semestre, compreenda claramente os critérios para desbloqueio de novas badges e compita de forma justa com outros estudantes.

---

## 🌳 HTA → implementação

A **Análise Hierárquica de Tarefas** (Annett & Duncan, 1967) descreve o "como será" do uso do módulo.

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

### Onde cada nó da HTA está no app

| Nó da HTA | Onde está no app | Rota | Componente / arquivo |
|---|---|---|---|
| **0.** Acompanhar Desempenho Gamificado | Módulo com resumo de nível e duas abas | `/gamificacao` | `gamificacao/layout.tsx`, `resumo-nivel.tsx`, `abas.tsx` |
| **1.1** Login no App | Perfis Salvos e Login, com validação | `/` e `/login` | `app/page.tsx`, `app/login/page.tsx`, `session-provider.tsx` |
| **1.2** Abrir Menu | Menu lateral com a seção "Suporte Estudantil" e o item "Conquistas e Ranking" (selo *Novo*); também há atalho direto na home | `/avisos` | `shell/app-drawer.tsx`, `lib/nav.ts`, `avisos/atalho-gamificacao.tsx` |
| **2.** Explorar Conquistas | Aba Conquistas com grade filtrável (Todas, Conquistadas, Bloqueadas) | `/gamificacao/conquistas` | `gamificacao/medalha-badge.tsx` |
| **2.A** Ver Medalhas | Grade 3 por linha; bloqueadas em escala monocromática e desbotada | `/gamificacao/conquistas` | `medalha-badge.tsx`, `medalha-sheet.tsx` |
| **2.B** Requisitos *(iteração)* | Bottom sheet da medalha com regra de desbloqueio, progresso percentual e regra pendente; "Como funciona?" explica o sistema | `/gamificacao/conquistas` | `medalha-sheet.tsx`, `ajuda-medalhas-sheet.tsx` |
| **3.** Consultar Ranking | Aba Ranking com pódio, classificação, card Disputa e barra "Sua posição" | `/gamificacao/ranking` | `podio.tsx`, `linha-ranking.tsx`, `disputa-card.tsx`, `lib/ranking.ts` |
| **3.1** Ver Pontos | Pontuação ponderada por aluno e card "Como é calculado" com a conta do próprio usuário | `/gamificacao/ranking` | `linha-ranking.tsx`, `formula-card.tsx` |
| **3.2** Filtrar Labs *(opcional)* | Menu suspenso por visão (geral, curso, período) e por laboratório; recarrega na hora e destaca a posição do usuário | `/gamificacao/ranking` | `filtro-ranking.tsx`, `opcoesFiltro` em `lib/ranking.ts` |

### Recomendações da HTA que foram implementadas

- Cálculo normalizado do ranking (por créditos e presença).
- Atalho direto na home para o módulo.
- Medalhas bloqueadas em escala monocromática e desbotada.
- Cartão explicativo com progresso percentual e regra pendente.
- Filtro por curso e laboratório em menu suspenso, com recarregamento instantâneo e destaque da posição do usuário.
- Peso maior para a assiduidade em laboratórios.

---

## 🧩 Diagrama de Classes

Diagrama do **Fluxo de Informações** do módulo de gamificação, reproduzido em Mermaid.

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

### Como virou código

| Diagrama | Implementação |
|---|---|
| Classes `Aluno`, `Medalha`, `Laboratorio` | Interfaces `Aluno`, `Medalha`, `Laboratorio` em `src/lib/types.ts`, estendidas com o que as telas acadêmicas precisam. |
| `Ranking.carregar()` e `Ranking.filtrar(filtro)` | Uma função: `carregarRanking(filtro)` em `src/lib/ranking.ts`. Sem argumento carrega o ranking geral; com `FiltroRanking` (geral, curso, período ou laboratório) filtra. |
| `Ranking` ◆ `ModuloGamificacao` (composição) | A aba Ranking existe só dentro do módulo: rotas `/gamificacao/ranking` e `/gamificacao/conquistas` compartilham o mesmo `layout.tsx`. |
| `ModuloGamificacao.abaAtiva`, `abrirConquistas()`, `abrirRanking()` | Rotas `/gamificacao/*` com abas (`abas.tsx`); a aba ativa é a rota atual. |
| `ModuloGamificacao` ◇ `Medalha` (agregação) | A grade de medalhas é exibida pelo módulo, mas as medalhas existem independentemente (`mock/gamificacao.ts`). |
| `Medalha.verRequisitos()` | Bottom sheet com o campo `requisito` e a regra pendente (`medalha-sheet.tsx`). |
| `Aluno.autenticar()` | Sessão mock em `session-provider.tsx`: um flag no `localStorage`, sem servidor. |
| `Laboratorio.peso` | Campo `peso` em `Laboratorio` (S05·L1 ×1,2; E08·L1 ×1,5; F03·L4 ×1,3), multiplicador do ranking filtrado por laboratório. |

---

## ⚖️ Ranking justo

Ranking por pontos brutos favorece quem cursa mais matérias. O protótipo normaliza a pontuação:

```text
Pontos Ponderados = (Total de Pontos ÷ Créditos Matriculados) × Fator de Presença em Labs

Fator de Presença = 0,5 + presença        (varia de 0,5 a 1,5)
```

- A divisão por créditos evita favorecer quem cursa mais matérias.
- O fator de presença dá peso maior à assiduidade nos laboratórios práticos.
- **Filtro por laboratório:** usa os pontos, créditos e presença *daquele laboratório* e multiplica pelo **peso do lab** (S05·L1 ×1,2; E08·L1 ×1,5; F03·L4 ×1,3).

**Exemplo com os dados do protótipo:** Lucas → (1.420 ÷ 24) × 1,47 = **87,0** → 4º lugar geral.

### Bruto × normalizado

| Aluno | Pontos brutos | Créditos | Presença em labs | Posição só por pontos | Pontos ponderados | Posição no ranking |
|---|---:|---:|---:|:---:|---:|:---:|
| Marina Costa Lima | 980 | 14 | 100% | 16º | **105,0** | **1º** |
| **Lucas Andrade Ferreira** (você) | 1.420 | 24 | 97% | 11º | **87,0** | **4º** |
| Gabriel Souza | 1.710 | 28 | 92% | 4º | **86,7** | **5º** |
| Ana Júlia Prado | 2.050 | 32 | 80% | 1º | **83,3** | **6º** |
| Isabela Duarte | 1.980 | 30 | 70% | 2º | **79,2** | **7º** |

Sem normalização, Lucas ficaria em 11º. Com créditos e presença, ele sobe para 4º. O card **"Justiça na disputa"** da aba Ranking mostra essa diferença ao usuário.

---

## 🏅 Medalhas e níveis

São **12 medalhas**: 6 conquistadas e 6 bloqueadas. Cada raridade vale pontos ao desbloquear.

| Raridade | Pontos |
|---|---:|
| 🥉 Bronze | 50 |
| 🥈 Prata | 100 |
| 🥇 Ouro | 200 |
| 💎 Platina | 400 |

<details>
<summary><b>Ver todas as 12 medalhas</b></summary>

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

### Níveis

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

### Dimensão social

- **Disputa:** card que mostra quem está logo acima e logo abaixo de você e a distância em pontos (ex.: "Gabriel está a 0,3 pts de você").
- **Pódio** com os três primeiros.
- **Medalhas de colaboração:** monitoria e avaliação de colegas.
- **Privacidade:** preferência "Exibir meu nome no ranking" em Configurações.

---

## 🧭 Navegação: o que mudou no menu

O menu mantém as **seções do app real**, mas ficou enxuto, com foco no que o aluno usa no dia a dia (heurística 8, design estético e minimalista).

| Seção | Itens mantidos |
|---|---|
| Mensagens Acadêmicas | Avisos |
| **Suporte Estudantil** | **Conquistas e Ranking** (*Novo*) |
| Aproveitamento Escolar | Notas, Frequência, Coeficientes |
| Calendários e Horários | Provas, Horários de Aula, Horários de Monitores |
| Outras Opções | Configurações, Sair |

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

A lista está em `itensRemovidos`, em `src/lib/nav.ts`.

</details>

---

## 🧠 Heurísticas de Nielsen

| # | Heurística | Exemplo concreto no app |
|:---:|---|---|
| 1 | Visibilidade do status do sistema | Resumo de nível com barra de progresso, barra fixa "Sua posição · 4º de 20" e progresso percentual nas medalhas. |
| 2 | Correspondência com o mundo real | Linguagem do aluno (créditos, presença, laboratório, NP1/NP2) e grade de horários igual à do app. |
| 3 | Controle e liberdade do usuário | Bottom sheets fecham com X, ESC ou arrastando; botão de voltar e navegação por abas. |
| 4 | Consistência e padrões | Mesma navegação e mesmas seções do app oficial (Lei de Jakob). |
| 5 | Prevenção de erros | Validação dos campos no login e confirmação ao sair. |
| 6 | Reconhecimento em vez de memorização | Regra de desbloqueio visível no cartão da medalha; fórmula exibida com o próprio cálculo do aluno. |
| 7 | Flexibilidade e eficiência de uso | Atalho para Conquistas e Ranking na home; atalhos do PWA na tela inicial do celular. |
| 8 | Design estético e minimalista | Menu enxuto, sem os 14 itens de baixo uso. |
| 9 | Ajudar a reconhecer e recuperar de erros | Mensagens construtivas no login. |
| 10 | Ajuda e documentação | "Como funciona?" nas medalhas e "Como é calculado" no ranking. |

---

## 📲 PWA

O protótipo é um **Progressive Web App** instalável.

- **Manifest** (`src/app/manifest.ts`): ícones `any` e `maskable` e atalhos para **Conquistas**, **Ranking** e **Avisos**.
- **Service worker próprio** (`public/sw.js`), sem dependências:

  | Tipo de requisição | Estratégia |
  |---|---|
  | Navegação | *network-first*, com fallback para cache e, por fim, `public/offline.html` |
  | Estáticos (`/_next/static/`, `/icons/`) | *cache-first* |
  | Demais da mesma origem | *stale-while-revalidate* |

- O service worker só é registrado em **produção**.
- **Safe-areas do iPhone** respeitadas no layout.

### Como instalar

| Plataforma | Passo a passo |
|---|---|
| 🤖 **Android** (Chrome) | Menu **⋮** → **Instalar app** |
| 🍎 **iPhone** (Safari) | **Compartilhar** → **Adicionar à Tela de Início** |
| 🖥️ **Desktop** | O app abre dentro de uma moldura de celular |

---

## 🛠️ Tecnologias e arquitetura

| Camada | Tecnologia |
|---|---|
| Framework | **Next.js 16.4** (App Router, Turbopack, páginas estáticas) |
| UI | **React 19.3** |
| Linguagem | **TypeScript 5** |
| Estilo | **Tailwind CSS 4.3**, com tokens de design em `@theme` no `globals.css` |
| Animações | **motion 14** (animações, bottom sheets, abas) |
| Ícones e utilitários | **lucide-react**, **clsx** |
| Hospedagem | **Vercel**, com deploy automático a cada push na `main` |

### Estrutura de pastas

```text
.
├── src
│   ├── app
│   │   ├── page.tsx                    # / · Perfis Salvos
│   │   ├── login/                      # /login
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
│   │   └── manifest.ts                 # manifest do PWA
│   ├── components
│   │   ├── shell/                      # app-shell, app-drawer, device-frame
│   │   ├── ui/                         # bottom-sheet, primitivos
│   │   ├── gamificacao/                # medalhas, ranking, filtro, fórmula, pódio
│   │   ├── avisos/
│   │   ├── entrada/
│   │   ├── academico/
│   │   └── configuracoes/
│   └── lib
│       ├── types.ts                    # modelo de dados (Diagrama de Classes)
│       ├── ranking.ts                  # fórmula e carregarRanking(filtro)
│       ├── format.ts
│       ├── nav.ts                      # menu e itens removidos
│       └── mock
│           ├── aluno.ts
│           └── gamificacao.ts
├── public
│   ├── sw.js                           # service worker
│   ├── offline.html
│   └── icons/
├── scripts
│   └── gerar-icones.mjs
└── docs
    └── screenshots/
```

### Dados mockados

Disciplinas do semestre, com os códigos da grade real: **S05** Interface Homem-Máquina, **S01** Banco de Dados, **E08** Eletrônica Digital, **F03** Física III, **M05** Probabilidade e Estatística e **G04** Empreendedorismo e Inovação. Nomes, professores, notas e os alunos do ranking são **fictícios**.

---

## 💻 Rodando localmente

**Pré-requisito:** Node.js 20 ou superior.

```bash
# clonar
git clone https://github.com/XkrulesVitor/Gamificacao-Inatel-Academico.git
cd Gamificacao-Inatel-Academico

# instalar dependências
npm install

# modo desenvolvimento (http://localhost:3000)
npm run dev
```

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento em http://localhost:3000 |
| `npm run build && npm start` | Build de produção e servidor (o service worker só funciona assim) |
| `npm run lint` | Verificação com ESLint |
| `node scripts/gerar-icones.mjs` | Regenera os ícones do PWA em `public/icons/` |

---

## 🤖 Como foi feito

Desenvolvido com **Claude Code** em um modelo **gerente + subagentes**.

**Gerente e avaliador: Claude Opus 5.5.** Responsável por arquitetura, design system, modelo de dados e fórmula do ranking, shell de navegação, revisão de código, testes visuais com Chrome headless, correções, prints e deploy.

| Subagente | Entrega |
|---|---|
| Claude Sonnet 5.5 | Módulo **Conquistas e Ranking** |
| Claude Sonnet 5.5 | **Perfis Salvos, Login, Avisos e Configurações** |
| Claude Haiku 5.5 | **Telas acadêmicas** (Notas, Frequência, Coeficientes, Provas, Horários, Monitores) |
| Claude Haiku 5.5 | **PWA** (manifest, service worker, ícones) |
| Claude Sonnet 5.5 | Este **README** |

<details>
<summary><b>Correções feitas na revisão de código</b></summary>

<br>

- O login falhava em "Outro Usuário" (curso vazio).
- O ranking rolava sozinho ao abrir (efeito duplicado do StrictMode).
- Diferença "2,4 vs 2,3" por arredondamento nos dados.
- Progresso enganoso da medalha Pódio.
- Barra "Sua posição" semitransparente.
- Área do indicador de home na moldura do celular.

</details>

---

## ⚠️ Aviso

Este é um **protótipo acadêmico não oficial**, sem vínculo com o Inatel. A marca e o nome pertencem à instituição. **Todos os dados são fictícios.** Não digite senhas reais.

---

## 👤 Autor

Feito por **[@XkrulesVitor](https://github.com/XkrulesVitor)** para a disciplina S05 / S205, Interface Homem-Máquina, Inatel.

<div align="center">

<sub>⭐ Se o projeto foi útil, deixe uma estrela no <a href="https://github.com/XkrulesVitor/Gamificacao-Inatel-Academico">repositório</a>.</sub>

</div>
