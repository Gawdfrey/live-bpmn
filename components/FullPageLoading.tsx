import LoadingIcon from "./icons/LoadingIcon";

export default function FullPageLoading() {
  return (
    <div className="flex justify-center items-center h-screen text-purple-800">
      <LoadingIcon width={48} height={48} />
    </div>
  );
}
