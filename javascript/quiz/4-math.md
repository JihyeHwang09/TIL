### 문제 1

양수를 입력받아 이 수를 반지름으로 하는 원의 넓이를 반환하는 함수를 작성하세요.
```js
const area = r => r * r * Math.PI;
//area(2);
```
### 문제 2

두 정수 `min`, `max` 를 입력받아, `min` 이상 `max` 미만인 임의의 정수를 반환하는 함수를 작성하세요.
```js
const integer = (min, max) => Math.floor(Math.random() * (max - min) + min);

// integer(1, 4);

```

### 문제 3

정수를 입력받아, 5 단위로 올림한 수를 반환하는 함수를 작성하세요.

예:
```
ceilBy5(32); -> 35
ceilBy5(37); -> 40
```
```js
const ceilBy5 = x =>
Math.ceil(x / 5) * 5;
```

### 문제 4

배열을 입력받아, 요소들의 순서를 뒤섞은 새 배열을 반환하는 함수를 작성하세요.
```js
const shuffle = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    let temp;
    let randomIndex = Math.floor(Math.random() * (i + 1));
    temp = arr[i];
    arr[i] = arr[randomIndex];
    arr[randomIndex] = temp;
  }
  return arr;
}


shuffle([10, 'Hello', 9, -Infinity, 'true', 4, 'NaN']); // ->  [ -Infinity, 'true', 9, 4, 'Hello', 'NaN', 10 ];


```

### 문제 5

임의의 HTML 색상 코드를 반환하는 함수를 작성하세요.
```js
// rgb(0, 0, 0)
// R: 0 ~ 255, G:  0 ~ 255, B: 0 ~ 255 
function htmlColorCode() {
  const arr = [];
  for (let i = 0; i < 3; i++) {
    arr[i] = Math.floor(Math.random() * 256);
  }
  return `rgb(${arr[0]}, ${arr[1]}, ${arr[2]} )`;
}
htmlColorCode();

```

### 문제 6

양수를 입력받아, 그 수만큼의 길이를 갖는 임의의 문자열을 반환하는 함수를 작성하세요.
```js
function randomStr (length) {
  let str = '';
  let randomNum = 0;
  let arr = [];
  for (let i = 0; i < length; i++) {
  // 아스키 코드
    randomNum = Math.floor(Math.random() * (126-33) + 33) ;
    console.log(randomNum);
     arr[i]= String.fromCharCode(randomNum);
  }
  return arr;
} 
randomStr(7);

```
### 문제 7

수 타입의 값으로만 이루어진 배열을 입력받아, 그 값들의 표준편차를 구하는 함수를 작성하세요.
```js
// 강사님 답안
function stdDev (arr) {
  // arr의 평균 구하기
  const sum = arr.reduce((acc, item) => acc + item, 0)
  const mean = sum / arr.length
  console.log(`mean: ${mean}`)
  // 각 요소에 대한 편차 구하기 (편차 = 값 - 평균)
  const ps = arr.map(item => item - mean)
  console.log(`ps: ${ps}`);
  // 각 요소에 대한 제곱하기
  const powers = ps.map(item => item ** 2 )
  // 위 제곱한 배열의 평균 구하기
  const vv = powers.reduce((acc, item) => acc + item, 0) / powers.length
  // 루트 씌우기
  // sqrt은 제곱근이라는 뜻임
  return Math.sqrt(vv);
}

stdDev([1, 2, 3, 4, 5])
```
