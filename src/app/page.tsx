import SearchableTable from "./_components/SearchableTable";
import Header from "./_components/Header";
import InAppBrowserBanner from "./_components/InAppBrowserBanner";

export default function Home() {
  return (
    <div className="items-center justify-items-center mt-0 overflow-hidden">
      <main className="min-w-full">
        <InAppBrowserBanner/>
        <Header/>
        <SearchableTable/>
      </main>
    </div>
  );
}
