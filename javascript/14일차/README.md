---
title: 자바스크립트 13일차
date: 2019-01-27 19:54:29
categories:
  - front-end
  - javaScript
tags:
  - javaScript
---

# Express

- `Node.js` 생태계에서 가장 널리 쓰이는 **웹 프레임워크**
- 내장하고 있는 기능은 매우 적으나,
  **미들웨어를 주입하는 방식**으로 기능을 확장하는 생태계를 가지고 있음

## Express 앱의 기본 구조

```js
// Express 인스턴스 생성
// 서버를 대표하는 앱 객체
const app = express();

// 미들웨어 주입
app.use(sessionMiddleware());
app.use(authenticationMiddleware());
// 미들웨어란? (출처: 위키백과)
// 각기 분리된 두 개의 프로그램 사이에서,
// 매개 역할을 하거나 연합시켜주는 프로그램을 말한다.
// 데이터베이스와 웹서버를 연결시켜주는 것

// ex1) 웹브라우저에 양식을 띄워놓고,
// 이를 이용하여 데이터베이스로부터 데이터를 찾아올 수 있게 하는 것

// ex2) 사용자의 요청 내용에 따라 페이지를 동적으로 나타낼 수 있게 한다.

// 미들웨어는 양 쪽을 연결하여 데이터를 주고 받을 수 있도록
// 중간에서 매개 역할을 하는 소프트웨어, 네트워크를 통해서
// 연결된 여러 개의 컴퓨터에 있는 많은 프로세스들에게
// 어떤 서비스를 사용할 수 있도록 연결해 주는 소프트웨어를 말한다.

// 3계층 클라이언트/서버구조에서 미들웨어가 존재한다.
// 웹 브라우저에서 데이터베이스로부터 데이터를 저장하거나 읽어올 수 있게
// 중간에 미들웨어가 존재하게 된다.

// 라우트 핸들러 등록
// 요청이 들어왔을 때 분석해서 처리해준다.
// app객체에 get방식으로 루트경로로 요청이 들어왔을 때, 일어날 일을 등록할 수 있다.
// 요청에 대한 정보가 객체에 담겨서 request 자리에 들어온다.
// response 객체에 응답을 담아서 브라우저에게 응답을 보낼 수 있다.
app.get("/", (request, response) => {
  response.send("Hello express!");
});

// 서버 구동
// 서버에서 3000번 포트에서 코드를 실행시키고, {} 안의 코드인 console.log를 찍어라.
app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
```

---

### Routing

```js
// HTTP 요청 메소드(GET, POST, ...)와 같은 이름의 메소드를 사용
// ex) /articles로 요청이 들어올 경우, 실행됨
app.get("/articles", (req, res) => {
  res.send("Hello Routing!");
});
// 특정 경로에만 미들웨어를 주입하는 것도 가능
app.post("/articles", bodyParserMiddleware(), (req, res) => {
  database.articles.create(req.body).then(() => {
    res.send({ ok: true });
  });
});
// 경로의 특정 부분을 함수의 인자처럼 입력받을 수 있음
// ex) /articles/1로 요청이 들어올 경우, 실행됨
app.get("/articles/:id", (req, res) => {
  database.articles
    .find(req.params.id) // `req.params`에 저장됨
    .then(article => {
      res.send(article);
    });
});
```

### [Request 객체]

- `req.body`: 요청 바디를 적절한 형태의 자바스크립트 객체로 변환하여 이곳에 저장
  (body-parser 미들웨어에 의해 처리됨)
- `req.ip`: 요청한 쪽의 IP
- `req.params`: route parameter
- `req.query`: query string이 객체로 저장됨

---

- `요청`의 구성 요소

  - **메소드**(ex) GET, POST)
  - **주소**
  - **헤더**(ex) 요청에 대한 부가정보)
  - **바디**(ex) 새로 등록하고자 하는 정보 등)

- `응답`의 구성 요소
  - **상태 코드**
  - **헤더**
  - **바디**: 본문이 포함되는 영역

---

- `res.status(...)`: 응답의 **상태 코드**를 지정하는 메소드
- `res.append(...)`: 응답의 **헤더**를 지정하는 메소드
- `res.send(...)`: 응답의 **바디**를 지정하는 메소드
  > 인자가 **텍스트**면 `text/html`, **객체**면 `application/json` 타입으로 응답

* [Express 실습](https://glitch.com/edit/#!/tranquil-soccer?path=server.js:1:0)

# Template Language

## Template Engine

- 데이터를 결합해 문서를 생성하는 프로그램, 혹은 라이브러리
- 템플릿을 작성할 때 사용하는 언어를 템플릿 언어라고 함
- ex) jsp(html에 java코드를 넣는 언어), php(html 안에 c#코드를 넣는 언어)

## EJS(Embedded JavaScript Template)

- Node.js 생태계에서 가장 많이 사용되는 템플릿 엔진
- JavaScript 코드를 템플릿 안에서 그대로 쓸 수 있음
- EJS VSCode Extension
- EJS에서 Emmet 사용하기

---

- [EJS 예제](https://glitch.com/edit/#!/energetic-sword?path=views/index.ejs:1:0)
- Example

```html
<%# index.ejs %>
<html>
  <head>
    <title><%= title %></title>
  </head>
  <body>
    <div class="message"><%= message %></div>
    <!-- showSecret이 truethy이면, my secret을 보여주고,  -->
    <!-- 아니면 보여주지 마라. -->
    <% if (showSecret) { %>
    <div>my secret</div>
    <% } %>
  </body>
</html>
```

### Express에서 EJS 사용하기

- [EJS 실습](https://glitch.com/edit/#!/mire-damselfly?path=README.md:1:0)

### 파일을 그대로 제공하기

- 내가 가지고 있는 파일을 그대로 응답할 수 있다.
- ex) 이미지, 폰트 파일 등을 그대로 응답한다.
- EJS 실습 예제

---

- [코딩 퀴즈 2번 풀이](https://codepen.io/dbeat999/pen/ePMZap)
- 코드를 짤 때 순서: 상태로부터 화면을 그리는 코드를 먼저 짜고,
  그 후에 이벤트 리스너 코드를 짜는 게 쉽다.

---

# 클래스

## ES2015 class

- 그 전에 배웠던 프로토타입 부분 보기

```js
// 생성자
function Person({ name, age }) {
  this.name = name;
  this.age = age;
}
Person.prototype.introduce = function() {
  return `안녕하세요, 제 이름은 ${this.name}입니다.`;
};

const person = new Person({ name: "윤아준", age: 19 });
console.log(person.introduce()); // 안녕하세요, 제 이름은 윤아준입니다.
console.log(typeof Person); // function
console.log(typeof Person.prototype.constructor); // function
console.log(typeof Person.prototype.introduce); // function
console.log(person instanceof Person); // true
```

- ES2015에서 도입된 클래스는 생성자의 기능을 대체한다.
- class 표현식을 사용하면,
  생성자와 같은 기능을 하는 함수를 훨씬 더 깔끔한 문법으로 정의할 수 있다.

```js
// 클래스
class Person {
  // 이전에서 사용하던 생성자 함수는 클래스 안에 `constructor`라는 이름으로 정의합니다.
  constructor({ name, age }) {
    this.name = name;
    this.age = age;
  }

  // 객체에서 메소드를 정의할 때 사용하던 문법을 그대로 사용하면,
  //   메소드가 자동으로 `Person.prototype`에 저장됩니다.
  introduce() {
    return `안녕하세요, 제 이름은 ${this.name}입니다.`;
  }
}

const person = new Person({ name: "윤아준", age: 19 });
console.log(person.introduce()); // 안녕하세요, 제 이름은 윤아준입니다.
console.log(typeof Person); // function
console.log(typeof Person.prototype.constructor); // function
console.log(typeof Person.prototype.introduce); // function
console.log(person instanceof Person); // true
```

```js
// 클래스 내에서는 일반 함수에서 쓰는 문법을 사용할 수 X.
class Person {
  console.log('hello');
}
// 에러: Unexpected token
```

```js
// 클래스는 객체가 아닙니다!
// ',' 쓰지 X
// class안에서 ','을 써서 에러난 것임
class Person {
  prop1: 1,
  prop2: 2
}
// 에러: Unexpected token

```

```js
class Person {}
// undefined
Person();
// 에러 메시지
// VM135:1 Uncaught TypeError:
// Class constructor Person cannot be invoked without 'new'
// at <anonymous>:1:1 (anonymous) @ VM135:1
new Person();
// Person {}
function Student(name) {
  this.name = name;
}
// undefined
const s = new Student("haha");
// undefined
1;
// 1
s.name;
// "haha"
const s2 = Student("haha");
// undefined
window.name;
// "haha"
```

- 클래스는 함수로 호출될 수 없다.
- 클래스 선언은 let과 const처럼 블록 스코프에 선언되며,
  **`호이스팅(hoisting)`이 일어나지 않는다.**
  - function으로 정의한 함수는 var변수와 비슷.
    `호이스팅`이 일어난다.
- 클래스의 메소드 안에서 super 키워드를 사용할 수 있다.

## 메소드 정의하기

- getter, setter는 속성에 접근하기만 해도 함수가 실행된다.
- 클래스에서 Getter 혹은 setter를 정의하고 싶을 때는 메소드 이름 앞에 `get` 또는 `set`을 붙여주면 된다.

```js
class Account {
  constructor() {
    this._balance = 0;
  }
  get balance() {
    return this._balance;
  }
  set balance(newBalance) {
    this._balance = newBalance;
  }
}

const account = new Account();
account.balance = 10000;
account.balance; // 10000
```

- static 키워드를 메소드 이름 앞에 붙여주면 해당 메소드는 정적 메소드가 된다.
- 정적 메소드는 인스턴스에 . 찍고 사용하는 메서드 (X).

- 생성자에 `.` 찍고 사용하는 메소드를 말한다.

- 메소드 중에 정적 메소드를 제외하면, 다 프로토타입 안에 들어간다.

## 클래스 필드 (Class Field)

- 클래스 필드는 내년쯤 정식 표준으로 채택될 것으로 예상됨.
- 현업에서는 다들 사용하고 있음.
- 클래스 필드는 최신 문법이라서 일반 repl.it에서는 실행되지 X.

- [constructor vs class repl 코드](https://repl.it/@seungha/constructor-vs-class?language=javascript)

```js
// constructor vs class
class Person {
  constructor({ name, age }) {
    this.name = name;
    this.age = age;
  }
  // 이 메소드는 정적 메소드입니다.
  static sumAge(...people) {
    return people.reduce((acc, person) => acc + person.age, 0);
  }
}

// function Person({name, age}) {
//   this.name = name;
//   this.age = age;
// }

// Person.prototype.introduce = function() {
//   console.log(`안녕하세요, ${this.name}입니다.`)
// }

// Person.sumAge = function(...people) {
//   return people.reduce((acc, person) => acc + person.age, 0);
// }

const person1 = new Person({ name: "윤아준", age: 19 });
const person2 = new Person({ name: "신하경", age: 20 });

// person1.introduce()
Person.sumAge(person1, person2); // 39
```

### 클래스 필드와 this

- 메소드를 다른 함수의 인수로 넘겨줘야 하는 경우,
  `화살표 함수`를 사용하는 것이 좋다.
- React를 사용할 때 this 때문에 버그가 많이 일어난다.
- 클래스를 확실히 이해하려면, 교재의 '객체, 함수 더 알아보기' 읽어보기
  [class field repl 코드](https://repl.it/@seungha/class-field)

```js
class MyClass {
  a = 1;
  getA = () => {
    return this.a;
  };
}

const instance = new MyClass();
const getA = instance.getA;
getA();
```

# Web Form

## HTML FORM

### HTML form의 기본 동작

- From Data가 요청 body에 담겨져 전달된다.
- HTML form을 전송하면,
  입력된 정보가 기본적으로 percent encoding 되어 요청됨
- GET method

```
 GET /search?query=%EA%B0%9C&sort=latest HTTP/1.1
...
```

```
POST method
POST /form HTTP/1.1
Content-Type: application/x-www-form-urlencoded
...

home=Cosby&favorite+flavor=flies
```

- [HTML Form 예제 - 할일 관리 웹 서비스](https://glitch.com/edit/#!/topaz-kitty?path=server.js:1:0)

  - 브라우저의 새로고침은 이전에 보냈던 요청을 그대로 보내는 것이다.
  - 이런 일이 발생하지 않기 위해서 redirect를 하는 것이다.
  - redirect 하지 x면, 새로고침을 여러 번 누르면 -> POST로 요청이 계속 감
  - redirect 하면, 새로고침을 여러 번 누르면-> GET으로 요청이 계속 감
  - DOM API만 사용하면 -> 브라우저 내장 UI인 뒤로 가기, 앞으로 가기 버튼 등이 잘 작동하지 않는다.

- [MIME 타입](https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
