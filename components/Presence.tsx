import { useOthers } from "../utils/liveblocks.config";

export default function Presence() {
  const others = useOthers();
  return (
    <div>
      <p>{`There are ${others} users present`}</p>
    </div>
  );
}