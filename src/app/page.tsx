import SearchableTable from "./_components/SearchableTable";
import Header from "./_components/Header";

export default function Home() {
  return (
    <div className="items-center justify-items-center mt-0 overflow-hidden">
      <main className="min-w-full">
        <Header/>
        <SearchableTable/>
      </main>
    </div>
  );
}
