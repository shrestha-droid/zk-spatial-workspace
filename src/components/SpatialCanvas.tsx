import { useCallback } from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import { useWorkspaceStore } from '../store/workspaceStore';
import { v4 as uuidv4 } from 'uuid';
import { Bot, Plus } from 'lucide-react';

export const SpatialCanvas = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, addNode } = useWorkspaceStore();

  const handleAddAgentNode = useCallback(() => {
    const newNode = {
      id: uuidv4(),
      position: {
        x: 100 + Math.random() * 300,
        y: 100 + Math.random() * 300,
      },
      data: { label: `Agent Node [${Math.floor(1000 + Math.random() * 9000)}]` },
      style: {
        background: '#18181b',
        color: '#a1a1aa',
        border: '1px solid #3f3f46',
        borderRadius: '8px',
        padding: '10px 14px',
        fontSize: '12px',
        fontFamily: 'monospace',
      },
    };
    addNode(newNode);
  }, [addNode]);

  return (
    <div className="w-full h-full relative bg-zinc-950">
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={handleAddAgentNode}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-xs font-mono font-medium px-3.5 py-2 rounded-md shadow-lg border border-indigo-400/30 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <Bot className="w-3.5 h-3.5" />
          Deploy Agent Node
        </button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Background color="#27272a" gap={20} size={1} />
        <Controls className="!bg-zinc-900 !border-zinc-800 !rounded-md !shadow-xl [&>button]:!fill-zinc-400 [&>button]:!border-zinc-800 hover:[&>button]:!fill-white" />
        <MiniMap
          nodeColor="#6366f1"
          maskColor="rgba(9, 9, 11, 0.8)"
          className="!bg-zinc-900 !border-zinc-800 !rounded-md"
        />
      </ReactFlow>
    </div>
  );
};