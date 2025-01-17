
import { attemptCreateAccount, getAllExams } from "./(api)/actions";
import ClientButton from "./_components/clickableButton";
import { Exam } from "@/types/exam";
import SearchableTable from "./_components/SearchableTable";

export default function Home() {

  
  return (
    
    <div className=" items-center justify-items-center">
      <main>
        <div className="my-10 mt-16"> 
          <h1>McGill MyExams - Simpler Exam Tracking</h1>
          <h4>One-stop shop for all your exams details</h4>
        </div>
        <div>
          <SearchableTable/>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      <ClientButton text={"Click for function"} func={getAllExams}>

      </ClientButton>
      </footer>
    </div>
  );
}
