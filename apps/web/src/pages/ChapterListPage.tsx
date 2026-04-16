import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Chapter } from "../types/quranTypes";

export default function ChapterListPage() {
	const [chapters, setChapters] = useState<Chapter[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		fetch("http://localhost:3000/api/quran/chapters")
			.then((res) => {
				if (!res.ok) throw new Error("Failed to fetch chapters");
				return res.json();
			})
			.then((data) => {
				setChapters(data);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, []);

	if (loading) return <p>Loading surahs...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div>
			<h1>All Chapters</h1>
			{chapters.map((chapter) => (
				<div key={chapter.id}>
					<Link to={`/chapter/${chapter.id}`}>
						{chapter.id}. {chapter.englishName}
					</Link>
					<p>{chapter.name}</p>
				</div>
			))}
		</div>
	);
}

