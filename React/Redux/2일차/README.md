# React와 함께 사용하기

## Container 컴포넌트 구현하기

- Store안에 들어있는 상태를 받아서 State을 prop으로 내려준다.

```js
import { connect } from 'react-redux'
​
const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
  // ()안에 p.c를 넘기면 컴포넌트를 반환한다.
)(TodoList)
​
export default VisibleTodoList
```

[Redux 2일차 실습(codeSandbox)- 선생님 코드](https://codesandbox.io/s/76ky8njyx)

```js
// 실무에서 주로 사용하는 방법
const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id));
    }
  };
};
```

[react-redux 라이브러리는 실제로 Context API를 활용하고 있습니다. ](https://github.com/reduxjs/react-redux/tree/master/src/components)

[Ducks 패턴 설명글](http://guswnsxodlf.github.io/redux-ducks-pattern)

[redux-devtool](https://github.com/zalmoxisus/redux-devtools-extension)

- Redux의 핵심은 상태 변화를 값으로 나타냈다는 것이다. 액션
- 이 개념은 함수형 프로그래밍에서 가져온 것이다.

- Redux에서 상태 변화 = 값
- 상태 변화를 localStorage에 저장하기 쉽다 -> 새로고침해도 상태가 안 날아가게 할 수 있다.
- 관례로 해결하는 부분이 많다. (자동으로 해주는 기능이 거의 없다.)
- 상태 관리 라이브러리 2가지
  : Redux, Mobx
- cf) Mobx
  - Redux를 자동화해놓은 라이브러리라고 생각해도 됨

Redux와 Mobx의 단점

- 상태 트리가 커서 생기는 문제점 2가지
- 화면을 다 다시 그려야 하는 부담
- dispatch 실행하면 reducer가 모두 실행된다.
  (되도록이면 action이 자주 dispatch 되지 않게 하기)
  UI상태 같은 마우스 좌표 -> 자주 변경되는 상태 -> Redux가 아닌 React에 저장해야함

---

- 모든 상태가 하나의 상태 트리에 들어있음 - React 컴포넌트가 아닌 외부에 상태 저장소가 있다. - 장점일수도, 단점일 수도 있다.
- 전역 상태에 들어가서 관리하기 어려움
- Redux에서 dispatch하면(큰 상태 트리에 추가가 되면) default방식(connect로 연결된 전체가 다시 그려짐)
- connect를 통하면 pureComponent처럼 미리 최적화가 적용이 되어 있다.

---

불변성

- pureComponent와 불변성은 항상 엮어서 생각해야 한다.
- Redux로 코딩할 때는 반드시 불변성을 지켜야 한다. -> 안 지키면 화면이 아예 안 그려진다.

---

# 앞으로 무엇을 공부해야 하는가?

- async붙여서 공부
- redux-thunk
- redux-saga - 제너레이터
