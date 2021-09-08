import { Bookmark } from "./controllers/bookmark";
import { Search } from "./controllers/search";

export const attachPublicRoutes = (app: any): void => {
    app.get("/repository", Search.getARepository);
    app.post("/repository/:repositoryid/bookmark", Bookmark.addABookMark);
    app.delete("/repository/:repositoryid/bookmark", Bookmark.removeBookMark);
    app.get("/bookmark", Bookmark.getAllBookmarks);
};