import type { QuizQuestion } from "../../types/quizTypes";
import type { Chapter } from "../../types/quranTypes";
import MultipleChoiceInput from "./MultipleChoiceInput";
import SearchSelectAnswer from "./SearchSelectAnswer";
import TextInputAnswer from "./TextInputAnswer";

type Props = {
	question: QuizQuestion;
	selectedAnswer: string;
	onAnswerChange: (value: string) => void;
	disabled?: boolean;
	chapters?: Chapter[];
};

export default function QuestionCard({
	question,
	selectedAnswer,
	onAnswerChange,
	disabled = false,
	chapters = [],
}: Props) {
	return (
		<div className="card question-card">
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

			{question.answerType === "search-select" && (
				<SearchSelectAnswer
					chapters={chapters}
					value={selectedAnswer}
					onChange={onAnswerChange}
					disabled={disabled}
				/>
			)}
		</div>
	);
}
