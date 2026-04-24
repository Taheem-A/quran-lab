import type { QuizQuestion } from "../types/quizTypes";

export const sampleQuizQuestions: QuizQuestion[] = [
	{
		id: "q1",
		prompt: "Which type of question is this?",
		answerType: "multiple-choice",
		correctAnswer: "Multiple choice",
		options: ["Typing", "Multiple choice", "Flashcard", "Search"],
		explanation: "This is a multiple choice question.",
	},
	{
		id: "q2",
		prompt: "Type the word: Qur'an",
		answerType: "typing",
		correctAnswer: "Qur'an",
		explanation: "Make sure spelling is exact for now.",
	},
	{
		id: "q3",
		prompt: "Which of these is a valid answer type?",
		answerType: "multiple-choice",
		correctAnswer: "typing",
		options: ["clicking", "typing", "scrolling", "hovering"],
		explanation: "Typing is one of the supported answer types.",
	},
];
