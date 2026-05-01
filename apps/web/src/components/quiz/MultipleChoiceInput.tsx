type Props = {
	options: string[];
	selectedAnswer: string | null;
	onSelect: (value: string) => void;
	disabled?: boolean;
};

export default function MultipleChoiceInput({
	options,
	selectedAnswer,
	onSelect,
	disabled = false,
}: Props) {
	return (
		<div className="multiple-choice-options">
			{options.map((option) => {
				const isSelected = selectedAnswer === option;

				return (
					<button 
						key={option}
						className={`option ${isSelected ? "selected" : ""}`}
						onClick={() => onSelect(option)}
						disabled={disabled}
						type="button"
					>
						{option}
					</button>
				);
			})}
		</div>
	);
}
