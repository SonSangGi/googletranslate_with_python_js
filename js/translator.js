import axios from "axios";
import {select, insert} from "./db.js";

const GOOGLE_API_KEY = "";

async function translate(text) {
    try {

        const dbTranslatedText = select(text.toLowerCase());
        if (dbTranslatedText) {
            console.log(`[DB] translate\nFROM: ${text}\nTO: ${dbTranslatedText.ko}`);
            return dbTranslatedText.ko;
        }

        const res = await axios.post(`https://www.googleapis.com/language/translate/v2?key=${GOOGLE_API_KEY}`, {
            target: "ko",
            format: "html",
            q: text
        });

        if (res.status === 200) {
            const resData = res.data.data;
            const transObject = resData.translations[0];
            insert({en: text.toLowerCase(), ko: transObject.translatedText});
            console.log(`[GOOGLE] translate\nFROM: ${text}\nTO: ${transObject.translatedText}`);
            return transObject ? transObject.translatedText : "";
        } else {
            return "400 error";
        }

    } catch (error) {
        console.error(error);
        return error;
    }
}

export default translate;