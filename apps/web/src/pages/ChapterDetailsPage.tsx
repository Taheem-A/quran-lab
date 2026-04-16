import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Chapter } from "../types/quranTypes";

export default function ChapterDetailsPage() {
    const { id } = useParams();
    const [chapter, setChapter] = useState<Chapter | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return;

        fetch(`http://localhost:3000/api/quran/chapter/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch chapter details");
                return res.json();
            })
            .then((data) => {
                setChapter(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            })
    }, [id]);

    if (loading) return <p>Loading chapter details...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!chapter) return <p>Chapter not found</p>;

    return (
		<div>
			<Link to="/">← Back to all surahs</Link>

			<h1>
				{chapter.id}. {chapter.englishName}
			</h1>
			<h2>{chapter.name}</h2>
			<p>{chapter.type}</p>
			<p>{chapter.verseCount} verses</p>

			<hr />

			{chapter.verses.map((verse) => (
				<p key={verse.id}>
					<strong>{verse.id}.</strong> {verse.text}
				</p>
			))}
		</div>
	);
}