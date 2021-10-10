"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImage = void 0;
const axios_1 = __importDefault(require("axios"));
const getImage = async () => {
    const url = "https://dog.ceo/api/breeds/image/random";
    try {
        const resp = await (await axios_1.default.get(url)).data;
        if (resp.status === "success") {
            return resp.message;
        }
        return null;
    }
    catch (error) {
        return null;
    }
};
exports.getImage = getImage;
