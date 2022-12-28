import { EventNode } from "components/flow/nodes/EventNode";
import { GatewayNode } from "components/flow/nodes/GatewayNode";
import { TaskNode } from "components/flow/nodes/TaskNode";
import { EventIcon } from "components/icons/EventIcon";
import { GatewayIcon } from "components/icons/GatewayIcon";
import { TaskIcon } from "components/icons/TaskIcon";
import { NodeTypes as ReactFlowNodeTypes, Position } from "reactflow";
import { NodeTypes } from "types/Flow";

export const NodeMetadata = [
  {
    name: NodeTypes.EVENT,
    component: EventNode,
    label: "Event",
    description: "Trigger a flow when an event occurs",
    icon: EventIcon,
  },
  {
    name: NodeTypes.GATEWAY,
    component: GatewayNode,
    label: "Gateway",
    description: "Branch a flow based on a condition",
    icon: GatewayIcon,
  },
  {
    name: NodeTypes.TASK,
    component: TaskNode,
    label: "Task",
    description: "Perform a task",
    icon: TaskIcon,
  },
];

export const NodeTypeArray: ReactFlowNodeTypes = NodeMetadata.reduce(
  (acc, { name, component }) => {
    return { ...acc, [name]: component };
  },
  {}
);
