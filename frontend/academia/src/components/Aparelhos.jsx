import { useState, useEffect } from "react";
import styles from "./Aparelhos.module.css";
import Botao from "./Botao";

function Aparelhos() {
    const [aparelhos, setAparelhos] = useState([]);
    const [nome, setNome] = useState("");
    const [mensagem, setMensagem] = useState("");

    useEffect(() => {
        carregarAparelhos();
    }, []);

    async function carregarAparelhos() {
        try {
            const res = await fetch("http://localhost:8080/aparelhos");
            if (res.ok) {
                const dados = await res.json();
                setAparelhos(dados);
            }
        } catch (erro) {
            setMensagem("Erro ao carregar a lista de aparelhos.");
        }
    }

    async function cadastrarAparelho(e) {

        if (!nome) {
            setMensagem("Digite o nome do aparelho.");
            return;
        }

        try {
            const res = await fetch("http://localhost:8080/aparelhos/cadastrar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome: nome })
            });

            if (res.ok) {
                setMensagem("Aparelho cadastrado com sucesso!");
                setNome("");
                carregarAparelhos();
            } else {
                setMensagem("Erro ao cadastrar aparelho.");
            }
        } catch (erro) {
            setMensagem("Erro ao conectar com o servidor.");
        }
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.titulo}>Gestão de Aparelhos</h2>
            <form onSubmit={cadastrarAparelho} className={styles.card}>
                <h3>Novo Aparelho</h3>
                
                <label className={styles.label}>Nome do Aparelho:</label>
                <input 
                    type="text" 
                    className={styles.input}
                    value={nome} 
                    onChange={(e) => setNome(e.target.value)} 
                />
                

                
                <Botao onClick={cadastrarAparelho} tipo="submit" variante="primario">Salvar</Botao>
                
                {mensagem && <p className={styles.mensagem}>{mensagem}</p>}
            </form>

            <div className={styles.card}>
                <h3>Lista de Aparelhos</h3>
                {aparelhos.length === 0 ? (
                    <p className={styles.vazio}>Nenhum aparelho cadastrado.</p>
                ) : (
                    <ul className={styles.lista}>
                        {aparelhos.map((item) => (
                            <li key={item.id} className={styles.item}>
                                {item.nome}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Aparelhos;