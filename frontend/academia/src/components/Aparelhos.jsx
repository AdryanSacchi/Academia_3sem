import { useState, useEffect } from "react";
import styles from "./Aparelhos.module.css";
import Botao from "./Botao";

function Aparelhos() {
    const [aparelhos, setAparelhos] = useState([]);
    const [nome, setNome] = useState("");
    const [marca, setMarca] = useState("");
    const [grupoMuscular, setGrupoMuscular] = useState("");
    const [status, setStatus] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [pesoMax, setPesoMax] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [isErro, setIsErro] = useState(false);

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
            setIsErro(true);
            setMensagem("Erro ao carregar a lista de aparelhos.");
        }
    }

    async function cadastrarAparelho() {
        if (!nome.trim()) {
            setIsErro(true);
            setMensagem("Digite o nome do aparelho.");
            return;
        }

        try {
            const res = await fetch("http://localhost:8080/aparelhos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    nome: nome,
                    marca: marca,
                    status: status,
                    grupoMuscular: grupoMuscular,
                    quantidade: quantidade ? parseInt(quantidade, 10) : null,
                    pesoMax: pesoMax ? parseInt(pesoMax, 10) : null
                })
            });

            if (res.ok) {
                setIsErro(false);
                setMensagem("Aparelho cadastrado com sucesso!");
                setNome("");
                setMarca("");
                setGrupoMuscular("");
                setStatus("");
                setQuantidade("");
                setPesoMax("");
                carregarAparelhos();
            } else {
                setIsErro(true);
                setMensagem("Erro ao cadastrar aparelho.");
            }
        } catch (erro) {
            setIsErro(true);
            setMensagem("Erro ao conectar com o servidor.");
        }
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.titulo}>Gestão de Aparelhos</h2>
            
            <div className={styles.card2}>
                <h3>Novo Aparelho</h3>
                
                <label className={styles.label}>Nome do Aparelho:</label>
                <input 
                    type="text" 
                    className={styles.input}
                    value={nome} 
                    onChange={(e) => setNome(e.target.value)} 
                />

                <label className={styles.label}>Marca:</label>
                <input 
                    type="text" 
                    className={styles.input}
                    value={marca} 
                    onChange={(e) => setMarca(e.target.value)} 
                />

                <label className={styles.label}>Grupo Muscular:</label>
                <input 
                    type="text" 
                    className={styles.input}
                    value={grupoMuscular} 
                    onChange={(e) => setGrupoMuscular(e.target.value)} 
                />

                <label className={styles.label}>Status:</label>
                <input 
                    type="text" 
                    className={styles.input}
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)} 
                />

                <label className={styles.label}>Quantidade:</label>
                <input 
                    type="number" 
                    className={styles.input}
                    value={quantidade} 
                    onChange={(e) => setQuantidade(e.target.value)} 
                />

                <label className={styles.label}>Peso Máximo (kg):</label>
                <input 
                    type="number" 
                    className={styles.input}
                    value={pesoMax} 
                    onChange={(e) => setPesoMax(e.target.value)} 
                />
                
                <Botao onClick={cadastrarAparelho} tipo="button" variante="primario">
                    Adicionar
                </Botao>
                
                {mensagem && <p className={isErro ? styles.mensagemErro : styles.mensagemSucesso}>{mensagem}</p>}
            </div>

            <div className={styles.card}>
                <h3>Lista de Aparelhos</h3>
                {aparelhos.length === 0 ? (
                    <p className={styles.vazio}>Nenhum aparelho cadastrado.</p>
                ) : (
                    <ul className={styles.lista}>
                        {aparelhos.map((item) => (
                            <li key={item.id} className={styles.item}>
                                <span className={styles.itemNome}>{item.nome}</span>
                                <span className={styles.itemDetalhe}>Marca: {item.marca || "-"}</span>
                                <span className={styles.itemDetalhe}>Grupo: {item.grupoMuscular || "-"}</span>
                                <span className={styles.itemDetalhe}>Status: {item.status || "-"}</span>
                                <span className={styles.itemDetalhe}>Qtd: {item.quantidade ?? "-"}</span>
                                <span className={styles.itemDetalhe}>Máx: {item.pesoMax ? `${item.pesoMax}kg` : "-"}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Aparelhos;