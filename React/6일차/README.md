# 합성 (composition) vs 상속 (inheritance)
## 다른 컴포넌트를 담기


게시판에 적용

- 헤더의 메뉴바에 하이라이트를 주는 등 페이지별로 달라야하는 부분이 있기 때문에 App.js에 레이아웃을 두지 x -> Layout.js를 따로 만들면 확장성이 좋음

// 헤더, 푸터
// 뭔가를 감싸는 컴포넌트 만들고 싶을 때
// 레이아웃 뿐만이 아니라 뭔가 빈칸이 있는 컴포넌트를 만들고 싶을 때 활용


# Context
- '맥락'이라는 의미
- 언어 설정(ex) 한국어 버전이면, 앱 전역에서 공유되어야하는 값)
- ex) UI 테마 등
-  Context API라는 기술이 멀리 사용되지는 않고 있음
- Redux와 사용법은 다르지만, 목적은 비숫함


## 언제 Context를 사용해야 할까요?
Context를 사용하면, 중간 계층에 위치하는 엘리먼트에 props를 넘겨주는 작업을 피할 수 있습니다:                                     
```js
// Context를 사용하면 prop을 일일이 엮어주지 않고도
// 컴포넌트 트리의 깊은 곳에 값을 넘겨줄 수 있습니다.
// 테마에 대한 context를 만들어줍시다. ("light"를 기본값으로 합니다.)
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    // Provider를 사용해서 현재 테마를 트리 아래쪽으로 넘겨줍시다.
    // 어떤 컴포넌트든 이 값을 읽을 수 있습니다. 아주 깊은 곳에 위치해있더라도 말이죠.
    // 아래에서는, "dark"라는 값을 넘겨주었습니다.

    // 정보를 내려주고 싶은 부분을 Provider로 써준다.
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// 이제 더이상 중간 계층에 있는 컴포넌트에서
// theme prop을 넘겨줄 필요가 없습니다.
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton(props) {
  // 테마 context를 읽어오려면 Consumer를 사용하세요.
  // React는 가장 가까운 Provider를 찾아서 그 값을 사용할 것입니다.
  // 이 예제에서, theme 값은 "dark"가 됩니다.
  return (
      <ThemeContext.Consumer>
      {/*  
      화살표 함수의 매개변수인 theme으로 들어온다.*/} 
      {theme => <Button {...props} theme={theme} />}
    </ThemeContext.Consumer>
  );
}
```
- Provider 하위 컴포넌트라면, 어디서든 Provider가 내려준 값 사용 가능

## API
### React.createContext
```js
const {Provider, Consumer} = React.createContext(defaultValue);
```
- context는 여러 개 사용할 수 있고, { Provider, Consumer } 쌍을 만듭니다
- defaultValue 인수는 오직 상위에 같은 context로부터 생성된 Provider가 없을 경우에만 사용됩니다. (Consumer만 있고, Provider가 없을 때)

## Provider
```js
<Provider value={/* some value */}>
```
- 꼭 value라는 이름 사용해야 함




- Provider의 자손인 모든 Consumer는 Provider의 value prop이 바뀔 때마다 다시 렌더링됩니다. 
--> Provider에서 다른 값을 내려주면 다시 렌더링o
-  rovider에서 같은 값을 내려주면 다시 렌더링x
xd) setState와 비슷


이는 shouldComponentUpdate의 영향을 받지 않으므로, 조상 컴포넌트의 업데이트가 무시된 경우라 할지라도 Consumer는 업데이트될 수 있습니다.
- ex) pureComponent같은걸로 렌더링이 막혔더라도 렌더링이 잘 된다.

Object.is 알고리즘을 통해 이전 값과 새 값을 비교함으로써 value prop이 바뀌었는지를 결정합니다.


---
게시판에 적용
유저정보는 어디서든 접근가능해야 한다.

### app.js
- provider에 상태를 내려보낼 수 있다
Provider를 가지고 있는 컴포넌트에 상태를 만들어준다.


## 중첩된 컴포넌트에서 context 갱신하기

### theme-toggler-button.js
- 객체는 값이니까 객체에 상태를 바꿔주는 함수를 넣어서 내려 보내준다
- 함수의 매개변수에서 바로 분해대입 가능

setState는 비동기식으로 동작하므로 이전 상태를 함수로 넣어줘야 한다




게시판에 context 적용
로그인과 관련된 외부 세계와 연동하는 코드는 로그인 프로바이더에 넣음.
로그인 프로바이더에 넣어두고, 사용자 정보의 캐시라고도 볼 수 있다.(사용자 정보 원본은 멀리 떨어져 있는 서버에 있고, 유저정보를 가까운 로그인 프로바이더에 넣어둠)

로그인폼은 가져와서 보여주는 역할


내가 작성한 글인 경우에만 수정 버튼 보여준다.
내 ID 알아내려면, UserConsumer import

logout(){}
캐시를 사용하면, 원본과 달라질 수 있다는 문제가 발생할 수 있다.





- react가 logout함수를 호출
onClick={logout}
or 
- 함수가 실행되면 연쇄적으로 실행됨
onClick={() => logout()}
이렇게 써야 함.

- 이렇게 쓰면 동작x 잘못 쓴 거임!!
onClick={() => logout}



페이지 전환
페이지 상태, 페이지 전환 함수




- 댓글 추가, 게시물 제거는 직접 만들어보기

컴포넌트 구조 설계할 때 b가 a컴포넌트의 기능을 필요로 한다. 즉, 의존성이 있는 컴포넌트인 b가 아래에 위치해야 한다.

---


## 라이프사이클 메소드에서 context에 접근하기

```js
// export default가 붙어있지 x
class Button extends React.Component {
  componentDidMount() {
    // ThemeContext value is this.props.theme
  }

  componentDidUpdate(prevProps, prevState) {
    // Previous ThemeContext value is prevProps.theme
    // New ThemeContext value is this.props.theme
  }

  render() {
    const {theme, children} = this.props;
    return (
      <button className={theme ? 'dark' : 'light'}>
        {children}
      </button>
    );
  }
}
// 화살표 함수이지만, 함수형 컴포넌트임
export default props => (
  <ThemeContext.Consumer>
    {theme => <Button {...props} theme={theme} />}
  </ThemeContext.Consumer>
);
```


# Fragments
## 짧은 구문
<></> 는 key나 속성을 지원하지 않는다는 점을 제외하면 다른 요소와 같은 방식으로 사용할 수 있습니다.
<></> 는 Babel7 버전인 경우에 사용 가능

## Key가 있는 Fragment

# Portals
- **루트 바깥에 모달이 그려지는 게 가능하다.**

## Portals를 통한 이벤트 버블링
리액트는 자체적인 이벤트 시스템을 가지고 있다

상위 컴포넌트의 portal에서 이벤트 버블링을 캐치하면 portal에 본질적으로 의존하지않는 보다 유연한 추상화 개발을 할 수 있습니다. 

portal을 쓰든 안 쓰든 사용방법은 같다.

구상, 추상을 잘 나눠야 한다

컴포넌트 간에 서로 뭘 알고 뭘 알아야 하는지.

구상은 각자, ~~ 추상적인 부분만 알면....