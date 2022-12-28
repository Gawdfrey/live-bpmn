import React, { useState } from "react";
import { Position } from "reactflow";
import { Handle } from "../Handle";

export function TaskNode({ data }: { data: any }) {
  const [label, setLabel] = useState(data.label);
  const [isSelected, setIsSelected] = useState(false);

  function handleClicks(e: React.MouseEvent) {
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
      <Handle position={Position.Bottom} type="target" />

      <div className="relative">
        <div
          className={`flex text-center rounded-md bg-white text-bg p-5 w-48 h-24 ${
            isSelected
              ? "outline-dashed outline-white outline-2 outline-offset-8"
              : ""
          }`}
          onClick={handleClicks}
        >
          <span className="transform m-auto text-center">{label}</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-600 to-purple-600 blur-2xl rounded-3xl -z-50" />
      </div>
    </>
  );
}
