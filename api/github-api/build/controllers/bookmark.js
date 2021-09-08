"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bookmark = void 0;
var fs_1 = require("fs");
var axios_1 = __importDefault(require("axios"));
var path_1 = __importDefault(require("path"));
var pathToFile = path_1.default.join(__dirname, '../../data/bookmarks.json');
var addABookMark = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, bookmarks, file, exists, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.repositoryid;
                if (!id) {
                    return [2 /*return*/, res.status(400).send('No id Provided')];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                bookmarks = [];
                return [4 /*yield*/, fs_1.promises.readFile(pathToFile, 'utf-8')];
            case 2:
                file = _a.sent();
                if (file) {
                    bookmarks = JSON.parse(file);
                    exists = bookmarks.find(function (node) { return node === id; });
                    if (exists) {
                        return [2 /*return*/, res.status(201).json({ id: id })];
                    }
                }
                bookmarks.push(id);
                return [4 /*yield*/, fs_1.promises.writeFile(pathToFile, JSON.stringify(bookmarks))];
            case 3:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ id: id })];
            case 4:
                error_1 = _a.sent();
                res.status(500).end();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var removeBookMark = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, file, bookmarks, newBookmarks, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.repositoryid;
                if (!id) {
                    return [2 /*return*/, res.status(400).send('No id Provided')];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fs_1.promises.readFile(pathToFile, 'utf-8')];
            case 2:
                file = _a.sent();
                bookmarks = JSON.parse(file);
                if (!bookmarks || bookmarks.length <= 0) {
                    return [2 /*return*/, res.status(401).end("No bookmark to remove")];
                }
                newBookmarks = bookmarks.filter(function (node) { return node !== id; });
                return [4 /*yield*/, fs_1.promises.writeFile(pathToFile, JSON.stringify(newBookmarks))];
            case 3:
                _a.sent();
                return [2 /*return*/, res.status(204).json({ id: id })];
            case 4:
                error_2 = _a.sent();
                res.status(500).end();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var getAllBookmarks = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var file, bookmarks, repos, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fs_1.promises.readFile(pathToFile, 'utf-8')];
            case 1:
                file = _a.sent();
                bookmarks = JSON.parse(file);
                if (!bookmarks || bookmarks.length <= 0) {
                    return [2 /*return*/, res.status(200).json({ bookmarks: [] })];
                }
                return [4 /*yield*/, Promise.all(bookmarks.map(function (id) { return __awaiter(void 0, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, axios_1.default.get("https://api.github.com/repositories/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response.data];
                            }
                        });
                    }); }))];
            case 2:
                repos = _a.sent();
                return [2 /*return*/, res.status(200).json({ bookmarks: repos })];
            case 3:
                error_3 = _a.sent();
                res.status(500).end();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.Bookmark = {
    addABookMark: addABookMark,
    removeBookMark: removeBookMark,
    getAllBookmarks: getAllBookmarks
};
