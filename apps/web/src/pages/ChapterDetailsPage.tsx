import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Chapter } from "../types/quranTypes";

export default function ChapterDetailsPage() {
    const { id } = useParams();
    const [chapter, setChapter] = useState<Chapter | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    function toArabicNumber(num: number) {
		return num.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[+d]);
	}

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
		<div className="container">
			<Link className="back-link" to="/">
				← Back
			</Link>

			<div className="card">
				<h1>
					{chapter.id}. {chapter.englishName}
				</h1>
				<h2 style={{ fontSize: "24px" }}>{chapter.name}</h2>
				<p>
					<em>{chapter.type}</em> • {chapter.verseCount} verses
				</p>
			</div>

			<div style={{ marginTop: "20px" }}>
				{chapter.verses.map((verse) => (
					<div key={verse.id} className="card">
						<p className="arabic">
							{verse.text}
							<span className="ayah-marker">
								۝{toArabicNumber(verse.id)}
							</span>
						</p>
					</div>
				))}
			</div>
		</div>
	);
}