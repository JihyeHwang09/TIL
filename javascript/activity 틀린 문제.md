
* typeof undefined -> undefined
* typeof null -> object


10-04
원본 배열에 영향을 미치지 않는 것(새 배열을 만드는 것)
map, slice, filter, join, concat

* `map`: 배열의 각 요소에 함수를 적용해서, 그 반환값을 요소로 갖는 **새로운 배열**을 만든다.
`forEach`와 비슷해보이지만, 새로운 배열을 만든다는 점이 다르다.

* `slice`: 배열의 일부분에 해당하는 **새로운 배열**을 반환한다.
* `filter`: 배열에서 원하는 요소만을 골라내어 새로운 배열을 생성한다.<br>
filter 메소드에는 진리값(boolean)을 반환하는 함수를 주어야 한다. 
* `join`: 배열의 요소들을 문자열로 변환한 후, 메소드에 주어진 구분자(seperator)를 이용해 하나의 문자열로 결합하여 반환한다.
* `concat`: 여러 배열을 연결해서 새 배열을 만들 때 사용된다.


원본 배열에 영향을 미치는 것
unshift, shift, push, pop, fill, sort

* `unshift`: 배열의 시작 부분에서 요소를 **추가**한다.
* `shift`: 배열의 시작 부분에서 요소를 **제거**한다.
* `push`: 
* `pop`:
* `fill`:
* `sort`: 



10-10
- `splice`: 원본 배열을 수정한다.
- `reverse`: 원본 배열을 수정한다.


- some을 쓰면, 조건을 만족하는 요소가 하나라도 있는지 검사한다.
  - 만족하는 요소가 하나라도 있으면 true를, 만족하는 요소가 하나도 없으면 false를 반환한다.
  
* 10보다 크고 50보다 작은 임의의 수를 랜덤으로 반환하는 코드를 Math.random() 메소드를 활용해 적어보기 
Math.floor(Math.random() * 40) + 10 



**이해 안감..................**
```js
const items = ['toy', 'bread']
const prices = [10000, 3000]
const cart = items.map((item, index) => ({name: item, price: prices[index]}));
// cart: [{name: 'toy', pirce: 10000}, {name: 'bread', price: 3000}]
```




10-11
- `symbol`은 **유일하고 변경 불가능한(immutable) 원시(primitive)타입이다.**
- 자바스크립트에서 `참조타입`은 `object`이다.


**이해 안 감.......................**
* this가 가리키는 값이 원하는 것을 가리키도록 만들 수 있는 방법은 bind, call, apply 메소드를 사용하는 것
** this- bind, call, apply 정리해야 함!!**

10-15
- obj가 객체라고 할 때, const newObj = {...obj} 에서 newObj에는 obj의 열거 가능한(enumerable) 속성만 복사된다. (O)
- 표현식 [1, 2, 3].map(num => {num}) 의 결과값은 [{num: 1}, {num: 2}, {num: 3}] 이다.(X)
  - 결과값은 [undefined, undefined, undefined] 입니다. 화살표 함수의 반환값이 와야하는 부분에 중괄호가 오면, 표현식이 아니라 '블록'으로 간주되기 때문에 의도대로 동작하지 않습니다. 객체를 바로 반환하려면 객체 부분을 괄호로 둘러싸주어야 합니다. 예: [1, 2, 3].map(num => ({num})
  - - 화살표에서 중괄호{}가 등장하면, 객체라고 인식하는게 아니라 '구문이구나.표현식이구나' 라고 인식하므로 객체를 반환하고 싶으면 괄호()로 감싸줘야 한다.
- 화살표 함수에서 객체를 바로 반환하고 싶은 경우, 괄호로 객체를 둘러싸주어야 한다.


11-01
 
- 웹 브라우저가 HTML 문서 형태의 응답을 받으면, 해당 문서를 분석한 후 문서에 포함된 모든 자원(CSS, JS, 이미지, 폰트...)에 대한 요청을 각각 추가로 보낸다.(O)
-  URL의 query string 부분에서는 한글을 자유롭게 사용할 수 있다.(X)
    - URL에는 ASCII 문자밖에 포함될 수 없기 때문에, query string에 한글을 포함시킬 때는 percent encoding 과정을 거친 문자열을 포함시킵니다. 
- 쿠키에 저장할 정보를 생성하는 주체는 웹 브라우저이다.(X)
    - 쿠키는 '서버'가 응답을 통해 웹 브라우저에 저장하는 이름+값 형태의 정보입니다. 즉, 쿠키에 어떤 정보를 저장할 지는 서버에 의해 결정됩니다.
- 같은 cross-origin 요청이라 할지라도, GET 메소드와 POST 메소드에 대한 처리방식이 각각 다르다.(O)

