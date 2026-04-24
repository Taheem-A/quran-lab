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
		<div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
			{options.map((option) => {
				const isSelected = selectedAnswer === option;

				return (
					<button
						key={option}
						onClick={() => onSelect(option)}
						disabled={disabled}
						style={{
							padding: "10px",
							cursor: disabled ? "not-allowed" : "pointer",
							backgroundColor: isSelected ? "#4caf50" : "#f0f0f0",
							color: isSelected ? "white" : "black",
							border: "1px solid #ccc",
							borderRadius: "6px",
						}}
					>
						{option}
					</button>
				);
			})}
		</div>
	);
}
