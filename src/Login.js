import React, { useState } from "react";

const API_URL = "http://127.0.0.1:8000";

const Login = () => {
  const [modo, setModo] = useState("login");
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [altoContraste, setAltoContraste] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const criandoConta = modo === "cadastro";

  const enviarFormulario = async (event) => {
    event.preventDefault();
    setCarregando(true);
    setMensagem("");

    const endpoint = criandoConta ? "/cadastro/" : "/login/";
    const payload = {
      usuario,
      senha,
      acessibilidade: altoContraste,
      ...(criandoConta ? { email } : {}),
    };

    try {
      const resposta = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await resposta.json();

      if (!resposta.ok) {
        setMensagem(data.erro || "Nao foi possivel concluir a operacao.");
        return;
      }

      setMensagem(data.mensagem);
      if (criandoConta) {
        setModo("login");
        setSenha("");
      }
    } catch {
      setMensagem("Nao foi possivel conectar ao backend.");
    } finally {
      setCarregando(false);
    }
  };

  const cores = altoContraste
    ? {
        fundo: "#050505",
        painel: "#101010",
        texto: "#ffffff",
        detalhe: "#f5d90a",
        borda: "#ffffff",
        campo: "#000000",
      }
    : {
        fundo: "#eef2f6",
        painel: "#ffffff",
        texto: "#19202a",
        detalhe: "#2563eb",
        borda: "#d6dde8",
        campo: "#f8fafc",
      };

  const estiloPagina = {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: "24px",
    background: cores.fundo,
    color: cores.texto,
    fontFamily: "Arial, sans-serif",
  };

  const estiloPainel = {
    width: "100%",
    maxWidth: "420px",
    background: cores.painel,
    border: `1px solid ${cores.borda}`,
    borderRadius: "8px",
    padding: "28px",
    boxShadow: altoContraste ? "none" : "0 18px 45px rgba(23, 37, 84, 0.14)",
  };

  const estiloCampo = {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 14px",
    borderRadius: "6px",
    border: `1px solid ${cores.borda}`,
    background: cores.campo,
    color: cores.texto,
    fontSize: "15px",
  };

  const estiloBotao = {
    width: "100%",
    border: "0",
    borderRadius: "6px",
    padding: "12px 14px",
    background: cores.detalhe,
    color: altoContraste ? "#000" : "#fff",
    fontWeight: 700,
    cursor: "pointer",
  };

  return (
    <main style={estiloPagina}>
      <section style={estiloPainel}>
        <div style={{ marginBottom: "22px" }}>
          <strong style={{ color: cores.detalhe }}>Sistema de acesso</strong>
          <h1 style={{ margin: "8px 0 6px", fontSize: "28px" }}>
            {criandoConta ? "Criar conta" : "Entrar"}
          </h1>
          <p style={{ margin: 0, color: altoContraste ? "#fff" : "#596272" }}>
            {criandoConta
              ? "Cadastre seus dados para acessar o sistema."
              : "Use seu usuario ou email e senha para continuar."}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
            marginBottom: "18px",
          }}
        >
          <button
            type="button"
            onClick={() => setModo("login")}
            style={{
              ...estiloBotao,
              background: !criandoConta ? cores.detalhe : "transparent",
              color: !criandoConta ? (altoContraste ? "#000" : "#fff") : cores.texto,
              border: `1px solid ${cores.borda}`,
            }}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setModo("cadastro")}
            style={{
              ...estiloBotao,
              background: criandoConta ? cores.detalhe : "transparent",
              color: criandoConta ? (altoContraste ? "#000" : "#fff") : cores.texto,
              border: `1px solid ${cores.borda}`,
            }}
          >
            Cadastro
          </button>
        </div>

        <form
          onSubmit={enviarFormulario}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(event) => setUsuario(event.target.value)}
            style={estiloCampo}
            required
          />

          {criandoConta && (
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              style={estiloCampo}
            />
          )}

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            style={estiloCampo}
            minLength={criandoConta ? 6 : undefined}
            required
          />

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
            }}
          >
            <input
              type="checkbox"
              checked={altoContraste}
              onChange={(event) => setAltoContraste(event.target.checked)}
            />
            Alto contraste
          </label>

          <button type="submit" disabled={carregando} style={estiloBotao}>
            {carregando ? "Enviando..." : criandoConta ? "Criar conta" : "Entrar"}
          </button>
        </form>

        {mensagem && (
          <p
            style={{
              margin: "16px 0 0",
              color: mensagem.includes("sucesso") ? cores.detalhe : "#dc2626",
              fontWeight: 700,
            }}
          >
            {mensagem}
          </p>
        )}
      </section>
    </main>
  );
};

export default Login;
