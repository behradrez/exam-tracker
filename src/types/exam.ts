export type Exam = {
    id: bigint;
    created_at: Date;
    exam_start: Date | null;
    exam_end: Date | null;
    course_code: string;
    course_name: string;
    exam_type: string | null;
    building: string | null;
    room: string | null;
    rows: string | null;
    section: String;
};