import type { IconProps } from "types/components";

export default function BackArrowIcon({
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
        d="M19 12H6m0 0 6-6m-6 6 6 6"
      />
    </svg>
  );
}
