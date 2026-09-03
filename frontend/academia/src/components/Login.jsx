import { useState } from "react";
import Botao from "./Botao";

function Login({ onLoginSucesso }) {
    const [mensagem, setMensagem] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha]= useState("");
    
    async function ascLogin(){
        setMensagem("");
        try {
            const res = await fetch(`http://localhost:8080/usuarios/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    senha: senha
                })
            });
            
        if (!res.ok) {
            setMensagem("Erro " + res.status);
            return;
                    
        }

        const usuario = await res.json();
            console.log("Login efetuado " + usuario); 
            
            if (onLoginSucesso) {
                onLoginSucesso();
            }
        
    } catch (erro) {
        setMensagem("Não foi possivel efetuar o login");
    };
}

    return (
        <div>
            <p className="fontGym">Gym</p>
            <p className="fontGym2">System</p><br /><br />

            <div className="cardLogin">
                <label className="textoCard">Email:</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} /><br />
                <label className="textoCard" >Senha:</label>
                <input type="password" onChange={(e) => setSenha(e.target.value)} /><br />
                <Botao variante="primario" onClick={ascLogin}>Entrar</Botao>
                {mensagem && (
                    <p style={{ color: "#ff4d4d", fontSize: "1", marginTop: "10px" }}>
                        {mensagem}
                    </p>
                )}
            </div>
                
        </div>
    )
}

export default Login;