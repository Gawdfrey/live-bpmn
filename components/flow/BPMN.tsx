import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
  ReactFlowInstance,
} from "reactflow";
import {
  useOthers,
  useStorage,
  useUpdateMyPresence,
} from "utils/liveblocks.config";
import FullPageLoading from "../FullPageLoading";
import BackArrowIcon from "../icons/BackArrowIcon";
import Presence from "components/Presence";
import { SettingsIcon } from "components/icons/SettingsIcon";
import Modal from "components/Modal";
import { EditProject } from "components/project/EditProject";
import { CreationSidebar } from "./CreationSidebar";
import { NodeTypeArray } from "utils/flow";
import { Cursor } from "components/Cursor";

export default function BPMN({
  name,
  projectId,
}: {
  name: string;
  projectId: string;
}) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const updateMyPresence = useUpdateMyPresence();
  const [showModal, setShowModal] = useState(false);
  const others = useOthers();
  // @ts-ignore
  const initialNodes = useStorage<Node[]>(({ nodes }) => nodes);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

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
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);
  let id = 0;
  const getId = () => `dndnode_${id++}`;
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }
      if (!reactFlowInstance) return;
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  if (!nodes) return <FullPageLoading />;
  return (
    <div className="w-full h-screen">
      <div ref={reactFlowWrapper} className="w-full h-full">
        <ReactFlow
          onPointerMove={(e) =>
            updateMyPresence({ cursor: { x: e.clientX, y: e.clientY } })
          }
          onPointerLeave={() => updateMyPresence({ cursor: null })}
          nodes={nodes!}
          edges={edges!}
          nodeTypes={NodeTypeArray}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
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

          {others.map((other) => {
            if (!other.presence?.cursor) return null;
            // @ts-ignore
            const { x, y } = other.presence?.cursor;
            return <Cursor color="red" x={x} y={y} />;
          })}
          <Background />
          <Controls />
          <CreationSidebar />
        </ReactFlow>
      </div>
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
