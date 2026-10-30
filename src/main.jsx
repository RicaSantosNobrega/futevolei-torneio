import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  Trophy, Users, Calendar, Dumbbell, Flame, CheckCircle, 
  ChevronRight, Award, Activity, Play, Pause, RotateCcw, 
  Layers, Settings, LayoutGrid, MessageSquare, Plus, Send 
} from 'lucide-react';

// ==========================================
// APLICAÇÃO PRINCIPAL: FUTEVÔLEI ECOSYSTEM
// ==========================================
function App() {
  const [profile, setProfile] = useState('atleta'); // 'atleta', 'professor', 'arena'
  const [level, setLevel] = useState('intermediario'); // 'iniciante', 'intermediario', 'avancado'
  const [tab, setTab] = useState('treinos');

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-12">
      {/* HEADER PRINCIPAL */}
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50 px-4 py-3 shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-amber-500 text-slate-900 p-2 rounded-xl font-bold">
              ⚽
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight text-amber-400">Joga Beach</h1>
              <p className="text-xs text-slate-400">Futevôlei & Gym Tracker</p>
            </div>
          </div>
          
          {/* SELETOR TRILATERAL DE PERFIL */}
          <select 
            value={profile} 
            onChange={(e) => setProfile(e.target.value)}
            className="bg-slate-900 border border-amber-500/40 text-amber-300 text-xs rounded-lg px-2 py-1.5 focus:outline-none"
          >
            <option value="atleta">👤 Visão Aluno/Atleta</option>
            <option value="professor">🧢 Visão Professor</option>
            <option value="arena">🏟️ Visão Arena / Clube</option>
          </select>
        </div>
      </header>

      {/* CONTEÚDO DINÂMICO CONFORME O PERFIL */}
      <main className="max-w-md mx-auto px-4 pt-4">
        {profile === 'atleta' && (
          <div className="space-y-4">
            {/* SELETOR DE NÍVEL DO ALUNO */}
            <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 flex justify-between items-center">
              <span className="text-xs text-slate-400 font-medium">Seu Nível Atual:</span>
              <div className="flex space-x-1">
                {['iniciante', 'intermediario', 'avancado'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setLevel(lvl)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                      level === lvl 
                        ? 'bg-amber-500 text-slate-900 shadow-md' 
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {lvl.slice(0, 4)}.
                  </button>
                ))}
              </div>
            </div>

            {/* CARDS DE TREINO DO ALUNO */}
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-amber-400 flex items-center gap-2">
                  <Dumbbell className="w-5 h-5" /> Treino de Academia (Físico)
                </h3>
                <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full uppercase font-bold">
                  {level}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Foco em potência de salto, estabilidade de joelhos/tornozelos e fortalecimento do core para a areia.
              </p>
              <button className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-2.5 rounded-lg text-sm transition-all shadow-lg flex items-center justify-center gap-2">
                <Play className="w-4 h-4 fill-current" /> Iniciar Treino de Hoje
              </button>
            </div>

            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-teal-400 flex items-center gap-2">
                  <Flame className="w-5 h-5" /> Treino Autônomo na Areia
                </h3>
                <span className="text-xs bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full uppercase font-bold">
                  Solo
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Drills de controle de bola, recepção de peito, passe de pé e deslocamento na quadra.
              </p>
              <button className="w-full bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold py-2.5 rounded-lg text-sm transition-all shadow-lg flex items-center justify-center gap-2">
                <Play className="w-4 h-4 fill-current" /> Ver Drills do Seus Nível
              </button>
            </div>
          </div>
        )}

        {profile === 'professor' && (
          <div className="space-y-4">
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-3">
              <h3 className="font-bold text-amber-400 flex items-center gap-2">
                <Calendar className="w-5 h-5" /> Planejador Semanal de Aulas
              </h3>
              <p className="text-xs text-slate-300">
                Monte a matriz curricular da escolinha estruturada nas 4 fases: Aquecimento, Técnico, Tático e Jogo.
              </p>
              <button className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-2 rounded-lg text-sm">
                + Criar Nova Aula para Turma
              </button>
            </div>
          </div>
        )}

        {profile === 'arena' && (
          <div className="space-y-4">
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-3">
              <h3 className="font-bold text-amber-400 flex items-center gap-2">
                <LayoutGrid className="w-5 h-5" /> Gestão de Quadras em Tempo Real
              </h3>
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="bg-emerald-900/40 border border-emerald-500/40 p-2.5 rounded-lg text-center">
                  <span className="text-xs font-bold text-emerald-400">Quadra 1</span>
                  <p className="text-[10px] text-slate-300 mt-1">Escolinha</p>
                </div>
                <div className="bg-amber-900/40 border border-amber-500/40 p-2.5 rounded-lg text-center">
                  <span className="text-xs font-bold text-amber-400">Quadra 2</span>
                  <p className="text-[10px] text-slate-300 mt-1">Locação</p>
                </div>
                <div className="bg-slate-700/40 border border-slate-600 p-2.5 rounded-lg text-center">
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
