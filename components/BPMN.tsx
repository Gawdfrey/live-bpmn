import ReactFlow, { Background, Controls, Node } from "reactflow";
import { useOthers, useUpdateMyPresence } from "utils/liveblocks.config";

export default function BPMN() {
  const updateMyPresence = useUpdateMyPresence();
  const others = useOthers();
  const nodes: Node[] = others?.map((other) => {
    // @ts-ignore
    const position: { x: number; y: number } = other.presence?.cursor;
    const id = other.connectionId.toString();
    // @ts-ignore
    const label = other.info?.name;
    return {
      id,
      type: "input",
      data: { label },
      position,
    };
  });

  return (
    <div className="w-full h-screen">
      <ReactFlow
        onPointerMove={(e) =>
          updateMyPresence({ cursor: { x: e.clientX, y: e.clientY } })
        }
        onPointerLeave={() => updateMyPresence({ cursor: null })}
        nodes={nodes}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
