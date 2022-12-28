import {
  Handle as ReactFlowHandle,
  HandleProps as ReactFlowHandleProps,
} from "reactflow";

type HandleProps = ReactFlowHandleProps & {};

export function Handle(props: HandleProps) {
  return (
    <ReactFlowHandle
      {...props}
      style={{
        width: 10,
        height: 10,
      }}
    />
  );
}
