import quran from '../data/quran.json';

export function getAllChapters() {
	return quran;
}

export function getChapterByNumber(chapterNumber: number) {
	return quran.find((chapter) => chapter.id === chapterNumber);
}

export function getVerseByNumber(chapterNumber: number, verseNumber: number) {
	const chapter = getChapterByNumber(chapterNumber);
	if (!chapter || !chapter.verses) return null;
	return chapter.verses.find((verse) => verse.id === verseNumber);
}

export function getRevelationLocation(chapterNumber: number) {
	const chapter = getChapterByNumber(chapterNumber);
	if (!chapter) return null;
	return chapter.type;
}

export function getVerseCount(chapterNumber: number) {
	const chapter = getChapterByNumber(chapterNumber);
	if (!chapter) return null;
	return chapter.total_verses;
}