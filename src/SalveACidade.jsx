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
.option-card:hover:not(:disabled) { transform:translateY(-5px) scale(1.02); filter:brightness(1.06); }
.option-card:active:not(:disabled) { transform:translateY(2px) scale(.97); }
.option-card.chosen { filter: brightness(1.1); transform: scale(1.04); border-color: #050505; }
.option-card.correct { border-color: #2a8c00; background: #baff75; }
.option-card:disabled { cursor: default; }

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
}
`;
