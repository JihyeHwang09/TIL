sudo npm install -g express

express myapp

구조
위 명령어로 기본 뼈대를 만들면 아래와 같은 폴더와 파일이 자동 생성된다.

/myapp
  ⌊ /bin
      ⌊ www
  ⌊ /public
      ⌊ /images
      ⌊ /javascripts
      ⌊ / stylesheets
  ⌊ /routes
      ⌊ index.js
  ⌊ /views
      ⌊ index.jade
  ⌊ app.js
  ⌊ package.json
package.json : 노드 패키지 파일이다. 필요한 노드 모듈을 정의하고 프로젝트 설명이 기록되어 있다. 시작 스크립트 ./bin/www파일이다.

/bin/www: 익스프레스 설정 파일인 app.js 파일을 가져와 http 객체와 연결하는 작업을 한다. 실제 서버를 구동하는 파일이다.

app.js: 익스프레스 객체를 생성하고 환경 설정을 한다.

morgan:  http 리퀘스트에 대해 로깅하는 모듈이다.
body-parser: http 요청 중 POST 요청의 데이터에 접근하기 위한 모듈이다.
cookie-parser: http로 요청한 클라이언트 쿠키 정보에 접근하기 위한 모듈이다.
express.static(… ‘public’): 정적 파일 호스팅을 위한 폴더를 설정한다.
app.use(‘/’, routes): 라우팅 설정. 세부 라우팅은 /routes 폴더에 구현된다.