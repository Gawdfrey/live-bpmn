// @ts-nocheck
import { useOthers } from "../utils/liveblocks.config";
import { Avatar } from "./Avatar";

export default function Presence() {
  const others = useOthers();
  return (
    <div className="flex gap-3">
      {others?.map((other) => (
        <Avatar key={other.connectionId} user={other.info} />
      ))}
    </div>
  );
}
