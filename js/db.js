import lodash from "lodash";
import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, '../db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);
await db.read();
db.data ||= { translates: [{"en": "hello", "ko": "안녕하세요"}] };
await db.write();
db.chain = lodash.chain(db.data);

export const select = (enText) => {
    return db.chain.get("translates").find({en: enText}).value();
}

export const insert = (trObject) => {
    db.data.translates.push(trObject);
    db.write();
}