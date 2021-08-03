import express from "express";
import cors from "cors";
import translate from "./translator.js";

const app = express();
app.use(cors());
let port = process.env.port || 3000;

app.get('/', async (req, res) => {
    const text = req.query.text;
    const translatedText = await translate(text);
    const result = text ? translatedText : "input query string TEXT";
    res.send(result);
});

const server = app.listen(port, () => {
    console.log(`번역 서버 오픈 ${port}`);
});