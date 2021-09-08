import 'dotenv/config';
import cors from 'cors';
import express, { Application } from "express";

import { attachPublicRoutes } from "./routes";


const port = process.env.PORT || 3005;


const initializeExpress = (): void => {
    const app: Application = express();

    app.use(express.json());
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    attachPublicRoutes(app);
    try {
        app.listen(port, (): void => console.log(`Connected successfully on port ${port}`));
    } catch (error: any) {
        console.error(`Error occured: ${error.message}`);
    }
}

const initializeApp = async () => {
    try {
        initializeExpress();
    } catch (err) {
        console.log("error");
    }
}

initializeApp();