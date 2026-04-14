import express from 'express';
import { getAllChapters, getChapterByNumber, getVerseByNumber, getRevelationLocation, getVerseCount } from '../services/quranService';

const router = express.Router();

router.get("/chapters", (req, res) => {
    try {
        const chapters = getAllChapters();
        res.json(chapters);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/chapter/:number", (req, res) => {
    const chapterNumber = parseInt(req.params.number);

    if (isNaN(chapterNumber) || chapterNumber < 1) {
        return res.status(400).json({ message: "Invalid chapter number" });
    }

    try {
        const chapter = getChapterByNumber(chapterNumber);
        if (!chapter) {
            return res.status(404).json({ message: "Chapter not found" });
        }
        res.json(chapter);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/chapter/:chapterNumber/verses", (req, res) => {
    const chapterNumber = parseInt(req.params.chapterNumber);
    
    if (isNaN(chapterNumber) || chapterNumber < 1) {
        return res.status(400).json({ message: "Invalid chapter number" });
    }

    try {
        const chapter = getChapterByNumber(chapterNumber);
        if (!chapter) {
            return res.status(404).json({ message: "Chapter not found" });
        }
        res.json(chapter.verses || []);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/chapter/:chapterNumber/verse/:verseNumber", (req, res) => {
    const chapterNumber = parseInt(req.params.chapterNumber);
    const verseNumber = parseInt(req.params.verseNumber);

    if (isNaN(chapterNumber) || chapterNumber < 1 || isNaN(verseNumber) || verseNumber < 1) {
        return res.status(400).json({ message: "Invalid chapter or verse number" });
    }

    try {
        const verse = getVerseByNumber(chapterNumber, verseNumber);
        if (!verse) {
            return res.status(404).json({ message: "Verse not found" });
        }
        res.json(verse);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});


export default router;