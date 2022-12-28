import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
} from "reactflow";
import { useStorage, useUpdateMyPresence } from "utils/liveblocks.config";
import { EventNode } from "./nodes/EventNode";
import FullPageLoading from "../FullPageLoading";
import BackArrowIcon from "../icons/BackArrowIcon";
import Presence from "components/Presence";
import { SettingsIcon } from "components/icons/SettingsIcon";
import Modal from "components/Modal";
import { EditProject } from "components/project/EditProject";

export default function BPMN({
  name,
  projectId,
}: {
  name: string;
  projectId: string;
}) {
  const updateMyPresence = useUpdateMyPresence();
  const [showModal, setShowModal] = useState(false);
  // @ts-ignore
  const initialNodes = useStorage<Node[]>(({ nodes }) => nodes);

  const [nodes, setNodes] = useState([] as Node[]);
  const [edges, setEdges] = useState([] as Edge[]);

  useEffect(() => {
    setNodes(initialNodes!);
  }, [initialNodes]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const nodeTypes = useMemo(() => ({ event: EventNode }), []);
  if (!nodes) return <FullPageLoading />;
  return (
    <div className="w-full h-screen">
      <ReactFlow
        onPointerMove={(e) =>
          updateMyPresence({ cursor: { x: e.clientX, y: e.clientY } })
        }
        onPointerLeave={() => updateMyPresence({ cursor: null })}
        nodes={nodes!}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        style={{
          background: "#0d1117",
        }}
      >
        <div className="flex gap-2 z-50 absolute top-3 left-3 text-white">
          <Link href="/projects" className="my-auto">
            <BackArrowIcon className="transform hover:-translate-x-1 ease-in-out duration-500" />
          </Link>

          <h1 className="text-2xl">{name}</h1>
          <button
            className="my-auto"
            type="button"
            onClick={() => setShowModal(!showModal)}
          >
            <SettingsIcon
              width={20}
              height={20}
              className="transform hover:rotate-45 ease-in-out duration-500"
            />
          </button>
        </div>
        <div className="absolute top-3 right-3 z-50">
          <Presence />
        </div>
        <Background />
        <Controls />
      </ReactFlow>
      <Modal
        title="Edit project"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <EditProject
          callback={() => setShowModal(false)}
          id={projectId}
          defaultValues={{
            name,
          }}
        />
      </Modal>
    </div>
  );
}
