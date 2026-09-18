import { useEffect } from 'react';
import { SpatialCanvas } from './components/SpatialCanvas';
import { useWorkspaceStore } from './store/workspaceStore';
import { ShieldCheck, ShieldAlert, Lock, Terminal } from 'lucide-react';

function App() {
  const { initializeSession, sessionKey, encryptWorkspace, encryptedBlob } = useWorkspaceStore();

  useEffect(() => {
    initializeSession();
  }, [initializeSession]);

  return (
    <div className="w-screen h-screen flex flex-col bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
      <header className="flex justify-between items-center px-4 py-3 border-b border-zinc-800 bg-zinc-900/90 backdrop-blur">
        <div className="flex items-center gap-3">
          <Terminal className="w-5 h-5 text-indigo-400" />
          <h1 className="font-mono text-sm tracking-wide font-semibold text-zinc-100">
            ZK SPATIAL WORKSPACE
          </h1>
          <div className="flex items-center gap-1.5 ml-2 px-2 py-0.5 rounded-full text-[10px] font-mono border border-zinc-700 bg-zinc-800/80">
            {sessionKey ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">AES-GCM ACTIVE</span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
                <span className="text-rose-500">KEY GENERATION PENDING</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {encryptedBlob && (
            <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 font-mono bg-zinc-950 px-2.5 py-1 rounded border border-zinc-800">
              <span className="text-zinc-500">CIPHERTEXT:</span>
              <span>{encryptedBlob.slice(0, 16)}...</span>
            </div>
          )}
          <button
            onClick={encryptWorkspace}
            className="flex items-center gap-1.5 font-mono text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1.5 rounded border border-zinc-700 transition-colors"
          >
            <Lock className="w-3 h-3 text-indigo-400" />
            Encrypt State
          </button>
        </div>
      </header>

      <main className="flex-1 w-full h-full relative">
        <SpatialCanvas />
      </main>
    </div>
  );
}

export default App;