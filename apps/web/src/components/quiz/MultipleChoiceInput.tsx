type Props = {
	options: string[];
	selectedAnswer: string | null;
	onSelect: (value: string) => void;
	disabled?: boolean;
};

export default function MultipleChoiceInput({
	options,
	selectedAnswer,
	onSelect
}: Props) {
	return (
		<div>
			{options.map((option) => {
				const isSelected = selectedAnswer === option;

				return (
					<div
						key={option}
						className={`option ${isSelected ? "selected" : ""}`}
						onClick={() => onSelect(option)}
					>
						{option}
					</div>
				);
			})}
		</div>
	);
}
