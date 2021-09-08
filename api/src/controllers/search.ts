import { Response, Request } from 'express';
import axios from 'axios';

const getARepository = async (req: Request, res: Response): Promise<Response | void> => {
    //Check for missing search parameter
    const search = req.query.search;
    if (!search) {
        return res.status(400).send('Missing Params');
    }

    try {
        //create query string as in documentation
        const queryString = 'q=' + encodeURIComponent(`${search} in:name`);
        const response = await axios.get(`https://api.github.com/search/repositories?${queryString}`);
        return res.status(200).json({ repositories: response.data.items });
    } catch (e) {
        return res.status(500).end();
    }
}

export const Search = {
    getARepository
}