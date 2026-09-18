import { create } from 'zustand';
import {
  Node,
  Edge,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
} from 'reactflow';
import { generateKey, encryptPayload, decryptPayload } from '../lib/crypto';

interface WorkspaceState {
  nodes: Node[];
  edges: Edge[];
  sessionKey: CryptoKey | null;
  encryptedBlob: string | null;

  initializeSession: () => Promise<void>;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  addNode: (node: Node) => void;
  encryptWorkspace: () => Promise<void>;
  decryptWorkspace: (blob: string) => Promise<void>;
}

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  nodes: [
    {
      id: 'root-node',
      position: { x: 250, y: 150 },
      data: { label: 'Primary Terminal (ZK Secured)' },
      style: {
        background: '#111827',
        color: '#38bdf8',
        border: '1px solid #0284c7',
        borderRadius: '8px',
        padding: '10px 16px',
        fontSize: '12px',
        fontWeight: '600',
        fontFamily: 'monospace',
      },
    },
  ],
  edges: [],
  sessionKey: null,
  encryptedBlob: null,

  initializeSession: async () => {
    const key = await generateKey();
    set({ sessionKey: key });
  },

  onNodesChange: (changes) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },

  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },

  addNode: (node) => {
    set({ nodes: [...get().nodes, node] });
  },

  encryptWorkspace: async () => {
    const { nodes, edges, sessionKey } = get();
    if (!sessionKey) return;

    const blob = await encryptPayload(sessionKey, { nodes, edges });
    set({ encryptedBlob: blob });
  },

  decryptWorkspace: async (blob: string) => {
    const { sessionKey } = get();
    if (!sessionKey) return;

    try {
      const data = await decryptPayload(sessionKey, blob);
      set({ nodes: data.nodes, edges: data.edges, encryptedBlob: blob });
    } catch {
      console.error('Decryption failed: integrity verification error or invalid key.');
    }
  },
}));