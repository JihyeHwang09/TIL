# 연산자 더 알아보기
## 표현식(Expression)

- `표현식`: 코드 중에 값으로 변환될 수 있는 부분
- `평가`: 표현식을 값으로 변환하기 위해 실제로 해당 표현식을 실행시키는 절차


## 단축 평가(Short-circuit Evaluation)
- React할 때 많이 쓰인다. 기억할 것!
`&&`
- 왼쪽 피연산자가 falsy이면 이 값을 반환. 오른쪽 피연산자는 코드가 실행조차 안된다. 
- 왼쪽 피연산자가 falsy가 아니면, 오른쪽 피연산자를 평가한 후 이 값을 반환


`||`
- 왼쪽 피연산자를 평가해서 truthy이면 이 값을 바로 반환. 
- 아니라면 오른쪽 피연산자를 평가한 결과값을 반환.
- 특히 `||` 연산자는 '기본 매개변수' 문법이 생기기 전까지 매개변수의 기본값을 지정하는 용도로 많이 사용됐다.
```js
function func1(arg = 'hello') {
  console.log(arg);
  // arg가 undefined일 때만 'hello'를 출력
}


function func2(arg) {
  arg = arg || 'hello';
  // 매개변수 자리에 아무것도 안들어오면 undefined-> arg가 falsy이므로 오른쪽 피연산자를 평가하게 됨. 
  // arg가 falsy이면 'hello'를 출력
  console.log(arg);
}

function func3(arg) {
  if (arg === undefined) {
      arg = 'hello';
  }
  console.log(arg);
}
```
## 삼항 연산자 (Ternary Operator)
- 삼항 연산자 역시 평가할 필요가 없는 부분은 평가하지 않는다.
- `if...else`구문처럼 작동한다. 
```js
console.log(true ? 1 : 2); // 1
// : 오른쪽의 코드는 실행조차 안함
console.log(false ? 1 : 2); // 2
// : 왼쪽의 코드는 실행조차 안함
```

## 증가/감소 연산자 (Increment/Decrement Operator)
- 증가/감소 연산자의 결과값을 어딘가에 저장하거나 사용할 때 코드의 실행 결과가 달라진다.
```js
//  아래 코드 예제의 위에 있는 루프는 3번 실행되지만, 아래 있는 루프는 2번 밖에 실행되지 않는다.
let i = 3;
while (i--) {
  console.log('감소 연산자를 뒤에 쓰면 어떻게 될까요?');
}

let j = 3;
while (--j) {
  console.log('감소 연산자를 앞에 쓰면 어떻게 될까요?');
}
```
## 할당 연산자 (Assignment Operator)

- j -= 1과 --j는 같은 의미
- j를 1감소시킨 후에 j에 대입하므로 같은 의미이다.
- 할당 연산자에 대한 표현식의 결과값은 `왼쪽 피연산자에 실제로 할당된 값`이 된다. 

```js
let i, j, k, l, m, n;
i = j = k = l = m = n = 1;
// 이런 표현식도 쓸 수 있다. 
// =연산자는 오른쪽부터 계산된다.
```

## 연산자 우선 순위 (Operator Precedence)
## 연산자 결합 순서 (Operator Associativity)
- 부등호를 연달아 2개 쓸 수 없다. 
```js
// 위아래 식은 완전히 같은 방식으로 동작합니다.
// 결과적으로 `true > 1`이 되어 결과값이 `false`가 됩니다.
3 > 2 > 1;
(3 > 2) > 1;
true > 1; // false

// 세 개의 수에 대한 비교를 하고 싶다면 아래와 같이 해야 합니다.
3 > 2 && 2 > 1; // true
```

```js
// 삼항 연산자 예제 코드 
const num = 4
const str = num === 1 ? (
  'one'
) : num === 2 ? (
  'two'
) : num === 3 ? (
  'three'
) : '?'
console.log(str)
```

- 삼항연산자를 너무 여러 개 이어서 쓰면 한 눈에 알아보기 어렵다.
- `if...else`처럼 작동하게 하고 싶은데 꼭 표현식이어야 한다면 삼항연산자를 사용해야 한다. 
- `거듭제곱 연산자`, `할당 연산자`는 오른쪽부터 실행된다.
- `삼항연산자`는 괄호는 오른쪽부터 쳐지는데, 실행은 왼쪽부터 작동한다.
```js
// 위아래 식은 완전히 같은 방식으로 동작합니다.
a ? b : c ? d : e ? f : g
a ? b : (c ? d : (e ? f : g))
```
## 값을 비교하는 여러 가지 방법
- `==`연산자는 두 피연산자의 타입이 다를 때는 타입을 변환한 후 비교한다.
- null check할 때만 `==`연산자를 사용하자. 

### 엄격한 동일성(Strict Equality)
- `===`, `!==` 연산자는 두 피연산자의 타입이 다른 경우에는 무조건 `false`를 반환한다.
- `NaN`은 `===`로 비교하면 자기 자신에 대해서도 같지 않다고 `false`가 반환된다. `NaN`인지 아닌지 검사할 때는 `Number.isNaN`을 사용해야 한다.
```js
// `===` 연산에서, `NaN`은 number 타입의 **모든** 값과 다릅니다. 이는 자기 자신에 대해서도 마찬가지입니다.
NaN === NaN; // false

// `0`과 `-0`은 서로 다른 값이지만, `===` 연산은 이 둘을 같은 것으로 취급합니다.
0 === -0; // true
```
### Object.is
- 두 인수가 정말로 같은 값인지를 검사
- 아래의 두 예외를 제외하고는 === 연산자와 같은 방식으로 동작
```js
Object.is(NaN, NaN); // true
Object.is(0, -0); // false
```

### 무엇을 써야 하나요?
- 특별한 경우를 제외하고는 `===` 혹은 `!==`연산자를 사용해서 비교를 하면 된다.

## Spread Syntax
- 배열을 이어붙이거나 복사할 때 사용한다.
- 배열이 들어가는 게 아니라 배열의 요소들이 펼쳐져서 들어간다.
- Spread 문법을 통해 배열 리터럴의 중간에 다른 배열을 이어붙일 수 있다. 이 때, arr1 안에 있는 요소들이 arr2 안으로 복사된다.
- 배열을 복사할 때는 Spread Sytax보다는 slice메소드가 더 자주 사용된다.
- Spread Syntax도 slice메소드와 마찬가지로 `얕은 복사`를 한다. 
```js
const arr1 = [3, 4];
const arr2 = [1, 2, ...arr1, 5]; // [1, 2, 3, 4, 5]

// 이전에는 같은 작업을 하기 위해 `Array.prototype.concat` 메소드를 사용했습니다.
[1, 2].concat(arr1).concat([5]) // [1, 2, 3, 4, 5]
```
- Spread문법은  함수 호출 시에도 사용할 수 있다.
- 이 때 배열의 모든 요소를 함수의 인수로 넘긴다.
- Spread 문법은 **배열을 펼쳐서 요소들을 넣고 싶을 때, 함수의 인수로 배열을 넘기고 싶을 때** 사용한다.
```js
const arr = [1, 2, 3, 4, 5];

// 배열 앞에 ...붙이는 건 ES2018에 추가된 문법. 어떤 브라우저에서는 동작하지 않을 수 있으므로 꼭 변환한 코드로 적용해야 한다. 
// 아래 코드는 `Math.max(1, 2, 3, 4, 5)`와 동일합니다.
Math.max(...arr); // 5

// 이전에는 같은 작업을 하기 위해 `Function.prototype.apply` 메소드를 사용했습니다.
Math.max.apply(null, arr); // 5
```

### 객체
```js
//Object Spread 예제 코드
const obj1 = {prop: 1};
const obj2 = {...obj1};
```
```js
const obj1 = {prop: 1, a: 2, b: 3};
const obj2 = {a: 3, b: 4}
const obj = {
  a: 7,
  b: 8,
  ...obj1,
  ...obj2,
  c: 4,
  d: 5
};


console.log(obj)
```

```js
// array spread flatten 코드
const arr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]

function flatten(arr) {
  return arr.reduce((acc, item) => [...acc, ...item], [])
  // return arr.reduce((acc, item) => acc.concat(item), [])
}

flatten(arr)
```

## 분해대입. 비구조할당 (Destructuring Assignment)
###  배열의 분해대입
-  배열 순서 섞을 때, [x, y] = [y, x]를 이용해 보기

### 객체의 분해대입
- 수의 선언과 동시에 객체의 속성을 해당 변수에 대입할 수 있다.
```js
const {a: prop1, b: prop2} = {a: 1, b: 2};

console.log(prop1, prop2); // 1 2
```

- 속성 이름과 변수 이름이 같다면 변수 이름을 생략할 수 있다.
```js
// 위의 예제보다 이 예제처럼 변수 이름을 생략하는 경우가 훨씬 압도적으로 더 많이 사용된다. 
const {a, b} = {a: 1, b: 2};

console.log(a, b); // 1 2
```
```js
let a, b;
// 자바스크립트에서는 문장이 여는 중괄호(`{`)로 시작되면 이는 '블록'으로 간주되므로, {a, b}가 블록이라고 간주되서 에러가 난다.
{a, b} = {a: 1, b: 2}; //SyntaxError: Unexpected token 

// 아래와 같이 분해대입을 할 때는 식 전체를 괄호()로 둘러싸주어야 합니다.
//()가 문장의 첫 글자이면 아~ {} 블록이랑 다른거구나~ 라고 자바스크립트가 인식한다. 
({a, b} = {a: 1, b: 2});

console.log(a, b); // 1 2
```
- 화살표에서 중괄호{}가 등장하면, 객체라고 인식하는게 아니라 '구문이구나.표현식이구나' 라고 인식하므로 객체를 반환하고 싶으면 괄호()로 감싸줘야 한다.
- 화살표 함수에서 객체를 바로 반환하고 싶은 경우, 괄호로 객체를 둘러싸주어야 한다.
```js
const returnObj = (x, y) => {x, y}
// 표현식의 결과는 y. 아무 리턴도 하고 있지 않음. 
const returnObj = (x, y) => ({x, y});
console.log(returnObj(1, 2));
```

- 객체가 중첩되어 있으면, 해당 객체에 대해서 분해대입을 할 수 있다.

### 객체의 나머지 속성
- 분해대입 시 무시된 속성들을 가지고 새로운 객체를 만들고 싶다면, `...`을 붙여주면 된다.
```js
const {a, b, ...rest} = {a: 1, b: 2, c: 3, d: 4};

console.log(rest); // { c: 3, d: 4 }
```

### 분해대입의 기본값
- 분해대입 시, 만약 좌측 변수의 위치에 해당하는 값이 우측의 배열 혹은 객체에 존재하지 않으면 거기에는 대입이 일어나지 않는다. undefined가 나온다.

- 좌측 변수에 기본으로 대입될 값으로 미리 지정해둘 수 있다.

```js
// 많이 사용되는 기능임
// `c` 위치에는 대입될 값이 없으므로, 기본값인 `3`이 대신 사용됩니다.
let [a, b, c = 3] = [1, 2];

console.log(c); // 3
```
### 매개변수에서의 분해대입
- 함수의 매개변수에서 분해대입을 할 수 있다.
```js
function func({prop, array: [item1, item2, item3 = 4]}) {
  console.log(prop);
  console.log(item1);
  console.log(item2);
  console.log(item3);
}

// 1, 2, 3, 4가 차례대로 출력됩니다.
func({prop: 1, array: [2, 3]});
```
- **분해 대입은 요즘 덧셈만큼 많이 쓰인다. 특히, 할당할 때 많이 쓰이므로 잘 익혀두어야 한다.**
```js
// 매개변수에서 객체를 분해대입하는 코드가 많이 쓰이고 있다.

function func1(name, age, address, country) {

}
// 특정 매개변수의 역할을 바로 알아보기 어렵다.
// 함수를 사용할 때마다 매개변수의 이름과 순서를 기억해야 한다는 불편함이 있다.  
// 순서를 바꿔서 쓰면 문제가 생긴다.
func(31, '김승하', '관악구', '대한민국');
func('김승하', 31, '관악구', '대한민국')


function func2({name, age, address, country}) {

}

func2({
  // 직관적으로 알아보기 쉽고, 순서를 바꿔도 이상없이 잘 동작한다. 
  name: '김승하',
  age: 31,
  address: '관악구',
  country: '대한민국'
})
```



# FDS 브라우저 측 JavaScript
## DOM API
- 실무에서는 DOM API를 직접 쓸 일은 거의 없음.
- React가 DOM API를 기반으로 되어 있기 떄문에 이해가 필요함. React를 벗어나는 수준의 고급 웹 개발에도 필요하기 때문에 DOM API를 공부할 필요가 있다.

- `DOM API`- 문서를 조작하는 API. 브라우저가 내장하고 있는 수많은 WEB API들 중에 하나(통신을 위한 API, 모바일 화면이 가로인지 세로인지 등을 인식하는 API 등이 있음)
- 메모리에 올라간 html파일을 편집하고 있는거니까 하드디스크에 저장되어있는 html문서 내용이 바뀌는 건 X.

## 요소 선택하기
- `document.querySelector(selector)` - CSS 선택자를 통해 **단일 요소** 가져오기
    - 이 selector와 일치하는 가장 첫번째 요소 하나를 가져온다.
- el은 요소 객체
- `document.querySelectorAll(selector)` - CSS 선택자를 통해 **여러 요소** 가져오기
  - 못 찾은 경우 `null` 반환
- `el.querySelector(selector)`- CSS 선택자를 통해 **단일 자식 요소**를 가져오기
- `el.closest(selector)`- 엘리먼트의 조상 중에 CSS 선택자와 일치하는 **가장 가까운 조상 요소** 가져오기 
- `el.matches(selector)`- 해당 요소가 CSS 선택자와 일치하는지 검사하기


## 요소 내용 조작하기
-  내용을 읽어오거나 변경하는 방법 2가지

- `el.textContent`: 요소 본문을 가져오거나 변경할 때 사용하는 속성 (텍스트).태그를 제외하고 텍스트 내용만 넣거나 반환
- `el.innerHTML` - 요소 본문을 가져오거나 변경할 때 사용하는 속성 (HTML). 태그를 포함해서 html으로써 넣거나 반환 

- 대부분은 `textContent`를 사용한다.
- 특히, 사용자로부터 입력받은 텍스트를 `innerHTML`에 대입해서는 **절대로 안된다.** `textContent`를 사용하자. 

- 악의적인 사용자가 자바스크립트로 해킹하는 코드를 게시물로 올렸을 때, 사용자로부터 입력받은 텍스트를  `innerHTML`에 대입하도록 하면 해킹하는 데에 이용될 수 있다. 

[요소 선택하기 & 조작하기 실습 코드(Counter 실습)](https://codepen.io/jihyehwang09/pen/Regzmj)


## 요소 어트리뷰트 조작하기
- `el.hasAttribute(attrName)`- 어트리뷰트가 있는지 검사하기
- `el.getAttribute(attrName)`- 어트리뷰트의 값 가져오기
- `el.setAttribute(attrName, attrValue)`- 어트리뷰트 설정하기
- `el.removeAttribute(attrName)`- 어트리뷰트 삭제하기
[리스너 붙이기, 떼기 실습 코드](https://codepen.io/jihyehwang09/pen/ePRqjB)

## 요소 클래스 조작하기
- `el.classList.add(className, ...)` - 클래스 추가
- `el.classList.remove(className, ...)`- 클래스 삭제
- `el.classList.contains(className)`- 클래스 포함 여부 검사
[클래스 추가, 제거 실습 코드(Form Scripting 실습)](https://codepen.io/jihyehwang09/pen/ePRqjB)


- boolean attribute: 붙어있으면 true, 없으면 false기능을 하는 attribute
- 클래스명이 여러 개 들어있을 때, `setAttribute`를 하면 **기존의 여러가지 클래스들이 다 지워진다**는 버그가 있다. -> `setAttribute`로 클래스 이름을 추가하는 작업은 거의 하지 않는다. ->`classList.add(className,...)`하면 쉽게 클래스 이름을 추가할 수 있다.


## 인라인 스타일 조작하기
- `el.style`- 요소의 인라인 스타일을 읽고 쓸 때 사용하는 객체.  `camelCase` 사용
  - `el.style.backgroundColor = '#000000'`- 요소의 배경색을 검은색으로 변경
  
