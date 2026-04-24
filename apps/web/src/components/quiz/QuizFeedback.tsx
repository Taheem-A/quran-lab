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
		<div style={{ marginTop: "15px" }}>
			<p
				style={{
					fontWeight: "bold",
					color: isCorrect ? "green" : "red",
				}}
			>
				{isCorrect ? "Correct!" : "Incorrect"}
			</p>

			{!isCorrect && (
				<p>
					Correct answer: <strong>{correctAnswer}</strong>
				</p>
			)}

			{explanation && (
				<p style={{ marginTop: "5px", fontStyle: "italic" }}>
					{explanation}
				</p>
			)}
		</div>
	);
}
