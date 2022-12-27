export default function TitleSection({ text }: { text: string }) {
  return (
    <div className="w-full text-2xl">
      <h1>{text}</h1>
    </div>
  );
}
