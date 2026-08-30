import styles from "./Botao.module.css"

function Botao({ children, onClick, tipo = "button", variante = "primario"}) {
    return (
        <button
            type={tipo}
            onClick={onClick}
            className={`${styles.botao} ${styles[variante]}`}
        >
            {children} 
        </button>
    );

}
export default Botao