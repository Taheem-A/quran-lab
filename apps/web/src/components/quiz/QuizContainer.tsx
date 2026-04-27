import { useState, useEffect } from "react";
import { sampleQuizQuestions } from "../../data/sampleQuizQuestions";
import { checkAnswer } from "../../utils/checkAnswer";

import QuestionCard from "./QuestionCard";
import QuizFeedback from "./QuizFeedback";
import QuizProgress from "./QuizProgress";
import type { Chapter } from "../../types/quranTypes";

export default function QuizContainer() {
	const questions = sampleQuizQuestions;

	const [currentIndex, setCurrentIndex] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isCorrect, setIsCorrect] = useState(false);
	const [score, setScore] = useState(0);
    const [chapters, setChapters] = useState<Chapter[]>([]);

	const currentQuestion = questions[currentIndex];

    useEffect(() => {
        fetch("http://localhost:3000/api/quran/chapters")
        .then((res) => {
            if (!res.ok) throw new Error("Network response was not ok");
            return res.json();
        })
        .then((data) => setChapters(data))
        .catch((err) => console.error("Failed to fetch chapters:", err));
    }, []);

	function handleSubmit() {
		if (!selectedAnswer) return;

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

	if (isFinished) {
		return (
			<div style={{ padding: "20px" }}>
				<h2>Quiz Complete!</h2>
				<p>
					Final Score: {score} / {questions.length}
				</p>
			</div>
		);
	}

	return (
		<div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
			<QuizProgress
				current={currentIndex + 1}
				total={questions.length}
				score={score}
			/>

			<QuestionCard
				question={currentQuestion}
				selectedAnswer={selectedAnswer}
				onAnswerChange={setSelectedAnswer}
				disabled={isSubmitted}
				chapters={chapters}
			/>

			{!isSubmitted ? (
				<button
					onClick={handleSubmit}
					style={{ marginTop: "15px", padding: "10px 20px" }}
				>
					Submit
				</button>
			) : (
				<>
					<QuizFeedback
						isCorrect={isCorrect}
						correctAnswer={currentQuestion.correctAnswer}
						explanation={currentQuestion.explanation}
					/>

					<button
						onClick={handleNext}
						style={{ marginTop: "15px", padding: "10px 20px" }}
					>
						Next
					</button>
				</>
			)}
		</div>
	);
}
