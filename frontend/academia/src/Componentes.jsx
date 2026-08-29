import { useState } from "react";

function Componente() {
    return (
        <div>
            <p className="fontGym">Titulo</p>
            <p className="fontGym2">Titulo 2</p><br /><br />

            <div className="cardLogin">
                <label className="textoCard">Email:</label>
                <input  type="email" /><br />
                <label className="textoCard">Senha:</label>
                <input type="senha" /><br />
                <button>Entrar</button>
            </div>
        </div>
    )
}

export default Componente;