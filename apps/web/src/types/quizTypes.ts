export type AnswerType = "multiple-choice" | "typing";

export type QuizQuestion = {
    id: string;
    prompt: string;
    answerType: AnswerType;
    options?: string[];
    correctAnswer: string;
    explanation?: string;
};