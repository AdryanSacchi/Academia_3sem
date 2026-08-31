import { useState } from "react";
import style from "./Botao.module.css"

function Cadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");

    async function cadastrar() {
        const resposta = await fetch(
        "http://localhost:8080/usuarios/cadastrar",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nome: nome,
                email: email,
                senha: senha
            })
        }
        );

        if (!resposta.ok) {
            setMensagem("Erro " + resposta.status);
            return;
        }

        const dados = await resposta.json();
        setMensagem(dados.mensagem || "Cadastro realizado com sucesso!");
    }

    return (
        <div>
            <p>Cadastro</p><br /><br />

            <div className="cardLogin">
                <label className="textoCard">Nome:</label>
                <input 
                    type="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}  
                    /><br />

                <label className="textoCard">Email:</label>
                <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}  
                    /><br />

                <label className="textoCard">Senha:</label>
                <input 
                    type="senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}  
                    /><br />

                <Botao variante="primario" onClick={cadastrar}>Cadastrar</Botao>

                <p>{mensagem}</p>
            </div>
        </div>
    )
}

export default Cadastro;