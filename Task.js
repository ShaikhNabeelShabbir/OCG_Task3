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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
// Function to fetch data from a URL and save it as a JSON file
var fetchData = function (url, name) { return __awaiter(void 0, void 0, void 0, function () {
    var response, data, JData, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, fetch(url)];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error("Data not found");
                }
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                JData = JSON.stringify(data);
                return [4 /*yield*/, jsonFileCreator(JData, name)];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.error(error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
// Write JSON string to a file
var jsonFileCreator = function (json_string, name) { return __awaiter(void 0, void 0, void 0, function () {
    var err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fs_1.promises.writeFile("".concat(name, ".json"), json_string)];
            case 1:
                _a.sent();
                console.log("Data written to file");
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.error("Error writing file", err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Function to extract sectors from JSON data
var sectorsJson = function (name) { return __awaiter(void 0, void 0, void 0, function () {
    var result, data, obj, list, key, err_2, jResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                result = {};
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fs_1.promises.readFile("".concat(name, ".json"), "utf8")];
            case 2:
                data = _a.sent();
                obj = JSON.parse(data);
                list = obj.data;
                // Iterate over the JSON object
                for (key in list) {
                    if (list.hasOwnProperty(key)) {
                        result[key] = list[key].name;
                    }
                }
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                console.error("Error reading or parsing file", err_2);
                return [3 /*break*/, 4];
            case 4:
                jResult = JSON.stringify(result, null, 2);
                return [4 /*yield*/, jsonFileCreator(jResult, "sectors")];
            case 5:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
// Function to extract industries from JSON data
var industriesJson = function (name) { return __awaiter(void 0, void 0, void 0, function () {
    var result, data, obj, list, key, industries, subKey, err_3, jResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                result = {};
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fs_1.promises.readFile("".concat(name, ".json"), "utf8")];
            case 2:
                data = _a.sent();
                obj = JSON.parse(data);
                list = obj.data;
                // Iterate over the JSON object
                for (key in list) {
                    if (list.hasOwnProperty(key)) {
                        industries = list[key].industries;
                        result[key] = {};
                        // Iterate through each sub-key in the current key's object
                        for (subKey in industries) {
                            if (industries.hasOwnProperty(subKey)) {
                                result[key][subKey] = industries[subKey].name;
                            }
                        }
                    }
                }
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                console.error("Error reading or parsing file", err_3);
                return [3 /*break*/, 4];
            case 4:
                jResult = JSON.stringify(result, null, 2);
                return [4 /*yield*/, jsonFileCreator(jResult, "industries")];
            case 5:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
// Function to extract activities from JSON data
var activitiesJson = function (name) { return __awaiter(void 0, void 0, void 0, function () {
    var result, data, obj, list, key, industries, industryKey, activities, activityKey, err_4, jResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                result = {};
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fs_1.promises.readFile("".concat(name, ".json"), "utf8")];
            case 2:
                data = _a.sent();
                obj = JSON.parse(data);
                list = obj.data;
                // Iterate over the JSON object
                for (key in list) {
                    if (list.hasOwnProperty(key)) {
                        industries = list[key].industries;
                        result[key] = {};
                        // Iterate through each industry in the current key's object
                        for (industryKey in industries) {
                            if (industries.hasOwnProperty(industryKey)) {
                                activities = industries[industryKey].activities;
                                result[key][industryKey] = {};
                                // Iterate through each activity in the current industry
                                for (activityKey in activities) {
                                    if (activities.hasOwnProperty(activityKey)) {
                                        result[key][industryKey][activityKey] =
                                            activities[activityKey].name;
                                    }
                                }
                            }
                        }
                    }
                }
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                console.error("Error reading or parsing file", err_4);
                return [3 /*break*/, 4];
            case 4:
                jResult = JSON.stringify(result, null, 2);
                return [4 /*yield*/, jsonFileCreator(jResult, "activities")];
            case 5:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
// Main function to orchestrate fetching and processing data
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, 6, 7]);
                console.log("Waiting");
                return [4 /*yield*/, fetchData("https://app.equidam.com/api/v3/industries?lang=en", "mainData")];
            case 1:
                _a.sent();
                return [4 /*yield*/, sectorsJson("mainData")];
            case 2:
                _a.sent();
                return [4 /*yield*/, industriesJson("mainData")];
            case 3:
                _a.sent();
                return [4 /*yield*/, activitiesJson("mainData")];
            case 4:
                _a.sent();
                return [3 /*break*/, 7];
            case 5:
                error_2 = _a.sent();
                console.log("Problem happened", error_2);
                return [3 /*break*/, 7];
            case 6:
                console.log("SUCCESSFUL");
                return [7 /*endfinally*/];
            case 7: return [2 /*return*/];
        }
    });
}); };
main();
