export type Verse = {
	id: number;
	text: string;
};

export type Chapter = {
	id: number;
	name: string;
	englishName: string;
	type: "meccan" | "medinan";
	verseCount: number;
	verses: Verse[];
};
