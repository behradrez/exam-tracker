export interface DisplayedExam { 
    id: bigint; 
    Code: string; 
    Section: String; 
    Name: string; 'Start Time': Date | null; 
    'End Time': Date | null; 
    'Exam Type': string | null; 
    Building: string | null; 
    Room: string | null; 
    Rows: string | null; 
    RowStart: string | null;
    RowEnd: string | null;
    Tracked: boolean; 
}