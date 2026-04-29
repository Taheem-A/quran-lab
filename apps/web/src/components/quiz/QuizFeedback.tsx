type Props = {
	isCorrect: boolean;
	correctAnswer: string;
	explanation?: string;
};

export default function QuizFeedback({
	isCorrect,
	correctAnswer,
	explanation,
}: Props) {
	return (
		<div className={`feedback ${isCorrect ? "correct" : "wrong"}`}>
			<div className="feedback-title">
				{isCorrect ? "Correct!" : "Incorrect"}
			</div>

			{!isCorrect && (
				<div className="feedback-answer">
					Correct answer: <strong>{correctAnswer}</strong>
				</div>
			)}

			{explanation && (
				<div className="feedback-explanation">
					{explanation}
				</div>
			)}
		</div>
	);
}
