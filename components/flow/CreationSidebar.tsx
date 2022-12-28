import { NodeTypes } from "types/Flow";

export function CreationSidebar() {
  function onDragStart(event: React.DragEvent, nodeType: string) {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  }
  const nodeTypes = Object.values(NodeTypes);
  return (
    <aside className="flex flex-col absolute left-3 bg-white p-3 top-56 bottom-96 z-50 gap-5 rounded-md">
      {nodeTypes.map((nodeType, index) => {
        return (
          <button
            key={`${nodeType}-${index}`}
            type="button"
            className="cursor-pointer hover:bg-purple-50 rounded-sm p-2"
            onDragStart={(event) => onDragStart(event, nodeType)}
            draggable
          >
            {nodeType.toUpperCase()}
          </button>
        );
      })}
    </aside>
  );
}
