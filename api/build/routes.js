"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachPublicRoutes = void 0;
var bookmark_1 = require("./controllers/bookmark");
var search_1 = require("./controllers/search");
var attachPublicRoutes = function (app) {
    app.get("/repository", search_1.Search.getARepository);
    app.post("/repository/:repositoryid/bookmark", bookmark_1.Bookmark.addABookMark);
    app.delete("/repository/:repositoryid/bookmark", bookmark_1.Bookmark.removeBookMark);
    app.get("/bookmark", bookmark_1.Bookmark.getAllBookmarks);
};
exports.attachPublicRoutes = attachPublicRoutes;
