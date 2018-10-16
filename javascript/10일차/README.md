# 내장 객체 및 생성자

## JSON
- 자료구조(메모리에 올라간 객체나 배열)은 그대로 전송할 수 없다.
    - 객체나 배열은 메모리에 저장된다. 크롬, 익스플로러 등등 각 브라우저가 메모리에 저장하는 방법이 달라서 호환이 되지 않는다. (브라우저 간의 메모리 구조가 다르다.)
- 따라서 저장/전송 가능한 형태로 변환하는 절차가 필요하다. -> **직렬화(serialization)**
- 텍스트 형태의 데이터를 프로그래밍 언어에서 다시 사용할 수 있도록 변환해주는 절차를 **역직렬화(deserialization)**라고 한다.

- `JSON(JavaScript Object Notation)`은 직렬화 포맷 중에 요즘 압도적으로 사용되고 있는 형식이다.
- 직렬화 하기: `JSON.stringify`
- 역직렬화 하기: `JSON.parse`

```js
// `JSON.stringify`로 직렬화를 할 수 있다.
// stringify라는 메소드에 객체를 넘겨준 것이다.
// 객체 그대로 전송할 수 없으니 텍스트로 변환해서 전송하는 것이다.
// 이 객체를 문자열로 변환해준 것이다. 
JSON.stringify({
  key: 'value',
  arr: [1, 2, 3],
  nullProp: null,
  undefinedProp: undefined // 값이 `undefined`인 속성은 직렬화 과정에서 제외된다.
}); // '{"key":"value","arr":[1,2,3],"nullProp":null}'

// `JSON.parse`로 역직렬화를 할 수 있다. 
JSON.parse('{"key":"value","arr":[1,2,3],"nullProp":null}');

const obj = JSON.parse(text);
// => { key: 'value', arr: [ 1, 2, 3 ], nullProp: null }
    
```
- `JSON`은 `JavaScript`와 아주 유사한 언어이지, 같은 언어가 아니다. **다른 언어**이다.
- **JSON을 직접 편집해야 할 때는 JSON이 JavaScript가 아니라는 사실에 주의!!!!**
#### JSON을 편집할 때 주의할 점
- 속성 이름에 **꼭 `쌍따옴표("")`**를 둘러주어야 한다.
- 아주 단순한 객체나 배열만 표현할 수 있다.
  - 객체 리터럴로 만들어진 아주 단순한 형태의 객체만 표현할 수 있다.
- JSON 문서 안에 함수를 저장할 수 없다. 함수는 JSON으로 변환할 수 없다.
    -  `Map`, `Set`, `Date`, `Error`, `RegExp`, `Function`, `Promise`와 같이 특별한 동작방식을 가지는 객체들을 제대로 표현할 수 없다.
- `undefined`, `NaN`, `Infinity`과 같은 값을 표현할 수 없다.
- 주석을 쓸 수 없다. 

## Date
- **협정 세계시(UTC)**를 많이 사용한다.
  - 지구 상의 여러 지역에서는 **시간대(timezone)**와 **일광 절약 시간제(DST)**에 따라 서로 다른 시각을 사용한다. 
  - 조금씩 느려지는 지구 자전 속도에 맞추기 위해 UTC에는 가끔씩 **윤초(leap second)**가 추가되기도 한다.
- **유닉스 시간** - 컴퓨터에서는 시간 데이터를 편하게 다루기 위해서 유닉스 시간이라는 특별한 단위를 사용한다. 유닉스 시간은 UTC 기준 1970년 1월 1일 0시 0분 0초부터 경과한 시간을 초 단위의 정수로 나타낸다.
- 자바스크립트에도 유닉스 시간이 사용되고 있다.


### Date 객체의 생성
#### Date 생성자의 사용 방법
- `new Date()` - **현재 시각**을 나타내는 Date 객체를 반환한다.
- `new Date(value)` 
  - `new Date(정수)`- `value`가 `정수`인 경우, 이를 **밀리초 단위**의 유닉스 시간으로 간주해서 이에 해당하는 Date 객체를 반환한다. 
  - `new Date('문자')`- `value`가 `문자열`인 경우, 이 문자열이 나타내는 Date 객체를 반환한다.
- `new Date(year, month, day, hour, minutes, seconds, milliseconds)`- 년, 월, 일, 시, 분, 초, 밀리초를 **직접 입력**해서 Date 객체를 생성할 수 있다. <br> '월' 부분은 0부터 11까지의 값을 가집니다. <br> 월 이후의 인수는 생략가능하고, 인수를 생략하면 '일'은 1로, 나머지는 모두 0으로 지정됩니다.(월은 0월부터 시작한다. ex) 1월이면, 0을 입력한다.)
- Date 객체를 생성하고 난 뒤에는, 해당 객체가 나타내는 년, 월, 일, 시, 분, 초, 밀리초를 가져오거나 변경할 수 있다. 

```js
// 현재 날짜와 시간
  new Date();
// => 2018-10-15T11:37:03.577Z
   const d = new Date();
// => undefined
   typeof d
// => 'object'
   d.getTime();
  //  => 1539603459005
  // 유닉스 시간을 가져옴
```
```js
   new Date();
// => 2018-10-15T02:39:41.453Z
   const d = new Date();
// => undefined
   typeof d
// => 'object'
   d.getTime(); // Date타입을 유닉스 시간으로 바꿈
// => 1539571216084
   const msec = d.getTime();
// => undefined
   new Date(msec -  60000);// 유닉스 시간을 Date타입으로 바꿈(msec- 60000)은 1분 전 객체를 얻기 위해서 연산해준 것임 
<!-- 60 X 1000 = 60,000 = '1분'을 나타냄-->
// => 2018-10-15T02:39:16.084Z
   d
// => 2018-10-15T02:40:16.084Z
new Date('2018-10-10T01:01:02')
// => 2018-10-09T16:01:02.000Z
// Date객체의 포맷으로 value를 넘겨줌
//  우리가 입력한 건 한국 시간이고, 결과로 출력되는 건 한국 시간 - 9시간인 
// 협정 세계시로 나온다. 
new Date(year, month, day, hour, minutes, seconds, milliseconds)

```

- 데이터 객체를 숫자로 바꾼 후에 저장해야 한다.
 ```js
  obj2 = {date: d.getTime()}
// => { date: 1539571216084 }
   const text = JSON.stringify(obj2)
// => undefined
   text
// => '{"date":1539571216084}'
   const obj3= JSON.parse(text)
// => undefined
   text
// => '{"date":1539571216084}'
```


### 문자열로 변환하기
- `Date` 객체가 나타내는 시각을 여러 가지 방법으로 문자열로 변환할 수도 있다.
```js
const now = new Date();
// new Date().toLocaleString()
//  지역 + 언어: Locale 
// ex) 캐나다 + 불어, 캐나다 + 영어 
// 해당 지역과 언어에 맞게 현재 시간이 나온다.
console.log(now.toLocaleString()); // 2018. 10. 15. 오후 8:47:14

// Z가 붙어있으면 UTC기준이라는 뜻이다.
// new Date().toISOString()은 사람도 알아보기 쉽기 때문에 시간 표시 형식으로 많이 쓴다. 
console.log(now.toISOString()); // 2017-12-10T03:49:31.145Z

```
- 숫자로 넣고 숫자로 빼서 그걸 Date객체로 바꾸는 게 속편하다.

### 시간 간격 측정하기
- `-` 연산자를 사용해서 두 Date 객체 사이의 시간 간격이 얼마나 되는지를 밀리초 단위로 측정할 수 있다.
- 어떤 특정 시간으로부터 경과시간을 계산할 때 사용한다.
```js
const start = new Date();
alert('시간이 가고 있습니다...');
// 경고창을 끈 후 new Date()가 실행된다.
const end = new Date();
// (뒷쪽 시간 - 처음 시간)을 밀리초 단위로 반환
alert(`${end - start} 밀리초 만큼의 시간이 경과되었습니다.`);
```


<!-- 자바스크립트 심화2 - 4.4 비동기 프로그래밍- 타이머 참고 -->
```js
// 주기적으로 코드를 실행하고 싶을 때
const start = new Date();
setInterval(() => {
  const end = new Date();
  console.log(`경과시간: ${end - start} 밀리초`)}, 1000)
const end = new Date();
// 시간이 정확하지 않다는 문제점이 있음
```

### 라이브러리 사용하기
- **moment.js**라는 라이브러리를 jquery 다음으로 많이 사용함.
- 간단한 작업을 할 때는 `Date 생성자`를 사용하는데, 실무에서는 `moment.js`혹은 ` date-fns`와 같은 별도의 라이브러리를 사용하는 경우가 많다.  
```js
const moment = require("moment")
// 한국어 사용자를 위해서 moment라이브러리를 사용하겠다.
moment.locale('ko');
// 한국 시간을 가져오려고 locale('')안에 ko를 적어줌. 
// moment(); 현재 시간을 가져오는 객체
const now = moment();
// 내가 원하는 형태로 문자열을 만들고 싶을 때, format()에 원하는 형식의 문자열을 넘겨주면 그 형식대로 가져올 수 있다.
console.log(now.format("dddd, MMMM Do YYYY, h:mm:ss a")); // 일요일, 12월 10일 2017, 1:02:42 오후
// 7일 전의 날짜를 문자열로 바꾸고 싶을 때 사용
console.log(now.subtract(7, 'days').calendar()); // 2017.12.03
// "YYYYMMDD" 이 형태로 만든 "20120101" 이 날짜가 .fromNow() 지금으로부터 얼마 전인지를 나타내라.
console.log(moment("20120101", "YYYYMMDD").fromNow()); // 6년 전

```

## Symbol
- ES2015에서 도입된 새로운 원시 타입
- 참조 타입 X!!
- `Symbol` 내장 함수를 통해 새 심볼을 생성할 수 있다.
```js
const sym = Symbol();// 새 Symbole값이 만들어짐
console.log(typeof sym); //symbol
console.log(sym); // Symbol()
```
- `Symbol`은 **객체의 속성 키로 사용**하기 위해서 만들어졌다.
- 객체의 비밀 통로 역할을 하기 위해서 심볼이 만들어진 것이다.
- 대괄호 표기법을 통해 심볼을 객체의 속성 키로 사용할 수 있다.
- 객체의 `속성 키`로 `문자열`과 `심볼`이 사용될 수 있다.
- 웹프론트엔드 개발자 입장에서 `Symbol`을 사용할 일은 자주 없으나, `Symbol`이 무엇인지는 알아야 한다.
```js
const mySymbol = Symbol('my symbol');

const obj = {
// 대괄호 표기법: 대괄호[]안의 표현식의 결과값을 속성의 이름으로 사용하고 싶을 때
// mySymbol이 객체의 속성 키로 사용되고 있다.
  [mySymbol]: 'hello'
};
// obj.mySymbol과 obj[mySymbol]는 완전히 다른 것이다!!
// obj.mySymbol; // undefined
// obj.mySymbol 이걸 대괄호로 나타내면
// obj['mySymbol'] // undefiend
// mySymbol이라는 문자열을 속성키로 갖는 속성


console.log(obj); // { [Symbol(my symbol)]: 'hello' }
```




```js
// Symbol.iterator
// Symbol에 있는 내장심볼
const arr = [1, 2, 3]

// 배열 뿐만 아니라 iterable 객체를 순회할 때에도 사용할 수 있다.
for (const item of arr) {
  console.log(item)
}

// iterable 객체란, Symbol.iterator 속성에 특별한 형태의 함수가 들어있는 객체를 말한다.

for (const char of 'hello') {
  console.log(char)
}

const obj = {
  [Symbol.iterator]: function* () {
    yield 1
    yield 2
    yield 3
  }
}

for (const item of obj) {
  console.log(item)
}
```

## Map
- `객체`와 비슷함
- Map은 대응시킨다는 의미가 있음
- ES2015에서 도입된 Map 생성자는 객체와 유사하게 **키-값 쌍(key-value pair)**을 저장할 수 있는 새로운 자료구조를 제공한다. 
```js
const m = new Map();
// new Map().set('key', 'value');
m.set('hello', 'world');
console.log(m.get('hello')); // 'world'
// ('hello')라는 키의 값을 가져와라. 
console.log(m.has('hello')); // true
// ('hello')라는 키를 가지고 있냐?

m.delete('hello');
console.log(m.get('hello')); // undefined
console.log(m.has('hello')); // false


const obj = {}
obj.hello = 'world'
obj.hello
'hello' in obj



const obj = {a: 1}
m.set(obj, 1)
console.log(m.get(obj));
```
- 객체에는 문자열 키만 저장할 수 있다는 제한점이 있다.
- 프로토 타입이 붙기 때문에 무겁다는 특징이 있다.

- `Map`에는 문자열이 아닌 키도 만들 수 있다.


#### 속성의 개수를 알고 싶을 때
> Object.keys와 Map 비교
```js
 Object.keys(obj).length
 ```
- `Object.keys`로 속성의 개수를 알아보려고 하면, 상속 받은 속성까지 알고 싶은지, 열거 가능한 속성만 알고 싶은 지 등등을 고려해야 한다. 
-  `Object.keys`는 열거 가능한 속성만 반환한다.


- `Map`에는 열거 가능, 상속 이런 개념이 없으므로 단순하게 사용할 수 있다. 
- Map객체는 데이터의 **추가/삭제가 빈번하게 일어나는 경우** 일반적인 객체보다 훨씬 빠르게 동작한다는 장점이 있다.
- 반면, JSON 등으로 **직렬화 하기 어렵다**는 특징이 있다. 키 값에 문자열 말고도 여러 가지 값을 넣을 수 있기 때문이다. 
- 키-값 쌍 형태의 데이터를 다루면서 속도가 중요한 경우에는 Map의 사용을 고려해보자.


### Set
- `배열`과 비슷함.
- **집합 형태**의 자료구조 제공
- 중복 제거할 때 자주 사용함
- **중복된 데이터의 저장을 허용하지 않는다.**
  - ex) {1, 2} U {1, 3} = {1, 2, 3}
- 배열과는 다르게 첫 번째, 두 번째 요소라는 순서 개념이 없다.
- **배열과 유사한 자료구조가 필요하지만, 순서가 중요하지 않은 경우**, 그리고 **중복된 데이터의 저장을 허용하지 않아야 할 경우**, Set의 사용을 고려해보자. 
```js
function removeDuplicates(arr) {
  // Set에 넣기만 하면, 중복된 요소가 사라진다.
  const set = new Set(arr);
  //집합을 다시 배열로 변환하는 함수: Array.from()
  return Array.from(set)
}

removeDuplicates([1, 2, 3, 2, 1]);
```



# DOM API
## 이벤트 리스너
- `el.addEventListener(eventName, callback)`- 이벤트 리스너 등록
  - 이 함수가 실행될 때마다 callback이 실행된다.
- `el.removeEventListener(eventName, callback)`- 이벤트 리스너 제거



## DOM 엘리먼트 생성하기
- `document.createElement(tagName)` - 새로운 엘리먼트 객체 생성하기
- `el.cloneNode()`- 엘리먼트 복사하기

- HTML 문서의 구조를 바꾸는 방법
```js
// createElement는 ()안의 div를 만들기는 했지만,
// 아직 HTML 문서를 변경한 게 X.
// div 만들기
document.createElement('div');
<!-- <div>​</div>​ -->
```
- 요소 객체는 문서 바깥에 있을 수 있고, 문서 안에 있을 수 있다.
- 문서 상에는 아무런 영향을 미치지 않을 수 있다.
- 문서 밖에서 만들었다면, 안에 집어넣어줘야 문서에 영향을 미칠 수 있다.
```js
// 문서 내에서 요소 객체를 가져올 때
document.querySelector('footer');
```
## DOM 트리 조작하기
- `el.appendChild(newChild)` - 요소 끝에 자식 요소를 삽입하기
- `el.insertBefore(newChild, beforeWhat)` - 원하는 위치에 자식 요소를 삽입하기
- `el.replaceChild(newChild, oldChild)` - 자식 요소를 교체하기
- `el.removeChild(child)` - 자식 요소 제거하기


- `appendChild`와 `insertBefore`는 **요소의 위치를 이동**시킬 때도 사용된다.
- `el.appendChild(newChild)`: 요소 끝에 자식 요소를 삽입하기.무조건 마지막에 넣는 것임
- `formEl.insertBefore(divEl2, null)`은 `formEl.appendChild(divEl2)`와 같은 것임.
- insertBefore에 두 번째 인자로 null을 넣으면 appendChild와 같게 작동
- **이미 문서에 존재하는 요소 객체를 인수에 넣어서 호출하면, 그 요소 객체를 복사하지 않고, 위치를 이동**시킨다. 


## dataset
- `el.dataset` - `data-*` 어트리뷰트를 가져오기. (`kebab-case`가 `camelCase`로 변환됨)
```js
formEl.getAttribute('data-foo-bar')
// "hello"
// ES전에는 getAttribute로 로 가져왔었는데, 
// ES5부터는 dataset으로 짧게 가져올 수 있다. 
const formEl = document.querySelector('form')
// undefined
formEl.dataset.fooBar
// "hello"
formEl.dataset.index
// "1"
```

## 노드 간 관계
- `el.childNodes` - 자식 노드
- `el.firstElementChild` - 첫 번째 자식 요소
- `el.lastElementChild` - 마지막 자식 요소
- `el.previousElementSibling` - 이전 형제 요소
- `el.nextElementSibling` - 다음 형제 요소
- `el.parentElement`- 부모 요소
- `el.offsetParent`: 포지션 세팅이 되어있는 가장 가까운 조상 요소
[DOM 트리 조작하기 & 노드 간 관계 이용 예시 코드(추가/ 삭제 기능 Todo List)](https://codepen.io/jihyehwang09/pen/ePGqza?editors=1010)

## 요소의 크기 및 위치
- `el.getBoundingClientRect()`- 화면 좌측 상단으로부터의 요소의 위치 및 요소의 크기를 반환
- `el.offsetHeight` / `el.offsetWidth`- border를 **포함한** 요소의 크기
- `el.clientHeight` / `el.clientWidth` - border를 **제외한** 요소의 크기
- `el.scrollHeight` / `el.scrollWidth` - 요소 내부에 포함된 콘텐츠의 크기 (스크롤 가능한 영역의 크기)
- `el.offsetTop` / `el.offsetLeft` - offsetParent로부터의 요소의 위치
- `el.clientTop` / `el.clientLeft` - border의 너비


- `el.getBoundingClientRect()`를 **가장 많이 사용함.** 
- formEl.getBoundingClientRect()했을 때, 반환되는 값 중 x, y는 익스플로러에서는 사용할 수 없다.
- `bottom`, `height`, `left`, `right`, `top`, `width` 이 6가지 요소를 사용하도록 하자. 

- absolute position을 할 때 기준이 되는 부모가 있는데, 이 부모는 position: relative가 된다. 


## 이벤트 객체
- `e.target` - 실제로 이벤트를 일으킨 요소
- `e.currentTarget` - 이벤트 전파 과정 중 현재 이벤트가 위치한 요소
- `e.stopPropagation()` - 이벤트 전파 과정을 멈추기. 
  - `e.stoprPropagation()`를 만나면, 이벤트 전파 과정이 멈추고 그 이후 이벤트는 실행되지 않는다.

> MouseEvent
> altKey: false // altKey를 누른채로 실행하면 true가 반환됨
> button: 
> clientX: 화면 가장 왼쪽 위, 끝에서부터의 X좌표
> clientY: 화면 가장 왼쪽 위, 끝에서부터의 Y좌표

- `e.preventDefault()`: 이벤트가 일으키는 브라우저의 기본 동작과정을 취소하기
  - ex) 링크를 클릭해도 페이지가 넘어가지 않게 만들기
- 이벤트는 해당 태그가 아니라 그 안에 있는 태그를 클릭해도 발생할 수 있다. 
  - ex) form 태그에 마우스 이벤트를 걸었는데, 안에 있는 label태그를 눌러도 마우스 이벤트가 작동한다. 



## 이벤트 전파
1. `Capturing` 
2. `At Target`
3. `Bubbling`
![이벤트 전파](https://github.com/fds11/fds-dom-api/blob/master/images/eventphases.png)

- 이벤트의 실행 순서가 중요할 때가 있다. 
  - ex) 부모 요소의 이벤트가 먼저 실행되어야 하는 경우, `Capturing`단계에 이벤트를 등록해줘야 하는 경우가 있다. 
- `Capturing`과정에 걸렸을 때 이벤트를 실행할 것인지, `Bubbling`과정에 걸렸을 때 이벤트를 실행할 것인지 정해줄 수 있다. 
- 그냥 addEventListener하면 Bubbling과정에서 이벤트가 실행된다.
- Capturing 단계에 이벤트가 실행되게 하려면, 
- addEverListener의 3번째 인수로 true를 넘겨주면, capturing단계에서 이벤트가 실행되게 할 수 있다.

[이벤트 전파 관련 예시 (Capturing & Bubbling 실습)](https://codepen.io/jihyehwang09/pen/KGyPYa)



