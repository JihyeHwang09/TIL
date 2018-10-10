
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
  
* Math.floor(Math.random() * 40) + 10

```js
const items = ['toy', 'bread']
const prices = [10000, 3000]
const cart = 
// cart: [{name: 'toy', }]
```
