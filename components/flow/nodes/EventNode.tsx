import { useState } from "react";
import { Position } from "reactflow";
import { Handle } from "../Handle";

export function EventNode({ data }: { data: any }) {
  const [label, setLabel] = useState(data.label);
  const [isSelected, setIsSelected] = useState(false);

  function handleClicks(e: any) {
    switch (e.detail) {
      case 1:
        setIsSelected(!isSelected);
        break;
      case 2:
        const newLabel = prompt("Enter new label", label);
        if (newLabel) {
          setLabel(newLabel);
        }
        break;
    }
  }

  return (
    <>
      <Handle position={Position.Top} type="source" />

      <div
        className={`flex text-center rounded-full border-2 border-white aspect-square text-white p-5 ${
          isSelected
            ? "outline-dashed outline-white outline-2 outline-offset-8"
            : ""
        }`}
        onClick={handleClicks}
      >
        {label}
      </div>
    </>
  );
}
