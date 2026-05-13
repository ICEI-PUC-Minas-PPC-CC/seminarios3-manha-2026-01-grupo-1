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

