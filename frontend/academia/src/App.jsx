import { useState } from "react";
import Login from "./components/Login";
import "./App.css";
import Aparelhos from "./components/Aparelhos";

function App() {
const [telaAtual, setTelaAtual] = useState("login");

    return(
        <div className="background">
            {telaAtual === "login" && (
                <Login onLoginSucesso={() => setTelaAtual("aparelhos")}/>
            )}
            {telaAtual === "aparelhos" && (
                <Aparelhos />
            )}
        </div>
    )
}


export default App;