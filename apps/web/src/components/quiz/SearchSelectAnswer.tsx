import { useState } from "react";
import type { Chapter } from "../../types/quranTypes";

type Props = {
	chapters: Chapter[];
	value: string;
	onChange: (value: string) => void;
	disabled?: boolean;
};

export default function SearchSelectAnswer({
	chapters,
	value,
	onChange,
	disabled = false,
}: Props) {
	const [searchText, setSearchText] = useState(value);

	const filteredChapters = chapters
		.filter((chapter) =>
			chapter.englishName
				.toLowerCase()
				.includes(searchText.toLowerCase()),
		)
		.slice(0, 8);

	function handleInputChange(input: string) {
		setSearchText(input);
		onChange("");
	}

	function handleSelect(chapterName: string) {
		setSearchText(chapterName);
		onChange(chapterName);
	}

	return (
		<div style={{ position: "relative" }}>
			<input
				type="text"
				value={searchText}
				onChange={(event) => handleInputChange(event.target.value)}
				disabled={disabled}
				placeholder="Search for a surah..."
				style={{
					width: "100%",
					padding: "10px",
					border: "1px solid #ccc",
					borderRadius: "6px",
					fontSize: "16px",
				}}
			/>

			{searchText && !disabled && value === "" && (
				<div
					style={{
						marginTop: "8px",
						border: "1px solid #ccc",
						borderRadius: "6px",
						overflow: "hidden",
					}}
				>
					{filteredChapters.length > 0 ? (
						filteredChapters.map((chapter) => (
							<button
								key={chapter.id}
								type="button"
								onClick={() =>
									handleSelect(chapter.englishName)
								}
								style={{
									display: "block",
									width: "100%",
									padding: "10px",
									textAlign: "left",
									border: "none",
									borderBottom: "1px solid #eee",
									backgroundColor: "white",
									cursor: "pointer",
								}}
							>
								{chapter.id}. {chapter.englishName}
							</button>
						))
					) : (
						<p style={{ padding: "10px", margin: 0 }}>
							No matching surahs.
						</p>
					)}
				</div>
			)}
		</div>
	);
}
