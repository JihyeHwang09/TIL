## 어제 배운 내용 리마인드

- React는 유연하다.
- UI를 값으로 다루기 쉽다.
- UI가 값이라서 map메소드 등으로 활용할 수 있다.
 
- 함수- 컴포넌트
- return하는 각각 한 줄마다 element

- prop은 데이터를 주고받는 통로
- prop은 위에서 아래로만 흐른다
- ex) board -> square에게 prop으로 데이터 줄 수 O
    - But, square -> board에게 prop으로 데이터 줄 수 X

- addEventListener를 사용할 필요가 X
- setState 이외에 화면을 갱신하는 방법이 있긴 하지만, 거의 사용하지 않기 때문에 setState 이외의 방법은 없다고 봐도 무방하다.

- **상태를 바꿔주는 함수를 Board에서 만들어서 prop을 통해서 Square에게 내려주는 방법으로**

# JSX 소개
- JSX로 만든 엘리먼트는 변수에 담을 수 있고, 함수의 매개변수로도 사용할 수 있다.

### 왜 JSX인가?
### JSX에 표현식 포함하기
- JSX 안에 자바스크립트 표현식 을 중괄호로 묶어서 포함시킬 수 있다.
- 예를 들어, `2 + 2`, `user.firstName`, `formatName(user)` 를 유효한 표현식으로 표현하면 아래와 같이 표현한다.
```js
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);

```
- 가독성을 좋게 하기 위해 JSX를 여러줄로 나눴습니다. 필수는 아니지만, 이 작업을 수행할 때는 자동 세미콜론 삽입의 함정을 피하기 위해 괄호로 묶는 것이 좋다.

### JSX 또한 표현식이다
- 컴파일이 끝나면, JSX 표현식이 일반적인 자바스크립트 함수 호출이 되고, 결과적으로 자바스크립트 객체로 평가된다.

- 이 말은 if 문이나 for 문 내에서 JSX를 사용할 수 있다.
- -> 변수에 할당하거나 매개변수로 전달하거나 함수에서 반환할 수 있음을 의미한다.
```js
function getGreeting(user) {
    if (user) {
        return <h1>Hello, {formatName(user)}!</h1>
    }
    return <h1>Hello, Stranger.</h1>
}
```
### JSX 어트리뷰트 정의
- 어트리뷰트에서 `따옴표`를 사용해서 `문자열 리터럴`을 정의할 수 있다.
```js
const element = <div tabIndex="0"></div>;
```
- 어트리뷰트에 `중괄호`를 사용하면, `자바스크립트 표현식`을 포함시킬 수 있습니다.
```js
const element = <img src={user.avtarUrl}></img>;
```
- 어트리뷰트에 자바스크립트 표현식을 포함시킬 때 중괄호를 따옴표로 묶지 말아야 한다.
    - 따옴표 (문자열 값인 경우) 또는 중괄호 (표현식인 경우) 중 하나를 사용해야 하며, 하나의 어트리뷰트에 둘 다 사용할 수 있는 것이 아니다.

```js
이렇게 하면, user.avatarUrl에 들어있는 값이 넘어가는 게 아니라 문자열이 넘어감
const element = <img src="{user.avatarUrl}"></img>;
const element = <img src="user.avatarUrl"></img>;
```
---
경고:
**HTML에서 사용하던 어트리뷰트 이름을 JSX에서 그대로 사용할 수 없다.**
JSX는 HTML보다는 자바스크립트에 가깝기 때문에, React DOM은 HTML 어트리뷰트 이름 대신 `camelCase` 어트리뷰트 이름 컨벤션을 사용합니다.

ex1) React에서는 tabIndex를 camelCase로 써준다.
    React 라이브러리를 통해 tabindex라고 변환되어 HTML에 들어가는 것이다.

ex2) HTML에서는 label for를 React에서는 label htmlFor로 써야한다.
예를 들어, JSX에서 `class` 는 `className` 이 되며, `tabindex` 는 `tabIndex` 가 됩니다.
---

### JSX 자식 정의
- 만약 태그가 비어있다면, XML 처럼 /> 를 이용해 닫아주어야 한다.
- **React에서는 HTML에서 여는 태그만 있는 태그들을 꼭 닫아주는 태그도 써줘야 한다.**
ex) img, link
```js
const element = <img src={user.avatarUrl} />;
```
- JSX 태그는 자식을 가질 수 있다.
```js
const element = (
    <div>
        <h1>Hello!</h1>
        <h2>Good to see you here.</h2>
    </div>
);
```
### JSX 인젝션 공격 예방
- 사용자가 입력한 내용을 JSX 내에 포함시켜도 안전하다.
    - React에 XSS(cross-site-scripting)공격에 대한 보안 기능이 내장되어 있기 때문이다.
```js
const title = response.potentiallyMaliciousInput;
// This is safe:
const element = <h1>{title}</h1>;
```
- 기본적으로, React DOM은 렌더링 되기 전에 JSX 내에 포함된 모든 값을 이스케이프 한다. 
- 따라서 어플리케이션에 명시적으로 작성되지 않은 내용은 절대 삽입할 수 없습니다. 
- 모든 것은 렌더링 되기 전에 문자열로 변환된다. 이렇게 하면 XSS (cross-site-scripting) 공격을 막을 수 있다.

### JSX 객체 표현
- 사용자의 브라우저는 자바스크립트 코드만 해석할 수 있으므로 JSX 코드를 자바스크립트 코드로 컴파일한 후 전달해야 한다.

- Babel은 JSX를 React.createElement() 호출로 컴파일한다.

- 아래 두 예제는 동일하다.
```js
const element = (
    <h1 className="greeting">
    Hello, world!
    </h1>
)
```

```js
const element = React.createElement(
    'h1',
    {className: 'greeting'},
    'Hello, world!'
);
```
- React.createElement() 는 버그 없는 코드를 작성하는 데 도움을 주는 몇 가지 체크를 하긴 하지만, 기본적으로는 아래와 같은 객체를 생성한다.
```js
// Note: this structure is simplified
 
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world'
  }
};
```
- 이 객체를 "React"요소라고 부른다.
- React요소는 화면에서 보고자 하는 내용에 대한 설명 내지 서술로 생각할 수 있다.
-  React는 이 객체를 읽어들이고 이를 사용하여 DOM을 만들어낸 뒤 최신 상태로 유지한다.
# 요소(element) 렌더링
요소는 React 앱에서 가장 작은 단위의 재료입니다.

요소는 화면에 표시하고자 하는 내용을 서술합니다.

- React는 element를 받아서 화면에 그려주는 기능을 하는 라이브러리

브라우저 DOM 요소와 달리, React 요소는 순수한 객체이며 생성 비용이 저렴합니다. 

### 생성 비용?
- ex) video태그, img태그 등은 비용이 많이 든다. (자바스크립트 실행 속도가 느려질 수 있다. 이 태그를 만들어내는 데 계산이 오래 걸리기 때문에,  cpu 메모리가 많이 사용된다.)
- React DOM이라는 라이브러리가 개발자 대신에 알아서 DOM 요소 객체를 생성해서 appendChild 등을 해서 HTML문서에 넣어준다. 


### DOM에서 요소 렌더링하기
- React로 구축한 어플리케이션은 보통 하나의 루트 DOM 노드를 가진다.


- React 요소를 루트 DOM 노드에 렌더링하고 싶다면, ReactDOM.render() 에 둘 다 넘겨주면 됩니다.
- ReactDOM 라이브러리에 
- 첫 번째 인수로 element를 넘겨주고, 두 번째 인수로 어디에 그려줄 것인지를 써준다.

- 우리는 2가지 라이브러리를 사용하는 것이다.
    - React 라이브러리
    - ReactDOM 라이브러리
- cf)
- 브라우저 DOM에 그리고 싶을 때 - ReactDOM라이브러리를 사용
- 모바일 앱에 그리고 싶을 때 - React Native를 사용(사용법은 많이 다름)

### 렌더링된 요소 업데이트

React 요소는 변경 불가능 합니다. 한번 요소를 만들었다면, 그 자식이나 어트리뷰트를 변경할 수 없습니다. 
---
>중요!!
- 불변성(Immutability)
- 변경할 수 없다.
- **값을 변경하고 싶을 때는 값을 새로 만든다.**
    - React 요소는 사실 그냥 객체이기 때문에 변경 불가능하다는 의미는, 진짜 변경할 수 없다는 게 아니라 변경하고 싶으면, 처음부터 싹 새로 만든다는 의미이다.
---
- React는 화면을 조금이라도 바꾸고 싶으면, element를 처음부터 다 다시 그린다.
- 상태가 조금이라도 바뀌면, render메소드가 다 호출되고, React element가 맨 위에 있는 부모부터 가장 아래에 있는 자식까지 다~~~ 다시 그려지는 방식이다.
- 개발자가 React element를 직접 변경할 일은 없다. 
요소는 영화의 단일 프레임에 비유할 수 있습니다. 즉, 요소는 특정 시점의 UI를 표현할 뿐입니다.

이제까지 배운 것만 가지고 UI를 갱신할 수 있는 유일한 방법은 새로운 요소를 만들어서 이 요소를 ReactDOM.render() 로 전달하는 것입니다.


- 보통 실무에서는 setState로 상태를 변경한다. 
```js
// 실무에서 활용되는 방법은 X
function tick() {
        // toLocaleTimeString()는 사용자가 사용하는 시간으로 만들어주는 메소드
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}
// tick이라는 함수가 1초에 한 번씩 실행됨
setInterval(tick, 1000);
```
이 예제는 setInterval() 콜백을 이용해 매 초마다 ReactDOM.render() 를 호출하고 있습니다.

Note:

실무에서, 대부분의 React 어플리케이션은 ReactDOM.render() 를 한 번만 호출합니다. 다음 섹션에서는 이러한 코드가 어떻게 상태를 갖는 컴포넌트 로 캡슐화 되는 지 배울 것입니다.

서로가 서로를 기반으로 만들어져 있기 때문에, 이 주제를 건너뛰지 않는 걸 권장합니다.

## React는 꼭 필요한 부분만 갱신합니다

- 상식으로 알고 있을 내용: DOM Tree에서 변경된 부분을 브라우저가 보라색으로 보여준다.

# 컴포넌트와 props
- 컴포넌트를 통해 UI를 독립적이고 재사용 가능한 부분으로 분리하고, 각 부분을 독립적으로 생각할 수 있습니다.

- 개념상 컴포넌트는 자바스크립트 함수와 비슷합니다. “props”이라 불리는 임의의 입력을 받아들이고, 화면에 무엇이 표시되어야 하는지를 서술하는 React 요소를 반환합니다.

### 컴포넌트 렌더링
- 함수는 긴 코드뭉치에 **이름을 붙인** 것임
- 그 함수의 이름만 기억해서 그 긴 코드를 실행시키는 것임

- 긴 엘리먼트를 생성하는 컴포넌트에 **이름을 붙여서** 사용할 수 잇는 것임

```js
// 컴포넌트 안에 많은 엘리먼트들이 들어있지만 모든 내용을 개발자가 기억하고 사용하는 게 X
// 사용자 정의 컴포넌트의 이름을 그 기능을 잘 나타내주는 이름으로 붙여주어 사용한다.
const element = <Welcome name="Sara" />;
```

### 컴포넌트 조립하기
- 제일 위에 있는 컴포넌트를 App이라고 부르는 게 관례이다.

### 컴포넌트 추출
### Props는 읽기전용입니다
- **props는 무슨 일이 있어도 수정하지 말 것**
- props는 부모로부터 데이터를 받으면 props에 들어있는 거고, props를 수정하지 않아야 한다.
```js
function sum(a, b) {
  return a + b;
}
```
- 입력을 변경하지 않고, 동일한 입력에 대해 항상 동일한 결과를 반환하는 함수를 **순수**함수(pure function)라고 한다.

```js
// 계좌에서 돈을 인출할 때
// 이 함수는 입력을 변경하기 때문에 순수하지 않다. 
function withdraw(account, amount) {
  account.total -= amount;
}
```
- render 메소드 안에서는 같은 입력이 들어왔을 때, 같은 출력이 나가게 만들어줘야 한다. ex) render 메소드 안에 Math.random()을 사용하지 X!!
- React에서 render 메소드가 호출되는 것을 개발자가 컨트롤할 수 없다.
- render 메소드 안에 Math.random()을 사용하면, 화면이 다시 그려질 때마다 출력이 계속 달라지기 때문에 화면이 예상치 못한 순간에 이상하게 나오는 버그가 발생할 수 있다.
---

# State와 라이프사이클
이 섹션에서는 정말로 재사용가능하고 캡슐화된 Clock 컴포넌트를 만드는 방법에 대해 배웁니다. 컴포넌트의 자체 타이머를 설정하고 매 초마다 스스로 업데이트하게 만들 것입니다.

- 캡슐화: 정보를 숨기는 행위
- 상태라는 건 컴포넌트에 들어있고 컴포넌트 밖에서는 접근할 수 없음. 이를 캡슐화라고 한다. 


- React에서 화면을 바꾸고 싶으면, 무조건 상태를 둔다고 생각한다.
    - 상태 -> setState
    - 라이프사이클 메서드

- state를 만들려면 생성자를 만들어야 한다.  
- 1초마다 1번씩 setState를 하면, 1초마다 화면을 바꿀 수 있다.

### 클래스에 라이프사이클 메서드 추가하기
- setInterval을 써야 하는데, clearInterval을 해주지 않으면 시계가 계속 가게 된다.
---
- Clock이 화면에 표시될 때, 그 순간에 setInterval을 해주고 싶다.
- Clock이 화면에서 사라질 때(화면에 표시되지 않는 그 순간), clearInterval을 해주고 싶다.
---

화면에 표시되는 순간, 화면에서 사라지는 순간

Clock 이 DOM에 최초로 렌더링 될 때 타이머를 설정 하려고 합니다. React에서 이를 “mounting” 이라고 부릅니다.(cf) mounting: 장착하다)
- 어떤 컴포넌트가 React의 세계가 아니라, DOM에 엘리먼트가 추가되는 것

그리고 DOM에서 Clock 이 삭제되었을 때 타이머를 해제 하려고 합니다. React에서 이를 “unmounting” 이라고 부릅니다.
- 어떤 컴포넌트가 React의 세계가 아니라, DOM에 엘리먼트가 제거되는 것

Component의 생애주기마다 코드를 주기적으로 실행하는 방법이 있다.
- componentDidMount(), componentWillUnmount()의 실행 시점이 중요!!

```js
// DOM에 그려진 직후 이 중괄호 안에 있는 코드가 실행됨
// 컴포넌트가 DOM에 추가된 직후에 실행된다.
componentDidMount() {

  }

// 컴포넌트가 Unmount되기 직전에 이 중괄호 안에 있는 코드가 실행됨
// 컴포넌트가 DOM에서 삭제되기 직전에 실행된다.
  componentWillUnmount() {

  }
```
- 이런 메서드들을 "라이프사이클 훅"이라고 부른다. 
- 훅은 특정 시점에 실행될 함수를 걸어놓는다는 의미임

```js
 componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
```
```js
// Clock이 화면에서 사라진 직후에 timer를 정지시킨다
componentWillUnmount() {
    clearInterval(this.timerID);
  }
```

## State 바르게 사용하기
- setState() 에 대해 알아야 할 세 가지 있습니다.

### State를 직접 수정하지 마세요

### State 업데이트는 비동기일 수 있습니다
- cf) 브라우저는 1초에 60번 화면을 그린다.
- 화면을 되도록 적게 업데이트 하는 게 좋다.

React는 성능을 위해 여러 setState() 호출을 한 번의 작업으로 묶어서 처리하는 경우가 있습니다.

this.props 및 this.state 가 비동기로 업데이트될 수 있기 때문에, 다음 state를 계산할 때 이 값을 신뢰해서는 안됩니다.

예를 들어, 카운터를 업데이트하는 이 코드는 실패할 수 있습니다.

- 다음 state의 상태를 변경하기 위해서 이전 state를 읽어와서 변경하는 건 위험하다. -> 이것 때문에 버그가 많이 발생한다. 
> 강사님 코드 붙이기!!
```js

// state가 바로 업데이트 되는 게 아니라, 비동기로 업데이트 되기 떄문에
// 나중에 count를 2로 바꿔줘
// 나중에 count를 2로 바꿔줘
// 라는 의미가 됨
```
- 다음 상태를 이전 상태로부터 변경하고 싶을 때는 setState에 함수를 넣어주면 된다.
```js
// Correct
// Reacty는 setState를 한 결과로 저장된 진짜 그 전 state를  prevState에 저장해줌
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}))
```
- React가 관리하는 React만의 큐가 있다.
- 반드시 위에 있는 setState가 실행된 후에 아래에 있는 setState가 실행된다.

### State 업데이트는 병합됩니다
```js

```
- 이 때 얕은 병합을 수행하기 때문에, this.setState({comments}) 는 this.state.posts 는 그대로 두지만, this.state.comments 는 완전히 대체합니다.

- Object.assign은 얕은 병합을 수행한다.
- 최상위 속성들만 바꾸는 게 얕은 병합이다.
- 속성 이름과 속성 값을 Object.assing({})이 안에 넣는 것임. 따라서 속성에 객체가 있을 경우에는 그 안에 있는 객체는 복사가 되지 않는다.
    - ex) 객체안에 객체가 들어있을 경우
- -> State안에 객체 안의 객체, 배열 안의 배열 등 중첩된 구조를 쓰지 않는 게 좋다. **얕은 병합을 하기 때문에 주의해야 한다.**

# 이벤트 제어하기
- 함수 안에서 함수를 정의할 수 있다.
 - onClick={handleClick}의 {}안에 함수를 정의해도 되고, 밖에서 정의하고 안에 함수 이름을 써줘도 됨
```js
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```
### Event Pooling
--- 
Note:

If you want to access the event properties in an asynchronous way, you should call event.persist() on the event, which will remove the synthetic event from the pool and allow references to the event to be retained by user code.
---
- 비동기식으로 이벤트 객체의 속성에 접근하기를 원한다면, 당신은 호출해야 한다. event.persist()라는 메소드를 호출해야 한다. 합성 이벤트를 pool에서 제거한다. 

- await와 await 사이의 코드는 동기식으로 작동한다.
- React에서는 비동기 함수를 이벤트 리스너에 그냥 등록하는 건 위험하다.
- 이벤트 객체는 React에서 쓸 때 조심해야 한다.
- 비동기식으로 이벤트 객체의 속성에 접근하려면, event.persist() 메소드를 호출해야 한다.
- 미리 속성을 빼오면 괜찮다. 
- 자세한 방법은 다음에 강사님이 알려주실 예정


React를 사용할 때, (일반적인 경우) 리스너를 추가하기 위해 DOM 요소가 생성된 후 addEventListener 를 호출할 필요가 없습니다. 대신 요소를 처음 렌더링할 때 리스너를 같이 넘겨주세요.

- React가 addEvnetListener를 호출해 주는 것이다.


JSX 콜백에서 this 의 의미에 대해 주의해야합니다. 자바스크립트에서 클래스 메서드는 기본적으로 바인딩 되지 않습니다. 만약 this.handleClick 바인드를 잊은채로 onClick 에 전달하면, this 는 함수가 실제로 호출될 때 undefined 로 취급됩니다.

이건 React에서만 해당되는 동작이 아닙니다. 자바스크립트의 함수의 동작 방식 자체가 이렇습니다. 일반적으로 onClick={this.handleClick} 처럼 () 없이 메서드를 참조하면, 그 메서드를 bind 해야합니다.

만약 bind 를 호출하는 게 귀찮은 경우, 이 문제를 해결할 수 있는 두 가지 방법이 있습니다. 만약 실험적 기능인 퍼블릭 클래스 필드 문법 을 사용하고 있다면, 콜백을 올바르게 바인딩하기 위해 클래스 필드를 사용할 수 있습니다.

- this와 관련된 문제들이 있고, 여러 가지 해결 방법이 있는데, onClick이나 onSubmit, onMouseMouve 등에는 화살표 함수를 사용한다.this가 가리키는 게 잘 고정된다.

- 여러 가지 해결 방법은 각각의 성능 상의 장단점이 있다.
---
- 중요한 내용: React는 특별한 객체를 사용한다.-> 주의해야 할 부분이 있다.
- 특히 이벤트 리스너를 사용할 때, this 때문에 문제가 많이 발생하므로 문제를 해결하기 위해서 화살표 함수를 사용하자.
---

# 조건부 렌더링
### && 논리 연산자를 사용해 if를 인라인으로 넣기
- React는 문자열, 숫자는 잘 그려주는데, true, false, null 등은 화면에 안 그려준다.
- &&는 앞의 코드가 falsy이면 앞의 걸 반환하고, 앞의 코드가 true이면 뒤의 걸 반환한다.
```js
function Mailbox(props) {
    // unreadMessages.length는 안 읽는 메시지가 있으면 true, 안 읽은 메시지가 없으면 false가 됨
    // &&는 앞의 코드가 falsy이면 앞의 걸 반환하고, 앞의 코드가 true이면 뒤의 걸 반환한다.
    // 앞의 코드가 falsy라서 false를 반환하면, React는 아무것도 화면에 그리지 않기 때문에 if - else의 느낌으로 사용할 수 있다.

    //if ~else를 React에서 사용할 수 있으나 복잡한 UI를 그리기에 불편해서 이렇게 &&를 이용함
    const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```


### 조건부 연산자를 사용해 if-else 인라인으로 넣기

```js
// if ~else 느낌으로 삼항 연산자를 쓸 수 있다.
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```

### 컴포넌트가 렌더링 되지 못하도록 방지

```js
// 경고 메시지가 있으면 그려라. 
// 경고 메시지가 없으면, 아무것도 그리지 말고
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}
```