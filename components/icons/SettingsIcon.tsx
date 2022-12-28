import type { IconProps } from "types/components";

export function SettingsIcon({
  width = 24,
  height = 24,
  className = "",
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      strokeWidth="1.5"
      color="currentColor"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className={className}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m20 10-1-2 1-2-2-2-2 1-2-1-1-2h-2l-1 2-2 2-2-2-2 2 1 2-1 2-2 1v2l2 1 2 2-2 2 2 2 2-1 2 1 1 2h2l1-2 2-1 2 1 2-2-1-2 1-2 2-1v-2l-2-1z"
      />
    </svg>
  );
}
