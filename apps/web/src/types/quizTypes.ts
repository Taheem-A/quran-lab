export type AnswerType = "multiple-choice" | "typing" | "search-select";

export type QuizQuestion = {
    id: string;
    prompt: string;
    answerType: AnswerType;
    options?: string[];
    correctAnswer: string;
    correctAnswerId?: number;
    explanation?: string;
};