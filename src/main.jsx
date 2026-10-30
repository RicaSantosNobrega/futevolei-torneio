import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Trophy, Users, Shuffle, Plus, Trash2, Dumbbell, Flame } from 'lucide-react';

function App() {
  const [aba, setAba] = useState('sorteio'); // 'sorteio', 'treinos', 'arena'

  // ESTADOS DO SORTEADOR DE DUPLAS (ARENA JOGA BEACH)
  const [novoAtleta, setNovoAtleta] = useState('');
  const [poteAtleta, setPoteAtleta] = useState('A'); // Pote A (Linha/Avançado) ou Pote B (Base/Iniciante)
  
  // LISTA DE ATLETAS DO TORNEIO JOGA BEACH (PODES ADICIONAR E REMOVER)
  const [listaAtletas, setListaAtletas] = useState([
    { id: 1, nome: "Rica Santos", pote: "A" },
    { id: 2, nome: "Rafão", pote: "A" },
    { id: 3, nome: "Eric", pote: "A" },
    { id: 4, nome: "Anderson", pote: "A" },
    { id: 5, nome: "Ricardo Padua", pote: "A" },
    { id: 6, nome: "Danillo", pote: "A" },
    { id: 7, nome: "Diego", pote: "B" },
    { id: 8, nome: "Sérgio", pote: "B" },
    { id: 9, nome: "Alvaro", pote: "B" },
    { id: 10, nome: "Wagninho", pote: "B" },
    { id: 11, nome: "Luis Felipe", pote: "B" },
    { id: 12, nome: "Carlos Guimarães", pote: "B" }
  ]);
  const [duplasSorteadas, setDuplasSorteadas] = useState([]);

  // Adicionar Novo Atleta (Ação do Botão + e Tecla Enter)
  const adicionarAtleta = (e) => {
    if (e) e.preventDefault();
    if (!novoAtleta.trim()) return;
    
    const novo = {
      id: Date.now(),
      nome: novoAtleta.trim(),
      pote: poteAtleta
    };

    setListaAtletas(prev => [...prev, novo]);
    setNovoAtleta('');
  };

  // Remover Atleta
  const removerAtleta = (id) => {
    setListaAtletas(prev => prev.filter(a => a.id !== id));
  };

  // Algoritmo de Sorteio de Duplas
  const realizarSorteio = () => {
    if (listaAtletas.length < 2) {
      alert("Cadastre pelo menos 2 atletas para realizar o sorteio!");
      return;
    }

    const poteA = listaAtletas.filter(a => a.pote === 'A').sort(() => Math.random() - 0.5);
    const poteB = listaAtletas.filter(a => a.pote === 'B').sort(() => Math.random() - 0.5);

    let duplas = [];
    let idDupla = 1;

    // Se houver divisão por Potes (Pote A x Pote B - Equilibrado)
    if (poteA.length > 0 && poteB.length > 0) {
      const minLen = Math.min(poteA.length, poteB.length);
      for (let i = 0; i < minLen; i++) {
        duplas.push({
          id: idDupla++,
          atleta1: poteA[i].nome,
          atleta2: poteB[i].nome,
          tipo: "Equilibrada (Pote A + B)"
        });
      }
      // Sobras do Pote A
      const sobrasA = poteA.slice(minLen);
      for (let i = 0; i < sobrasA.length; i += 2) {
        if (sobrasA[i + 1]) {
          duplas.push({ id: idDupla++, atleta1: sobrasA[i].nome, atleta2: sobrasA[i + 1].nome, tipo: "Pote A x Pote A" });
        }
      }
      // Sobras do Pote B
      const sobrasB = poteB.slice(minLen);
      for (let i = 0; i < sobrasB.length; i += 2) {
        if (sobrasB[i + 1]) {
          duplas.push({ id: idDupla++, atleta1: sobrasB[i].nome, atleta2: sobrasB[i + 1].nome, tipo: "Pote B x Pote B" });
        }
      }
    } else {
      // Sorteio 100% Aleatório Livre
      const todosEmbaralhados = [...listaAtletas].sort(() => Math.random() - 0.5);
      for (let i = 0; i < todosEmbaralhados.length; i += 2) {
        if (todosEmbaralhados[i + 1]) {
          duplas.push({
            id: idDupla++,
            atleta1: todosEmbaralhados[i].nome,
            atleta2: todosEmbaralhados[i + 1].nome,
            tipo: "Sorteio Livre"
          });
        }
      }
    }

    setDuplasSorteadas(duplas);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-12">
      {/* HEADER ARENA JOGA BEACH */}
      <header className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-slate-950 px-4 py-3 shadow-xl sticky top-0 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-slate-950 text-amber-400 p-2 rounded-xl shadow-md border border-amber-400/30 font-black text-xl">
              🏖️
            </div>
            <div>
              <h1 className="font-extrabold text-lg uppercase tracking-wider leading-none text-slate-950">
                Arena Joga Beach
              </h1>
              <p className="text-[11px] font-bold text-slate-900 opacity-90">
                Futevôlei & Gym Tracker
              </p>
            </div>
          </div>
          <span className="bg-slate-950 text-amber-400 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
            Oficial
          </span>
        </div>
      </header>

      {/* NAVEGAÇÃO DE ABAS */}
      <div className="max-w-md mx-auto px-4 mt-4 grid grid-cols-3 gap-2">
        <button 
          onClick={() => setAba('sorteio')}
          className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 ${
            aba === 'sorteio' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-900 text-slate-400 border border-slate-800'
          }`}
        >
          <Shuffle className="w-3.5 h-3.5" /> Sorteio Duplas
        </button>
        <button 
          onClick={() => setAba('treinos')}
          className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 ${
            aba === 'treinos' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-900 text-slate-400 border border-slate-800'
          }`}
        >
          <Dumbbell className="w-3.5 h-3.5" /> Treinos
        </button>
        <button 
          onClick={() => setAba('arena')}
          className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 ${
            aba === 'arena' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-900 text-slate-400 border border-slate-800'
          }`}
        >
          <Trophy className="w-3.5 h-3.5" /> Quadras Joga
        </button>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="max-w-md mx-auto px-4 pt-4 space-y-4">

        {/* ABA: SORTEADOR DE DUPLAS */}
        {aba === 'sorteio' && (
          <div className="space-y-4">
            {/* FORMULÁRIO DE CADASTRO DE ATLETAS */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3">
              <h3 className="font-bold text-amber-400 text-sm flex items-center gap-2">
                <Users className="w-4 h-4" /> Cadastrar Atletas para o Sorteio
              </h3>
              
              <form onSubmit={adicionarAtleta} className="flex gap-2">
                <input 
                  type="text" 
                  value={novoAtleta}
                  onChange={(e) => setNovoAtleta(e.target.value)}
                  placeholder="Nome do Atleta..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <select 
                  value={poteAtleta}
                  onChange={(e) => setPoteAtleta(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-amber-400 text-xs rounded-lg px-2 py-2 focus:outline-none font-semibold"
                >
                  <option value="A">Pote A (Linha)</option>
                  <option value="B">Pote B (Base)</option>
                </select>
                <button 
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 p-2.5 rounded-lg font-bold transition-all shadow-md active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </form>

              {/* LISTA DE ATLETAS CADASTRADOS */}
              <div className="pt-2">
                <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
                  <span>Atletas Presentes ({listaAtletas.length})</span>
                  <span>Pote A / Pote B</span>
                </div>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                  {listaAtletas.map((atleta) => (
                    <div key={atleta.id} className="bg-slate-950 border border-slate-800/80 p-2 rounded-lg flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200 truncate max-w-[90px]">{atleta.nome}</span>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                          atleta.pote === 'A' ? 'bg-amber-500/20 text-amber-400' : 'bg-teal-500/20 text-teal-400'
                        }`}>
                          Pote {atleta.pote}
                        </span>
                        <button 
                          onClick={() => removerAtleta(atleta.id)} 
                          className="text-slate-500 hover:text-red-400 transition-colors p-0.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* BOTÃO DE REALIZAR SORTEIO */}
              <button 
                onClick={realizarSorteio}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold py-3 rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2 mt-2 active:scale-98"
              >
                <Shuffle className="w-5 h-5" /> Realizar Sorteio Automático
              </button>
            </div>

            {/* EXIBIÇÃO DAS DUPLAS SORTEADAS */}
            {duplasSorteadas.length > 0 && (
              <div className="bg-slate-900 border border-amber-500/30 p-4 rounded-xl space-y-3">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <h3 className="font-bold text-amber-400 text-sm flex items-center gap-2">
                    <Trophy className="w-4 h-4" /> Duplas Sorteadas ({duplasSorteadas.length})
                  </h3>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                    Sorteio Concluído
                  </span>
                </div>

                <div className="space-y-2">
                  {duplasSorteadas.map((dupla) => (
                    <div key={dupla.id} className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">
                          Dupla {dupla.id < 10 ? `0${dupla.id}` : dupla.id}
                        </span>
                        <p className="text-sm font-bold text-white mt-0.5">
                          {dupla.atleta1} <span className="text-amber-400">&</span> {dupla.atleta2}
                        </p>
                      </div>
                      <span className="text-[9px] bg-slate-800 text-slate-400 px-2 py-1 rounded-lg">
                        {dupla.tipo}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ABA: TREINOS (ALUNO & PROFESSOR) */}
        {aba === 'treinos' && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3">
              <h3 className="font-bold text-amber-400 text-sm flex items-center gap-2">
                <Dumbbell className="w-4 h-4" /> Treinos de Academia & Areia (Joga Beach)
              </h3>
              <p className="text-xs text-slate-300">
                Acesse a preparação física específica e treinos autônomos por nível (Iniciante, Intermediário, Avançado).
              </p>
            </div>
          </div>
        )}

        {/* ABA: QUADRAS DA ARENA JOGA BEACH */}
        {aba === 'arena' && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3">
              <h3 className="font-bold text-amber-400 text-sm flex items-center gap-2">
                <Trophy className="w-4 h-4" /> Gestão de Quadras - Arena Joga Beach
              </h3>
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="bg-emerald-900/30 border border-emerald-500/40 p-2.5 rounded-lg text-center">
                  <span className="text-xs font-bold text-emerald-400">Quadra 1</span>
                  <p className="text-[10px] text-slate-300 mt-1">Escolinha</p>
                </div>
                <div className="bg-amber-900/30 border border-amber-500/40 p-2.5 rounded-lg text-center">
                  <span className="text-xs font-bold text-amber-400">Quadra 2</span>
                  <p className="text-[10px] text-slate-300 mt-1">Sorteio / Day Use</p>
                </div>
                <div className="bg-slate-800/40 border border-slate-700 p-2.5 rounded-lg text-center">
                  <span className="text-xs font-bold text-slate-400">Quadra 3</span>
                  <p className="text-[10px] text-slate-300 mt-1">Livre</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
