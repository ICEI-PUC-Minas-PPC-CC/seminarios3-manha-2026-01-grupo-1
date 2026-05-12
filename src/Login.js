import React, { useState } from "react";

const Login = () => {
  // Estados para os campos de texto
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  // Estado para acessibilidade (Ex: Alto Contraste)
  const [altoContraste, setAltoContraste] = useState(false);

  const estiloPagina = {
    backgroundColor: altoContraste ? "#000" : "#f4f4f4",
    color: altoContraste ? "#fff" : "#333",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
  };

  return (
    <div style={estiloPagina}>
      <h2>Login</h2>

      <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="text"
          placeholder="Nome de Usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button type="submit">Entrar</button>
      </form>

      <hr style={{ width: "200px", margin: "20px 0" }} />

      {/* Seção de Acessibilidade */}
      <p>Precisa de acessibilidade?</p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => setAltoContraste(true)}>
          Ativar Alto Contraste
        </button>
        <button onClick={() => setAltoContraste(false)}>Modo Padrão</button>
      </div>
    </div>
  );
};

export default Login;
