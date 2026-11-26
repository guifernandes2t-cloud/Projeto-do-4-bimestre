import styles from './Cabecalho.module.css';

export default function Cabecalho({ abaAtiva, aoMudarAba }) {
  const abas = [
    { id: 'sobre', label: 'Sobre o Tema' },
    { id: 'formulario', label: 'Responder Pesquisa' },
    { id: 'resultados', label: 'Resultados' },
  ];

  return (
    <header className={styles.header}>
      <h1 className={styles.titulo}>Clima em Araraquara</h1>
      <nav className={styles.nav}>
        {abas.map((item) => (
          <button
            key={item.id}
            onClick={() => aoMudarAba(item.id)}
            className={`${styles.botao} ${abaAtiva === item.id ? styles.ativo : ''}`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
