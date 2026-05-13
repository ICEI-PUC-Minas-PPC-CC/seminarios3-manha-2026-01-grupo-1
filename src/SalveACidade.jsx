import { useState } from "react";

/* ─────────────────────────────────────────────
   DADOS DO JOGO
───────────────────────────────────────────── */

/* ── FASE 1 — Infraestrutura Urbana ── */
const FASE_1 = [
  {
    id: 1,
    fase: 1,
    texto: "O asfalto está ruim o que devemos fazer?",
    opcoes: [
      {
        titulo: "Trocar o asfalto",
        custo: 150,
        exp: 1000,
        feedback: "Excelente! O asfalto novo vai durar por anos!",
        melhor: true,
      },
      {
        titulo: "Adicionar Asfalto\nOnde está ruim",
        custo: 80,
        exp: 700,
        feedback: "Solução parcial. Economiza agora, mas terá que refazer em breve.",
        melhor: false,
      },
    ],
  },
  {
    id: 2,
    fase: 1,
    texto: "A praça central está abandonada.\nO que devemos fazer?",
    opcoes: [
      {
        titulo: "Reformar a praça\ncompletamente",
        custo: 200,
        exp: 1200,
        feedback: "A população adorou! A praça está linda e movimentada.",
        melhor: true,
      },
      {
        titulo: "Colocar apenas\nnovos bancos",
        custo: 60,
        exp: 500,
        feedback: "Pequena melhoria. A praça continua precisando de mais atenção.",
        melhor: false,
      },
    ],
  },
  {
    id: 3,
    fase: 1,
    texto: "A iluminação pública está\nfalhando. O que fazer?",
    opcoes: [
      {
        titulo: "Trocar por\nlâmpadas LED",
        custo: 180,
        exp: 1100,
        feedback: "Perfeito! Economia de energia e mais segurança para todos.",
        melhor: true,
      },
      {
        titulo: "Substituir apenas\nas queimadas",
        custo: 50,
        exp: 400,
        feedback: "Resolve no curto prazo, mas o consumo continua alto.",
        melhor: false,
      },
    ],
  },
];

/* ── FASE 2 — Saúde Pública ── */
const FASE_2 = [
  {
    id: 4,
    fase: 2,
    texto: "Está havendo um surto de gripe na cidade, o que devemos fazer?",
    opcoes: [
      {
        titulo: "Comprar vacinas",
        custo: 250,
        exp: 1500,
        feedback: "Ótima decisão! A vacinação controlou o surto rapidamente.",
        melhor: true,
      },
      {
        titulo: "Ignorar",
        custo: 0,
        exp: -3000,
        feedback: "Péssima escolha! O surto se alastrou e a cidade sofreu muito.",
        melhor: false,
      },
    ],
  },
];

/* ── FASE 3 — Adicione aqui as perguntas da Fase 3 ── */
const FASE_3 = [
  // { id: 7, fase: 3, texto: "...", opcoes: [...] },
];

/* ── Lista completa usada pelo jogo (não alterar) ── */
const PERGUNTAS = [...FASE_1, ...FASE_2, ...FASE_3];

/* ─────────────────────────────────────────────
   ÍCONES SVG PIXEL ART
───────────────────────────────────────────── */
const CoinIcon = ({ size = 42 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: "pixelated" }}>
    <rect x="8" y="2" width="16" height="2" fill="#b96b13" />
    <rect x="4" y="4" width="24" height="4" fill="#d8891d" />
    <rect x="2" y="8" width="28" height="16" fill="#f0a42a" />
    <rect x="4" y="24" width="24" height="4" fill="#d8891d" />
    <rect x="8" y="28" width="16" height="2" fill="#b96b13" />
    <rect x="8" y="8" width="16" height="16" fill="#ffc45a" />
    <rect x="10" y="10" width="12" height="12" fill="#f4a72e" />
    <rect x="12" y="12" width="8" height="8" fill="#ffc75f" />
  </svg>
);

const ExpIcon = ({ size = 42 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: "pixelated" }}>
    <rect x="12" y="2" width="8" height="4" fill="#6ca93b" />
    <rect x="8" y="6" width="16" height="4" fill="#9ad543" />
    <rect x="4" y="10" width="24" height="8" fill="#76bd39" />
    <rect x="8" y="18" width="16" height="4" fill="#4e8f33" />
    <rect x="12" y="22" width="8" height="8" fill="#3f7831" />
    <rect x="14" y="4" width="4" height="24" fill="#d6ff68" opacity="0.7" />
    <rect x="6" y="12" width="20" height="4" fill="#d6ff68" opacity="0.55" />
  </svg>
);

/* ─────────────────────────────────────────────
   COMPONENTES DE CENA
───────────────────────────────────────────── */
const Cloud = ({ className }) => <div className={`cloud ${className}`} />;

const Building = ({ className, windows = 9, door = false }) => (
  <div className={`building ${className}`}>
    <div className="windows">
      {Array.from({ length: windows }).map((_, i) => (
        <span key={i} className="window" />
      ))}
    </div>
    {door && <div className="door" />}
  </div>
);

const Tree = ({ className }) => (
  <div className={`tree ${className}`}>
    <div className="trunk" />
    <div className="leaf leaf1" />
    <div className="leaf leaf2" />
    <div className="leaf leaf3" />
    <div className="leaf leaf4" />
  </div>
);

const Person = () => (
  <div className="person">
    <div className="coin hand left"><CoinIcon size={44} /></div>
    <div className="coin hand right"><CoinIcon size={44} /></div>
    <div className="hair" />
    <div className="head">
      <span className="eye left" />
      <span className="eye right" />
      <span className="mouth" />
    </div>
    <div className="neck" />
    <div className="body">
      <div className="shirt" />
      <div className="tie" />
    </div>
    <div className="arm arm-left" />
    <div className="arm arm-right" />
    <div className="leg leg-left" />
    <div className="leg leg-right" />
    <div className="shoe shoe-left" />
    <div className="shoe shoe-right" />
  </div>
);

const HUD = ({ coins, exp }) => (
  <>
    <section className="hud hud-left">
      <div className="icon-wrap coin-wrap"><CoinIcon size={46} /></div>
      <span>Moedas</span>
      <strong>{coins}</strong>
    </section>
    <section className="hud hud-right">
      <div className="icon-wrap exp-wrap"><ExpIcon size={42} /></div>
      <span>Exp.</span>
      <strong>{exp}</strong>
    </section>
  </>
);

const Cenario = () => (
  <>
    <Cloud className="cloud-left" />
    <Cloud className="cloud-center" />
    <Cloud className="cloud-right" />
    <Building className="building-left-1" windows={11} door />
    <Building className="building-left-2" windows={8} door />
    <Building className="building-right-1" windows={6} door />
    <Building className="building-right-2" windows={11} door />
    <Tree className="tree-left" />
    <Tree className="tree-right" />
    <section className="ground" />
    <Person />
  </>
);

/* ─────────────────────────────────────────────
   TELAS
───────────────────────────────────────────── */
const TelaInicial = ({ onIniciar, fase }) => (
  <main className="game-screen">
    <Cenario />
    <h1>Salve a cidade</h1>
    <h2>Fase {fase}:</h2>
    <button className="start-button" type="button" onClick={onIniciar}>
      <span>Iniciar</span>
      <div className="play-circle">▶</div>
    </button>
  </main>
);

const TelaPergunta = ({ pergunta, coins, exp, onEscolha, escolhida }) => (
  <main className="game-screen">
    <Cenario />
    <HUD coins={coins} exp={exp} />

    <div className="question-box">
      {pergunta.texto.split("\n").map((linha, i) => (
        <span key={i}>{linha}{i < pergunta.texto.split("\n").length - 1 && <br />}</span>
      ))}
    </div>

    <div className="options-row">
      {pergunta.opcoes.map((op, i) => (
        <button
          key={i}
          className={`option-card ${escolhida === i ? "chosen" : ""} ${escolhida !== null && op.melhor ? "correct" : ""}`}
          onClick={() => escolhida === null && onEscolha(i)}
          type="button"
          disabled={escolhida !== null}
        >
          <p className="option-title">
            {op.titulo.split("\n").map((l, j) => (
              <span key={j}>{l}{j < op.titulo.split("\n").length - 1 && <br />}</span>
            ))}
          </p>
          <div className="option-badges">
            <span className="badge badge-coin">
              <CoinIcon size={22} />
              R${op.custo}
            </span>
            <span className="badge badge-exp">
              <ExpIcon size={22} />
              {op.exp >= 0 ? `+${op.exp}` : op.exp}
            </span>
          </div>
        </button>
      ))}
    </div>

    {escolhida !== null && (
      <div className="feedback-bar">
        <span className="feedback-emoji">{pergunta.opcoes[escolhida].melhor ? "✅" : "⚠️"}</span>
        <span>{pergunta.opcoes[escolhida].feedback}</span>
      </div>
    )}
  </main>
);

const TelaFinal = ({ coins, exp, total, onReiniciar }) => (
  <main className="game-screen end-screen">
    <Cenario />
    <div className="end-panel">
      <h1 className="end-title">Fase concluída!</h1>
      <p className="end-sub">Você salvou a cidade com {total} acertos</p>
      <div className="end-stats">
        <div className="stat">
          <CoinIcon size={36} />
          <span>{coins} Moedas</span>
        </div>
        <div className="stat">
          <ExpIcon size={36} />
          <span>{exp} Exp.</span>
        </div>
      </div>
      <button className="start-button" type="button" onClick={onReiniciar}>
        <span>Jogar novamente</span>
        <div className="play-circle">▶</div>
      </button>
    </div>
  </main>
);
