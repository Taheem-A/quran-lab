import { useState, useEffect } from "react";
import { checkAnswer } from "../../utils/checkAnswer";

import QuestionCard from "./QuestionCard";
import QuizFeedback from "./QuizFeedback";
import QuizProgress from "./QuizProgress";
import type { Chapter } from "../../types/quranTypes";
import type { QuizQuestion } from "../../types/quizTypes";
import { generateChapterFactQuestions } from "../../utils/generateChapterFactQuestions";

export default function QuizContainer() {
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isCorrect, setIsCorrect] = useState(false);
	const [score, setScore] = useState(0);
    const [chapters, setChapters] = useState<Chapter[]>([]);

	const currentQuestion = questions[currentIndex];

    useEffect(() => {
		fetch(`${import.meta.env.VITE_API_URL}/api/quran/chapters`)
        .then((res) => {
            if (!res.ok) throw new Error("Network response was not ok");
            return res.json();
        })
        .then((data) => {
            setChapters(data);
            setQuestions(generateChapterFactQuestions(data));
            setLoading(false);
        })
        .catch((err) => {
            setError(err.message);
            setLoading(false);
        });
    }, []);

	function handleSubmit() {
		if (!selectedAnswer || !currentQuestion) return;

		const correct = checkAnswer(currentQuestion, selectedAnswer);
		setIsCorrect(correct);
		setIsSubmitted(true);

		if (correct) {
			setScore((prev) => prev + 1);
		}
	}

	function handleNext() {
		setCurrentIndex((prev) => prev + 1);
		setSelectedAnswer("");
		setIsSubmitted(false);
	}

	const isFinished = currentIndex >= questions.length;

    if (loading) return <p>Loading quiz...</p>;
    if (error) return <p>Error: {error}</p>;

	if (isFinished) {
		return (
			<div className="card quiz-card">
				<h2>Quiz Complete!</h2>
				<p>
					Final Score: {score} / {questions.length}
				</p>
				<button
					className="btn btn-secondary"
					onClick={() => {
						setCurrentIndex(0);
						setScore(0);
						setSelectedAnswer("");
						setIsSubmitted(false);
						setQuestions(generateChapterFactQuestions(chapters));
					}}
				>
					Restart Quiz
				</button>
			</div>
		);
	}

	return (
		<div className="quiz-card">
			<QuizProgress
				current={currentIndex + 1}
				total={questions.length}
				score={score}
			/>

			{(currentQuestion && (
				<QuestionCard
					question={currentQuestion}
					selectedAnswer={selectedAnswer}
					onAnswerChange={setSelectedAnswer}
					disabled={isSubmitted}
					chapters={chapters}
				/>
			)) || <p>Loading question...</p>}

			{!isSubmitted ? (
				<button className="btn btn-primary" onClick={handleSubmit}>
					Submit
				</button>
			) : (
				<>
					<QuizFeedback
						isCorrect={isCorrect}
						correctAnswer={currentQuestion.correctAnswer}
						explanation={currentQuestion.explanation}
					/>

					<button className="btn btn-primary" onClick={handleNext}>
						Next
					</button>
				</>
			)}
		</div>
	);
}
