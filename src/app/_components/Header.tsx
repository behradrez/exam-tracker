import { AnimateWords } from "./AnimateWords";

export default function Header(){
    return(
    <div style={{background: '#9e2a2b'}} className="shadow-xl pl-2 mb-10 h-60 content-center"> 
        <h1 className=" font-serif font-black text-7xl mb-2">McGill MyExams</h1>
        
        <h4 className="pl-2 font-serif text-slate-300 font-medium text-2xl md:text-3xl mb-2">
            <AnimateWords className="text-3xl text-white font-medium" words={["Your Exams", "Your Schedule","All in One Place"]}/>
        </h4>
        
        <h6 className="pl-2 font-serif text-md">McGill exams made simple—view, track, and export with ease.</h6>
    </div>
    )
}