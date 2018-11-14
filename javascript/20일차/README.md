# 모듈
---
- 역사
DOM Tree

라이브러리
require.js
모듈 번들러
Browserify

CommonJS
- require()함수를 이용해서 모듈을 이용
- Node.js 모듈

UMD
- define()함수를 이용해서 모듈을 이용

- 많은 모듈 시스템이 있었다. 기존의 자바스크립트 함수를 사용하는 모듈 시스템들이 사용되었다.

- **예전 모듈 시스템은 자바스크립트 함수를 사용했지만,지금의 모듈 시스템은 새롭게 추가된 문법을 사용한다.**
---
```js
<script type="module" src="index.mjs"></script>
```
- 위의 예시처럼 사용할 수는 있지만, ES2015모듈을 사용하지 않는 사용자가 있기 때문에 모듈 번들러를 통해 변환과정을 거친 뒤, 브라우저에는 일반적인 JavaScript 파일로서 불러오는 방법이 널리 사용되고 있는 추세이다.

## 모듈이란?
- 특수한 방식(...???? or 코드 변환 방식)을 이용해야 하는 방식을 모듈이라고 한다.
---
- import 혹은 export 구문을 사용할 수 있습니다.
- 별다른 처리를 해주지 않아도 `엄격 모드(strict mode)`로 동작합니다.
- 모듈의 가장 바깥쪽에서 선언된 이름은 전역 스코프가 아니라 **모듈 스코프**에서 선언됩니다.
---

## 모듈 스코프
- 모듈 스코프에서 선언된 이름은 모듈 안에서만 사용할 수 있다. (전역 스코프가 아니라)
-  모듈 스코프에 선언된 이름은 (export 해주지 않는다면) 해당 모듈 내부에서만 접근할 수 있다.

- cf) 전역 변수는 편하긴 한데, 오염될 가능성이 높다. ex) 강남역 한복판의 사물함

- -> 따라서 여러 모듈의 가장 바깥쪽에서 같은 이름으로 변수, 함수, 클래스를 선언하더라도, 서로 다른 스코프에서 선언되기 때문에 이름의 충돌이 생길 일이 없다.


## export & import

### export의 2가지 종류
- named export
- default export

### 선언과 동시에 export 하기
- 실무에서 named export를 사용하고 싶을 때, 선언부 앞에 export를 붙여준다.
- 변수 이름을 수출하는 거지, 값을 수출하는 게 X

### default export
- 모듈마다 하나의 값을 지정해서 그 값을 export할 수 있다.
- 모듈을 대표하는 값이 이거다!라는 걸 지정해서 그 값을 다른 모듈에서 편하게 불러와서 사용할 수 있다.
- import받는 쪽에서 중괄호로 감싸주지 않고 써준다.
- import할 때, export할 때의 변수 이름과 통일할 필요 X. import 받는 쪽에서 값에 내가 쓰고 싶은 이름을 붙여서 쓰면 된다. (이유: 값을 export하는 것이기 때문에) 

- 클래스도 값이다. 
- 익명 클래스도 만들 수 있다.
```js
export default class MyComponent {
    render() {

    }
}
```
- 표현식이 와야하는 자리에 이름이 있는 클래스를 써도 되고, 익명 클래스를 써도 된다.
- class명 앞에  export 써도 되고, export default 써도 된다. 
```js
// `React`라는 이름의 default export와,
// Component, Fragment라는 일반적인 export를 동시에 가져오기
// 굳이 2줄로 나눠서 import할 필요 X
import React, { Component, Fragment } from 'react';
```

```js
// named export는 여러 개 있을 수 있다.
// defualt export는 0개 or 하나 있을 수 있다. (여러 개 있을 수 X)
export default class {

}
export const Component ="..."
export const Fragment ="..."
```

### 다른 이름으로 export & import 하기
- export 혹은 import 하는 이름의 뒤에 as를 붙여서, 다른 이름이 대신 사용되게 할 수 있습니다.
- import하는 쪽에서 같은 이름의 변수들이 넘어올 경우, 충돌을 막기 위해서 as를 사용해서 이름을 바꿔서 사용할 수 있다.

### 모듈 사용 시 주의할 점
- 어려워서 넘어가심.
- 주의할 점이 한 가지 있습니다. import 구문과 export 구문은 모듈 간 의존 관계를 나타내는 것일 뿐, 코드를 실행시키라는 명령이 아니라는 것입니다.

- 같은 모듈을 여러 다른 모듈에서 불러와도, 모듈 내부의 코드는 단 한 번만 실행된다.

- import를 한다고 해서 그 당시에 코드가 반드시 실행된다는 보장이 없다.
- 여러 파일에서 그 모듈을 불러와서 실행한다고 해서 여러 번 실행되는게 아니라,  딱 1번만 실행된다.
- import를 여러 번 했는데, 딱 한 번 실행되는 것이다.
- import명령을 한 줄 한 줄 실행하라는 의미가 아니다. 



- cf1) 폴더를 import할 경우, 그 안에 있는 index.js를 import하는 것과 같다.
import TodoList from './TodoList'
import TodoList from './TodoList/index.js 
- 위, 아래는 같게 작동함


- cf) export * from ...
- export, import를 같이 해주는 구문
- ...에 적혀있는 모든 모듈을 export해서 바로 import하겠다.

- export {name1, name2, ..., nameN} from ...;
- ...이 모듈에서 이 nam e들을 export해서 바로 import하겠다.

