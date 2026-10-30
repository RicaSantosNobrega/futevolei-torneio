import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Trophy, Users, Shield, Award, Calendar, Flame, CheckCircle, Clock } from 'lucide-react';

const DUPLAS = [
  { id: 1, nome: "Dupla 01", atletas: "Ricardo Padua & Danillo", grupo: "A" },
  { id: 2, nome: "Dupla 02", atletas: "Luis Felipe & Sérgio", grupo: "A" },
  { id: 3, nome: "Dupla 03", atletas: "Carlos Guimarães & Diego", grupo: "A" },
  { id: 4, nome: "Dupla 04", atletas: "Denis & Alvaro", grupo: "B" },
  { id: 5, nome: "Dupla 05", atletas: "Gustavo & Robson", grupo: "B" },
  { id: 6, nome: "Dupla 06", atletas: "Rica Santos & Anderson", grupo: "B" },
  { id: 7, nome: "Dupla 07", atletas: "José & Eder", grupo: "C" },
  { id: 8, nome: "Dupla 08", atletas: "Daniel & Wagninho", grupo: "C" },
  { id: 9, nome: "Dupla 09", atletas: "Uenderson & Tarek", grupo: "C" },
  { id: 10, nome: "Dupla 10", atletas: "Gui Saita & Diogo", grupo: "D" },
  { id: 11, nome: "Dupla 11", atletas: "Bryan Felipe & Gui Macario", grupo: "D" },
  { id: 12, nome: "Dupla 12", atletas: "Rafão & Eric", grupo: "D" },
];

const JOGOS_FASE_GRUPOS = [
  { rodada: 1, quadra: 1, grupo: "A", d1: "Dupla 01", d2: "Dupla 02", p1: 18, p2: 14, status: "Finalizado" },
  { rodada: 1, quadra: 2, grupo: "B", d1: "Dupla 04", d2: "Dupla 05", p1: 18, p2: 16, status: "Finalizado" },
  { rodada: 1, quadra: 3, grupo: "C", d1: "Dupla 07", d2: "Dupla 08", p1: 12, p2: 18, status: "Finalizado" },
  { rodada: 2, quadra: 1, grupo: "D", d1: "Dupla 10", d2: "Dupla 11", p1: 18, p2: 15, status: "Finalizado" },
  { rodada: 2, quadra: 2, grupo: "A", d1: "Dupla 01", d2: "Dupla 03", p1: 0, p2: 0, status: "Em Andamento" },
  { rodada: 2, quadra: 3, grupo: "B", d1: "Dupla 04", d2: "Dupla 06", p1: 0, p2: 0, status: "Em Andamento" },
  { rodada: 3, quadra: 1, grupo: "C", d1: "Dupla 07", d2: "Dupla 09", p1: 0, p2: 0, status: "Aguardando" },
  { rodada: 3, quadra: 2, grupo: "D", d1: "Dupla 10", d2: "Dupla 12 (Rafão & Eric)", p1: 0, p2: 0, status: "Aguardando" },
  { rodada: 3, quadra: 3, grupo: "A", d1: "Dupla 02", d2: "Dupla 03", p1: 0, p2: 0, status: "Aguardando" },
  { rodada: 4, quadra: 1, grupo: "B", d1: "Dupla 05", d2: "Dupla 06", p1: 0, p2: 0, status: "Aguardando" },
  { rodada: 4, quadra: 2, grupo: "C", d1: "Dupla 08", d2: "Dupla 09", p1: 0, p2: 0, status: "Aguardando" },
  { rodada: 4, quadra: 3, grupo: "D", d1: "Dupla 11", d2: "Dupla 12 (Rafão & Eric)", p1: 0, p2: 0, status: "Aguardando" },
];

function App() {
  const [aba, setAba] = useState('jogos');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-12">
      {/* HEADER TORNEIO */}
      <header className="bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 px-4 py-4 shadow-xl sticky top-0 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-slate-950 text-amber-400 p-2 rounded-xl shadow-inner">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-extrabold text-lg uppercase tracking-wider leading-none">Cavalo Manco</h1>
              <p className="text-xs font-semibold opacity-90">Arena Joga Beach • 3 Quadras</p>
            </div>
          </div>
          <span className="bg-slate-950 text-amber-400 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
            18 Pontos
          </span>
        </div>
      </header>

      {/* ABAS */}
      <div className="max-w-md mx-auto px-4 mt-4 grid grid-cols-3 gap-2">
        <button 
          onClick={() => setAba('jogos')}
          className={`py-2 text-xs font-bold rounded-xl transition-all ${
            aba === 'jogos' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-800 text-slate-400'
          }`}
        >
          ⚽ Jogos & Quadras
        </button>
        <button 
          onClick={() => setAba('grupos')}
          className={`py-2 text-xs font-bold rounded-xl transition-all ${
            aba === 'grupos' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-800 text-slate-400'
          }`}
        >
          📊 Grupos (12)
        </button>
        <button 
          onClick={() => setAba('mata-mata')}
          className={`py-2 text-xs font-bold rounded-xl transition-all ${
            aba === 'mata-mata' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-800 text-slate-400'
          }`}
        >
          🏆 Mata-Mata
        </button>
      </div>

      {/* CONTEÚDO */}
      <main className="max-w-md mx-auto px-4 pt-4 space-y-4">
        {aba === 'jogos' && (
          <div className="space-y-3">
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
              <span className="text-xs text-slate-400 font-semibold">Critério de Desempate:</span>
              <span className="text-xs font-bold text-amber-400">Saldo de Pontos</span>
            </div>

            {JOGOS_FASE_GRUPOS.map((jogo, index) => (
              <div key={index} className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-amber-400">Rodada {jogo.rodada} • Quadra {jogo.quadra}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    jogo.status === 'Finalizado' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                    jogo.status === 'Em Andamento' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse' :
                    'bg-slate-800 text-slate-400'
                  }`}>
                    {jogo.status}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex-1">
                    <p className="text-xs font-bold">{jogo.d1}</p>
                    <p className="text-xs font-bold text-slate-400">{jogo.d2}</p>
                  </div>
                  {jogo.status === 'Finalizado' ? (
                    <div className="text-right font-extrabold text-amber-400 text-sm">
                      <p>{jogo.p1}</p>
                      <p>{jogo.p2}</p>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-500 font-medium">Até 18 pts</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {aba === 'grupos' && (
          <div className="grid grid-cols-1 gap-3">
            {['A', 'B', 'C', 'D'].map((grp) => (
              <div key={grp} className="bg-slate-900 border border-slate-800 rounded-xl p-3">
                <h3 className="font-bold text-amber-400 text-sm mb-2 border-b border-slate-800 pb-1">Grupo {grp}</h3>
                <div className="space-y-2">
                  {DUPLAS.filter(d => d.grupo === grp).map(dupla => (
                    <div key={dupla.id} className="flex justify-between items-center text-xs bg-slate-950 p-2 rounded-lg border border-slate-800/60">
                      <div>
                        <p className="font-bold text-slate-200">{dupla.nome}</p>
                        <p className="text-[11px] text-slate-400">{dupla.atletas}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {aba === 'mata-mata' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center space-y-3">
            <Trophy className="w-10 h-10 text-amber-400 mx-auto" />
            <h3 className="font-bold text-base text-amber-400">Árvore Eliminatória (Quartas)</h3>
            <p className="text-xs text-slate-300">
              Avançam os 1ºs e 2ºs colocados de cada grupo (8 duplas).
            </p>
            <div className="text-left text-xs space-y-2 pt-2 border-t border-slate-800">
              <div className="bg-slate-950 p-2 rounded border border-slate-800">[Q1] 1º Grupo A vs 2º Grupo B</div>
              <div className="bg-slate-950 p-2 rounded border border-slate-800">[Q2] 1º Grupo C vs 2º Grupo D</div>
              <div className="bg-slate-950 p-2 rounded border border-slate-800">[Q3] 1º Grupo B vs 2º Grupo A</div>
              <div className="bg-slate-950 p-2 rounded border border-slate-800">[Q4] 1º Grupo D vs 2º Grupo C</div>
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
