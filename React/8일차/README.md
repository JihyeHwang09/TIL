# BEM(Block, Element, Module)

클래스 이름에 `_`나 `-`로 계층 구조를 나눈다.
영역이름__element이름


Modifiers
Modifier은 block 또는 element의 `상태`이다

- 어디에 밑줄, 오디에 하이픈 써야 하는지 알면 됨

- React에서 BEM을 사용할 때는 컴포넌트가 블록이기 때문에 
    - ex) PostList__title, PostList__list, PostList__item

- [classNames 사용법 - 코드, 주석보기](https://www.npmjs.com/package/classnames)

- classNames를 사용하면, 디자인을 동적으로 바꿀 수 있다

- `컴포넌트 이름__요소 이름--상태 이름`

- BEM은 사람이 의도적으로 스코프를 만들어주는 것이다

- 사람이 직접 다 해야해서 오타날 확률도 높음. 최신 방법은 x

# SCSS
(SCSS 공식 문서)[https://sass-lang.com/guide]
```css
<!-- $붙이면 변수로 사용  -->
$font-stack:    Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

- Sass 문법은 거의 사용 x. SCSS를 사용

## nesting 사용
- 다른 선택자 밑에 있는 자식을 스타일링하고 싶을 때
- 코드 작성량을 줄이고 싶을 때
- 같은 클래스 이름을 여러 번 사용하고 싶을 때

- Sass에서 &는 자기자신을 선택하고 싶을 때 사용

- &문법을 쓰면 부모에 대한 내용이 빠진다.
- &쓰지 않으면, -> 부모, 자식으로 컴파일링 됨

```css
@import 'reset';

body {  
  font: 100% Helvetica, sans-serif;
  background-color: #efefef;
}
```
## Import
- @import하면 통신하느라 속도가 느려질 수 있음
- 여러 파일에 공유해야 하는 스타일을 common.scss에 저장해두고 index.scss에서 @import해서 사용
    - cf) scss에서는 `//` 주석 사용 가능(css에서는  `//` 주석 사용 x)

## Mixins
공유하고 싶은 코드 뭉치를 묶어서 @mixin 사용
- 함수와 비슷
- 어떤 코드 뭉치를 재사용하고 싶을 때 -> mixin 사용
- 매개변수를 받지 않을 때는 소괄호 () 생략 가능
---
- cf) BEM은 클래스 이름으로 요소의 역할과 책임을 명확히 나타내고(클래스 이름을 더럽히지 말자.)
    -  공유되어야 하는 스타일은  mixin으로 사용한다.
---
미디어 쿼리 나타낼 때 사용
@include{}로 둘러싼 부분이 @content자리에 들어감.  
@content는 코드가 들어갈 빈칸

cf) 모바일 버전 먼저 만들기

## Operators
- cf) calc() - 간단한 계산 지원. 


- 특정 컴포넌트와 관련된 파일은 따로 만든다.(index.scss에 스타일 코드를 다 몰아넣는 게 x)

- ex) PostList.scss
---
1. 
- 1) scss로 BEM사용 
- 2) 컴포넌트 파일과 같은 이름의 scss파일을 만들기
- 3) 공유되어야 하는 변수나 mixin은 common.scss에 몰아넣어두고 사용
---

2. Create React App 2.0에 추가된 속성

## Adding a CSS Modules Stylesheet
[](https://facebook.github.io/create-react-app/docs/adding-a-css-modules-stylesheet)
- 가장 대중적으로 사용되는 방식
- 되도록 이 방법을 사용하는 것을 추천
- 손이 훨씬 편해짐
- css 모듈을 사용할 때는 Camel Case로 코딩.(-을 사용하면, []표기법을 사용해야한다.)-> Camel Case로 코딩하면, 점표기법 사용 가능
- 'styles' 자리에는 's'로 쓰면 편하다 
- 유일하고 식별 가능한 클래스 이름을 **자동**으로 붙여줌

import React, { Component } from 'react';
import styles from './Button.module.css'; // Import css modules stylesheet as styles
import './another-stylesheet.css'; // Import regular stylesheet

class Button extends Component {
  render() {
    // reference as a js object
    return <button className={styles.error}>Error Button</button>;
  }
}
- styles는 객체. 이 styles 객체 안에 속성 이름과 속성값이 들어간다. 
- 클래스 이름이 변환되서 사용자에게 전달됨
- css파일이 변환되면서 객체가 생기고, 속성이름: 내가 쓴 클래스 이름, 속성값: 변환된 클래스 이름
 <button className={styles.error}>Error Button</button>;
 className에 변환된 클래스 이름이 들어간다
 -> 이름 충돌에 대힌 걱정을 할 필요 x


cf) 식별자로 쓸 수 없는 속성의 경우, 대괄호 표기법 사용 (교재- 점 표기법, 대괄호 표기법 )

- 페이지 컴포넌트

---
# 프레임 워크
## Bootstrap


## Semantic UI React
- 컴포넌트가 미리 만들어져 있음
- 컴포넌트를 import해서 사용

<!-- - index.js에 작성하는게 원칙 -->


# storybook
- 통신하는 코드가 있으면, 부작용이 있는 컴포넌트임
- 부작용이 있는 컴포넌트는 테스트하기 어렵다
- 역할과 책임을 잘게 쪼개서 컴포넌트를 나누기(관례임)
- 화면을 그리는 컴포넌트, 외부 세계와 통신하는(부작용이 있는) 컴포넌트로 나누기(서로 다른 컴포넌트로 나누기)



---
## Presentational 컴포넌트
(데이터가 아닌) UI 상태를 관리하기 위해 state를 갖는 경우가 있습니다.
ex) 마우스의 좌표
- Presentational 컴포넌트는 외부 코드에 의존하지 않게 하는 게 좋다




```js
React.createContext({
  username: 'fast',
  id: 0,
  login: () => {},
  logout: () => {}
})
provider가 없을 때, {}안의 값이 default값으로 사용됨
```