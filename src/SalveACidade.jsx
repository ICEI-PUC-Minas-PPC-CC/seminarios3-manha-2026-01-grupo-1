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

/* ── FASE 3 — Turismo e Desenvolvimento ── */
const FASE_3 = [
  {
    id: 5,
    fase: 3,
    texto: "O turismo da cidade está crescendo, o que devemos fazer?",
    opcoes: [
      {
        titulo: "Ampliar a quantidade\nde pontos turisticos",
        custo: 200,
        exp: 1200,
        feedback: "Bom começo! Mais pontos turísticos atraem visitantes.",
        melhor: false,
      },
      {
        titulo: "Melhorar a\ninfraestrutuda da cidade",
        custo: 300,
        exp: 2000,
        feedback: "Excelente! Uma cidade bem estruturada atrai muito mais turistas.",
        melhor: true,
      },
    ],
  },
];

/* ── FASE 4 — Gestão de Resíduos ── */
const FASE_4 = [
  {
    id: 6,
    fase: 4,
    texto: "O lixão da cidade tá\ntransbordando e o cheiro\nestá chegando no centro.",
    opcoes: [
      {
        titulo: "Construir usina de\nreciclagem",
        custo: 500,
        exp: 2000,
        feedback: "Excelente! A usina de reciclagem resolve o problema de forma sustentável e gera empregos!",
        melhor: true,
      },
      {
        titulo: "Cavar um novo aterro\nsanitário",
        custo: 150,
        exp: -500,
        feedback: "Solução temporária. O novo aterro vai transbordar novamente em poucos anos e prejudica o meio ambiente.",
        melhor: false,
      },
    ],
  },
];

/* ── FASE 5 — Educação Digital ── */
const FASE_5 = [
  {
    id: 7,
    fase: 5,
    texto: "As escolas municipais tão\ncom computadores que\nestão muito ultrapassados,\no que devemos fazer?",
    opcoes: [
      {
        titulo: "Comprar notebooks\nnovos pra geral",
        custo: 600,
        exp: 2500,
        feedback: "Excelente! Alunos com equipamentos modernos aprendem muito mais e se preparam para o mercado de trabalho!",
        melhor: true,
      },
      {
        titulo: "Dar curso de\ninformática teórica",
        custo: 100,
        exp: 500,
        feedback: "Pouco eficaz. Sem prática nos computadores, o aprendizado fica bem limitado.",
        melhor: false,
      },
    ],
  },
];

/* ── FASE 6 — Segurança Pública ── */
const FASE_6 = [
  {
    id: 8,
    fase: 6,
    texto: "A criminalidade tá\naumentando nos bairros\nda periferia, o que a gente\nfaz?",
    opcoes: [
      {
        titulo: "Contratar mais\nguardas",
        custo: 400,
        exp: 1500,
        feedback: "Ajuda no curto prazo, mas sem monitoramento inteligente os recursos são desperdiçados.",
        melhor: false,
      },
      {
        titulo: "Instalar câmeras de\nmonitoramento",
        custo: 200,
        exp: 800,
        feedback: "Boa escolha! As câmeras inibem crimes e ajudam a identificar criminosos com muito menos custo.",
        melhor: true,
      },
    ],
  },
];

/* ── Lista completa usada pelo jogo (não alterar) ── */
const PERGUNTAS = [...FASE_1, ...FASE_2, ...FASE_3, ...FASE_4, ...FASE_5, ...FASE_6];

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

/* Ícone de lixo / resíduos pixel art para a Fase 4 */
const TrashIcon = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: "pixelated" }}>
    {/* tampa */}
    <rect x="4" y="4" width="24" height="4" fill="#5a8a3c" />
    <rect x="6" y="2" width="20" height="3" fill="#76b050" />
    <rect x="12" y="0" width="8" height="3" fill="#5a8a3c" />
    {/* corpo */}
    <rect x="6" y="8" width="20" height="20" fill="#76b050" />
    <rect x="8" y="10" width="16" height="16" fill="#5a8a3c" />
    {/* riscas */}
    <rect x="10" y="10" width="3" height="14" fill="#76b050" />
    <rect x="15" y="10" width="3" height="14" fill="#76b050" />
    <rect x="20" y="10" width="3" height="14" fill="#76b050" />
    {/* rodas */}
    <rect x="8" y="28" width="5" height="4" fill="#333" />
    <rect x="19" y="28" width="5" height="4" fill="#333" />
  </svg>
);

/* Símbolo de reciclagem pixel art */
const RecycleIcon = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: "pixelated" }}>
    <rect x="14" y="2" width="4" height="6" fill="#39c95a" />
    <rect x="10" y="6" width="12" height="4" fill="#39c95a" />
    <rect x="6" y="10" width="6" height="4" fill="#39c95a" />
    <rect x="20" y="10" width="6" height="4" fill="#39c95a" />
    <rect x="4" y="14" width="8" height="4" fill="#39c95a" />
    <rect x="20" y="14" width="8" height="4" fill="#39c95a" />
    <rect x="6" y="18" width="6" height="4" fill="#39c95a" />
    <rect x="20" y="18" width="6" height="4" fill="#39c95a" />
    <rect x="10" y="22" width="12" height="4" fill="#39c95a" />
    <rect x="14" y="24" width="4" height="6" fill="#39c95a" />
    <rect x="13" y="12" width="6" height="8" fill="#27a341" />
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

/* Cena especial da Fase 4: lixão com fumaça */
const LixaoScene = () => (
  <div className="lixao-scene">
    {/* pilha de lixo */}
    <div className="lixao-pile" />
    <div className="lixao-pile lixao-pile2" />
    <div className="lixao-pile lixao-pile3" />
    {/* fumaça animada */}
    <div className="smoke smoke1" />
    <div className="smoke smoke2" />
    <div className="smoke smoke3" />
    {/* sacolas de lixo */}
    <div className="trash-bag bag1" />
    <div className="trash-bag bag2" />
    <div className="trash-bag bag3" />
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

const Cenario = ({ fase }) => (
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
    <section className={`ground ${fase === 4 ? "ground-dirty" : ""}`} />
    {fase === 4 && <LixaoScene />}
    <Person />
  </>
);

const FASE_NOMES = {
  1: "Infraestrutura Urbana",
  2: "Saúde Pública",
  3: "Turismo e Desenvolvimento",
  4: "Gestão de Resíduos",
  5: "Educação Digital",
  6: "Segurança Pública",
};

/* Indicador de fase com título animado */
const FaseIndicador = ({ fase, total = 6 }) => (
  <div className="fase-indicator">
    <div className="fase-titulo-wrap">
      <span className="fase-numero" key={fase}>Fase {fase}</span>
      <span className="fase-nome" key={`nome-${fase}`}>{FASE_NOMES[fase]}</span>
    </div>
    <div className="fase-dots">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`fase-dot ${i + 1 <= fase ? "fase-dot-active" : ""} ${i + 1 === fase ? "fase-dot-current" : ""}`}
        />
      ))}
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   TELAS
───────────────────────────────────────────── */
const TelaInicial = ({ onIniciar, fase }) => (
  <main className="game-screen">
    <Cenario fase={fase} />
    <h1>Salve a cidade</h1>
    <h2>Fase {fase}:</h2>
    <button className="start-button" type="button" onClick={onIniciar}>
      <span>Iniciar</span>
      <div className="play-circle">▶</div>
    </button>
  </main>
);

const TelaPergunta = ({ pergunta, coins, exp, onEscolha, escolhida }) => {
  const isFase4 = pergunta.fase === 4;
  const isFase5 = pergunta.fase === 5;
  const isFase6 = pergunta.fase === 6;
  const extraClass = isFase4 ? "game-screen-fase4" : isFase5 ? "game-screen-fase5" : isFase6 ? "game-screen-fase6" : "";
  return (
    <main className={`game-screen ${extraClass}`}>
      <Cenario fase={pergunta.fase} />
      <HUD coins={coins} exp={exp} />
      <FaseIndicador fase={pergunta.fase} />

      <div className={`question-box ${isFase4 ? "question-box-fase4" : ""} ${isFase5 ? "question-box-fase5" : ""} ${isFase6 ? "question-box-fase6" : ""}`}>
        {isFase4 && (
          <div className="fase4-icon-row">
            <TrashIcon size={42} />
            <span className="fase4-badge">⚠️ Alerta Ambiental</span>
            <TrashIcon size={42} />
          </div>
        )}
        {isFase5 && (
          <div className="fase4-icon-row">
            <span className="fase-badge-special">💻 Educação Digital</span>
          </div>
        )}
        {isFase6 && (
          <div className="fase4-icon-row">
            <span className="fase-badge-special fase6-badge">🚨 Segurança Pública</span>
          </div>
        )}
        {pergunta.texto.split("\n").map((linha, i) => (
          <span key={i}>{linha}{i < pergunta.texto.split("\n").length - 1 && <br />}</span>
        ))}
      </div>

      <div className="options-row">
        {pergunta.opcoes.map((op, i) => (
          <button
            key={i}
            className={`option-card
              ${escolhida === i ? "chosen" : ""}
              ${escolhida !== null && op.melhor ? "correct" : ""}
              ${isFase4 && i === 0 ? "option-recycle" : ""}
              ${isFase5 && i === 0 ? "option-tech" : ""}
              ${isFase6 && i === 1 ? "option-camera" : ""}
            `}
            onClick={() => escolhida === null && onEscolha(i)}
            type="button"
            disabled={escolhida !== null}
          >
            {isFase4 && (
              <div className="option-icon-top">
                {i === 0 ? <RecycleIcon size={36} /> : <TrashIcon size={36} />}
              </div>
            )}
            {isFase5 && (
              <div className="option-icon-top">
                {i === 0 ? <span style={{fontSize:"30px"}}>💻</span> : <span style={{fontSize:"30px"}}>📖</span>}
              </div>
            )}
            {isFase6 && (
              <div className="option-icon-top">
                {i === 0 ? <span style={{fontSize:"30px"}}>👮</span> : <span style={{fontSize:"30px"}}>📷</span>}
              </div>
            )}
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
};

const TelaFinal = ({ coins, exp, total, onReiniciar }) => (
  <main className="game-screen end-screen">
    <Cenario fase={1} />
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

/* ─────────────────────────────────────────────
   JOGO PRINCIPAL
───────────────────────────────────────────── */
export default function SalveACidade() {
  const [tela, setTela] = useState("inicio");
  const [coins, setCoins] = useState(500);
  const [exp, setExp] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [escolhida, setEscolhida] = useState(null);
  const [acertos, setAcertos] = useState(0);

  const perguntaAtual = PERGUNTAS[qIdx];

  const handleIniciar = () => {
    setTela("pergunta");
    setQIdx(0);
    setEscolhida(null);
  };

  const handleEscolha = (i) => {
    const op = perguntaAtual.opcoes[i];
    setEscolhida(i);
    setCoins((c) => Math.max(0, c - op.custo));
    setExp((e) => e + op.exp);
    if (op.melhor) setAcertos((a) => a + 1);

    setTimeout(() => {
      if (qIdx + 1 < PERGUNTAS.length) {
        setQIdx((q) => q + 1);
        setEscolhida(null);
      } else {
        setTela("fim");
      }
    }, 2200);
  };

  const handleReiniciar = () => {
    setTela("inicio");
    setCoins(500);
    setExp(0);
    setQIdx(0);
    setEscolhida(null);
    setAcertos(0);
  };

  return (
    <>
      <style>{CSS}</style>
      {tela === "inicio" && (
        <TelaInicial onIniciar={handleIniciar} fase={perguntaAtual?.fase ?? 1} />
      )}
      {tela === "pergunta" && (
        <TelaPergunta
          pergunta={perguntaAtual}
          coins={coins}
          exp={exp}
          onEscolha={handleEscolha}
          escolhida={escolhida}
        />
      )}
      {tela === "fim" && (
        <TelaFinal coins={coins} exp={exp} total={acertos} onReiniciar={handleReiniciar} />
      )}
    </>
  );
}

/* ─────────────────────────────────────────────
   ESTILOS
───────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.game-screen {
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  font-family: 'Press Start 2P', monospace;
  image-rendering: pixelated;
  background: linear-gradient(#8bd1ec 0%, #b9e7f2 72%, #78c743 72%, #78c743 100%);
}

/* Fase 4: céu amarelado / poluído */
.game-screen-fase4 {
  background: linear-gradient(#c9b86c 0%, #ddd09a 70%, #8aaa40 70%, #8aaa40 100%);
}

/* Fase 5: céu azul-tecnológico */
.game-screen-fase5 {
  background: linear-gradient(#4a90d9 0%, #87ceeb 68%, #5aad3f 68%, #5aad3f 100%);
}

/* Fase 6: céu noturno / segurança */
.game-screen-fase6 {
  background: linear-gradient(#1a1a3e 0%, #2d2d6e 60%, #3a5a30 60%, #3a5a30 100%);
}

/* ── Nuvens ── */
.cloud {
  position: absolute;
  background: #f5f7f8;
  border-radius: 999px;
}
.cloud::before, .cloud::after {
  content: '';
  position: absolute;
  background: #f5f7f8;
  border-radius: 999px;
}
.cloud-left  { width:190px; height:72px; left:92px; top:62px; }
.cloud-left::before  { width:110px; height:110px; left:-4px; top:-58px; }
.cloud-left::after   { width:155px; height:114px; left:74px; top:-22px; }
.cloud-center { width:170px; height:62px; left:385px; top:36px; }
.cloud-center::before { width:110px; height:90px; left:24px; top:-38px; }
.cloud-center::after  { width:105px; height:80px; left:100px; top:0px; }
.cloud-right  { width:210px; height:84px; right:66px; top:38px; }
.cloud-right::before  { width:122px; height:118px; left:28px; top:-44px; }
.cloud-right::after   { width:154px; height:114px; left:105px; top:-24px; }

/* Nuvens poluídas na Fase 4 */
.game-screen-fase4 .cloud,
.game-screen-fase4 .cloud::before,
.game-screen-fase4 .cloud::after {
  background: #b5b09a;
}

/* Nuvens azuladas na Fase 5 */
.game-screen-fase5 .cloud,
.game-screen-fase5 .cloud::before,
.game-screen-fase5 .cloud::after {
  background: #dff0ff;
}

/* Estrelas na Fase 6 (nuvens escuras) */
.game-screen-fase6 .cloud,
.game-screen-fase6 .cloud::before,
.game-screen-fase6 .cloud::after {
  background: #2a2a5a;
}

/* Prédios com janelas acesas (Fase 6 — noturno) */
.game-screen-fase6 .window { background: #ffe566; }
.game-screen-fase6 .ground { background: #3a5a30; }

/* ── HUD ── */
.hud {
  position: absolute;
  top: 56px;
  height: 56px;
  border-radius: 28px;
  background: #3f6d9f;
  border: 18px solid #0455a6;
  display: flex;
  align-items: center;
  color: white;
  z-index: 8;
}
.hud span  { font-size: 18px; letter-spacing: 1px; line-height: 1; }
.hud strong { font-size: 14px; margin-left: 12px; color: #ffe082; }
.hud-left  { left:38px; width:220px; padding-left:62px; }
.hud-right { right:38px; width:220px; padding-left:64px; }
.icon-wrap {
  width:56px; height:56px;
  position:absolute; left:-2px; top:-18px;
  display:grid; place-items:center;
  border-radius:50%;
}
.coin-wrap { background:#f1a72a; }
.exp-wrap  { background:#416f9e; }

/* ── Indicador de Fase ── */
.fase-indicator {
  position: absolute;
  top: 14px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: rgba(0,0,0,0.50);
  border-radius: 20px;
  padding: 10px 22px 8px;
}
.fase-titulo-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
}
.fase-numero {
  font-family: 'Press Start 2P', monospace;
  font-size: clamp(11px, 1.5vw, 14px);
  color: #ffe082;
  animation: fasePop .4s ease;
}
.fase-nome {
  font-family: 'Press Start 2P', monospace;
  font-size: clamp(7px, 1vw, 10px);
  color: rgba(255,255,255,0.75);
  animation: fasePop .4s ease;
  white-space: nowrap;
}
.fase-dots {
  display: flex;
  gap: 10px;
  align-items: center;
}
.fase-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255,255,255,0.25);
  border: 2px solid rgba(255,255,255,0.4);
  transition: all .4s;
}
.fase-dot-active { background: #ffe082; border-color: #f0a42a; }
.fase-dot-current {
  width: 16px; height: 16px;
  background: #ff6d37;
  border-color: #ffbc63;
  box-shadow: 0 0 10px #ff6d37;
  animation: pulseDot 1.2s infinite;
}
@keyframes pulseDot {
  0%, 100% { box-shadow: 0 0 6px #ff6d37; }
  50%       { box-shadow: 0 0 16px #ff6d37, 0 0 28px #ffbc6388; }
}
@keyframes fasePop {
  from { opacity: 0; transform: translateY(-6px) scale(0.92); }
  to   { opacity: 1; transform: translateY(0)    scale(1); }
}

/* ── Títulos ── */
h1, h2 {
  position:relative; z-index:9;
  color:#050505; text-align:center; line-height:1.2;
}
h1 { padding-top:172px; font-size:clamp(28px,5.8vw,56px); }
h2 { padding-top:22px;  font-size:clamp(30px,5.5vw,52px); }

/* ── Chão ── */
.ground {
  position:absolute; left:0; right:0; bottom:0;
  height:142px; background:#78c743; z-index:3;
}
.ground-dirty { background: #8aaa40; }

/* ── Cena do Lixão (Fase 4) ── */
.lixao-scene {
  position: absolute;
  bottom: 142px;
  left: 50%;
  transform: translateX(-50%);
  width: 220px;
  height: 120px;
  z-index: 4;
}

.lixao-pile {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 140px;
  height: 60px;
  background: #7a6a40;
  border-radius: 50% 50% 20% 20%;
  border: 3px solid #5a4a28;
}
.lixao-pile2 {
  width: 90px;
  height: 40px;
  bottom: 36px;
  left: 20%;
  background: #6a5a30;
}
.lixao-pile3 {
  width: 80px;
  height: 35px;
  bottom: 30px;
  left: 58%;
  background: #8a7a50;
}

.trash-bag {
  position: absolute;
  width: 26px;
  height: 32px;
  background: #1a1a2e;
  border-radius: 50% 50% 30% 30% / 40% 40% 30% 30%;
  border: 2px solid #333;
}
.bag1 { bottom: 50px; left: 35%; }
.bag2 { bottom: 42px; left: 52%; }
.bag3 { bottom: 55px; left: 22%; }

.smoke {
  position: absolute;
  border-radius: 50%;
  background: rgba(120, 110, 80, 0.55);
  animation: smokeRise 3s infinite ease-out;
}
.smoke1 { width: 28px; height: 28px; bottom: 80px; left: 44%; animation-delay: 0s; }
.smoke2 { width: 22px; height: 22px; bottom: 90px; left: 52%; animation-delay: 1s; }
.smoke3 { width: 18px; height: 18px; bottom: 85px; left: 36%; animation-delay: 1.8s; }

@keyframes smokeRise {
  0%   { opacity: 0.7; transform: translateY(0) scale(1); }
  100% { opacity: 0;   transform: translateY(-70px) scale(2.5); }
}

/* ── Prédios ── */
.building { position:absolute; bottom:142px; z-index:2; }
.building-left-1  { left:13px;   width:126px; height:320px; background:#cdbb98; }
.building-left-2  { left:147px;  width:110px; height:220px; background:#f7b2b5; }
.building-right-1 { right:159px; width:123px; height:238px; background:#818199; }
.building-right-2 { right:12px;  width:143px; height:318px; background:#bfc1c2; }

.windows {
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:24px 22px;
  padding:36px 13px 0;
}
.building-left-2 .windows,
.building-right-1 .windows {
  grid-template-columns:repeat(2,1fr);
}
.window {
  width:19px; height:47px;
  background:#bdfcff;
  border:3px solid white;
  display:block;
}
.building-left-2 .window  { width:17px; height:34px; }
.building-right-1 .window { width:19px; height:37px; }
.door {
  position:absolute; bottom:0; left:50%;
  width:36px; height:48px;
  transform:translateX(-50%);
  background:#bdfcff; border:3px solid white;
}

/* ── Árvores ── */
.tree { position:absolute; width:150px; height:200px; bottom:142px; z-index:4; }
.tree-left  { left:252px; }
.tree-right { right:287px; }
.trunk {
  position:absolute; left:52px; bottom:0;
  width:72px; height:116px;
  background:#4d3b12;
  clip-path:polygon(34% 0,70% 0,100% 100%,0 100%);
}
.leaf { position:absolute; border-radius:50%; background:#97ce00; }
.leaf1 { width:72px; height:72px; left:15px; top:52px; }
.leaf2 { width:74px; height:74px; left:57px; top:44px; }
.leaf3 { width:78px; height:78px; left:80px; top:80px; }
.leaf4 { width:91px; height:86px; left:25px; top:92px; }

/* Árvores com aparência doente na Fase 4 */
.game-screen-fase4 .leaf { background: #7a9c00; }

/* ── Personagem ── */
.person {
  position:absolute; left:50%; bottom:101px;
  width:100px; height:135px;
  transform:translateX(-50%);
  z-index:6;
}
.hand { position:absolute; top:26px; z-index:1; }
.hand.left  { left:-28px; }
.hand.right { right:-28px; }
.hair { position:absolute; top:0; left:33px; width:38px; height:20px; background:#261d19; border:5px solid #050505; z-index:4; }
.head { position:absolute; top:18px; left:31px; width:42px; height:36px; background:#f1c18b; border:5px solid #050505; z-index:3; }
.eye { position:absolute; top:14px; width:5px; height:5px; background:#050505; }
.eye.left  { left:9px; }
.eye.right { right:9px; }
.mouth { position:absolute; left:16px; bottom:7px; width:9px; height:3px; background:#7b1d1d; }
.neck { position:absolute; top:52px; left:45px; width:12px; height:14px; background:#f1c18b; border-left:4px solid #050505; border-right:4px solid #050505; z-index:2; }
.body { position:absolute; top:61px; left:31px; width:42px; height:55px; background:#262626; border:5px solid #050505; z-index:3; }
.shirt { position:absolute; top:0; left:14px; width:10px; height:26px; background:#eee; }
.tie   { position:absolute; top:9px; left:17px; width:6px; height:36px; background:#a20d14; }
.arm   { position:absolute; top:65px; width:44px; height:11px; background:#262626; border:5px solid #050505; z-index:2; }
.arm-left  { left:-4px;  transform:rotate(-8deg); }
.arm-right { right:-4px; transform:rotate(8deg);  }
.leg  { position:absolute; top:111px; width:16px; height:24px; background:#262626; border:5px solid #050505; z-index:2; }
.leg-left  { left:31px; }
.leg-right { right:27px; }
.shoe  { position:absolute; bottom:0; width:24px; height:9px; background:#262626; border:4px solid #050505; z-index:3; }
.shoe-left  { left:26px; }
.shoe-right { right:21px; }

/* ── Botão Iniciar ── */
.start-button {
  position:absolute; left:50%; bottom:6px;
  transform:translateX(-50%);
  width:340px; height:90px;
  border:none; border-radius:45px;
  background:#ffbc63;
  display:flex; align-items:center; justify-content:center;
  gap:23px; cursor:pointer; z-index:10; padding:0 22px;
  transition: transform .15s, filter .1s;
}
.start-button::before {
  content:'';
  position:absolute; left:13px; right:22px; top:12px; bottom:12px;
  background:#ff6d37; border-radius:36px; z-index:-1;
}
.start-button span { color:white; font-size:28px; letter-spacing:1px; text-shadow:3px 3px 0 rgba(0,0,0,.12); }
.play-circle {
  width:65px; height:65px; border-radius:50%;
  background:#2e3e1b; color:#39ff17;
  display:grid; place-items:center;
  font-size:40px; line-height:1; padding-left:8px;
}
.start-button:hover  { transform:translateX(-50%) translateY(-4px) scale(1.02); filter:brightness(1.05); }
.start-button:active { transform:translateX(-50%) translateY(2px) scale(.97); }

/* ── Pergunta ── */
.question-box {
  position:relative; z-index:9;
  margin: 0 auto;
  margin-top: 130px;
  width: fit-content;
  max-width: 760px;
  text-align: center;
  font-family: 'Press Start 2P', monospace;
  font-size: clamp(15px, 2.2vw, 24px);
  color: #050505;
  line-height: 1.7;
  background: rgba(255,255,255,0.72);
  border-radius: 18px;
  padding: 20px 32px;
  border: 4px solid rgba(0,0,0,0.08);
  backdrop-filter: blur(2px);
}

/* Caixa de pergunta especial Fase 4 */
.question-box-fase4 {
  background: rgba(255, 245, 200, 0.88);
  border: 4px solid #c8a020;
  color: #3a2800;
}

/* Caixa de pergunta especial Fase 5 */
.question-box-fase5 {
  background: rgba(220, 240, 255, 0.92);
  border: 4px solid #1a6fbf;
  color: #0a2a50;
}

/* Caixa de pergunta especial Fase 6 */
.question-box-fase6 {
  background: rgba(20, 20, 60, 0.90);
  border: 4px solid #4444cc;
  color: #e0e0ff;
}

.fase4-icon-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-bottom: 10px;
}

.fase4-badge {
  font-family: 'Press Start 2P', monospace;
  font-size: clamp(9px, 1.2vw, 12px);
  color: #8a4400;
  background: #ffd54f;
  border: 2px solid #e67e22;
  border-radius: 8px;
  padding: 4px 10px;
}

.fase-badge-special {
  font-family: 'Press Start 2P', monospace;
  font-size: clamp(9px, 1.2vw, 12px);
  color: #003a80;
  background: #b3d9ff;
  border: 2px solid #1a6fbf;
  border-radius: 8px;
  padding: 4px 10px;
}

.fase6-badge {
  color: #ffe566;
  background: #22226a;
  border-color: #5555dd;
}

/* ── Opções ── */
.options-row {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 92%;
  max-width: 900px;
  display: flex;
  gap: 18px;
  z-index: 10;
}

.option-card {
  flex: 1;
  background: #ffbc63;
  border: 5px solid #e07e10;
  border-radius: 22px;
  padding: 18px 16px 14px;
  cursor: pointer;
  position: relative;
  font-family: 'Press Start 2P', monospace;
  transition: transform .15s, filter .1s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}
.option-card::before {
  content:'';
  position:absolute; inset:8px;
  background:#ff6d37;
  border-radius:14px;
  z-index:0;
}

/* Opção de reciclagem com destaque verde */
.option-recycle {
  background: #a8e063;
  border-color: #4cae00;
}
.option-recycle::before {
  background: #5cb800;
}

/* Opção tecnológica (Fase 5) */
.option-tech {
  background: #b3d9ff;
  border-color: #1a6fbf;
}
.option-tech::before {
  background: #2a7fd4;
}

/* Opção câmera (Fase 6) */
.option-camera {
  background: #c8c8ff;
  border-color: #4444cc;
}
.option-camera::before {
  background: #5555dd;
}

.option-card:hover:not(:disabled) { transform:translateY(-5px) scale(1.02); filter:brightness(1.06); }
.option-card:active:not(:disabled) { transform:translateY(2px) scale(.97); }
.option-card.chosen { filter: brightness(1.1); transform: scale(1.04); border-color: #050505; }
.option-card.correct { border-color: #2a8c00; background: #baff75; }
.option-card.correct::before { background: #4cae00; }
.option-card:disabled { cursor: default; }

.option-icon-top {
  position: relative;
  z-index: 1;
}

.option-title {
  position: relative; z-index:1;
  font-size: clamp(12px, 1.8vw, 18px);
  color: white;
  text-shadow: 2px 2px 0 rgba(0,0,0,.2);
  text-align: center;
  line-height: 1.6;
}

.option-badges {
  position: relative; z-index:1;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.badge {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #0455a6;
  border: 3px solid #03377a;
  border-radius: 30px;
  padding: 4px 14px 4px 6px;
  font-family: 'Press Start 2P', monospace;
  font-size: clamp(11px, 1.4vw, 15px);
  color: white;
  white-space: nowrap;
}
.badge-coin { background: #0455a6; border-color: #03377a; }
.badge-exp  { background: #2d6b14; border-color: #1a4409; }

/* ── Feedback ── */
.feedback-bar {
  position: absolute;
  bottom: 172px;
  left: 50%;
  transform: translateX(-50%);
  width: 88%;
  max-width: 760px;
  z-index: 11;
  background: rgba(10,10,20,0.88);
  border-radius: 14px;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  gap: 14px;
  animation: slideUp .3s ease;
}
.feedback-bar span {
  font-family: 'Press Start 2P', monospace;
  font-size: clamp(10px, 1.3vw, 13px);
  color: #fff;
  line-height: 1.7;
}
.feedback-emoji { font-size: 24px; flex-shrink: 0; }

@keyframes slideUp {
  from { opacity:0; transform:translateX(-50%) translateY(16px); }
  to   { opacity:1; transform:translateX(-50%) translateY(0); }
}

/* ── Tela Final ── */
.end-screen {
  display: flex;
  align-items: center;
  justify-content: center;
}
.end-panel {
  position: relative; z-index: 9;
  background: rgba(255,255,255,0.88);
  border-radius: 24px;
  border: 5px solid #0455a6;
  padding: 48px 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  margin-top: -80px;
}
.end-title {
  font-family: 'Press Start 2P', monospace;
  font-size: clamp(22px, 3.5vw, 40px);
  color: #050505;
  padding-top: 0 !important;
}
.end-sub {
  font-family: 'Press Start 2P', monospace;
  font-size: clamp(12px, 1.8vw, 18px);
  color: #333;
  text-align: center;
  line-height: 1.8;
}
.end-stats {
  display: flex;
  gap: 32px;
}
.stat {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Press Start 2P', monospace;
  font-size: clamp(12px, 1.6vw, 16px);
  color: #050505;
}
.end-panel .start-button {
  position: static;
  transform: none;
  width: 380px;
}
.end-panel .start-button:hover { transform: translateY(-4px) scale(1.02); filter: brightness(1.05); }
.end-panel .start-button:active { transform: translateY(2px) scale(.97); }

/* ── Responsivo ── */
@media (max-width: 760px) {
  .hud { transform:scale(.78); transform-origin:top left; }
  .hud-right { transform-origin:top right; }
  h1 { padding-top:150px; }
  .tree-left  { left:150px; }
  .tree-right { right:160px; }
  .building-right-1 { right:110px; }
  .building-right-2 { right:-20px; }
  .start-button { width:290px; }
  .options-row { flex-direction: column; bottom: 4px; width: 96%; gap: 10px; }
  .option-card { padding: 12px 12px 10px; }
  .question-box { font-size: 12px; padding: 14px 20px; margin-top: 110px; }
  .end-panel { padding: 28px 20px; }
  .end-panel .start-button { width: 290px; }
  .end-stats { gap: 16px; flex-direction: column; }
  .lixao-scene { display: none; }
  .fase-indicator { top: 8px; padding: 6px 14px 5px; }
  .fase-nome { display: none; }
}
`;
