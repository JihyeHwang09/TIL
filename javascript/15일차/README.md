# 클래스
- 프로토타입은 기능을 재사용하기 위해서 사용한다.
- 클래스는 객체가 공유해서 써야 하는 기능들을 모아둔다.

## 클래스 상속 (Class Inheritance)
- 클래스 상속(class inheritance, subclassing) 기능을 통해 한 클래스의 기능을 다른 클래스에서 **재사용**할 수 있다.
```js
class Parent {
  // ...
}

class Child extends Parent {
  // ...
}
```
- 위 코드에서, `extends` 키워드를 통해 `Child` 클래스가 `Parent` 클래스를 상속했습니다. 이 관계를 보고 '부모 클래스-자식 클래스 관계' 혹은 '슈퍼 클래스(superclass)-서브 클래스(subclass) 관계'라고 말하기도 한다.

- 어떤 클래스 A가 다른 클래스 B를 상속받으면, 다음과 같은 일들이 가능해집니다.

- 자식 클래스 A를 통해 부모 클래스 B의 **정적 메소드와 정적 속성**을 사용할 수 있습니다.
- 부모 클래스 B의 **인스턴스 메소드와 인스턴스 속성**을 자식 클래스 A의 인스턴스에서 사용할 수 있습니다.
```js
class Parent {
  static staticProp = 'staticProp';
  static staticMethod() {
    return 'I\'m a static method.';
  }
  instanceProp = 'instanceProp';
  instanceMethod() {
    return 'I\'m a instance method.';
  }
}

class Child extends Parent {}

console.log(Child.staticProp); // staticProp
console.log(Child.staticMethod()); // I'm a static method.

const c = new Child();
console.log(c.instanceProp); // instanceProp
console.log(c.instanceMethod()); // I'm a instance method.
```

### super
- 앞서 봤듯이, 자식 클래스에서 부모 클래스의 정적 속성과 인스턴스 속성에 접근할 수 있었다. 하지만, 자식 클래스에 **같은 이름의 속성**을 정의한 경우 문제가 생긴다. 

```js
class Melon {
    // 인스턴스 메소드
  getColor() {
    return '제 색깔은 초록색입니다.';
  }
}

class WaterMelon extends Melon {
    // 인스턴스 메소드
  getColor() {
    return '속은 빨강색입니다.';
  }
}

const waterMelon = new WaterMelon();
waterMelon.getColor(); // 속은 빨강색입니다.
```
- `메소드 오버라이딩`: 부모 클래스의 기능을 확장해서 사용하고 싶은 경우, 일부러 부모 클래스의 메소드와 같은 이름으로 메소드를 만들어서 사용한다. 
- 이런 경우에, `super` 키워드를 통해 부모 클래스의 메소드에 직접 접근할 수 있다.
```js
class Melon {
  getColor() {
    return '제 색깔은 초록색입니다.';
  }
}

class WaterMelon extends Melon {
  getColor() {
    return super.getColor() + ' 하지만 속은 빨강색입니다.';
  }
}

const waterMelon = new WaterMelon();
waterMelon.getColor(); // 제 색깔은 초록색입니다. 하지만 속은 빨강색입니다.
```
- `super` 키워드의 동작 방식은 다음과 같다.

- 생성자 내부에서 `super`를 함수처럼 호출하면, 부모 클래스의 생성자가 호출됩니다.
- 정적 메소드 내부에서는 `super.prop`과 같이 써서 부모 클래스의 `prop` 정적 속성에 접근할 수 있습니다.
- 인스턴스 메소드 내부에서는 `super.prop`과 같이 써서 부모 클래스의 `prop` 인스턴스 속성에 접근할 수 있습니다.

```js
class Person {
  constructor({name, age}) {
    this.name = name;
    this.age = age;
  }
  introduce() {
    return `제 이름은 ${this.name}입니다.`
  }
}

class Student extends Person {
  // 분해 대입과 나머지 속성
  // grade = 3, rest에는 객체가 들어감. 그 객체에는 name: '윤아준', age: 19가 들어있음
  constructor({grade, ...rest}) {
    // 부모 클래스의 생성자를 호출할 수 있습니다.
    super(rest);
    this.grade = grade;
  }
  introduce() {
    // 부모 클래스의 `introduce` 메소드를 호출할 수 있습니다.
    return super.introduce() + ` 저는 ${this.grade}학년입니다.`;
  }
}

// this는 그때 그때 다른 걸 가리킬 수 있다. 
const p = new Person({name: '신하경', age: 20});
p.introduce();

const q =  new Person({name: '신하경', age: 20});
p.introduce();

const s = new Student({grade: 3, name: '윤아준', age: 19});
s.introduce(); // 제 이름은 윤아준입니다. 저는 3학년입니다.
```
## 클래스 상속과 프로토타입 상속
- 클래스 상속은 내부적으로 프로토타입 상속 기능을 활용하고 있다.
- 아래 코드의 클래스 상속에 대한 프로토타입 체인을 그림으로 나타내보면 다음과 같이 된다.
```js
class Person {}
class Student extends Person({}
const student = new Student();
```
![클래스 상속에 대한 프로토타입 체인](https://helloworldjavascript.net/images/class-inheritance-prototype-chain.svg)
> 이와 같이 부모 클래스의 메소드와 이름이 같은 메소드를 자식 클래스에
> 정의하는 것을 보고 `메소드 오버라이딩(method overriding)`이라고 한다.  

- 자바스크립트에서 클래스는 부모를 하나만 줄 수 있다. (다중 상속이 불가능하다.)

# 큐, 스택, 트리
- 어떤 데이터의 구체적인 구현 방식은 생략한 채, 데이터의 추상적 형태와 그 데이터를 다루는 방법만을 정해놓은 것을 가지고 ADT(Abstract Data Type) 혹은 추상 자료형이라고 한다.
-  이 챕터에서는 널리 사용되는 ADT인 큐, 스택, 트리에 대해 배운다.

## 큐 (Queue)
- 큐(Queue)는 한 줄의 파이프라고 생각하면 된다.
- 데이터를 집어넣을 수 있는 `선형(linear) 자료형`이다.
- **먼저 집어넣은 데이터가 먼저 나온다.** 이 특징을 줄여서 `FIFO(First In First Out)`라고 부른다.
- 데이터를 집어넣는 `enqueue`, 데이터를 추출하는 `dequeue` 등의 작업을 할 수 있습니다.
- JavaScript에서는 배열을 이용해서 간단하게 큐를 구현할 수 있다.
```js
class Queue {
  constructor() {
    this._arr = [];
  }
  enqueue(item) {
    this._arr.push(item);
  }
  dequeue() {
    return this._arr.shift();
  }
}

const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.dequeue(); // 1
```
- 큐는 **순서대로 처리해야 하는 작업을 임시로 저장해두는 버퍼(buffer)**로서 많이 사용된다.
- ex) 스트리밍을 할 때, 임시저장소(buffer)에서 대개 큐(Queue)가 사용된다.


## 스택(Stack)
- `스택(stack)`은 다음과 같은 성질을 갖는 자료형이다.
- 데이터를 집어넣을 수 있는 `선형(linear)` 자료형이다.
- **나중에 집어넣은 데이터가 먼저 나온다.** 이 특징을 줄여서 `LIFO(Last In First Out)`라고 부릅니다.
- 데이터를 집어넣는 `push`, 데이터를 추출하는 `pop`, 맨 나중에 집어넣은 데이터를 확인하는 `peek` 등의 작업을 할 수 있다.
- JavaScript에서는 배열을 이용해서 간단하게 스택을 구현할 수 있다.
```js
class Stack {
  constructor() {
    this._arr = [];
  }
  push(item) {
    this._arr.push(item);
  }
  pop() {
    return this._arr.pop();
  }
  peek() {
    return this._arr[this._arr.length - 1];
  }
}

const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.pop(); // 3
```
- `스택`은 서로 관계가 있는 여러 작업을 연달아 수행하면서 이전의 작업 내용을 저장해 둘 필요가 있을 때 널리 사용된다. 
- ex) `ctrl + z` 되돌리기 기능을 `스택`을 이용해서 만든다.
- import를 입력한다.
- i를 입력했다면, i를 저장했다는 사실이 스택에 저장된다.
- m를 입력했다면, m를 저장했다는 사실이 스택에 저장된다.
- p를 입력했다면, p를 저장했다는 사실이 스택에 저장된다.
- 지우는건 p부터 지운다. (스택에서는 나중에 들어온 p가 먼저 나온다. -> 먼저 지워진다. )
---
## 트리 (Tree)
- 트리(tree)는 여러 데이터가 **계층 구조** 안에서 서로 연결된 형태를 나타낼 때 사용된다.
- `부모-자식` 관계가 있는 구조를 트리라고 부른다.

# 비동기 프로그래밍
- 한 번에 촥~ 실행되는 게 아니라 시간을 나눠서 조금씩 실행되는 프로그래밍을 비동기 프로그래밍이라고 한다.
- 순서 뿐만 아니라 시간에 대해서도 생각해야 한다. 
## Motivation - 타이머 API
- 웹 브라우저에는 **함수를 특정 시간이 지난 뒤에 실행**시키거나, 혹은 **함수를 주기적으로 실행**시키는 작업을 할 수 있게 해 주는 함수가 내장되어 있다.
```js
setTimeout(() => {
  console.log('setTimeout이 실행된 지 2초가 지났습니다.');
}, 2000);

// 특정 간격마다 주기적으로 실행
setInterval(() => {
  console.log('3초마다 출력됩니다.');
}, 3000);
```
- setTimeout과 setInterval은 각각 **타이머 식별자**를 반환한다.
- 이 식별자를 가지고 실행 중인 타이머를 취소할 수 있다.
- setTimeout - clearTimeout
- setInterval - clearInterval
```js
const timeoutId = setTimeout(() => {
  console.log('setTimeout이 실행된 지 2초가 지났습니다.');
}, 2000);

const intervalId = setInterval(() => {
  console.log('3초마다 출력됩니다.');
}, 3000);

clearTimeout(timeoutId);
clearInterval(intervalId);

// 아무것도 출력되지 않습니다.
```
### 타이머 사용 시 주의할 점
- `setTimeout`과 `setInterval`은 정확한 지연시간을 보장해 주지 않는다.
```js
const start = new Date();

setTimeout(() => {
  console.log(new Date() - start);
}, 100);

// 실제 지연시간과 약간의 차이가 존재합니다.
```
- 주식 거래나 게임 같은 경우에는 자바스크립트를 사용하지 않는다. 아주 빠르게 반응하는 c언어 같은 언어를 사용해야 한다.

- 또한 **지연시간을 0으로 주었을 때**는 코드가 기대한대로 동작하지 않는다. setTimeout 호출 시 지연시간으로 0을 넘기면 어떻게 되는지 확인해보자.
```js
// 지연시간을 0으로 준다고 해서 코드가 바로 실행이 되지 않는다.
// -> 코드 실행 순서가 뒤죽박죽이 된다.
setTimeout(() => {
  console.log('hello');
}, 0);

console.log('world');

// 출력 결과:
// world
// hello
```
- 분명 지연시간을 0으로 주었는데도 코드가 뒤늦게 실행되었다.어떻게 된 일일까? 이를 이해하기 위해서는 먼저 **브라우저에서 JavaScript 코드가 실행되는 과정**을 알아야 할 필요가 있다.

## 브라우저의 JavaScript 코드 실행 과정
### 호출 스택 (Call Stack)
- 호출 스택(call stack)은 스택 형태의 저장소로, JavaScript 엔진은 **함수 호출과 관련된 정보**를 이 곳에서 관리합니다.

```js
function add(x, y) {
  return x + y;
}

function add2(x) {
  return add(x, 2); // `add`를 호출
}

function add2AndPrint(x) {
  const result = add2(x); // `add2`를 호출
  console.log(result); // `console.log`를 호출
}

add2AndPrint(3); // `add2AndPrint`를 호출
```
- 호출 스택에 저장되는 각 항목을 **실행 맥락(execution context)**이라고 부른다.실행 맥락에는 아래와 같은 정보들이 저장된다.
        - 함수 내부에서 사용되는 변수
        - 스코프 체인
        - this가 가리키는 객체
- 브라우저가 JavaScript 코드를 실행시킬 때, 호출 스택을 다음과 같이 조작한다.
        - 스크립트를 불러올 때, 전역 실행 맥락(global execution context)을 호출 스택에 추가한다. 
        - 함수가 호출되면, 해당 호출에 대한 실행 맥락을 생성해서 호출 스택에 추가(push)한다.
        - 변수에 대입이 일어나면, 호출 스택에 저장되어 있는 변수의 내용을 변경한다.
        - 함수의 실행이 끝나면, 결과값을 반환하고 호출 스택 가장 위에 있는 실행 맥락을 제거(pop)한다.
        - 스크립트의 실행이 모두 끝나면, 전역 실행 맥락을 호출 스택에서 제거(pop)한다.
-  이를 통해, 변수에 값을 대입한다거나, 함수가 여러 번 중첩되어 호출되는 등의 **복잡한 코드의 동작을 단순한 자료구조로 표현할 수 있게 된다.**

- 웹 브라우저는 **호출 스택에 실행 맥락이 존재하는 동안,** 즉 실행 중인 함수가 존재하는 동안에는 먹통이 되어 버린다. 
- 브라우저는 대개 60fps로 동작하기 때문에, 대략 16ms 안에 코드의 실행을 완료하지 못하면 브라우저의 애니메이션이 뚝뚝 끊기는 현상이 나타난다. 이는 사용자 경험에 악영향을 미칠 수 있다. 

```js
// 특정 시간동안 계속 루프를 도는 코드
function sleep(milliseconds) {
    // Data.now()는 유닉스 시간
  const start = Date.now();
  // Data.now()가 실행된 시점의 유닉스 시간(이거는 안 바뀌는 것임) 
  //- 현재 Data.now()실행한 유닉스 시간(시간이 흘렀으니까 start보다는 큰 숫자를 반환함)
  // while (10, 20, 30........ < 5000)
  while ((Date.now() - start) < milliseconds);
}

sleep(5000);
// 5초 동안 while 루프가 실행되므로, 호출 스택이 비워지지 않고 브라우저는 먹통이 됩니다.
```
- 따라서, 브라우저에서 동작하는 JavaScript 코드, 특히 사용자와의 상호작용을 위한 코드를 작성할 때에는 코드의 실행 시간이 얼마나 될지를 항상 염두에 두어야 합니다.


### 작업 큐 (Task Queue)
- 하지만 모든 작업을 16ms 안에 처리할 수는 없습니다. **어떤 사건(event)이 일어날 때까지** 기다리거나, 혹은 **큰 데이터에 대한 계산이 완료될 때까지** 기다리는 데에는 시간이 오래 걸리기 마련입니다.

- 이런 경우, 브라우저에서는 다음과 같은 절차를 통해 **오래 기다려야 하는 일**을 처리할 수 있습니다.

    - 기다려야 하는 일을 JavaScript 엔진에서 직접 처리하는 것이 아니라 API를 통해 브라우저에 위임합니다. 이 때, 일이 끝나면 실행시킬 콜백을 같이 등록합니다.
    - 위임된 일이 끝나면, 그 결과와 콜백을 작업 큐(task queue)에 추가합니다.
    - JavaScript 엔진은 호출 스택이 비워질 때마다 작업 큐에서 가장 오래된 작업을 꺼내와서 해당 작업에 대한 콜백을 실행시킵니다. 브라우저는 이 과정을 끊임없이 반복하는데, 이를 이벤트 루프(event loop)라고 부릅니다.

- JavaScript 코드를 작성할 때에는, 호출 스택과 작업 큐의 성질을 반드시 염두에 두어야 합니다.

    - 각 작업은 작업 큐에 쌓인 순서대로 실행됩니다.
    - 이미 작업 큐에 작업이 쌓여있다면, 뒤늦게 추가된 작업은 앞서 추가된 작업이 모두 실행된 다음에, 즉 호출 스택이 비워진 다음에야 실행됩니다.
    -   호출 스택이 비워지지 않는다면, 작업 큐에 쌓여있는 작업을 처리할 수 없습니다.
    - **각 작업 사이에 브라우저는 화면을 새로 그릴 수 있습니다.** 즉, 호출 스택이 비워지지 않는다면 브라우저는 화면을 새로 그릴 수 없습니다.
```js
setTimeout(() => {
  console.log('hello');
}, 0); // 작업 큐에 콜백이 추가됨

// 콜백은 () => {
//   console.log('hello');
// }, 0
// 를 의미함

console.log('world');
```
- cf) request Animation Frame: 다음 번 화면을 그릴 때, 함수를 실행시켜달라는 함수(브라우저 내장 기능)
- 작업큐에 부탁하고 넘어가는 것이라는 개념을 이해할 것

## 비동기 프로그래밍 (Asyncronous Programming)
- 이처럼 어떤 일이 완료되기를 기다리지 않고 다음 코드를 실행해 나가는 프로그래밍 방식을 일러 **비동기 프로그래밍(asynchronous programming)**이라고 합니다. 
- 반대로 어떤 일이 완료될 때까지 코드의 실행을 멈추고 기다리는 프로그래밍 방식을 **동기식 프로그래밍(synchronous programming)**이라고 부릅니다.


- 브라우저에서의 비동기 프로그래밍은 주로 **통신**과 같이 오래 걸리는 작업들을 브라우저에 위임할 때 이루어진다.


- 비동기 프로그래밍 방식은 대개 프로그램의 성능과 응답성을 높이는 데에 도움을 준다. 
- 하지만 **코드가 실제로 실행되는 순서가 뒤죽박죽이 되므로,** 코드의 가독성을 해치고 디버깅을 어렵게 만든다는 비판을 받아왔다. 
- 이런 문제를 해결하기 위해 비동기 프로그래밍을 위한 여러 기법이 생겨났고, 또 어떤 것들은 JavaScript 언어 자체에 포함되기도 했다.
- 여기에서는 근래 JavaScript 생태계에서 자주 사용되는 몇 가지 비동기 프로그래밍 기법들을 살펴 보자.
- 몇몇 예제 코드에서 사용한 Github REST API v3에는 API 사용량 제한이 있어서, 이를 초과하면 코드 실행 중에 에러가 날 수도 있다. 이 때에는 한 시간 정도 흐른 뒤에 다시 코드를 실행해보자. 


### 콜백 (Callback)
- 콜백은 다른 함수의 인수로 넘기는 함수를 말하는데, 이 콜백을 가지고 비동기 프로그래밍을 할 수 있습니다.

- 아래 예제는 유명한 JavaScript 라이브러리인 jQuery를 이용해, Github의 create-react-app 프로젝트에 등록되어 있는 이슈 목록을 가져와서 출력하는 코드이다. (여기에서 코드를 직접 실행해볼 것.)
```js
const $ = require('jquery');
const API_URL = 'https://api.github.com/repos/facebookincubator/create-react-app/issues?per_page=10';

$.ajaxSetup({
  dataType: 'json'
});

$.get(API_URL, issues => {
  console.log('최근 10개의 이슈:');
  issues
    .map(issue => issue.title)
    .forEach(title => console.log(title));
  console.log('출력이 끝났습니다.');
});

console.log('받아오는 중...');
```
- 콜백이라고 해서 항상 비동기식으로 호출되는 것은 X
- 콜백은 동기식 or 비동기식으로 호출된다.


- 예제에서 `$.get` 메소드의 두 번째 인수로 콜백을 넘겨주었습니다. `$.get` 메소드는 비동기식으로 동작하며, **Github API** 서버와 통신하는 일을 브라우저에 위임한 후 바로 종료됩니다. 통신이 끝나면, 그 결과를 첫 번째 인수로 해서 콜백을 호출하게 됩니다.

- 여기서 주의할 것이 있습니다. 콜백을 인수로 받는 함수가 항상 비동기식으로 동작하는 것은 아닙니다. 위 예제의 map, forEach의 인수로 넘겨준 것 역시 콜백이지만, 이 때에는 **콜백이 동기식으로 호출됩니다.** 즉, 콜백의 실행이 끝날때까지 코드의 실행 흐름이 다음으로 넘어가지 않습니다. 예제 코드를 직접 실행해본 후, 어떤 순서로 출력이 되었는지 살펴보세요.

- 콜백은 JavaScript가 고차함수를 잘 지원한다는 특징 때문에 가장 많이 사용되는 비동기 프로그래밍 양식이었습니다. 하지만 콜백만으로는 복잡한 비동기 데이터 흐름를 표현하기가 어려워서 많은 프로그래머들이 힘들어했고, 결국 **콜백 지옥(callback hell)**이라는 용어까지 생겨났습니다.

- 예를 들어, 아래의 흐름대로 데이터를 가져오기 위해서는 복잡한 형태로 콜백을 사용해야 합니다.

1. Github에 공개되어있는 저장소 중, 언어가 JavaScript이고 별표를 가장 많이 받은 저장소를 불러온다.
2. 위 저장소에 가장 많이 기여한 기여자 5명의 정보를 불러온다.
3. 해당 기여자들이 최근에 Github에서 별표를 한 저장소를 각각 10개씩 불러온다.
4. 불러온 저장소를 모두 모아, 개수를 센 후 저장소의 이름을 개수와 함께 출력한다.

```js
const $ = require('jquery');
const API_URL = 'https://api.github.com';
const starCount = {};

$.ajaxSetup({
  dataType: 'json'
});

// 1. Github에 공개되어있는 저장소 중, 언어가 JavaScript이고 별표를 가장 많이 받은 저장소를 불러온다.
$.get(`${API_URL}/search/repositories?q=language:javascript&sort=stars&per_page=1`, result => {
  // 2. 위 저장소에 가장 많이 기여한 기여자 5명의 정보를 불러온다.
  $.get(`${API_URL}/repos/${result.items[0].full_name}/contributors?per_page=5`, users => {
    let repoArrs = [];
    for (let user of users) {
      // 3. 해당 기여자들이 최근에 Github에서 별표를 한 저장소를 각 기여자마다 10개씩 불러온다.
      $.get(`${API_URL}/users/${user.login}/starred?per_page=10`, repos => {
        repoArrs.push(repos);
        // 4. 불러온 저장소를 모두 모아, 개수를 센 후 저장소의 이름을 개수와 함께 출력한다.
        if (repoArrs.length === 5) {
          for (let repoArr of repoArrs) {
            for (let repo of repoArr) {
              if (repo.full_name in starCount) {
                starCount[repo.full_name]++;
              } else {
                starCount[repo.full_name] = 1;
              }
            }
          }
          console.log(starCount);
        }
      });
    }
  });
});

console.log('fetching...');
```
- 위의 2, 3번 과정은 한 비동기 작업이 끝난 후 다른 비동기 작업을 시작하고 있고, 이를 위해 콜백 안에서 다시 콜백을 사용하고 있다. 또한 4번 과정을 실행하기 위해서는 앞서 3번 과정에서 실행된 10개의 비동기 작업이 모두 끝나는 시점을 알아야 할 필요가 있기 때문에, repoArrs 배열의 길이를 체크하고 있다.

- 이처럼 순수하게 콜백만 사용했을 때는, 데이터 흐름이 조금만 복잡해져도 코드가 복잡해지는 문제가 생긴다.


### Promise

- 위에서 설명한 콜백의 문제를 해결하기 위해 여러 라이브러리들이 등장했고, 그 중에서 개발자들에게 널리 선택받은 것이 바로 Promise 패턴을 사용한 라이브러리들(jQuery Deffered, Q, Bluebird)이었다. 이 라이브러리들이 표준화되어, 결국 ES2015에 이르러 JavaScript 언어 자체에 포함되게 되었다.

- Promise는 **언젠가 끝나는 작업의 결과값을 담는 통과 같은 객체**이다. Promise 객체가 만들어지는 시점에는 그 통 안에 무엇이 들어갈지 모를 수도 있다. 대신 then 메소드를 통해 콜백을 등록해서, 작업이 끝났을 때 결과값을 가지고 추가 작업을 할 수 있다.

- Promise 객체를 생성하는 가장 쉬운 방법은 Promise.resolve 정적 메소드를 사용하는 것이다.
- 10번 예제는 보면 수강생들이 헷갈려해서 안보고 넘어감

- 비동기 작업을 하는 Promise 객체는 Promise 생성자를 통해 만들 수 있다.

```js
//  자바스크립트가 resolve, reject라는 함수를 준다.
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('2초가 지났습니다.');
    resolve('hello');
  }, 2000);
});
```
- `Promise` 생성자는 콜백을 인수로 받습니다. 이 콜백의 첫 번째 인수로 `resolve` 함수가 들어오는데, 콜백 안에서 `resolve`를 호출하면 `resolve`에 인수로 준 값이 곧 Promise 객체의 궁극적인 결과값이 된다.

- 두 번째 인수로 들어오는 `reject` 함수는 비동기 작업에서 에러가 발생했을 때 호출하는 함수인데, 여기에서는 소개만 하고 넘어가고 예외 처리 챕터에서 자세히 다루도록 할 것이다.

- 위 예제에서는 `setTimeout`을 이용해 2초가 지난 뒤에 콜백이 실행되도록 했다. 즉, p 변수에 저장된 `Promise` 객체는 2초 동안은 결과값이 없는 상태가 된다. 그리고 2초가 지나면, `resolve` 함수가 호출되어 `p` 객체는 결과값을 갖는 객체가 된다.

- Promise 객체의 **결과값을 사용해 추가 작업**을 하려면 `then` 메소드를 호출해야 한다. then 메소드에 콜백을 넘겨서, 첫 번째 인수로 들어온 결과값을 가지고 추가 작업을 할 수 있다.

```js
p.then(msg => {
  console.log(msg); // hello
});
```
- 금요일부터! Promise를 써서 통신할 것임!

-------------------------------------

# 모던 웹 서비스의 구성요소
- 모던 웹 서비스의 구성요소에서 배우는 것들은 통신할 때 중요한 것들이기 때문에 반드시 알아야 함!!! 실무에서 잘 써야 함!


## Cookie
### 쿠키의 필요성
- 개별 클라이언트의 여러 요청에 걸친 정보의 유지
    - 장바구니
    - 로그인/로그아웃
    - 방문 기록
...

### HTTP Cookie
- **서버가 응답을 통해 웹 브라우저에 저장하는** 이름+값 형태의 정보
- 웹 브라우저는 쿠키를 저장하기 위한 **저장소**를 가지고 있음
- 저장소는 ***자료의 유효기간**과 **접근 권한**에 대한 **다양한 옵션**을 제공

### 쿠키 전송 절차
1. `서버`는 브라우저에 저장하고 싶은 **정보를 응답과 같이 실어 보낸다** (Set-Cookie 헤더)
```
HTTP/1.1 200 OK
Set-Cookie: cookieName=cookieValue; Secure; Max-Age=60000
...
```
브라우저는 **같은 서버에 요청이 일어날 때마다** 해당 **정보를 요청에 같이 실어서** 서버에 보낸다 (Cookie 헤더)
```
GET / HTTP/1.1
Cookie: cookieName=cookieValue; anotherName=anotherValue
...
```

### Set-Cookie Options(쿠키를 저장하는 서버에서)
- Expires, Max-Age: 쿠키의 지속 시간 설정(ex) 10분간만 로그인이 유지되는 사이트)
- Secure: HTTPS를 통해서만 쿠키가 전송되도록 설정
- HttpOnly: 자바스크립트에서 쿠키를 읽지 못하도록 설정
    - 자바스크립트를 통해서 Cookie를 건드리지 않는 것이 좋다. 
    - ex) 게시판을 만들었을 때, 쿠키를 읽어와서 해커에게 전송할 수도 있다.
    - -> HttpOnly 속성을 사용해서 자바스크립트에서 쿠키를 읽지 못하게 만드는 게 좋다. 
- Domain, Path: 쿠키의 scope 설정 (쿠키가 전송되는 URL을 제한)


#### Express + Cookie
- 이 내용은 강사님이 그냥 넘어가심(내용을 읽지 않고 넘어가심)
- Express에도 Cookie 기능이 내장되어 있다.
- 쿠키 읽기 - req.cookies: 요청에 실려온 쿠키가 객체로 변환되어 req.cookies에 저장됨 (cookie-parser 미들웨어 필요)
- 쿠키 쓰기 - res.cookie(name, value): 쿠키의 생성 혹은 수정

- [쿠키 예제](https://glitch.com/edit/#!/wiry-reward?path=server.js:63:27)


#### JavaScript + Cookie
- **자바스크립트로도 쿠키를 읽고 쓰는 방법이 존재**하지만, 보안 상 문제를 일으킬 수 있으므로 이런 접근 방식은 거의 사용되지 않는다.

- 자바스크립트에서 쿠키에 접근하지 못하도록 **HttpOnly를 항상 설정하는 것이 best practice**

#### 쿠키의 한계점
- US-ASCII 밖에 저장하지 못함. **보통 percent encoding을 사용**
- 4000 바이트 내외(영문 4000자, percent encoding 된 한글 444자 가량)밖에 저장하지 못함
- 브라우저에 저장됨. 
- -> 즉, **여러 브라우저에 걸쳐 공유되어야 하는 정보**, 혹은 **웹 브라우저가 아닌 클라이언트(모바일 앱)**에 저장되어야 하는 정보를 다루기에는 부적절하다.
- ex) 보통 이 사람이 누구인지를 쿠키에 저장함. 인증 토큰을 보통 쿠키에 저장한다.

- 우리는 최종 프로젝트에서는 쿠키를 사용하지 않을 것임 
- But 회사에 입사했을 때, 로그인 정보를 유지하는 기능을 구현할 때, 쿠키를 써야 할 수도 있음

## Ajax
### HTTP methods 복습
- 자주 사용할 것: GET, POST, PUT, PATCH, DELETE
- CRUD
---
C(Create) - POST (만들 때)
R(Read) - GET(읽을 때)
U(Update) - PUT, PATCH(수정)
D(Delete) - DELETE
---

### Ajax
- **비동기적인 웹 어플리케이션**의 제작을 위한 클라이언트 측 웹 개발 기법...을 뜻하나 
- 요즈음은 의미가 변형되어 **웹 브라우저**에서 **XMLHttpRequest** 혹은 **fetch**를 이용해서 보내는 **HTTP 요청**을 통칭하기도 함
- 서버에서 필요한 부분만 받아서 브라우저의 필요한 부분만 수정한다.

- ![Ajax model](http://javascript-coder.com/wp-content/uploads/2014/11/ajax-block-diagram1.jpg)


#### Ajax의 장점
- 화면 전체를 다시 로드하지 않고도 내용을 갱신할 수 있어 더 나은 사용자 경험 제공
- 서버의 응답을 기다리는 동안에도 여전히 웹 어플리케이션을 사용 가능
- 필요한 자원만 서버에서 받아오게 되므로 트래픽이 줄어듬

#### Ajax의 단점
- 클라이언트 구현이 **굉장히** 복잡해짐
- [Ajax Library Comparison](http://i.imgur.com/ANJ9h3o.png)


### Axios
- **Promise based** HTTP client
- 브라우저와 Node.js에서 **모두 사용 가능**
- XMLHttpRequest, fetch에 비해 사용하기 편하고 기능이 더 많음(브라우저 내장 기능이라서 쓰기에는 불편함이 있음)
- 참고글: 내가 fetch API를 쓰지 못했던 이유
- [Axios + json-server 예제](https://glitch.com/edit/#!/wiry-reward?path=server.js:1:0)
```js
// GET
axios.get('/api/todos')
// 통신이 끝나면 응답 객체를 넣어서 콜백을 실행시킨다. 
  .then(res => {
    //   prettyPrint는 강사님이 미리 만들어둔 함수
    prettyPrint(res.data)
  })
  ```
```js
  // POST: 자료를 등록할 때 사용
axios.post('/api/todos', {title: "ajax 공부"})
  .then(res => {
    prettyPrint(res.data)
  })
```

- put, patch는 수정할 때 사용. (But 미묘하게 다름)

```js
// PATCH
//  보통, 수정하고 싶은 자료의 식별자를 뒤에 붙여서 주소를 만든다.
//  이런 식으로 주소를 만드는 방법은 restAPI라고 한다. 
axios.patch('/api/todos/3', {title: "axios 공부"})
  .then(res => {
    prettyPrint(res.data)
  })
```

---
GET /api/todos/?title=react
axios 요청 메소드의 두 번째 인자로 config 객체를 넘길 수 있습니다. config 객체를 통해 요청의 쿼리 스트링, 요청 헤더, 쿠키 포함 여부 등 많은 것들을 설정할 수 있다.
```js
// config 객체
axios.get('/api/todos', {
  params: { // query string
    title: 'react 공부'
  },
  headers: { // 요청 헤더
    'X-Api-Key': 'my-api-key'
  },
  timeout: 1000 // 1초 이내에 응답이 오지 않으면 에러로 간주
}).then(res => {
    prettyPrint(res.data)
  })
  ```
---
### 응답 객체
- 응답 객체를 통해 응답의 여러 정보에 접근할 수 있습니다.
```js
// config.params
axios.get('/api/todos/1')
  .then(res => {
    console.log(`status code: ${res.status}`)
    console.log('headers:')
    prettyPrint(res.headers)
    console.log('data:')
    prettyPrint(res.data)
  })
  ```

  - [쿠키를 통한 인증 예제](https://glitch.com/edit/#!/plant-property?path=server.js:1:0)
  - [axios 공식 문서](https://github.com/axios/axios)

## CORS
### Same-origin Policy(동일 출처 정책)
- 웹페이지에서 리소스를 불러올 때, 리소스의 출처가 웹페이지의 출처와 같으면 안전하다고 보고, 출처가 다르면 해당 리소스는 안전하지 않다고 보는 원칙
- 여기서 '출처'란 '프로토콜 + 도메인 + 포트번호'의 결합을 가리킴. 즉, **세 개가 다 같아야 동일 출처**라고 할 수 있고, 셋 중에 하나라도 다르면 동일 출처로 간주되지 않음
- 웹 보안의 기본 원칙으로, 웹 브라우저의 많은 요소에 적용됨

[Same-origin Policy 실습]
```js
// 크롬 개발자 도구에서 코드 넣기
> const child = window.open('http://www.fastcampus.co.kr')
// 새로 열린 웹 페이지의 콘솔에서
> window.foo = 'bar'
// 이전 웹 페이지의 콘솔에서
> child.foo
// 출처가 같다면 접근 가능, 아니면 불가

```
### Content-Security-Policy
- Content-Security-Policy 헤더를 이용하면, **동일하지 않은 출처에 대한 리소스를 불러올지 말지** 결정할 수 있음

### CORS(Cross-Origin Resource Sharing)
- **클라이언트 측 cross-origin 요청**을 **안전하게 보낼 수 있는 방법**을 정한 표준
- 쉽게 말하면, **스크립트가 전혀 다른 출처를 갖는 API 서버를 사용하려고 하는 상황**에서는 뭔가 **추가적인 처리**를 해주어야 한다는 것!

- ex1) abc.com에서 abc.com/api/todos로 요청 -> 브라우저가 막지 X.
- ex2) abc.com에서 cdf.com/api/todos로 요청 -> 브라우저가 막음. 추가적인 처리를 해주어야 요청할 수 있음.

#### Cross-origin 요청의 위험성

- 아래 상황을 가정해보자.

- **mywebsite.com**에서 서비스 중인 웹 사이트는 mywebsite.com/api 에서 REST API를 통해 필요한 정보를 얻는다. mywebsite.com/api 경로에 대한 **인증은 쿠키**로 이루어지고 있다.

- 그런데 만약 **evil.com** 웹 사이트의 스크립트에서 **mywebsite.com** API에 요청을 마음대로 보낼 수 있다면, 이미 my-website.com 도메인에 대해 브라우저에 저장된 쿠키를 이용해서 API를 마음대로 호출할 수 있을 것입니다.


#### Cross-origin 요청 예제
- IE8 이상의 모던 웹 브라우저는 **cross-origin 요청에 대해 여러가지 제한**을 두고 있음
- cross-origin 요청을 허용하려면, 서버가 특별한 형태의 응답을 전송해야 함
- 만약 서버가 cross-origin 요청을 허용하지 않으면, 웹 브라우저는 에러를 발생시킴
- [Cross-origin 요청 예제](https://glitch.com/edit/#!/bitter-chinchilla?path=README.md:1:0)

#### CORS에 관여하는 응답 헤더
- Access-Control-Allow-Origin
- Access-Control-Expose-Headers
- Access-Control-Max-Age
- Access-Control-Allow-Credentials
- Access-Control-Allow-Methods
- Access-Control-Allow-Headers


#### CORS에 관여하는 요청 헤더
- Origin
- Access-Control-Request-Method (preflighted 전용)
- Access-Control-Request-Headers (preflighted 전용)


#### CORS - Safe, Unsafe
- GET, HEAD 요청은 **safe(읽기 전용)**이기 때문에 서버에 요청이 도달한다고 해서 서버의 상태에 영향을 미칠 일은 없으므로, **웹 브라우저는 일단 해당 요청을 보내본다.** 만약 서버가 cross-origin 요청을 허용한다고 응답하면 응답을 그대로 사용하고, 그렇지 않으면 **에러를 낸다.**
- POST, PUT, PATCH, DELETE 등의 메소드는 요청이 서버에 **전송되는 것 자체가 위험**하므로, 실제 요청을 보내기 전에 서버가 cross-origin 요청을 허용하는지를 알아보기 위해 **시험적으로 요청을 한 번 보내본다.** 이 요청을 **preflighted request**라고 한다.

- (단, 기존 HTML form의 동작방식인 application/x-www-form-urlencoded 혹은 multipart/form-data 형태의 POST 요청은 preflighted request가 발생하지 않음)

- safe, unsafe 말고도 다른 원인에 의해 preflighted request가 발생하는 경우가 있는데, 자세한 사항은 MDN 문서를 참고해주세요.

#### CORS with credentials
- **cross-origin 요청에는 기본적으로 쿠키가 포함되지 않으나,** XMLHttpRequest 혹은 fetch를 통해서 요청을 보낼 때 **쿠키를 포함시키는 옵션**을 줄 수 있고 이 때 **CORS 요건이 더 엄격해짐**

- (Access-Control-Allow-Credentials 헤더 설정 필요, Access-Control-Allow-Origin 헤더에 와일드카드 허용 안됨)

#### 복잡하면 그냥...
1. 프론트엔드와 API 서버를 **같은 도메인**으로 제공한다.
2. 불가피하게 둘을 다른 도메인으로 제공해야 한다면
    - CORS를 허용한다 (cors 미들웨어를 사용하면 간단함)
    - CORS를 허용하는 경우, 쿠키를 쓸 수는 있으나 보안 상 허점이 생기기 쉽고 사용하기도 불편하므로 보통 JWT와 같은 **토큰 방식의 인증**을 사용한다.

## Access Token & JWT
### 쿠키의 단점
- **쿠키를 지원하는 클라이언트**에서밖에 사용할 수 없음
- 적절히 관리되지 않은 쿠키는 **보안에 취약**하며, 관리를 하려고 해도 **CORS 대응이 복잡함**

### Token Based Auth
- 토큰이란, **사용자의 자격증명**(아이디, 패스워드 등)을 통해 인증이 이루어진 후, **특정 자원에 대한 자격증명**으로서 **대신 사용**되는 인증 수단
- 서버에 요청을 할 때마다 **토큰을 요청에 직접 포함**시켜서 전송 (주로 Authorization 헤더에 넣어서 전송)

### Cookie vs Token
![Cookie vs Token](https://cdn.auth0.com/blog/cookies-vs-tokens/cookie-token-auth.png)

### 토큰 사용의 장점
- 쿠키를 지원하지 않는 클라이언트에서도 편하게 사용할 수 있음
- 쿠키를 사용하지 않음으로써 **CORS 관련 문제를 회피**할 수 있음

### 토큰 사용의 단점
- 매 요청에 토큰이 포함되게 되므로 **적당히 짧은 길이**를 유지해야 함
- **토큰 유출**에 대한 대비책이 필요 (토큰에 유효기간을 두거나, 유출된 토큰을 강제로 무효화하는 등의 방법을 사용) -> 백엔드 개발자가 신경써야 하는 요소임
- 쿠키와는 다르게, **클라이언트 개발자가 직접 토큰을 저장하고 관리**해야 함



### Web Storage
- 브라우저에서 키-값 쌍을 저장할 수 있는 저장소
- 쿠키에 비해 사용하기 편리하고 저장 가능한 용량도 큼(10MB 가량)
- 브라우저 탭이 닫히면 내용이 삭제되는 **sessionStorage**, 브라우저 탭이 닫혀도 내용이 유지되는 **localStroage**가 있음
- [Web Storage 실습] - 크롬 개발자 도구에서 실습함
- 우리는 앞으로 로그인 유지되는 사이트만 만들 거라서 localStorage를 사용할 것임

#### 보안 상 주의사항
- (당연히) HTTPS를 사용해야 함
- 토큰을 localStorage에 저장하게 되면 자바스크립트로 토큰을 탈취할 수 있게 되므로, **웹사이트에 악성 스크립트를 삽입하는 공격(XSS)**에 노출되지 않도록 신경써야 함


### JSON Web Token
- 최근 널리 사용되고 있는 **토큰 형식의 표준**
- 토큰 안에 **JSON 형식**으로 정보를 저장함
- 보안을 위해 서명 또는 암호화를 사용할 수 있음

[JWT 실습(jwt.io)](https://jwt.io/)

