import { useState, useEffect } from "react";
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

    useEffect(() => {
        setSearchText(value);
    }, [value]);

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
		<div className="search-select-container">
			<input
				className="input"
				type="text"
				value={searchText}
				onChange={(event) => handleInputChange(event.target.value)}
				disabled={disabled}
				placeholder="Search for a surah..."
			/>

			{searchText && !disabled && value === "" && (
				<div className="search-select-dropdown">
					{filteredChapters.length > 0 ? (
						filteredChapters.map((chapter) => (
							<button className="search-select-btn"
								key={chapter.id}
								type="button"
								onClick={() =>
									handleSelect(chapter.englishName)
								}
							>
								{chapter.englishName}
							</button>
						))
					) : (
						<p className="no-results">
							No matching surahs.
						</p>
					)}
				</div>
			)}
		</div>
	);
}
