1. VS CODE -> create-react-app
2. CSS 구조적 코딩(스코프가 없는 CSS를 구조적으로)
- BEM(사람이 직접) -> CSS 모듈(소프트웨어)
3. HTML5 history API
    +
    React Router

4. 
- Container 컴포넌트
- Presentarional 컴포넌트

- 장점: 
    - ex) 로딩했을때 넘어가는 데모 페이지 등을 만들어 편하게 사용

5. SEO? SSR(서버 사이드 렌더링) / Next.js


# JSX 더 알아보기
- 문법 설탕(syntatic sugar): 무언가를 문법적으로 쉽게 만든 것

- .createElement()의 반환값은 객체다.가 중요


## React 엘리먼트의 타입 지정하기
`<div/>`
`<Div/>`
는 리액트에서 다르게 동작
대문자로 시작하는 타입은 해당 JSX 태그가 React 컴포넌트임을 가리킨다.
-  그러니까, <Foo />와 같은 JSX 표현을 사용하려면 Foo가 반드시 스코프 내에 존재해야 합니다.

## React가 스코프 안에 있어야합니다
- JSX는 React.createElement를 호출하는 코드로 컴파일되기 때문에, React 라이브러리가 JSX 코드의 스코프 안에 항상 존재해야만 합니다.

- -> 리액트 코드를 작성할 때 항상 import React from 'react';를 써줘야함

## JSX 타입을 위한 점 표기법 사용하기
## 사용자 정의 컴포넌트는 '대문자'로 시작해야합니다
엘리먼트 타입이 소문자로 시작한다는 것은 그것이 <div> or <span>와 같은 내장 컴포넌트라는 것을 뜻합니다.
 이 컴포넌트들은 결과적으로 'div'혹은 'span'와 같은 '문자열의 형태'로 React.createElement에 전달됩니다. 
-> JSX에서 소문자 태그는 그 소문자 이름인 태그가 렌더링됨



<Foo />와 같이' 대문자'로 시작하는 타입은 React.createElement(Foo)와 같이 컴파일되며, 따라서 여러분의 JavaScript 파일에 정의되어있거나 혹은 다른 파일에서 import 된 컴포넌트여야 합니다.
대문자 -> 대문자

## 실행 중에 타입 선택하기
- 대문자로 시작하는 변수는 JSX 타입이 될 수 있습니다.

cf) 컴포넌트를 변수에 담고, 컴포넌트를 반환하기도 함
컴포넌트를 받아서 컴포넌트를 반환하는 고차 컴포넌트도 있다.


## JSX 안애서 prop 사용하기
- {}로 둘러싸면 값이 잘 넘어간다

## 문자열 리터럴


## Props의 기본값은 “True”

## 속성 펼치기
```js
const Button = props => {
    // other는 객체
    //  Button은 kind만 알면 되므로
  const { kind, ...other } = props;
  const className = kind === "primary" ? "PrimaryButton" : "SecondaryButton";
    //props안에 있는(kind빼고)  other에 있는것들을 펼쳐서 버튼에 넣어줌.   onClick이 버튼 태그에 등록됨
    // button쓰듯이 사용자 정의 컴포넌트인  <Button />을 사용하고 시ㅠ어서
  return <button className={className} {...other} />;
};

const App = () => {
  return (
    <div>
      <Button kind="primary" onClick={() => console.log("clicked!")}>
        Hello World!
      </Button>
    </div>
  );
};
```
## JSX에서 자식 다루기
### 문자열 리터럴
여는 태그와 닫는 태그 사이에 문자열을 써넣을 수 있고, 이 때 props.children는 그냥 문자열이 됩니다. 이런 식으로 많은 내장 HTML 엘리먼트를 사용할 수 있습니다:

### JSX를 자식으로 사용하기
- 여러 형태의 자식을 섞어서 쓸 수 있습니다.
- React 컴포넌트는 엘리먼트로 이루어진 배열 역시 반환할 수 있습니다.


### JavaScript 표현식을 자식으로 사용하기
### 함수를 자식으로 사용하기
- 컴포넌트 안에 함수를 사용할 수 있다.
```js
// Calls the children callback numTimes to produce a repeated component
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
    <!-- {}안에 함수를 넘겨서 화면을 그릴 수 있다 -->
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}
```
### 진리값, null, undefined는 무시됩니다.
- 이 성질은 React 엘리먼트를 조건부 렌더링하고 싶을 때 유용하게 사용할 수 
있습니다. 아래 JSX는 showHeader가 true일 때에만 <Header />를 렌더링합니다:
```js
<div>
  {showHeader && <Header />}
  <Content />                                                                                     
</div>
```
&&연산자는 왼쪽이 truthy -> 오른쪽 반환
오른쪽이 falsy이면 -> 왼쪽 반환


한 가지 주의해야 할 점은 0과 같은 몇몇 “falsy” 값들이 여전히 React에 의해 렌더링될 수 있다는 것입니다.
- 0이나 NaN은 리액트가 그린다.
- -> 리액트 안에서 truthy, falsy 성질을 이용할 때는 주의!


# Proptypes를 이용한 타입 체크
- 타입스크립트가 뭔지는 알아야함 -> 면접 질문 나올수도
     -> 코드 실행하기 전 타입 관련 문제를 찾아낼 수 있는 기술.
     사용자가 점점 증가하는 추세
    
# 정적 타입 체크


# Ref와 DOM
- prop으로 넘기지 않는 2가지 - Ref와 key
- 부모에서 Ref와 key를 prop으로 넘겨줘도 리액트가 가로챔

어쩔수 없이 DOM객체를 직접 만져야 할 때가 있다
ex) 외부 라이브러리를 가져다 쓸 때

가끔은 전형적인 데이터 흐름 밖에서 자식을 명령형으로 변경해야 할 필요가 있습니다.

### Ref 생성하기
- Ref는 참조의 약자
```js
// DOM객체를 가리키는 화살표를 만들고 싶을 때
// 1. Ref 객체를 만든다
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    //   2.  Ref 객체를 넣어준다
    return <div ref={this.myRef} />;
  }
}
```

### Ref 사용하기
- 1번 연결시킨 뒤에는 .current속성을 이용해서 연결된 DOM노드를 가져올 수 있다
```js
// current속성을 이용해서 진짜 DOM객체를 가져온다
const node = this.myRef.current;
```

- HTML 엘리먼트에 ref 어트리뷰트가 사용되면, ref의 current 속성은 `DOM 엘리먼트 객체`를 가리킵니다. 

- 클래스 컴포넌트에 ref 어트리뷰트가 사용되면, ref의 current 속성은 해당 컴포넌트로부터 생성된 `인스턴스`를 가리킵니다.




### DOM 엘리먼트에 ref 사용하기
> 노트 필기

### 클래스 컴포넌트에 ref 사용하기
```js
class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    //   this.textInput.current는 클래스 인스턴스
    // -> 
    this.textInput.current.focusTextInput();
  }

  render() {
    return (
      <CustomTextInput ref={this.textInput} />
    );
  }
}
```

- -> 클래스 인스턴스에 직접 접근할 수 있는 방법이 있고, 그 방법이 ref다.
- React에서 this가 가리키는게 무엇인지를 아는 게 중욧!!!!

### Ref와 함수형 컴포넌트
- 함수형 컴포넌트는 인스턴스를 가질 수 없기 때문에 ref 어트리뷰트 역시 사용할 수 없습니다



---
# create-react-app
-npx: npm을 다운받아서 바로 실행해줌
npx명령을 실행하면 항상 패키지를 새로 다운 받는다 -> 항상 최신 버전의 npm을 사용할 수 있다

npm start- 개발 서버

npm run build




my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── serviceWorker.js


    src - 변환 과정을 거쳐서 사용자에게. 압축이나 트랜스파일링 등 
    pulic - 변환 과정을 거치지 X


Internet Explorer 9, 10, and 11는 지원 x
(polyfills 사용해야함)

- 표준 명세에 적혀있다고 해서 실제 기능으로 사용할 수 있는 게 x

# Styles and Assets
## Adding a Stylesheet


base64 010101로 되어있는 정보를 url에 넣고 싶다
-> url은 문자열만 담을 수 있으므로 base64 인코딩을  이용해서 변환


## Adding Images, Fonts, and Files


---
Create React App은 자동으로 깃 저장소로 만들어줌 -> git init 안하고 바로 커밋 가능
