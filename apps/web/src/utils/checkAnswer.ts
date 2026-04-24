import type { QuizQuestion } from "../types/quizTypes";

export function normalizeAnswer(answer: string): string {
    return answer.trim().toLowerCase();
};

export function checkAnswer(question: QuizQuestion, userAnswer: string): boolean {
    return normalizeAnswer(userAnswer) === normalizeAnswer(question.correctAnswer);
}