# FDS React 뱀 게임 실습

현재 `Board` 컴포넌트를 제외한 모든 부분이 어느 정도 구현되어 있는 상태입니다.
`Board` 컴포넌트는 게임 상태를 받아서 그려주는 역할을 맡고 있는 컴포넌트입니다.
`Board.js` 파일만 수정해서, 상태가 잘 표시되도록 만들어보세요.

## 힌트

- 게임 상태가 어떻게 생겼는지, 그 상태를 `Board`가 어떻게 내려받고 있는지 잘 살펴보세요.
  (`index.js` 안에 있습니다.)
- `map` 메소드를 사용해서, 필요한 만큼 `div.row`와 `div.col`을 생성해내세요.
- `map` 콜백의 두 번째 인수로 **배열 인덱스**를 건네받을 수 있습니다.
  이를 이용해서, 적절한 위치에 `joint` 클래스와 `fruit` 클래스를 붙여주세요.
  이 때, `classNames` 함수를 활용해주세요.

## 추가 과제

현재 게임 상태는 **고정된 주기마다** 변경되고, 또 **사용자가 키보드를 입력할 때마다** 변경됩니다.
하지만 이 방식에는 몇 가지 문제점이 있습니다.

- 게임 난이도를 점점 올리는 것이 불가능합니다.
- 운영체제 설정에 따라 키 반복입력 속도가 제각각이라서,
  어떤 사용자의 뱀은 빛의 속도로 움직일 것이고,
  또 어떤 사용자의 뱀은 느리게 움직일 것입니다.
- 게임 플레이를 할 때 미묘하게 불편한 점이 있습니다. 예를 들어보면,
  키 입력을 해서 뱀이 움직였는데, 그 직후에 `setInterval`에 의해 뱀이 또 움직여서
  **마치 뱀이 한 번에 두 칸 움직인 것처럼 보일 때가 있습니다.**

[이전에 구현해봤던 뱀 게임](https://fds-snake-game.netlify.com/)과 비교해서 플레이해보시고,
위에 적어놓은 말의 뜻을 이해해보세요.

## 추가 과제 2

위 문제점을 직접 고쳐보고 싶으신 분들은

- `setInterval` 대신 `setTimeout`을 사용하는 코드로 바꾸어 보세요.
- [lodash.throttle](https://www.npmjs.com/package/lodash.throttle) 등의 라이브러리를 적용해보세요.

Throttle이 무엇인지 알고 싶다면 아래 글을 읽어보세요.

- [Throttle, Debounce 개념 잡기](https://medium.com/@progjh/throttle-debounce-%EA%B0%9C%EB%85%90-%EC%9E%A1%EA%B8%B0-19cea2e85a9f) 글을 읽어보시고
- [throttle과 debounce](https://hyunseob.github.io/2016/04/24/throttle-and-debounce/)
