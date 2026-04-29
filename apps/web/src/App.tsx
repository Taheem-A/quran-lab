import { Routes, Route, Link } from 'react-router-dom';
import ChapterListPage from './pages/ChapterListPage.tsx';
import ChapterDetailsPage from './pages/ChapterDetailsPage.tsx';
import QuizPage from './pages/QuizPage.tsx';

export default function App() {
	return (
		<div className="app-shell">
			<header className="site-header">
				<div className="brand">Qu'ran Lab</div>
				<nav className="site-nav">
					<Link to="/">Chapters</Link>
					<Link to="/quiz">Quiz</Link>
				</nav>
			</header>
			
			<Routes>
				<Route path="/" element={<ChapterListPage />} />
				<Route path="/chapter/:id" element={<ChapterDetailsPage />} />
				<Route path="/quiz" element={<QuizPage />} />
			</Routes>
		</div>
	);
}