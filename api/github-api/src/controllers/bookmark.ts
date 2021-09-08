import { Response, Request } from 'express';
import { promises as fs } from 'fs';
import axios from 'axios';
import path from 'path';

const pathToFile = path.join(__dirname, '../../data/bookmarks.json');

const addABookMark = async (req: Request, res: Response): Promise<Response | void> => {
    const id = req.params.repositoryid;
    if (!id) {
        return res.status(400).send('No id Provided');
    }
    try {
        let bookmarks = [];
        const file = await fs.readFile(pathToFile, 'utf-8');
        if (file) {
            bookmarks = JSON.parse(file);
            const exists = bookmarks.find((node: string) => node === id);
            if (exists) {
                return res.status(201).json({ id });
            }
        }
        bookmarks.push(id);
        await fs.writeFile(pathToFile, JSON.stringify(bookmarks));
        return res.status(200).json({ id });
    } catch (error: any) {
        res.status(500).end();
    }
}

const removeBookMark = async (req: Request, res: Response): Promise<Response | void> => {
    const id = req.params.repositoryid;
    if (!id) {
        return res.status(400).send('No id Provided');
    }
    try {
        const file = await fs.readFile(pathToFile, 'utf-8');
        const bookmarks = JSON.parse(file);
        if (!bookmarks || bookmarks.length <= 0) {
            return res.status(401).end("No bookmark to remove");
        }
        const newBookmarks = bookmarks.filter((node: string) => node !== id);
        await fs.writeFile(pathToFile, JSON.stringify(newBookmarks));
        return res.status(204).json({ id });
    } catch (error: any) {
        res.status(500).end();
    }
}


const getAllBookmarks = async (req: Request, res: Response): Promise<Response | void> => {

    try {
        const file = await fs.readFile(pathToFile, 'utf-8');
        const bookmarks = JSON.parse(file);
        if (!bookmarks || bookmarks.length <= 0) {
            return res.status(200).json({ bookmarks: [] });
        }
        
        const repos = await Promise.all(bookmarks.map(async (id: string) => {
            const response = await axios.get(`https://api.github.com/repositories/${id}`);
            return response.data;
        }));

        return res.status(200).json({ bookmarks: repos });
    } catch (error: any) {
        res.status(500).end();
    }
}

export const Bookmark = {
    addABookMark,
    removeBookMark,
    getAllBookmarks
}