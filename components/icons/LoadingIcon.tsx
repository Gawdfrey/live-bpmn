export default function LoadingIcon({
  height = 18,
  width = 18,
}: {
  height?: number;
  width?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      strokeWidth="1.5"
      color="currentColor"
      viewBox="0 0 24 24"
      height={height}
      width={width}
      className="animate-spin"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8a10 10 0 0 0-9-6C7 2 3 6 2 11"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 8h4a1 1 0 0 0 1-1V3M3 16a10 10 0 0 0 19-3"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 16H3a1 1 0 0 0-1 1v4"
      />
    </svg>
  );
}
