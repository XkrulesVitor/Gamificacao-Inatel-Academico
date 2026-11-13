<div align="center">

<img src="docs/screenshots/v3/d-claro-03-inicio.png" alt="Tela Início no desktop, tema claro: sidebar, saudação, linha do tempo das aulas e cartão de nível" width="100%">

<table align="center">
  <tr>
    <td align="center"><img src="docs/screenshots/v3/m-escuro-03-inicio.png" width="190" alt="Início no celular, tema escuro"></td>
    <td align="center"><img src="docs/screenshots/v3/m-escuro-06-conquistas.png" width="190" alt="Conquistas no celular, tema escuro"></td>
    <td align="center"><img src="docs/screenshots/v3/m-escuro-08-ranking.png" width="190" alt="Ranking no celular, tema escuro"></td>
    <td align="center"><img src="docs/screenshots/v3/m-claro-08-ranking.png" width="190" alt="Ranking no celular, tema claro"></td>
  </tr>
</table>

# App Acadêmico Inatel + Gamificação

**Conquistas por medalhas e ranking proporcional por créditos e presença em laboratórios, dentro da navegação do app Acadêmico. Versão 3, com temas claro e escuro, tela Início e menu de 6 itens.**

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
4. [O que mudou na v3](#o-que-mudou-na-v3)
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
| Base visual | App Acadêmico da Inatel: cabeçalho azul-marinho e identidade da marca, em tema claro e escuro |
| Artefatos de origem | User Story, HTA e Diagrama de Classes |
| Plataformas | Celular (PWA) e desktop |

Entregas:

- **Início:** aulas de hoje, próxima aula, avisos recentes e resumo de gamificação.
- **Conquistas:** 12 medalhas (6 conquistadas, 6 bloqueadas) em quatro raridades, com regra e progresso.
- **Ranking proporcional:** pontos divididos por créditos e ponderados pela presença em laboratórios.
- **Filtros:** geral, curso, período e três laboratórios, com a posição do aluno destacada.
- **Social:** pódio, Disputa (quem está acima e abaixo), evolução semanal, medalhas de colaboração, privacidade do nome.
- **Telas acadêmicas:** Notas, Frequência, Coeficientes, Horários, Provas e Monitores.
- **Temas claro e escuro** e **PWA** instalável com offline básico.

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

### Desktop, tema claro

<table align="center">
  <tr>
    <td align="center" valign="top"><img src="docs/screenshots/v3/d-claro-01-perfis.png" width="420" alt="Perfis Salvos no desktop claro"><br><sub><b>Perfis Salvos</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v3/d-claro-02-login.png" width="420" alt="Login no desktop claro"><br><sub><b>Login</b></sub></td>
  </tr>
  <tr>
    <td align="center" valign="top"><img src="docs/screenshots/v3/d-claro-03-inicio.png" width="420" alt="Início no desktop claro"><br><sub><b>Início</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v3/d-claro-05-avisos.png" width="420" alt="Avisos no desktop claro"><br><sub><b>Avisos</b></sub></td>
  </tr>
  <tr>
    <td align="center" valign="top"><img src="docs/screenshots/v3/d-claro-06-conquistas.png" width="420" alt="Conquistas no desktop claro"><br><sub><b>Conquistas</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v3/d-claro-08-ranking.png" width="420" alt="Ranking no desktop claro"><br><sub><b>Ranking</b></sub></td>
  </tr>
  <tr>
    <td align="center" valign="top"><img src="docs/screenshots/v3/d-claro-09-ranking-lab.png" width="420" alt="Ranking filtrado por laboratório no desktop claro"><br><sub><b>Ranking por laboratório</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v3/d-claro-10-notas.png" width="420" alt="Notas no desktop claro"><br><sub><b>Notas</b></sub></td>
  </tr>
  <tr>
    <td align="center" valign="top"><img src="docs/screenshots/v3/d-claro-11-frequencia.png" width="420" alt="Frequência no desktop claro"><br><sub><b>Frequência</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v3/d-claro-12-coeficientes.png" width="420" alt="Coeficientes no desktop claro"><br><sub><b>Coeficientes</b></sub></td>
  </tr>
  <tr>
    <td align="center" valign="top"><img src="docs/screenshots/v3/d-claro-13-horarios.png" width="420" alt="Horários no desktop claro"><br><sub><b>Horários</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v3/d-claro-14-provas.png" width="420" alt="Provas no desktop claro"><br><sub><b>Provas</b></sub></td>
  </tr>
  <tr>
    <td align="center" valign="top"><img src="docs/screenshots/v3/d-claro-15-monitores.png" width="420" alt="Monitores no desktop claro"><br><sub><b>Monitores</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v3/d-claro-16-configuracoes.png" width="420" alt="Configurações no desktop claro"><br><sub><b>Configurações</b></sub></td>
  </tr>
</table>

### Desktop, tema escuro

<table align="center">
  <tr>
    <td align="center" valign="top"><img src="docs/screenshots/v3/d-escuro-03-inicio.png" width="420" alt="Início no desktop escuro"><br><sub><b>Início</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v3/d-escuro-06-conquistas.png" width="420" alt="Conquistas no desktop escuro"><br><sub><b>Conquistas</b></sub></td>
  </tr>
  <tr>
    <td align="center" valign="top"><img src="docs/screenshots/v3/d-escuro-08-ranking.png" width="420" alt="Ranking no desktop escuro"><br><sub><b>Ranking</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v3/d-escuro-09-ranking-lab.png" width="420" alt="Ranking por laboratório no desktop escuro"><br><sub><b>Ranking por laboratório</b></sub></td>
  </tr>
</table>

### Mobile, tema escuro

<table align="center">
  <tr>
    <td align="center" valign="top"><img src="docs/screenshots/v3/m-escuro-01-perfis.png" width="190" alt="Perfis Salvos no celular, tema escuro"><br><sub><b>Perfis Salvos</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v3/m-escuro-02-login.png" width="190" alt="Login no celular, tema escuro"><br><sub><b>Login</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v3/m-escuro-03-inicio.png" width="190" alt="Início no celular, tema escuro"><br><sub><b>Início</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v3/m-escuro-04-menu.png" width="190" alt="Menu lateral no celular, tema escuro"><br><sub><b>Menu lateral</b></sub></td>
  </tr>
  <tr>
    <td align="center" valign="top"><img src="docs/screenshots/v3/m-escuro-05-avisos.png" width="190" alt="Avisos no celular, tema escuro"><br><sub><b>Avisos</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v3/m-escuro-06-conquistas.png" width="190" alt="Conquistas no celular, tema escuro"><br><sub><b>Conquistas</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v3/m-escuro-07-medalha.png" width="190" alt="Medalha no celular, tema escuro"><br><sub><b>Medalha</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v3/m-escuro-08-ranking.png" width="190" alt="Ranking no celular, tema escuro"><br><sub><b>Ranking</b></sub></td>
  </tr>
  <tr>
    <td align="center" valign="top"><img src="docs/screenshots/v3/m-escuro-09-ranking-lab.png" width="190" alt="Ranking por laboratório no celular, tema escuro"><br><sub><b>Ranking por laboratório</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v3/m-escuro-10-notas.png" width="190" alt="Notas no celular, tema escuro"><br><sub><b>Notas</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v3/m-escuro-11-frequencia.png" width="190" alt="Frequência no celular, tema escuro"><br><sub><b>Frequência</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v3/m-escuro-12-coeficientes.png" width="190" alt="Coeficientes no celular, tema escuro"><br><sub><b>Coeficientes</b></sub></td>
  </tr>
  <tr>
    <td align="center" valign="top"><img src="docs/screenshots/v3/m-escuro-13-horarios.png" width="190" alt="Horários no celular, tema escuro"><br><sub><b>Horários</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v3/m-escuro-14-provas.png" width="190" alt="Provas no celular, tema escuro"><br><sub><b>Provas</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v3/m-escuro-15-monitores.png" width="190" alt="Monitores no celular, tema escuro"><br><sub><b>Monitores</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v3/m-escuro-16-configuracoes.png" width="190" alt="Configurações no celular, tema escuro"><br><sub><b>Configurações</b></sub></td>
  </tr>
</table>

### Mobile, tema claro

<table align="center">
  <tr>
    <td align="center" valign="top"><img src="docs/screenshots/v3/m-claro-03-inicio.png" width="190" alt="Início no celular, tema claro"><br><sub><b>Início</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v3/m-claro-06-conquistas.png" width="190" alt="Conquistas no celular, tema claro"><br><sub><b>Conquistas</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v3/m-claro-07-medalha.png" width="190" alt="Medalha no celular, tema claro"><br><sub><b>Medalha</b></sub></td>
    <td align="center" valign="top"><img src="docs/screenshots/v3/m-claro-08-ranking.png" width="190" alt="Ranking no celular, tema claro"><br><sub><b>Ranking</b></sub></td>
  </tr>
  <tr>
    <td align="center" valign="top"><img src="docs/screenshots/v3/m-claro-09-ranking-lab.png" width="190" alt="Ranking por laboratório no celular, tema claro"><br><sub><b>Ranking por laboratório</b></sub></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>

---

## O que mudou na v3

| Área | v2 | v3 |
|---|---|---|
| Tema | Só escuro, fundo preto | Claro e escuro compostos, não invertidos. Segue o sistema por padrão |
| Troca de tema | Não havia | Botão no cabeçalho e seletor Sistema, Claro, Escuro em Configurações. Sem piscar ao carregar |
| Cabeçalho | Barra azul-marinho com título | Degradê azul-marinho com título, data, troca de tema e sino de avisos com indicador |
| Menu | 9 itens em 4 seções | 6 itens: Início, Avisos, Conquistas e Ranking, Desempenho, Agenda, Configurações |
| Sidebar | Seções do app real | Cartão do aluno com anel de nível |
| Mobile | Barra inferior com 4 atalhos | Barra inferior com 5 destinos. Avisos fica no sino |
| Início | Não existia | Tela nova: saudação com alertas, aulas de hoje, próxima aula, gamificação, avisos recentes |
| Conquistas | Grade de emblemas | Cartão de nível, Próxima conquista, vitrine com medalhas de fita e metal |
| Ranking | Pódio, tabela, painéis | Sua posição como destaque com evolução semanal, Disputa em escada, moedas de metal, Cálculo como fração |
| Notas, Frequência, Coeficientes | Três itens de menu | Seção Desempenho, com abas |
| Horários, Provas, Monitores | Três itens de menu | Seção Agenda, com abas |
| Movimento | Entradas simples | Um momento por tela, 150 a 300 ms nos estados, `prefers-reduced-motion` respeitado |
| Prints do README | v2 | v3, em claro e escuro |

Detalhes:

- **Paleta:** neutros com leve tom azul, no mesmo matiz do azul-marinho da marca. O azul-marinho é a única região grande de cor. Um azul de ação. Ouro só para conquista, com `gold-ink` legível nos dois temas. Metais só para raridade e top 3.
- **Início:** aplica o wireframe da aula (S13, páginas 42 e 43). A linha do tempo mostra local, horário, faltas, média e faixa de prova de cada aula.
- **Conquistas:** brasão dourado com barra de XP e marcos. Medalhas bloqueadas com anel de progresso.
- **Ranking:** evolução de S7 a S12 (9º a 4º). Filtro em chips, com ícone de laboratório nos laboratórios.
- **Movimento:** números contados, anéis e barras desenhando, entrada curta na Início.
- **Documentação:** [DESIGN.md](DESIGN.md) descreve o design system v3.
- **Processo:** skill de design Impeccable. Veja [Como foi feito](#como-foi-feito).

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
| **0.** Acompanhar Desempenho Gamificado | Tela Início com cartão de gamificação. Cartão de nível no topo do módulo, com duas abas | `/inicio` e `/gamificacao` | `inicio/tela-inicio.tsx`, `inicio/cartao-gamificacao.tsx`, `gamificacao/nivel-resumo.tsx`, `gamificacao/emblema-nivel.tsx`, `shell/section-tabs.tsx` |
| **1.1** Login no App | Perfis Salvos e Login com validação | `/` e `/login` | `app/page.tsx`, `app/login/page.tsx`, `session-provider.tsx` |
| **1.2** Abrir Menu | Sidebar fixa no desktop. No mobile, menu lateral e barra inferior com 5 destinos. Sino de avisos no cabeçalho | `/inicio` | `shell/sidebar.tsx`, `shell/app-drawer.tsx`, `shell/bottom-tabs.tsx`, `shell/nav-list.tsx`, `lib/nav.ts` |
| **2.** Explorar Conquistas | Cartão de nível, Próxima conquista e vitrine com filtro | `/gamificacao/conquistas` | `gamificacao/proxima-conquista.tsx`, `gamificacao/vitrine.tsx` |
| **2.A** Ver Medalhas | Medalhas de fita e metal por raridade. Bloqueadas com anel de progresso e cadeado | `/gamificacao/conquistas` | `gamificacao/vitrine.tsx`, `gamificacao/medal-emblem.tsx`, `gamificacao/metal.tsx` |
| **2.B** Requisitos *(iteração)* | Painel lateral no desktop e bottom sheet no mobile, com regra, progresso e atividade recente. O botão de ajuda explica o sistema | `/gamificacao/conquistas` | `gamificacao/medal-detail.tsx`, `gamificacao/atividade-recente.tsx`, `gamificacao/ajuda-medalhas.tsx`, `ui/bottom-sheet.tsx` |
| **3.** Consultar Ranking | Sua posição, top 3, tabela e Disputa | `/gamificacao/ranking` | `gamificacao/posicao-heroi.tsx`, `gamificacao/podio.tsx`, `gamificacao/lista-ranking.tsx`, `lib/ranking.ts` |
| **3.1** Ver Pontos | Evolução semanal e Cálculo com a conta do próprio usuário | `/gamificacao/ranking` | `gamificacao/grafico-evolucao.tsx`, `gamificacao/calculo.tsx` |
| **3.2** Filtrar Labs *(opcional)* | Chips de visão e de laboratório. A lista recarrega e destaca o aluno | `/gamificacao/ranking` | `lib/ranking.ts` (`opcoesFiltro`, `carregarRanking`), `gamificacao/lista-ranking.tsx` |

Recomendações da HTA implementadas:

- Cálculo normalizado do ranking (créditos e presença).
- Atalho para o módulo na Início, na barra inferior e na sidebar.
- Medalhas bloqueadas com anel de progresso e regra pendente.
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

O menu reúne o que o aluno usa e agrupa telas relacionadas em abas (heurística 8). Eram 9 itens em 4 seções na v2.

| Item | Conteúdo |
|---|---|
| Início | Aulas de hoje, próxima aula, gamificação, avisos recentes |
| Avisos | Caixa de entrada com leitor |
| **Conquistas e Ranking** | Abas **Conquistas** e **Ranking** |
| Desempenho | Abas Notas, Frequência, Coeficientes |
| Agenda | Abas Horários, Provas, Monitores |
| Configurações | Privacidade, tema, sobre. Sair no menu |

| Plataforma | Estrutura |
|---|---|
| Desktop (a partir de 1024 px) | Sidebar fixa com os 6 itens, cartão do aluno com anel de nível, cabeçalho com data, troca de tema e sino |
| Mobile | Menu lateral com os 6 itens. Barra inferior com Início, Desempenho, Conquistas, Ranking e Agenda. Avisos no sino |

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

Especificação completa (tokens, tipografia, layout, componentes e regras) em [DESIGN.md](DESIGN.md).

Os tokens ficam em `src/app/globals.css`. Os nomes são os mesmos nos dois temas. O atributo `data-theme` troca os valores. Um script inline aplica o tema antes da primeira pintura.

| Token | Claro | Escuro | Papel |
|---|---|---|---|
| `--color-bg` | `#f2f4f8` | `#080b10` | Fundo do app |
| `--color-surface-1` a `-4` | `#ffffff` a `#dde3eb` | `#0f141b` a `#28313e` | Superfícies: painéis, linhas, chips |
| `--color-sidebar` | `#ffffff` | `#0b1017` | Fundo da sidebar e do menu lateral |
| `--color-line`, `--color-line-strong` | `#e2e7ee`, `#cdd5e0` | `#1e2631`, `#2e3947` | Divisórias finas no lugar de cards |
| `--color-fg` | `#0e1724` | `#eef2f7` | Texto principal |
| `--color-muted`, `--color-subtle` | `#536074`, `#7f8ba0` | `#9ba7b6`, `#6c7889` | Texto secundário e terciário |
| `--color-header`, `--color-header-2` | `#12345a`, `#1b4a7d` | `#0f2a47`, `#173d66` | Cabeçalho em degradê azul-marinho |
| `--color-primary` | `#1a63c4` | `#1f6fd1` | Azul de ação: botão, seleção |
| `--color-accent` | `#1a63c4` | `#5b9cf0` | Foco, links, gráficos |
| `--color-gold` | `#dca42b` | `#e8b64a` | Somente conquista: nível, pontos, selo |
| `--color-gold-ink` | `#8f6407` | `#f0c25e` | Texto de conquista, legível no tema |
| `--color-bronze` | `#a8693c` | `#c99168` | Raridade e 3º lugar |
| `--color-silver` | `#7f8a99` | `#c3cad6` | Raridade e 2º lugar |
| `--color-platinum` | `#3f93ab` | `#a9dbe8` | Raridade platina |
| `--color-danger` | `#d13b30` | `#ff6b61` | Erro |
| `--color-success` | `#1d8a59` | `#45c58a` | Aprovação e subida no ranking |

Regras de craft:

- Ícones lucide, traço 1.75.
- Números tabulares em pontos, notas e horas.
- Listas e tabelas no lugar de cards aninhados.
- Alvos de toque de 44 px, foco visível, `prefers-reduced-motion` respeitado.
- Estados com 150 a 300 ms. Um momento autoral de movimento por tela.
- Nenhum emoji, nenhum travessão.

---

## Heurísticas de Nielsen

| # | Heurística | Exemplo no app |
|:---:|---|---|
| 1 | Visibilidade do status do sistema | Data no cabeçalho, próxima aula com "Em 19 min", Sua posição (4º de 20) com variação "Subiu 2 desde S11", barra de XP e anel de progresso nas medalhas bloqueadas |
| 2 | Correspondência com o mundo real | Créditos, presença, laboratório, NP1 e NP2. Linha do tempo das aulas como a grade do app |
| 3 | Controle e liberdade do usuário | Bottom sheets fecham com X, ESC ou arrastando. Chips de filtro reversíveis. Tema Sistema, Claro ou Escuro |
| 4 | Consistência e padrões | Cabeçalho azul-marinho e identidade do app oficial (Lei de Jakob). Mesmos tokens nos dois temas |
| 5 | Prevenção de erros | Validação dos campos no login e confirmação ao sair |
| 6 | Reconhecimento em vez de memorização | Regra visível no painel da medalha. Cálculo exibido como fração com os números do aluno |
| 7 | Flexibilidade e eficiência | Barra inferior com 5 destinos, sino de avisos e troca de tema no cabeçalho, sidebar fixa no desktop, atalhos do PWA |
| 8 | Design estético e minimalista | Menu de 6 itens no lugar de 9, sem os 14 itens de baixo uso, paleta enxuta, dados no lugar de frases |
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
| Estilo | Tailwind CSS 4.3, tokens por tema via `data-theme` |
| Animações | motion 14 |
| Ícones | lucide-react, clsx |
| Hospedagem | Vercel, deploy a cada push na `main` |

```text
.
├── PRODUCT.md                          # produto, usuários, princípios
├── DESIGN.md                           # design system v3
├── .impeccable/                        # surfaces/ (contrato de direção) e review/
├── src
│   ├── app
│   │   ├── page.tsx                    # / · Perfis Salvos
│   │   ├── login/
│   │   ├── (app)
│   │   │   ├── inicio/
│   │   │   ├── avisos/
│   │   │   ├── gamificacao/
│   │   │   │   ├── conquistas/
│   │   │   │   └── ranking/
│   │   │   ├── (desempenho)/           # notas, frequencia, coeficientes
│   │   │   ├── (agenda)/               # horarios, provas, monitores
│   │   │   └── configuracoes/
│   │   ├── globals.css                 # tokens dos temas claro e escuro
│   │   └── manifest.ts
│   ├── components
│   │   ├── shell/                      # app-shell, sidebar, nav-list, user-block,
│   │   │                               # bottom-tabs, app-drawer, section-tabs
│   │   ├── ui/                         # bottom-sheet, portal, primitives
│   │   ├── inicio/                     # tela-inicio, saudacao, aulas-hoje,
│   │   │                               # cartao-gamificacao, avisos-recentes
│   │   ├── gamificacao/                # emblema-nivel, vitrine, proxima-conquista,
│   │   │                               # medal-emblem, medal-detail, metal,
│   │   │                               # posicao-heroi, grafico-evolucao, podio,
│   │   │                               # lista-ranking, calculo, nivel-resumo
│   │   ├── avisos/
│   │   ├── entrada/
│   │   ├── academico/
│   │   ├── configuracoes/
│   │   └── theme-provider.tsx          # tema Sistema, Claro, Escuro
│   └── lib
│       ├── types.ts                    # modelo de dados (Diagrama de Classes)
│       ├── ranking.ts                  # fórmula e carregarRanking(filtro)
│       ├── nav.ts                      # menu, abas, barra inferior, itens removidos
│       ├── use-media.ts                # breakpoint desktop (1024 px)
│       ├── use-count-up.ts             # números contados
│       ├── format.ts
│       └── mock/                       # aluno.ts, gamificacao.ts
├── public                              # sw.js, offline.html, icons/
├── scripts/gerar-icones.mjs
└── docs/screenshots/                   # qrcode.png e v3/ (desktop e mobile, claro e escuro)
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

Feito com Claude Code, em modelo diretor e subagentes. A skill de design **Impeccable** guiou o processo da v3.

**Claude Opus 5.5** foi diretor de design e revisor: paleta, temas, cabeçalho, menu e base.

| Modelo | Entrega |
|---|---|
| Claude Opus 5.5 (diretor) | Paleta, temas claro e escuro, cabeçalho, menu, base |
| Claude Opus 5.5 (subagentes) | Visual de Conquistas e Ranking |
| Claude Opus 5.5 (subagentes) | Visual de Início, Avisos e entrada |
| Claude Sonnet 5.5 | Telas acadêmicas e Configurações |
| Claude Sonnet 5.5 | Revisão final independente, `DESIGN.md` e este README |

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

