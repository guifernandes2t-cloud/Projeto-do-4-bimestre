import styles from './Sobre.module.css';

export default function Sobre({ aoIrParaFormulario }) {
  const pontos = [
    'Aumento de ondas de calor extremo no interior paulista nos últimos anos.',
    'Ilhas de calor urbanas causadas pela redução de áreas verdes e excesso de asfalto.',
    'Impacto direto na saúde, no bem-estar e no rendimento escolar dos estudantes.',
  ];

  return (
    <section className={styles.secao}>
      <h2>Mudanças Climáticas e o Calor em Araraquara</h2>
      <p>
        Conhecida como a Morada do Sol, Araraquara sempre teve temperaturas elevadas, mas nos
        últimos anos os registros de calor extremo e períodos de estiagem se tornaram mais
        frequentes e intensos.
      </p>

      <figure className={styles.figura}>
        <img
          src="https://images.unsplash.com/photo-1504370805625-d32c54b16100?auto=format&fit=crop&w=800&q=80"
          alt="Sol forte em céu limpo representando altas temperaturas"
          className={styles.imagem}
        />
        <figcaption className={styles.legenda}>
          Foto: Unsplash (Licença livre)
        </figcaption>
      </figure>

      <ul className={styles.lista}>
        {pontos.map((ponto, index) => (
          <li key={index}>{ponto}</li>
        ))}
      </ul>

      <p className={styles.fonte}>
        <strong>Fontes:</strong> Instituto Nacional de Meteorologia (INMET) e Painel
        Intergovernamental sobre Mudanças Climáticas (IPCC).
      </p>

      <button onClick={aoIrParaFormulario} className={styles.cta}>
        Participar da Pesquisa
      </button>
    </section>
  );
}
