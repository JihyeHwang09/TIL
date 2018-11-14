# React
- 영문판을 보는 게 훨씬 더 좋다. (최신 버전을)
- 할 일 목록, rgb challenge, 오목, 뱀게임 등을 React로 구현할 예정

## 개요
### React가 무엇인가요?
- React는 선언적이고, 효율적이며, 유연한 JavaScript 라이브러리이다.

---
#### 명령형 프로그래밍

- ex) Dom API처럼 일일히 속성을 지정해서 값을 넣으라고 명령하는 것
    - 코드를 실행하지 않고 결과를 알아보려면 어렵다. 

#### 선언적 프로그래밍
- HTML은 이렇게 코드 짰으니까 네가 알아서 그려줘. 순서를 지정해줄 필요 X
    - 코드가 생긴대로 결과물이 나온다는 특징이 있다.
    - 코드가 결과물의 특징을 잘 반영하고 있다는 특징이 있다. 
---

- -> React는 선언적 프로그래밍이 가능하다.


- React는 효율적이다.
    - React는 UI를 값으로 다룬다는 특징이 있다.

React를 사용하면, “컴포넌트”라 불리는 여러 격리된 코드 조각을 조합해서, 복잡한 UI를 쉽게 만들 수 있습니다.

React의 컴포넌트에는 두 가지 종류가 있습니다. 일단은 React.Component의 서브클래스부터 봅시다:

- **컴포넌트는 클래스이다.**
- **컴포넌트는 UI를 그려주는 render메소드는 가지고 있다.**
```js
class ShoppingList extends React.Component {
    //rendor()는 메소드
  render() {
    //   UI를 나타내는 값을 만들어준 다음 return해준다.
    return (
        // HTML코드처럼 생겼지만, HTML이 아니다.
        // 뷰를 만들어내는 특별한 표현식이다.
    //   <div>으로 감싸져 있는 코드는 React div엘리먼트라고 부른다.
    // 각각의 요소들은 객체로 되어 있다. 
    // 문서 사이에 어떤 컨텐츠를 표시하고 싶다. JSX 안에는 {}를 쓴 다음 그 안에 값을 넣어주면, 그 값이 화면에 그려지게 된다. 
      <div className="shopping-list">
      
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}

// 사용 예제: <ShoppingList name="Mark" />
```
- XML과 비슷하게 생긴 위 태그의 사용법을 곧 살펴볼 것입니다. 우리는 화면을 어떻게 그릴지를 React에게 알려주기 위해 컴포넌트를 사용합니다. 데이터가 변경되면, React는 컴포넌트를 효율적으로 갱신합니다. (즉, 다시 그립니다.)

- 위에서 본 ShoppingList는 React 컴포넌트 클래스입니다. 컴포넌트는 props (“properties”의 줄임말)이라 불리는 매개변수를 받아서, `render` 메소드에서 뷰의 계층 구조를 반환합니다.(화면을 어떻게 그릴 지에 대한 계층 구조를 반환한다.)

- cf) 어떻게 그릴 건지를 설명하는 값을 '뷰'라고 한다. 

- `render` 메소드는 무엇을 그릴지에 대한 설명을 반환합니다. 그러면 React는 그것을 받아 화면에 그려줍니다. 여기서 render가 반환하는 것은 **React 엘리먼트**로, ‘무엇을 그릴지’에 대한 정보를 담고있는 객체이다. 대부분의 React 개발자들은 이러한 구조를 쉽게 표현할 수 있는 JSX라는 특별한 문법을 사용합니다.(JavaScript Extended) <div />라는 JSX 코드는, 빌드 과정에서 React.createElement('div')로 변환됩니다. 위 예제는 사실 아래 코드와 같습니다:

```js
return React.createElement('div', {className: 'shopping-list'},
  React.createElement('h1', /* ... h1 children ... */),
  React.createElement('ul', /* ... ul children ... */)
);
```

- 좀 더 알고싶으시다면, API reference에서 createElement()에 대한 자세한 설명을 읽어보세요. 하지만 이 튜토리얼에서는 이 함수를 직접 사용하지 않을 것입니다. 대신, 우리는 JSX를 계속 사용합시다.

- JSX 안에서는 JavaScript를 자유롭게 활용할 수 있습니다. JSX 중괄호 안에는 어떤 JavaScript 표현식도 넣을 수 있습니다. 그리고 React 엘리먼트는 JavaScript 객체로, 변수에 담거나 프로그램의 다른 부분으로 넘기는 것이 가능합니다.

- 위 예제의 ShoppingList 컴포넌트는 브라우저에 내장된 DOM 컴포넌트(<div />, <li />)만 그려주고 있습니다. 하지만 React 컴포넌트를 조합해서 그리는 것도 가능합니다. 예를 들어, 우리는 전체 쇼핑 목록을 그리기 위해 <ShoppingList />와 같이 쓸 수 있습니다. 각각의 React 컴포넌트는 독립적이며 캡슐화되어 있습니다. 이 성질은 우리가 단순한 컴포넌트로부터 복잡한 UI를 만드는 일을 가능하게 해 줍니다.

- **컴포넌트를 태그 이름처럼 사용할 수 있다.**

- React에서 컴포넌트를 사용하면 큰 HTML을 조각으로 나눠서 <ProductList />로 사용하면 코드 수를 줄일 수 있고, 



## 2교시
> 그림 필기 정리한 거 사진 찍기 -> 넣기
- 정보가 폭포수처럼 위에서 아래로 흐른다.
- 이벤트 리스너 다는 방법: onClick, onChange, onSubmit, onMouseMove 등에 함수를 넘겨줘야 한다. 
- Square Component에 alert(this.props.value)를 사용하면, 현재 넘어온 칸에 있는 숫자가 뜸
- Board Component의 name="Square"을 넣고,Square Component에 alert(this.props.name)를 사용하면, alert으로 "Square"라고 뜸


- JavaScript 클래스를 사용할 때, 서브클래스의 생성자를 정의할 때는 반드시 super를 호출해주어야 합니다. 생성자를 갖는 모든 React 컴포넌트 클래스는 그 생성자가 반드시 super(props)로 시작해야 합니다.



- Constructor(생성자) 만들 때는 React Component를 생성할 때는 super(props)는 반드시 맨 위에 있어야 한다.
- super를 맨 윗줄에 안 써주면, 에러남


- super(props);
- 어떤 부모 생성자의 코드를 호출하는 것

this.props.value : 부모로부터 내려받은 값
this.state.value: 내가 기억하고 있는 값


 onClick={() => this.setState({value: 'X'})}
 클릭했을 때, 기억하고 있는 값을 'X'를 바꿔준다.
  setState({})로 {}안의 상태를 바꿔준다. 


- **React의 가장 핵심적인 부분**
  - **React를 사용하면서, 반드시 setState라는 메소드를 통해서 상태를 변경해야 한다!** -> 그래야 상태가 변경될 때마다 화면이 갱신될 수 있다.
  - this.setState의 기능 2가지
  - 상태 변경
  - 화면 갱신

- React에서는 상태를 바꾸면, 무조건 화면이 갱신된다.
- React에서 화면을 다시 그리는 방법이 setState밖에 없다.(상태를 변경해주면 자동으로 화면 갱신하게)

- render라는 메소드는 React 라이브러리가 알아서 호출해줌. (개발자가 render메소드를 호출할 일이 없음)

- setState할 때마다 React 라이브러리가 render메소드를 실행해서 화면이 바뀔 게 있는지 확인한다.
- 화면을 다시 그려야할 때마다 render메소드가 매번 호출된다. 


```js
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button className="square" onClick={() => this.setState({value: 'X'})}>
        {this.state.value}
      </button>
    );
  }
}
```

- Square의 render 메소드 안에 있는 onClick 핸들러 안에서 this.setState를 호출하면, <button>이 클릭될 때마다 화면을 다시 그려야 한다는 사실을 React에게 알려줄 수 있습니다. 그 뒤, this.state.value는 'X'가 될 것이고, 이로 인해 게임판에 X가 표시됩니다. 이제 사각형을 클릭해서, X가 표시되는지 확인해보세요.

- 컴포넌트 안에서 setState를 호출하면, React는 해당 컴포넌트가 품고 있는 자식 컴포넌트까지 모두 새로 그려줍니다.
- -> 부모 컴포넌트의 상태가 바뀌면, 자식 컴포넌트가 각각 가지고 render메소드가 다 호출된다.

### 게임 완성하기
### 상태 끌어올리기
- Square Component가 9개 있고, 각각이 상태를 가지고 있다.

- prop을 통해서 부모 컴포넌트에서 자식 컴포넌트로 상태를 보내는 건 쉽다.
- 자식 컴포넌트의 상태를 부모 컴포넌트로 끌어 올린다.
- 상태를 가장 가까운 공통 조상에 저장한다. -> 상태 끌어올리기
- **여러 자식 컴포넌트에 저장되어 있는 데이터를 읽어와야 할 때, 혹은 자식 컴포넌트끼리 통신을 해야 할 필요가 있을 때는, 부모 컴포넌트에서 상태를 공유하세요. 부모 컴포넌트에서는 prop을 통해 자식 컴포넌트에게 상태를 내려줄 수 있습니다. 이 방법을 통해 부모 컴포넌트와 자식 컴포넌트가 따로 놀지 않게 만들 수 있습니다.**
- 상태의 불일치 문제를 피하기 위해서 상태는 하나로 두는 게 좋다.



이제 사각형을 클릭했을 때의 처리를 해주어야 합니다. Board 컴포넌트가 게임 상태를 저장하고 있으므로, Square 컴포넌트에서 Board 컴포넌트의 상태를 변경할 방법이 필요합니다. 컴포넌트의 상태에는 자기 자신만 접근할 수 있으므로, Square 컴포넌트에서 Board 컴포넌트의 상태를 직접 변경할 수 있는 방법은 없습니다.

이런 경우, 부모 컴포넌트인 Board에서 상태를 바꾸는 함수를 만들어 Square에 내려줌으로써 문제를 해결할 수 있습니다. 이 함수를 Square가 클릭되는 순간 호출해줍시다. 일단 Board 컴포넌트의 renderSquare 메소드를 고쳐봅시다. (참고: 아래 코드는 아직 동작하지 않습니다.)


- 부모 컴포넌트의 상태를 직접적으로 바꿀 수 있는 방법은 없다.
- But 부모 컴포넌트에서 상태를 바꿀 수 있는 함수를 자식 컴포넌트에게 내려준다면, -> 부모 컴포넌트의 상태를 **간접적으로** 바꿀 수 있다.
- 부모 컴포넌트에서 각각의 값과 상태를 바꿀 수 있는 함수를 자식 컴포넌트에게 내려줘야 한다. 

- renderSquare함수는 Board 컴포넌트 안에 있는 함수이다.

- props는 부모로부터 내려주는 함수


- button도 컴포넌트. 내장 Dom 컴포넌트라고 부른다. 
- Square, board 등은 사용자 정의 컴포넌트(Custom Component)라고 부름

- **setState하면, render 메소드를 실행시킨다.**
- -> 그래서 화면이 다시 그려진다.

- cf) 
- `제어되는 컴포넌트(Controlled Component)`: 자기 스스로의 상태를 갖고 있는 컴포넌트 
- 제어되지 않는 컴포넌트: 자기 스스로의 상태를 갖고 있지 않은 컴포넌트

- 컴포넌트를 사용하는 방법 2가지
 - 클래스로 사용하는 방법
 - 함수로 사용하는 방법

 - 클래스 컴포넌트: class가 부모로부터 내려 받은 값은 this.props에 저장된다.
 - 함수형 컴포넌트: props라는 매개변수에 객체가 들어온다. props객체의 속성에 부모로부터 내려받은 값이 저장되어 있다.
    - render 메소드를 쓰지 않는다. 

### 턴 넘기기

### Declaring a Winner
- return만을 이용해서 함수를 종료시키는 기법이 많이 사용된다.
---

### 오늘 배운 React Tutorial 강사님이 정리
- 하나의 컴포넌트로부터 수많은 엘리먼트가 만들어질 수 있다.
- 컴포넌트와 엘리먼트는 React 엘리먼트는 Dom 객체가 아니다. React 객체는 Dom 객체와 전혀 상관이 없다. 
 - ex) React 엘리먼트에 .textContent해서 값을 집어넣고 싶어서 아무 반응이 없다. 

- props는 부모로부터 값을 내려받는 통로이다. 
- 직접 자식 컴포넌트에서 부모 컴포넌트에게 값을 넘겨줄 수 없다.
- addEventListener를 쓸 필요가 없다.
- 컴포넌트는 상태를 가질 수 있고, 꼭 setStatus를 통해서만 바꿔야 한다는 약속이 있다. 
- 상태를 처음 만들어줄 때는 생성자 안에서 만들어주는 게 원칙이다. 
```js
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }
```
- setStatus는 상태 변경, 화면 갱신이라는 2가지 효과가 있다.
- 부모 컴포넌트에서 상태를 공유하세요. 부모 컴포넌트에서는 prop을 통해 자식 컴포넌트에게 상태를 내려줄 수 있습니다. 이 방법을 통해 부모 컴포넌트와 자식 컴포넌트가 따로 놀지 않게 만들 수 있습니다.

- 부모 컴포넌트는 상태를 바꾸는 함수를 만들어서 자식 컴포넌트에게 내려준다. 
- 이 함수를 이용해서 자식 컴포넌트에서 부모 컴포넌트의 상태를 간접적으로 바꿔줄 수 있다. 