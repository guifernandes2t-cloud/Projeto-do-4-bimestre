import { useState } from 'react';
import Cabecalho from './components/Cabecalho.jsx';
import Sobre from './components/Sobre.jsx';
import Formulario from './components/Formulario.jsx';
import Resultados from './components/Resultados.jsx';
import styles from './App.module.css';

export default function App() {
  const [aba, setAba] = useState('sobre');

  return (
    <div className={styles.container}>
      <Cabecalho abaAtiva={aba} aoMudarAba={setAba} />
      <main className={styles.conteudo}>
        {aba === 'sobre' && <Sobre aoIrParaFormulario={() => setAba('formulario')} />}
        {aba === 'formulario' && <Formulario aoEnviarSucesso={() => setAba('resultados')} />}
        {aba === 'resultados' && <Resultados />}
      </main>
    </div>
  );
}
