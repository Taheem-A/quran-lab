type Props = {
	current: number;
	total: number;
	score: number;
};

export default function QuizProgress({ current, total, score }: Props) {
	return (
		<div
			style={{
				marginBottom: "20px",
				display: "flex",
				justifyContent: "space-between",
				fontWeight: "bold",
			}}
		>
			<span>
				Question {current} / {total}
			</span>
			<span>Score: {score}</span>
		</div>
	);
}
