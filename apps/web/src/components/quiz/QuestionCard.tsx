import type { QuizQuestion } from "../../types/quizTypes";
import MultipleChoiceInput from "./MultipleChoiceInput";
import TextInputAnswer from "./TextInputAnswer";

type Props = {
	question: QuizQuestion;
	selectedAnswer: string;
	onAnswerChange: (value: string) => void;
	disabled?: boolean;
};

export default function QuestionCard({
	question,
	selectedAnswer,
	onAnswerChange,
	disabled = false,
}: Props) {
	return (
		<div
			style={{
				padding: "20px",
				border: "1px solid #ddd",
				borderRadius: "10px",
			}}
		>
			<h2>{question.prompt}</h2>

			{question.answerType === "multiple-choice" && question.options && (
				<MultipleChoiceInput
					options={question.options}
					selectedAnswer={selectedAnswer}
					onSelect={onAnswerChange}
					disabled={disabled}
				/>
			)}

			{question.answerType === "typing" && (
				<TextInputAnswer
					value={selectedAnswer}
					onChange={onAnswerChange}
					disabled={disabled}
				/>
			)}
		</div>
	);
}
