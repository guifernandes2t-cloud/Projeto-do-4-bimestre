import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';
import Barra from './Barra.jsx';
import styles from './Resultados.module.css';

export default function Resultados() {
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    async function buscarDados() {
      if (!supabase) {
        setErro(true);
        setCarregando(false);
        return;
      }

      const { data, error } = await supabase
        .from('opinioes')
        .select('*')
        .eq('tema', 'mudancas-climaticas')
        .order('criado_em', { ascending: false });

      if (error) {
        setErro(true);
      } else {
        setDados(data || []);
      }
      setCarregando(false);
    }

    buscarDados();
  }, []);

  if (carregando) return <p>Carregando resultados...</p>;
  if (erro) return <p className={styles.erro}>Erro ao carregar os dados do banco.</p>;
  if (dados.length === 0) {
    return <p>Nenhuma resposta registrada ainda. Seja o primeiro a responder!</p>;
  }

  const total = dados.length;
  const opcoes = ['Piorou muito', 'Piorou um pouco', 'Não mudou', 'Não sei dizer'];
  const somaEscala = dados.reduce((acc, item) => acc + item.resposta_2, 0);
  const mediaEscala = (somaEscala / total).toFixed(1);
  const comentarios = dados.filter((item) => item.resposta_3);

  return (
    <div className={styles.container}>
      <h2>Resultados da Pesquisa ({total} respostas)</h2>

      <div className={styles.bloco}>
        <h3>Percepção sobre o calor em Araraquara</h3>
        {opcoes.map((opcao) => {
          const qtd = dados.filter((item) => item.resposta_1 === opcao).length;
          return <Barra key={opcao} rotulo={opcao} quantidade={qtd} total={total} />;
        })}
      </div>

      <div className={styles.bloco}>
        <h3>Impacto na rotina</h3>
        <p className={styles.media}>
          Média: <strong>{mediaEscala}</strong> / 5
        </p>
      </div>

      <div className={styles.bloco}>
        <h3>Sugestões para o campus ({comentarios.length})</h3>
        {comentarios.length === 0 ? (
          <p className={styles.vazio}>Nenhum comentário enviado ainda.</p>
        ) : (
          <ul className={styles.listaComentarios}>
            {comentarios.map((item) => (
              <li key={item.id} className={styles.comentario}>
                {item.resposta_3}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
