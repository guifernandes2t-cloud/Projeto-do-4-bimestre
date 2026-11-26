import { useState } from 'react';
import { supabase } from '../lib/supabase.js';
import styles from './Formulario.module.css';

export default function Formulario({ aoEnviarSucesso }) {
  const [resposta1, setResposta1] = useState('Piorou muito');
  const [resposta2, setResposta2] = useState(3);
  const [resposta3, setResposta3] = useState('');
  const [status, setStatus] = useState('ocioso');

  const opcoes = ['Piorou muito', 'Piorou um pouco', 'Não mudou', 'Não sei dizer'];

  async function handleSubmit(e) {
    e.preventDefault();
    if (!supabase) {
      setStatus('erro');
      return;
    }

    setStatus('enviando');

    const { error } = await supabase.from('opinioes').insert([
      {
        tema: 'mudancas-climaticas',
        resposta_1: resposta1,
        resposta_2: Number(resposta2),
        resposta_3: resposta3.trim() || null,
      },
    ]);

    if (error) {
      setStatus('erro');
    } else {
      setStatus('enviado');
      setResposta3('');
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Sua opinião sobre o clima</h2>

      <div className={styles.campo}>
        <label className={styles.label}>
          1. Você sente que o calor em Araraquara mudou nos últimos anos?
        </label>
        {opcoes.map((opcao) => (
          <label key={opcao} className={styles.radioLabel}>
            <input
              type="radio"
              name="resposta1"
              value={opcao}
              checked={resposta1 === opcao}
              onChange={(e) => setResposta1(e.target.value)}
            />
            {opcao}
          </label>
        ))}
      </div>

      <div className={styles.campo}>
        <label className={styles.label}>
          2. De 1 a 5, quanto as mudanças climáticas afetam a sua rotina hoje? ({resposta2})
        </label>
        <input
          type="range"
          min="1"
          max="5"
          value={resposta2}
          onChange={(e) => setResposta2(e.target.value)}
          className={styles.range}
        />
        <div className={styles.escala}>
          <span>1 (Pouco)</span>
          <span>5 (Muito)</span>
        </div>
      </div>

      <div className={styles.campo}>
        <label className={styles.label}>
          3. O que o campus poderia fazer para diminuir o impacto do calor no dia a dia? (Opcional)
        </label>
        <textarea
          rows="3"
          value={resposta3}
          onChange={(e) => setResposta3(e.target.value)}
          placeholder="Escreva sua sugestão aqui..."
          className={styles.textarea}
        />
      </div>

      <button type="submit" disabled={status === 'enviando'} className={styles.botao}>
        {status === 'enviando' ? 'Enviando...' : 'Enviar Resposta'}
      </button>

      {status === 'enviado' && (
        <div className={styles.sucesso}>
          <p>Resposta registrada com sucesso!</p>
          <button type="button" onClick={aoEnviarSucesso} className={styles.link}>
            Ver resultados da turma
          </button>
        </div>
      )}

      {status === 'erro' && (
        <p className={styles.erro}>
          Erro ao enviar resposta. Verifique sua conexão ou a configuração do banco.
        </p>
      )}
    </form>
  );
}
