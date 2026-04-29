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
		<div className="container">
			<h1>All Chapters</h1>
			
			<div className="chapter-list">
				{chapters.map((chapter) => (
					<Link key={chapter.id} to={`/chapter/${chapter.id}`}>
						<div className="chapter-card">
							<strong>{chapter.id}. {chapter.englishName}</strong>
							<p>{chapter.name}</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}

