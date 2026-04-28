import type { QuizQuestion } from "../types/quizTypes";

export function normalizeAnswer(answer: string): string {
    return answer.trim().toLowerCase();
};

export function checkAnswer(
	question: QuizQuestion,
	userAnswer: string,
): boolean {
	const normalizedUserAnswer = normalizeAnswer(userAnswer);

	if (question.acceptableAnswers) {
		return question.acceptableAnswers.some(
			(answer) => normalizeAnswer(answer) === normalizedUserAnswer,
		);
	}

	return normalizedUserAnswer === normalizeAnswer(question.correctAnswer);
}