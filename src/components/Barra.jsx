import styles from './Barra.module.css';

export default function Barra({ rotulo, quantidade, total }) {
  const porcentagem = total > 0 ? Math.round((quantidade / total) * 100) : 0;

  return (
    <div className={styles.item}>
      <div className={styles.topo}>
        <span>{rotulo}</span>
        <span>
          {quantidade} ({porcentagem}%)
        </span>
      </div>
      <div className={styles.trilho}>
        <div className={styles.preenchimento} style={{ width: `${porcentagem}%` }} />
      </div>
    </div>
  );
}
