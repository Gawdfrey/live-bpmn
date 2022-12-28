import LoadingIcon from "./icons/LoadingIcon";

export default function FullPageLoading() {
  return (
    <div className="flex justify-center items-center h-screen text-white bg-background">
      <LoadingIcon width={48} height={48} className="animate-spin" />
    </div>
  );
}
