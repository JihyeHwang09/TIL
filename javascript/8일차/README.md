# 클래스
- 클래스는 생성자의 기능을 대체한다. (세부적인 기능상의 차이는 있지만)
- 클래스 필드 전(9번 예제까지 보면 됨.)


# 함수형 프로그래밍
- 프로그래밍의 큰 흐름: 객체 지향 프로그래밍 vs 함수형 프로그래밍
- 1 ~ 11번 예제 -> 굉장히 많이 쓰이는 예제임.

## 고차 함수(Higher-order Function)
- 함수를 인수로 받는 함수, 또는 함수를 반환하는 함수를 `고차 함수(higher-order function)`라고 한다.
- 자바스크립트에서는 함수도 값이다.
- `함수를 호출할 때 함수를 넘기는 함수`나 `함수를 반환하는 함수`(ex) this를 바꿔치기 하는 메소드: bind)가 `고차 함수`에 속한다. 
- 함수를 인수로 받는 `Array`의 많은 메소드들(`forEach`, `map`, `reduce`, `filter`, `sort`, `every`, `some`, `find` 둥)은 고차 함수이다. 
- 다른 함수의 인수로 넘겨지는 함수를 `콜백(callback)`이라고 부른다. 


## 클로저(Closure) - 타이핑하면서 꼭 연습할 것! react에서 중요한 개념임.
- **자바스크립트에서 스코프는 함수 단위. 자기 자신 스코프에 없으면(자기 자신 스코프 내에서 찾는 해당 변수가 정의되어 있지 않거나 함수 등이 없으면, 상위 스코프로 올라가서 찾는다. 찾을 때까지 상위 스코프로 올라가서 찾으면 가져다가 쓴다. 없으면 global까지 올라간다.**
- 둘러싸고 있는 것. 성질. 좀비같은 것임
- 예전에는 자바스크립트에서 아주 중요한 개념이었으나 요즘은 자주 쓰이지는 않음
- 2,3 번 예제 Vs 4, 5번 예제
- 클로저의 2가지 의미
    - 바깥 스코프에 있는 변수를 가져다가 사용하는 `함수`
    - 변수가 저장되는 `저장소`
- 고차함수를 사용할 때 클로저의 성질을 이용할 수 있다. 
-  `threshould`: 임계값, 기준값

- 클로저는 데이터를 숨기고 정해진 방법을 통해서만 데이터에 접근할 수 있도록 제한을 두는 데 활용된다. 
- 다른 프로그래머가 내가 만든 값에 실수로라도 접근하거나 변경하지 못하게 하고 싶을 때 클로저를 사용한다.
```js
function personFactory(initialAge) {
  let age = initialAge;
  return {
    getOlder() {
      age++;
    },
    getAge() {
      return age;
    }
  };
}
// `age`를 직접 변경할 수 있는 방법이 없습니다!

const person = personFactory(20);
person.getAge();
// age가 비밀스런 저장공간인 클로저에 저장되었으므로  person.getAge()로 값을 가져올 수 있다.
// 밑에 코드를 추가해서 나이값을 바꿀 수는 없다. 
```

## 화살표 함수와 고차 함수
- 화살표 함수 문법을 이용하면, 적은 양의 코드만 사용해서(간단하게) 고차 함수를 만들 수 있다.

```js
const makeAdder = x => y => x + y;
// 매개변수: x, 반환값: 함수임. y => x + y 
const add2 = makeAdder(2);
add2(3); // 5
```
```js
const makeCounter = (x = 1) => () => x++;
// 매개변수: (x = 1), x의 기본값을 1로 지정
// 반환값: 함수임. () => x++
const counter = makeCounter();

console.log(counter()); // 1
console.log(counter()); // 2
```

## 재귀 함수(Recursive Function)
- 재귀 함수(recursive function): 함수 내부에서 자기 자신을 호출하는 함수
- **문제를 같은 형태의 부분 문제로 쪼갤 수 있을 때, 재귀함수를 활용할 수 있다.**
- 프론트엔드 개발자가 실무에서 자주 사용하지는 않으나, 어떤 문제는 재귀 함수로 푸는 게 편할 때가 있다.

```js
sb(5) = 1 + 2 + 3 + 4 + 5
        = sb(4) + 5
```
```js
function sumBy(n) {
  let memory = 0;
  for (let i = 1; i <= n; i++) {
    memory += i;
  }
  return memory;
}
sumBy(5);

function sumByRec(n) {
  // Rec를 붙여주는 건 -> '재귀 함수'라는 의미임.
  if (n === 1) {
    return 1;
  } else {
    return sumByRec(n - 1) + n;
    // return에 오는 표현식이 다 계산이 되어서 실행이 되어야 그 다음에 결과값을 return하고 함수 호출을 종료된다. 
    // return은 함수 호출을 종료시키는 것이지, 함수 실행 자체를 종료시키는 게 X.
    // 일시중지 되어있는 함수들이 촤라락 있고 다시 되감기되면서 연산을 수행한다.
  }
}
sumByRec(5);

// 위의 코드를 삼항연산자로 
function sumByRec(n) {
  return n === 1? 1: sumByRec(n - 1) + n;
}




// 함수 안에서 함수가 호출되면, 코드의 실행 흐름이 일시정지, 재개를 반복한다. 

function add(x, y) {
  return x + y
}

function mult(x, y) {
  return x * y
}

function calc(x, y) {
  return add(x, y) + mult(x, y)
}

calc(1, 2)
```

```js
// 피보나치 수를 루프로 구현
function fibo(n) {
  // 다음 단계의 수는 이전 두 단계 수의 합
  let x = 0;
  let y = 1;
  for (let i = 0; i < n; i++) {
  // 다음 x = 원래 y
  // 다음 y = 원래 x + 원래 y   
  
  const sum = x + y;
  x = y;
  y = sum;
  }
  return x;
}

fibo(5);

// 피보나치 수를 재귀 함수로 바꿔보기
// 아이디어

// fibo(5) = fibo(3) + fibo(4);
// fibo(4) = fibo(2) + fibo(3);

// fibo(1) = 1;
// fibo(0) = 0;
function fiboRec(n) {
  if (n === 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  } else {
    return fiboRec(n - 2) + fiboRec(n - 1);
  }
}
fiboRec(7);
// 피노나치 수, 팩토리얼 등의 개념이 중요한 게 X.
// 재귀 함수를 이용해서 루프를 다시 구현할 수 있다는 걸 아는 게 중요. 
```
- 재귀 함수를 작성할 때는 `부분 문제`와 `종료 조건`(재귀 함수가 멈추는 부분)을 생각해 봐야 한다. 그 후 코드로 구현

# 객체 더 알아보기

## 객체 자신의 속성(Own Property)
- 객체 자신이 특정 속성을 가지고 있는지를 확인하기 위해 `Object.prototype.hasOwnProperty`메소드를 사용한다. 
-  `true` or `false`값을 반환


## 데이터 속성(Data Property)의 부수속성(Property Attribute)
- 내장 객체 중에 어떤 속성은 `delete` 연산자를 통해 삭제하려고 해도 삭제가 되지 않는 것이 있다.
- JavaScript에서는 **각 속성마다 동작 방식이 다를 수 있다.**


- `생성자.메소드()` -> 정적 메소드
- 객체의 부수속성을 알아보려면, `Object.getOwnPropertyDescriptor`라는 정적 메소드를 사용해 부수속성을 나타내는 객체를 얻을 수 있다. 이 객체를 `속성 기술자(property descriptor)`라고 한다.
- `데이터 속성(data property)`에 대한 속성 기술자가 갖는 속성
    - 1. `value`: 속성에 어떤 값이 저장되어 있으면 true, 아니면 false를 반환
    - 2. `writable`: 변경할 수 있으면  true, 아니면 false를 반환
    - 3. `enumerable`: 열거 가능한 속성이면 true, 아니면 false를 반환 
    - 4. `configurable`: 부수속성을 변경하거나 속성을 삭제할 수 있으면 true, 아니면 false를 반환


### 속성의 성질을 가지고 있는 객체를 가져오는 방법
- 속성 하나에 대한 속성 기술자 가져올 때
    - `Object.getOwnPropertyDescriptor`
- 속성 전체에 대한 속성(여러 속성) 기술자 가져올 때
    - `Object.getOwnPropertyDescriptors`

- 엄격 모드에서는  `writable: false`, `configurable: false`인 속성을 변경하거나 삭제하려고 하면 에러가 난다.


## 속성 기술자를 통해 객체의 속성 정의하기 
```js
const obj = {};
Object.defineProperty(obj, 'prop', {
    // Object.defineProperty(객체 이름, '속성명', {속성 정의하는 내용});
  value: 1,
  writable: false,
  enumerable: true,
  configurable: false
});
```

## 접근자 속성(Accessor Property)과 그 부수속성 
- 단위를 하나로 통일해서 저장해둔다.
- 넣고 꺼낼 때 환율 적용한다.

- 일일히 메소드를 사용하지 않고 `getter`와 `setter` 기능을 사용해서, 코드를 조금 더 깔끔하게 작성할 수 있다.
- 메소드 이름 앞에 `get`을 써주면, 이 메소드는 getter 메소드가 된다.
- 메소드 이름 앞에 `set`을 써주면, 이 메소드는 setter 메소드가 된다.
- 함수를 실행한 적도 없는데, 속성을 읽어오기만 해도 `getter`가 실행된다. 

```js


const obj = {

  // 메소드 이름 앞에 `get`을 써주면, 이 메소드는 getter 메소드가 됩니다.
  get prop() {
    console.log('getter가 호출되었습니다.');
    return this._hidden;
  },

  // 메소드 이름 앞에 `set`을 써주면, 이 메소드는 setter 메소드가 됩니다.
  set prop(arg) {
    console.log('setter가 호출되었습니다.');
    this._hidden = arg;
  }
}

// `set prop` 메소드가 `1`을 인수로 해서 호출됩니다.
// 값을 저장하려면 인수가 필요하다.
obj.prop = 1;

// `get prop` 메소드가 호출되고 해당 메소드의 반환값을 읽어옵니다.
// 저장된 값을 불러올 때는 따로 인수가 필요없다.
obj.prop; // 1



Object.getOwnPropertyDescriptors(obj);
// {
//   prop: {
//     get: [Function: get],
//     set: [Function: set],
//     enumerable: true,
//     configurable: true
//   },
//   ...
// }
```
- obj 객체 리터럴 안에서 함수 앞에 `get`과 `set` 키워드를 사용했다. 
- 이 두 함수는 각각 prop이라는 속성의 getter와 setter가 된다.
-  `getter`는 **속성을 읽어올 때**, `setter`는 **속성을 변경할 때** 호출됩니다.
- getter와 setter가 정의된 속성을 `접근자 속성(accessor property)`라고 한다.


```js
// 위 Money 생성자 예제를 접근자 속성을 통해 재작성
function Money(won) {
  this._won = won;
}

// `Object.defineProperties` 정적 메소드를 사용해서
// 속성 기술자를 통해 특정 객체의 여러 속성을 한꺼번에 정의할 수 있습니다.
Object.defineProperties(Money.prototype, {
  // `Money.prototype` 객체에 `won` 이라는 속성을 정의합니다.
  won: {
    get: function() {
      return this._won;
    },
    set: function(arg) {
      this._won = arg;
    }
  },
  // `Money.prototype` 객체에 `dollar` 라는 속성을 정의합니다.
  dollar: {
    get: function() {
      return this._won / 1086;
    },
    set: function(arg) {
      this._won = arg * 1086;
    }
  }
});

const w = new Money(1086);

w.won += 1086;
console.log(w.dollar); // 2

w.dollar += 1;
console.log(w.won); // 3258


```

## 객체의 속성 열거하기
```js
const obj = {
  a: 1,
  b: 2
};

Object.keys(obj); // ['a', 'b']
// Object.keys(객체명): 속성 이름만 다 뽑아내서 배열로 반환해준다. 
// Object.values(객체명): 속성 값만 다 뽑아내서 배열로 반환해준다. 

// Object.entries(객체명): [속성 이름, 값] 다 뽑아내서 배열로 반환해준다.
// [[속성 이름, 값], [속성 이름, 값], [속성 이름, 값]]

```
- 공부방법: 각 기능을 기억할 것!
- `Object.keys` - 객체 자신의 속성 중 열거 가능한(enumerable) 속성의 이름을 배열로 반환합니다.
- 상속받은 속성은 반환하지 X. **객체 자신의 속성**만 반환한다.

- `Object.values` - 객체 자신의 속성 중 열거 가능한(enumerable) 속성의 속성 값을 배열로 반환합니다.
- `Object.entries` - 객체 자신의 속성 중 열거 가능한(enumerable) 속성의 이름과 값을 배열로 반환합니다.
- `Object.getOwnPropertyNames` - 객체 자신의 모든 속성의 이름을 배열로 반환합니다. 열거 불가능한 속성도 포함합니다.
- `for...in` 구문 - 객체 자신의 속성 및 상속받은 속성 중 열거 가능한(enumerable) 속성의 이름을 배열로 반환합니다.
    - `for...in` 구문은 꼭 필요할 때만 사용하자.
```js
const parent = {
  d: 4,
  e: 5
}

const obj = {
  a: 1,
  c: 3
};

Object.defineProperty(obj, 'b', {
  value: 2,
  enumerable: false
})

Object.setPrototypeOf(obj, parent)

console.log(obj.b)
// obj.hasOwnProperty('b')
// '객체 자신의 속성' 중 '열거 가능한 속성'만 반환
Object.keys(obj); // ['a', 'b']

for (let name in obj) {
  console.log(name)
}
// a
// c
// d
// e
// 브라우저에 따라 순서가 다르게 나올 수 있음. 대부분의 브라우저들은 먼저 넣은 걸 먼저 꺼내서 출력해주는 경향이 있다.
// 어떤 공식 명세서에도 마치 넣은 순서대로 출력되는 것처럼 보이지만, 사실은 random으로 나온다고 생각하고 프로그래밍 해야 함. 
```
## 얕은 복사(Shallow Copy) & 깊은 복사(Deep Copy)
```js
const obj = {};
Object.assign(obj, {a: 1}, {b: 2});
// Object.assign(대상객체, 넣을 속성, 넣을 속성)
console.log(obj); // { a: 1, b: 2 }
```
- `Object.assign` 정적 메소드는 인수로 받은 객체들의 모든 열거 가능한 속성을 대상 객체에 복사한다.
- 
- 배열을 복사할 때는 slice메소드를 사용하고, 객체를 복사할 때는 `Object.assign`을 사용한다.
- 첫번째 인수에 빈 객체{}를 넣어준다.
- 사본을 바꿔도 원본에는 영향이 없다. 
- 객체의 원본을 바꾸고 싶지 않을 경우에는 객체를 복사한 후에, 그 사본으로 작업을 하면 된다.
```js
const obj = {
  a: 1,
  b: 2
};

// 빈 객체를 대상으로 `Object.assign`을 사용하면, 객체를 간단히 복제할 수 있습니다.
const obj2 = Object.assign({}, obj);
console.log(obj2); // { a: 1, b: 2 }
```

```js
const obj = {
  innerObj: {
      // innderObj에는 객체 자체가 아니라 객체에 대한 참조가 저장된다. 
    a: 1,
    b: 2
  }
};

```
- `Object.assign`, `slice메소드`는 객체가 중첩되어 있다면, 내부에 있는 객체는 복사되지 않는다. 가장 겉에 있는 한겹만 복사된다. 
- 배열 안의 배열, 객체 안의 배열, 배열 안의 객체 등등 중첩되어 있는 자료구조까지 복사하지는 못한다.
- 간편해서 많이 사용하는데, 겉껍질만 복사하기 때문에 조심해서 써야한다.
- `깊은 복사(deep copy)`를 하고 싶다면 JavaScript에 깊은 복사를 위한 기능이 내장되어 있지 않기 때문에, **Immutable.js**와 같은 관련 라이브러리를 사용하자. 

## Object.preventExtensions
- `Object.preventExtensions`: 특정 객체에 더 이상 속성을 추가하지 못하도록 막아버리는 기능
```js
const obj = {
  a: 1;
};

// Object.seal(obj); 객체에 속성이 삭제되는 것을 막는다.
Object.freeze(obj);
// Object.freeze(obj); 속성 변경까지 막는다.
function func() {
  'use strict';
  delete obj.a;
}

func(); // TypeError: Cannot add property a, object is not extensible
```
메소드	속성 추가	속성 읽기	속성 변경	속성 삭제 및 재정의
Object.preventExtensions	X	O	O	O
Object.seal	X	O	O	X
Object.freeze	X	O	X	X
