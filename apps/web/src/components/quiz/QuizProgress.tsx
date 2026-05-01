type Props = {
	current: number;
	total: number;
	score: number;
};

export default function QuizProgress({ current, total, score }: Props) {
	return (
		<div className="progress">
			<span>
				Question {current} / {total}
			</span>
			<span>Score: {score}</span>
		</div>
	);
}
