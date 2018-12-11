#Redux 상태 관리 라이브러리
80% 실무 프로젝트

Redux란?
- Context 기능
- 고~~급 상태 관리 기법
Context API가 나오기 전에는 Context 기능을 사용하기 위해서 어려운 고급 기술까지 배웠어야 했음

무언가를 '값'으로 다루면 조합성이 좋아진다.
ex) 제너레이터
Promise


Redux의 핵심
Redux는 상태변화를 값으로 만들었다.
(상태 변화 -> 값)
상태 변화 로깅
Undo, Redo가 쉬워짐
시간 여행이 가능 -> 상태 변화를 저장해 놨다가 되돌아갈 수 있다.

오늘의 목표
store, action, dispatch, subscribe, reducer

Redux에서는 값이 투입되면, 상태가 바뀐다.
-> Store에 action이 투입될(dispatch)때마다  setState를 호출한다.
((cf) React에서는 메소드를 호출하면 상태가 바뀐다.)

Store.subscribe
상태가 바뀔 때마다 실행항 함수를 등록하는 절차   
[Reducer 카운터 예시](https://repl.it/@JihyeHwang09/redux-exercise)

> 내 코드 1, 2 + 쌤 꺼랑 합치기

Redux에서는 return, default, state를 꼭 써줘야 한다.


>노트 필기 그리 추가!!!!!
> 내 필기 + 쌤 코드 합치기


하나의 Store로 상태를 관리하려면 여러 리듀서를 하나로 합쳐야 한다. (Store 하나에 reducer 하나만 넣을 수 있음)

리듀서 이름은 상태 이름과 같게 짓는 게 관례다.
