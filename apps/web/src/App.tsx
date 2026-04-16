import { Routes, Route } from 'react-router-dom';
import ChapterLstPage from './pages/ChapterListPage.tsx';
import ChapterDetailsPage from './pages/ChapterDetailsPage.tsx';

export default function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<ChapterLstPage />} />
				<Route path="/chapter/:id" element={<ChapterDetailsPage />} />
			</Routes>
		</div>
	);
}