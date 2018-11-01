# 7일차

## let, const 변수와 블록 스코프
- `let`과 `const`는 같은 이름을 갖는 변수의 재선언을 허용하지 X. 유효범위: 블록 스코프

- 함수의 매개변수나, `var` 변수는 함수 스코프를 갖는다. 유효범위: 함수
- `var`변수를 둘러싸고 있는 함수가 없을 경우, 유효범위는 전체가 된다. 


```js
{ 
    let i = 0
console.log(i);
}

let i = 0
console.log(i, 'a');

let i = 0
console.log(i, 'b');

let i = 0
console.log(i, 'c');

```
- 비슷한 작업을 여러 번 하는데, 같은 이름의 변수가 사용될 때 ,{}로 묶어주면 같은 이름의 let 변수를 여러 번 선언해도 오류가 나지 않도록 해준다. (유효범위가 블록 스코프이므로)

### var 변수와 함수 스코프
- var 변수는 변수의 `선언부`를 맨 위로 끌어올린다.
- `대입부`는 그 자리에 그대로. -> 이 과정을 `호이스팅`이라고 한다.

```js
function print() {
    console.log(foo);
    var foo = 1;

}
```
```js
// 호이스팅
function print() {
    var foo;
    console.log(foo); // 대입하기 전에 변수의 값을 읽으면, undefined가 반환됨. 
    foo = 1;
}
```



- `var` 변수는 함수 스코프를 갖기 때문에 함수가 아닌 블록에서 정의된 var변수가 해당 블록 바깥에서도 유효할 수 있다.
- `var`변수를 사용하면, `중첩된 `for`루프와 같이 블록이 중첩된 코드에서 의도치 않은 동작을 할 수 있다.
```js
var i;
for (var i = 0; i < 3; i++) {
  console.log('outer');
  // 위아래 두 `i` 변수는 같은 함수 스코프에서 정의된 같은 변수입니다.
  // 바깥쪽 루프를 한 번 도는 동안, 안쪽 루프를 도느라 이미 `i`의 값이 3이 되어버렸습니다.
  for (var i = 0; i < 3; i++) {
    console.log('inner');
  }
}
// let은 유효범위가 블록스코프이기 때문에 for이 중첩되어 있을 때 변수 이름을 똑같은 i로 써도 의도대로 잘 작동한다.
```

## 전역 변수 (Global Variable)
- 전역 변수라는 용어는 쓰이고, 요즘은 지역 변수라는 용어는 쓰이지 않는다.
- 전역 스코프는 스코프 체인의 가장 바깥쪽에 있는 스코프
- 전역 스코프에 선언된 변수를 `전역 변수(global variable)`라고 한다.


- 변수를 전역 스코프에서 선언하지 않고, **한 번도 선언되지 않은 이름으로 안쪽 스코프에서 `let`, `const`, `var`를 붙여주지 않고 변수를 선언하면, 전역 스코프에 변수가 만들어진다.** 
        - 변수를 선언할 때, let이나 const를 꼭 써주자.

- **전역 변수에 의존해서 프로그래밍을 하는 것은 굉장히 금기시되는 일이다.**
        - 값을 공유해야 할 일이 생긴다면, 다른 방식으로 값을 공유하자.



## 전역 객체 (Global Object)
- `var`변수로 전역 변수를 만들었을 때, 전역 객체의 속성이 되어 전역 객체를 통해서 접근할 수 있게 된다.
- `let`, `const`변수는 전역 객체의 속성이 되지 않는다.

## 참조 (Reference)
- 객체가 컴퓨터 메모리 상에서 어디에 저장되었는지를 가리키는 값
- 화살표를 생각하면 됨. 사실 변수에 저장되는 건 객체 그 자체가 아니라 참조(화살표)다.



- 원시 타입(primitive type)
- 참조 타입(reference type)



### 함수 호출
- 값이 전달되는 것이지, 변수가 전달되는 것이 X.
- 함수를 호출하면, 변수 안에 값은 그대로 있고, 그 값이 복사되어 인수로 넘긴다.
- 원시 타입을 인수로 넘길 때는 원본을 변경할 수 없지만, 참조 타입으로 인수로 넘길 때는 원본을 변경할 수 있다. 
```js
const obj = {};

function addProp(o) {
  o.prop = 1;
}

// 변수 `obj`에 저장되어 있는 참조가 매개변수 `o`에 복사됩니다.
addProp(obj);

console.log(obj.prop); // 1
```

### 객체의 같음 (Equality)
- `===`로 비교를 하면, 
- 같은 객체를 가리키고 있으면 `true`, 다른 객체를 가리키고 있지 않으면 -> `false`를 반환

- 내가 지금 객체의 내용이 다른지, 아닌지를 판별하고 싶은지 or 두 참조가 정말로 같은 객체를 가리키고 있는지를 알고 싶은지를 구분해야 한다.

```js
var equal = require('fast-deep-equal');
console.log(equal({foo: 'bar'}, {foo: 'bar'})); // true
```
- 객체를 내용을 통해서 비교하고 싶을 때
    1. 깊은 비교기능을 지원하는 라이브러리를 이용
        - node.js에 require라는 함수가 들어있다.
    2. 정확히 어떤 내용을 비교하고 싶은지를 가지고 **함수 혹은 메소드**를 작성 -> 그것을 이용


## 불변성 (Immutability)
- 원시 타입의 특징
    - Object타입(ex) 객체, 배열, 함수)가 아닌 원시타입(ex) boolean, null, number, string 등)은 원본의 값 자체를 변경할 수 있는 방법은 **없다.**
    - ex) 문자열을 변형하는 메소드는 **모두 기존 문자열의 내용을 바꾸는 게 아니라 새 문자열을 반환한다.**
    - -> **원시타입의 값을 바꾸려면, 오직 변수에 다른 값을 재대입하는 방법 밖에 없다.**
- 객체는 **가변(mutable)**이다.
- 객체는 가변이지만 일부러 불변으로 만들어주고 사용할 때도 있다.
- 어떤 값이 가변이면 그 값이 변경되지 않았을까? 걱정하면서 프로그래밍 할 수 있는데, 이럴 경우를 대비하기 위해 객체를 불변으로 만들기도 한다.


- ex1) `Object.freeze`를 사용해서 객체를 얼려서 속성의 추가/변경/삭제를 막는다. But 사용하기 조금 불편하다. `Object.freeze`를 호출한다고 해서 객체 안에 있는 객체까지 얼리는 것은 아니기 떄문이다. 중첩된 객체는 `Object.freeze`를 사용하기가 조금 까다롭다.
```js
const obj = {
    prop: 1,

};

Object.freeze(obj);

// 모두 무시됩니다.
obj.prop = 2;
obj.newProp = 3;
delete obj.prop;

console.log(obj); // { prop: 1 }
```
- ex2) **Immutable.js**같은 라이브러리를 사용
    - `Object.freeze`처럼 객체를 정말로 얼려버리지는 않음.
    - 이 객체들은 메소드를 통해 내용이 조금이라도 달라지면 아예 새로운 객체를 반환
    - 내용이 달라지면 참조 역시 달라지게 된다. 

```js
import {List} from 'immutable';

// Immutable.js에서 제공하는 `List`는 배열과 유사하지만, 불변인 것처럼 다룰 수 있는 자료구조입니다.
const list = List.of(1, 2, 3);
const newList = list.push(4); // 새 List 인스턴스를 반환합니다.

// 내용이 달라지면, 참조도 달라집니다.
list === newList; // false
```


* const와 불변성을 잘 구분해야 한다. 
- `const`는 재대입을 막는 것이지, 원본이 변경되지 않는다는 걸 보장해주는 게 X.
- 불변성은 값 자체가 변하지 않는 것을 의미한다. 



## 래퍼 객체 (Wrapper Object)
- 원시 타입의 값에 대해 속성을 읽으려고 시도하면, 그 값을 **그 순간에만 객체로 변환되어 마치 객체인 것처럼 작동한다.**
```js
const s = 'hello';
s.toUpperCase(); // 'HELLO'
s.length; // 5

const n = 1.2345;
n.toFixed(2); // '1.23'
// 소수점 아래 2자리 소수로 바꿔줘라.

const b = true;
b.toString(); // 'true'
```

# 함수 더 알아보기
## 객체로서의 함수
- 함수는 `Function` 생성자로부터 생성되는 객체
- 다른 객체들과는 다르게 호출할 수 있다는 특징이 있다.
    - length - 함수의 매개변수의 개수를 반환합니다.
    - name - 함수의 이름을 반환합니다.

## 주인 없는 this
- 생성자나 메소드가 아닌 함수에서 `this` 키워드를 사용하면 에러는 나지 않지만,  `this`가 전역 객체를 가리키게 된다. 
```js
function Person(name) {
  this.name = name;
}

// `new`를 빠트린 채 생성자를 호출하면, `this`는 전역 객체를 가리키게 됩니다!
Person('john');

// 의도치 않게 전역 객체의 속성이 변경되었습니다.
console.log(window.name); // john
```

## 엄격 모드(Strict Mode)
```js
function Person(name) {
  // 엄격 모드를 활성화합니다.
  'use strict';

  // `undefined`의 속성을 변경하려고 하고 있기 때문에, 에러가 납니다.
  this.name = name;
}

Person('john'); // TypeError: Cannot set property 'name' of undefined
// this는 undefined의 name이라는 속성을 지정해줄 수 없다. 
```
- 항상 엄격 모드를 켜고 프로그래밍을 하는 게 좋다. 
- 실무에서는 항상 'use strict'를 써줄 필요는 없다. -> 나중에 모듈을 쓴다면 자동으로 엄격 모드가 켜지기 떄문에
- 만약, react에서 작동하지 않는데, repl.it에서는 작동할 경우 -> repl.it에서는 엄격 모드가 꺼진 채로 작동하기 때문에 '엄격모드' 떄문일 수 있다.


## this 바꿔치기

- window.name에는 빈문자열('')이 저장되어 있다.

- `call`과 `apply`는 인수를 넘겨주는 형식에 차이가 있다.
```js
function printGrade(grade) {
  console.log(`${this.name} 님의 점수는 ${grade}점입니다.`);
}

const student = {name: 'Mary'};

printGrade.call(student, 100); // Mary 님의 점수는 100점입니다.
// printGrad를 실행하되, this는 student로 하고, 첫 번째 인수를 100으로 한 채 실행하라.
printGrade.apply(student, [100]); // Mary 님의 점수는 100점입니다.
// this는 student로 하고, 배열의 첫 번째 요소가 첫 번쨰 인수가 되서 실행된다. 
```

## arguments와 나머지 매개변수 (Rest Parameters)
- 인수의 개수에 제한이 없는 함수
- `function` 구문을 통해 생성된 함수가 호출될 때, `arguments`라는 변수가 함수 내부에 자동으로 생성된다.
```js
function add() {
  // `arguments[0]`에는 `x`와 같은 값이, `arguments[1]`에는 `y`와 같은 값이 저장됩니다.
  console.log(arguments[0], arguments[1]);
  return arguments[0] + arguments[1];
}

add(1, 2); // 1 2
```
- `arguments`는 ES2015 이전까지 **인수의 개수에 제한이 없는 함수**를 정의하는 데에 사용되곤 했다.
- ES2015에서 도입된 나머지 매개변수(rest parameters) 문법을 통해서 똑같은 기능을 더 깔끔한 문법으로 구현할 수 있기 떄문에 `arguments`는 더 이상 사용되지 않는 기능이다.
- `...` 문법은 마지막 매개변수에만 사용할 수 있다.
- 자바스크립트는 매개변수의 개수와 인수의 개수가 일치하지 않아도 에러가 나지 않는다는 특징이 있다.
```js
function func() {
    console.log('haha');
}
func(1, 2, 3, 4);

const arr = [1, 2, 3, 4];

arr. reduce((acc, item, index, arr) => acc + item)

arr. map((item, index, arr) => item *  2)

function map(func) {
    func(item, index, arr);
}
// map은 함수를 인수로 받는다.
// map 입장에서 실행할 때 item, index, arr를 넘겨받지만, 
// 우리가 필요한 것만 골라서 사용할 수 있다.
// 필요없는 매개변수는 생략해서 써도 에러가 나지 않는다.
```

## 화살표 함수(Arrow Function)
- ES2015에서 도입된 새로운 유형의 함수
- 화살표 함수는 생성자로 사용될 수 없다.
- 따라서, 화살표 함수는 `prototype` 속성을 가지고 있지 X.  
- function 키워드로 만든 함수는 모두 생성자로 사용될 수 있다.
```js
function func() {
console.log('haha');

}

const obj = new func();
```
```js
const func = () => {
  console.log('haha')
}

const obj = new func()
// TypeError: func is not a constructor
```
- 화살표 함수는 스스로의 `this`를 가지지 않는다.
- 화살표 함수는 자기 `this`가 없으므로, 바로 바깥에 있는 `this`를 가져다 쓴다. 
- 화살표 함수 내부에서 `this`를 사용하면, 함수가 정의된 스코프에 있는 `this`를 가리킨다. 
- 화살표 함수 내부의 `this`는 화살표 함수가 정의된 문맥에 의해 결정되고, 그 후에는 절대 바꿀 수 없다.
```js
function Person(name) {
  this.name = name;
  this.getName = () => {
    // 여기에서 사용된 `this`는 '함수가 정의된 스코프',
    // 즉 'Person 함수 스코프'에 존재하는 `this`를 가리키게 됩니다.
    return this.name;
  }
}

const mary = new Person1('mary');
console.log(
  'mary.getName():',
  mary.getName()
)
// `this`를 바꿔보려고 해도, 아무런 효과가 없습니다.


console.log(
  "mary.getName.call({name: 'john'}):",
  mary.getName.call({name: 'john'})
);

// function 키워드를 통해 정의된 함수는 '어떻게 호출되느냐에 따라' this의 값이 결정됩니다.


function getName() {
  return this.name;
}

const john = {
  name: 'john',
  getName
};

const bob = {
  name: 'bob',
  getName
}

// .getName() 앞에 있는 john이 함수 내부의 this로 사용됩니다.
console.log('john.getName():', john.getName())

// .getName() 앞에 있는 bob이 함수 내부의 this로 사용됩니다.
console.log('bob.getName():', bob.getName())


function Person2(name) {
  this.name = name;
  this.getName = () => {
    return this.name;
  }
  this.getName2 = function () {
    return this.name;
  }
}

const kate = new Person2('kate');

// 함수를 인수로 받는 함수
function printResult(func) {
  // 아래 func는 '메소드로서 호출'되고 있지 않습니다.
  // 따라서 function 키워드를 통해 생성된 함수일 경우 문제가 생길 수 있습니다.
  console.log(func());
}

// 화살표 함수로 정의된 메소드를 다른 함수의 인수로 넘겨도 아무런 문제가 없습니다!
console.log('printResult(kate.getName)')
printResult(kate.getName);

// function 키워드 함수의 경우 this에 문제가 생깁니다. '메소드로서 호출'되고 있지 않기 때문입니다.
console.log('printResult(kate.getName2)');
printResult(kate.getName2);

// 위와 같은 경우 bind 메소드를 사용하면 됩니다만, 좋아보이지는 않습니다.
console.log('printResult(kate.getName2.bind(kate))')
printResult(kate.getName2.bind(kate));




  // 화살표 함수가 if문이나 for문 같은 스코프 안에서 정의되지 않음. -> 전역 스코프에 정의됨. -> `this`가 전역 객체를 가리키게 된다. 


// 위의 화살표 함수는 전역 스코프에서 정의되었기 때문에, `this`는 전역 객체를 가리킵니다.
// `mary`의 메소드로 사용된다고 해도, 이 사실이 변하지 않습니다.
```
-  브라우저 환경의 전역 객체인 `window`는 `name`이라는 속성에 빈 문자열을 갖고 있기 때문에, 이 값이 대신 반환됩니다.


- 객체의 속성 값에 메소드를 직접 정의할 때는 화살표 함수를 사용해서는 안 된다.
- 화살표 함수는 어떻게 호출되지는 상관 X. 어떻게 정의되었는지에 따라서 동작한다.



```js

  // 매개변수로 function keyword 함수를 넘겨주면, this의 주인이 없는채로 실행된다. 
  // 이유는 function keyword함수는 메소드를 실행하려면 `객체.`메소드();해야 하기 때문에 


// 화살표 함수로 정의된 메소드는 다른 함수의 인수로 넘겨도 아무런 문제가 없습니다!
```

## 매개변수의 기본값(Default Parameter)
- 함수 호출 시에 인수에 값을 넘겨주지 않으면, 매개변수가 `undefined`가 대입된다.

- name은 var변수처럼 재대입이 가능하다.
- 매개변수의 기본값 지정하기
```js
 // 'Mary'가 `name` 매개변수의 기본값이 됩니다.
 // 만약에 name에 값이 들어오면 그 값이 사용되지만, name에 값이 들어오지 않으면, 'Mary'가 값으로 사용된다.
function hello(name = 'Mary') {
  // 코드가 훨신 더 깔끔해졌습니다!
  console.log(`Hello, ${name}!`);
}

hello('John'); // Hello, John!
hello(); // Hello, Mary!
hello(undefined); // Hello, Mary!
```