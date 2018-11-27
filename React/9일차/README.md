# 컴포넌트 더 잘 활용하기

## 컴포넌트 명세 작성하는 법

1. defaultProps
2. propTypes
3. TypeScript(확장 언어) - 타입 오류가 있으면, 컴파일 자체가 안됨

[defaultProps](https://reactjs-org-ko.netlify.com/docs/react-component.html#defaultprops)

명시적으로 null을 넘겨줬을 때는 null을 사용
컴포넌트의 사용법 = prop사용법 설명서 적어주기
prop에 대한 설명을 주석으로 적기
-ex) //true가 주어지면, 편집 모드 스타일이 적용됨

- 모든 컴포넌트에는 defaultProps가 있어야 하고, 어떤 값을 넣었을 때 어떤 값이 나오는지 설명을 꼭 적어주기
- -> 협업하는 동료와 미래의 나를 위해
- ex) static defaultProps = {
  //true가 주어지면, 편집 모드 스타일이 적용됨
  editing: false
  }

- 컴포넌트 {}안의 가장 위에 static defaultProps로 꼭 넣어주기

- 값을 넘겨주지 않으면, 기본값으로 쓰이기 때문에 주의해야 함

propTypes -개발 중에 타입 체크를 할 수 있는 라이브러리가 있다 정도만 알면 됨(실무에서는 거의 사용되지 x)

- -> 타입스크립트 사용

```js
import PropTypes from "prop-types";

class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

Greeting.propTypes = {
  // name은 인사를 해주는 대상이 와야함
  // name에는 문자열이 와야함
  name: PropTypes.string
};
```

## storybook action

- **어떤 코드를 사용하는 쪽에서는 그 코드의 구현 세부사항을 몰라도 사용할 수 있어야 한다.**

- 서로의 `구현 세부사항`을 알지 못해도 사용할 수 있어야 한다.

## withLoading

- context가 아닌 hoc로 만들기
  loading: true -> 인디케이터 띄우기
  loading: false -> 컨텐츠 띄우기

- hoc: presentational 컴포넌트를 둘러즐 때도 사용

## 스토리북에 CSS 연결하기

# 컴포넌트 분리 실습

## page 컴포넌트

- cf) prtesentational 컴포넌트 - 작은 컨텐츠 영역
- 조그마한 영역에 로딩 인디케이터를 띄우고 싶을 때, 쉽게 나눌 수 있다는 장점이 있다

- 실무에서는 하나의 컴포넌트에 빠르게 작성을 다 한 후,
- -> prtesentational 컴포넌트, page 컴포넌트 등으로 나누는 경우가 많다

* 컴포넌트를 나눌 때는 어떤 prop을 필요로 하는지.
* 조금씩 테스트해볼 수 있는 방식이 좋은 방식이다.

* 페이지 컴포넌트에 작성을 다 한 후에, presentational 컴포넌트, page컴포넌트 이렇게 2개로 나눠도 됨(Container 컴포넌트는 생략)

* 컴포넌트 구조는 개발자마다 선호하는 구조가 다르다(정답은 x)


- `--save-dev` 개발 의존성 관련
- "devDependencies"에서만 사용할 빌드 도구



## React Helmet
- 즐겨찾기 했을 때, 입력되는 제목

---
`npx eslint --fix .`의 의미

- 노드 모듈스 안에 들어있는 파일을 실행하기 위해서.
npx eslint 
- eslint가 노드 모듈스 안에 있으면, 그걸 실행시키고 없으면 설치해라 

--fix .
현재 폴더에 있는 모든 파일을 고쳐라.
---

head의 title태그에 들어가는 텍스트
head 태그에 동적으로 넣어주고 싶을 때 -> React Helmet 사용
```js
   <Helmet>
                <meta charSet="utf-8" />
                <title>My Title</title>
                <link rel="canonical" href="http://mysite.com/example" />
   </Helmet>
```
<Helmet>으로 둘러싼 게 root가 아니라, head에 들어감