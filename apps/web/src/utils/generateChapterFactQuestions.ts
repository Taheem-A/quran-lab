import type { Chapter } from "../types/quranTypes";
import type { QuizQuestion } from "../types/quizTypes";

function shuffleArray<T>(array: T[]): T[] {
	return [...array].sort(() => Math.random() - 0.5);
}

function createVerseCountQuestion(chapter: Chapter): QuizQuestion {
	return {
		id: `verse-count-${chapter.id}`,
		prompt: `How many verses are in Surah ${chapter.englishName}?`,
		answerType: "typing",
		correctAnswer: String(chapter.verseCount),
		explanation: `Surah ${chapter.englishName} has ${chapter.verseCount} verses.`,
	};
}

function createReverseVerseCountQuestion(
	chapter: Chapter,
	allChapters: Chapter[],
): QuizQuestion {
	const matchingChapters = allChapters.filter(
		(c) => c.verseCount === chapter.verseCount,
	);

	return {
		id: `reverse-verse-count-${chapter.id}`,
		prompt: `Which surah has ${chapter.verseCount} verses?`,
		answerType: "search-select",
		correctAnswer: matchingChapters[0].englishName,
		acceptableAnswers: matchingChapters.map((c) => c.englishName),
		explanation: `Surahs with ${chapter.verseCount} verses include: ${matchingChapters
			.map((c) => c.englishName)
			.join(", ")}.`,
	};
}

function createRevelationLocationQuestion(chapter: Chapter): QuizQuestion {
	const correctAnswer = chapter.type === "meccan" ? "Makkah" : "Medinah";

	return {
		id: `revelation-location-${chapter.id}`,
		prompt: `Was Surah ${chapter.englishName} revealed in Makkah or Madinah?`,
		answerType: "multiple-choice",
		options: ["Makkah", "Medinah"],
		correctAnswer,
		explanation: `Surah ${chapter.englishName} is ${chapter.type.charAt(0).toUpperCase() + chapter.type.slice(1)}.`,
	};
}

function createChapterNumberQuestion(chapter: Chapter): QuizQuestion {
	return {
		id: `chapter-number-${chapter.id}`,
		prompt: `What chapter number is Surah ${chapter.englishName}?`,
		answerType: "typing",
		correctAnswer: String(chapter.id),
		explanation: `Surah ${chapter.englishName} is chapter ${chapter.id}.`,
	};
}

function createPreviousChapterQuestion(
	chapter: Chapter,
	previousChapter: Chapter,
): QuizQuestion {
	return {
		id: `previous-chapter-${chapter.id}`,
		prompt: `Which surah comes before Surah ${chapter.englishName}?`,
		answerType: "search-select",
		correctAnswer: previousChapter.englishName,
		explanation: `Surah ${previousChapter.englishName} comes before Surah ${chapter.englishName}.`,
	};
}

function createNextChapterQuestion(
	chapter: Chapter,
	nextChapter: Chapter,
): QuizQuestion {
	return {
		id: `next-chapter-${chapter.id}`,
		prompt: `Which surah comes after Surah ${chapter.englishName}?`,
		answerType: "search-select",
		correctAnswer: nextChapter.englishName,
		explanation: `Surah ${nextChapter.englishName} comes after Surah ${chapter.englishName}.`,
	};
}

export function generateChapterFactQuestions(
	chapters: Chapter[],
): QuizQuestion[] {
	const questions: QuizQuestion[] = [];

	chapters.forEach((chapter, index) => {
		questions.push(createVerseCountQuestion(chapter));
		questions.push(createReverseVerseCountQuestion(chapter, chapters));
		questions.push(createRevelationLocationQuestion(chapter));
		questions.push(createChapterNumberQuestion(chapter));

		const previousChapter = chapters[index - 1];
		const nextChapter = chapters[index + 1];

		if (previousChapter) {
			questions.push(
				createPreviousChapterQuestion(chapter, previousChapter),
			);
		}

		if (nextChapter) {
			questions.push(createNextChapterQuestion(chapter, nextChapter));
		}
	});

	const uniqueQuestions = questions.filter(
		(question, index, self) =>
			index === self.findIndex((item) => item.id === question.id),
	);

	return shuffleArray(uniqueQuestions).slice(0, 10);
}
