from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from tinydb import TinyDB, Query
from googletrans import Translator
import time
import os

# JSON DB
db_path = os.path.join(os.getcwd(), "db.json")
db = TinyDB(os.path.abspath(db_path))
table = db.table('translates')
Translate = Query()

# GOOGLE TRANSLATOR
translator = Translator()

# API
app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root(text=""):
    if not text:
        return "input query parameter (text)"

    print(f"text >>> {text}")

    start = time.time()
    db_res = table.search(Translate.en == text)
    if not db_res:
        res = translator.translate(text, src="en", dest="ko").text
        table.insert({"en": text, "ko": res})
        print(f"\n[GOOGLE] - Translate \nFROM: {text}\nTO:{res}\nTime: {time.time() - start}\n")
        return res
    else:
        print(f"\n[DB] - Translate \nFROM: {text}\nTO:{db_res[0]}\nTime: {time.time() - start}\n")
        return db_res[0].get("ko")
    
    
