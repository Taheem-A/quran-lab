type Props = {
	value: string;
	onChange: (value: string) => void;
	disabled?: boolean;
};

export default function TextInputAnswer({
	value,
	onChange,
	disabled = false,
}: Props) {
	return (
		<input
			className="input"
			type="text"
			value={value}
			onChange={(event) => onChange(event.target.value)}
			disabled={disabled}
			placeholder="Type your answer..."
		/>
	);
}
