import TitleSection from "components/TitleSection";

export default function Index() {
  return (
    <div className="container mx-auto flex flex-col gap-5 w-2/4 mt-10">
      <TitleSection text="Home" />
    </div>
  );
}

Index.auth = false;
Index.renderFooter = true;
Index.renderHeader = true;
