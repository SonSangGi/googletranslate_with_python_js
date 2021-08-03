# Google Translate API

Google translate API를 이용하여 영어를 한글로 번역하는 API 입니다.

>JS, python으로 개발되어 있으며, JS의 경우 google cloud translate로 개발되어 있어 Google cloud console에서 키를 발급 후 사용할 수 있습니다. cloud translate는 500,000 글자 초과 시 요금이 부과 될 수 있습니다.

> python의 경우 googletrans lib를 사용하여 무료이지만, 언제 서비스가 종료될지 모릅니다.

## 사용 예제
`Udemy 번역 감지를 통한 영문 자동 번역`
![udemy_auto_translate_example](./example/udemy_auto_translate_example.gif)

## JS (google cloud translate)를 통한 실행
`node.js를 사용하므로 node.js 최신버전을 설치 후 진행합니다.`
``` shell
cd ./js
npm init
```

translator의 GOOGLE_API_KEY를 입력해줍니다.
``` javascript
const GOOGLE_API_KEY = "발급 받은 KEY";
```

npm init 후 run.sh 또는 node 명령어를 입력하여 구동합니다.
``` shell
sh ./run.sh
or
./run.bat
or
node server.js
```

실행 후 http://localhost:3000?text=번역할영문 url로 이동하여 테스트합니다.<br>
번역한 텍스트는 js폴더의 db.json에 저장되며, 1회 요청 시 google cloud 에서 번역되고 2회 요청부터 db(lowdb)를 통해 번역한 단어를 가져옵니다.

## python을 통한 실행
`python 최신 버전 설치 후 진행합니다.`

pip를 통해 필수 라이브러리들을 설치합니다.
``` shell
cd python
pip install -r requirements.txt
```

라이브러리 설치 후 run.sh 또는 실행명령어를 입력하여 실행합니다.
```
sh ./run.sh
or
./run.bat
or
uvicorn main:app --reload --host=0.0.0.0 --port=3000
```
실행 후 http://localhost:3000?text=번역할영문 url로 이동하여 테스트합니다.<br>
번역한 텍스트는 python폴더의 db.json에 저장되며, 1회 요청 시 googletrans로 번역이 되고 2회 요청부터 db(tinydb)를 통해 번역한 단어를 가져옵니다.