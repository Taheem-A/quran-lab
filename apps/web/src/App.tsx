import { Routes, Route } from 'react-router-dom';
import ChapterListPage from './pages/ChapterListPage.tsx';
import ChapterDetailsPage from './pages/ChapterDetailsPage.tsx';
import QuizPage from './pages/QuizPage.tsx';

export default function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/quiz" element={<QuizPage />} />
				<Route path="/" element={<ChapterListPage />} />
				<Route path="/chapter/:id" element={<ChapterDetailsPage />} />
			</Routes>
		</div>
	);
}