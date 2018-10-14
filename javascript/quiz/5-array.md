문제 1. 배열을 입력받아, 해당 배열에 들어있는 요소들 중 최대값을 찾는 함수를 작성하세요. (루프를 이용하세요)

예:
```js
max([3, 1, 4, 5, 2]) // -> 5
```
```js
function max(arr) {
  let maxNum = -Infinity;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > maxNum) {
      maxNum = arr[i];
    }   
  }
  return maxNum;
}
```

---

문제 2. 배열을 입력받아, 해당 배열에 들어있는 요소들 중 최대값을 찾는 함수를 작성하세요. (`Array.prototype.reduce`를 이용하세요)

---
```js
// 강사님 풀이
function max(arr) {
  // reduce를 쓸 때
  // '누적값의 역할'이 무엇인지를 잘 정하는 것이 중요하다. 
  // 누적값: 지금까지 봤던 숫자 중에 제일 큰 수
  // 이 맨 마지막의 누적값을 반환해야 하므로 arr.reduce 앞에 return을 써준다. 

  return arr.reduce((acc, item) => {
    // 안에 들어있는 함수의 반환값이, 다음 단계의 누적값이 된다.
    if (acc > item) {
      return acc;
    } else {
      return item;
    }
    // -Infinity는 자바스크립트의 어떤 숫자가 와도 이 -Infinity가 가장 작다.
    // -Infinity는 숫자값임. (수타입)
    // 이 초기 누적값에 0을 주면 0보다 작은 음수가 들어왔을 때 0이 최대값으로 튀어나온다.
    // 초기 누적값을 주지 않으면 배열의 첫번째 값이 초기누적값이 된다. But 문제가 생길 수 있으므로 초기 누적값을 매번 넣어주자. 
  }, -Infinity)
  // 짧게 작성하는 방법 - 삼항연산자 사용
  // 화살표 함수는 값이 바로 반환될때 return을 써줄 필요가 X. 
  // return arr.reduce((acc, item) => acc > item? acc : item, -Infinity)
}

max([3, 1, 4, 5, 2]);
max([-3, -1, -4, -5, -2]);


// 초기 누적값을 배열의 첫번째 값을 넣게 되면, ex) max([])를 넣을 경우 undefined가 반환된다.
// Math.max(): 최대값을 반환하는 함수
 
```

문제 3. 2차원 배열을 입력받아 1차원 배열로 바꾸는 함수를 작성하세요. (루프를 이용하세요)

예:

```js
flatten([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]) // -> [1, 2, 3, 4, 5, 6, 7, 8, 9]
```
```js
function flatten(arr) {
  let newArr = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
    newArr.push(arr[i][j]);
    }
  }
  return newArr;
}
```

---

문제 4. 2차원 배열을 입력받아 1차원 배열로 바꾸는 함수를 작성하세요. (`Array.prototype.reduce`를 이용하세요)
```js
// 내 풀이
function flatten(arr) {
  let newArr = [];
  arr.reduce((acc, item) => item.reduce((acc2, item2) => newArr.push(item2), 0 ), 0 );
  return newArr;
}
```
```js
// 강사님 풀이1
function flatten(arr) {
  // 누적값: 지금까지 본 배열이 다 이어붙여진 새 배열 
  return arr.reduce((acc, innerArr) => acc.concat(innerArr), [])
  // 아무것도 안봤으니까 빈 배열[]을 초기값으로 준다. 
  // 지금까지 본 배열이 이어붙여져 있으려면, 이전에 봤던 배열과 지금 보고 있는 배열을 이어붙인 새 배열이다.
  // concat메소드는 배열을 이어붙인 새 배열을 반환한다. 

}
```
```js
// 강사님 풀이2
function flatten2(arr) {
  return arr.reduce((acc, item) => [...acc, ...item], [])
}
```
---

문제 5. (3 * 3) 빙고 판이 배열에 저장되어 있습니다. 빙고인 경우 `true`, 아니면 `false`를 반환하는 함수를 작성하세요. (단, 칸이 비어있는 경우는 0, 칸이 채워져 있는 경우는 1로 표현합니다.)

예:

```js
bingo([
  [0, 1, 0],
  [0, 1, 1],
  [0, 0, 1]
]) // -> false

bingo([
  [1, 1, 0],
  [0, 1, 1],
  [0, 0, 1]
]) // -> true

bingo([
  [0, 1, 0],
  [0, 1, 1],
  [0, 1, 1]
]) // -> true
```
```js
// 내 생각
// 가로
// : [0][0], [0][1], [0][2]
// [1][0], [1][1], [1][2]
// [2][0], [2][1], [2][2]

// 세로
// : [0][0], [1][0], [2][0]
// [0][1], [1][1], [2][1]
// [0][2], [1][2], [2][2]

// 왼-> 오 대각선
// : [0][0], [1][1], [2][2]
// 오 -> 왼 대각선:
// : [0][2], [1][1], [2][0]
// 좌표들이 1인 경우를 포함하고 있으면 true를 반환, 각 2차원배열들 중 하나라도 0이라면 false를 반환


```
```js

// 강사님 풀이1 - 루프로 풀이
// 한 값이 고정되어 있고 한 값이 변화할 때 중첩 루프를 쓰는 것임
function bingo(arr) {
  // 가로줄 확인 (루프)
  // 한줄 한줄 보는 작업
  for (let i = 0; i < 3; i++) {
    // '이제까지 본 것이 전부 x표시가 되어있다'
    // 내가 지금까지 본 것이 모두 X 표시이면 true, 아니면 false
    let checked = true
    // 한칸 한칸 보는 작업
    for (let j = 0; j < 3; j++) {
      if (arr[i][j] === 0) {
        checked = false
      }
    }
    if (checked) {
      return true
    }
  }

  // 세로줄 확인 (루프)
  for (let i = 0; i < 3; i++) {
    // '이제까지 본 것이 전부 x표시가 되어있다'
    let checked = true
    for (let j = 0; j < 3; j++) {
      if (arr[j][i] === 0) {
        checked = false
      }
    }
    if (checked) {
      return true
    }
  }

  {
    // 대각선 확인 (루프)
    let checked = true
    for (let j = 0; j < 3; j++) {
      if (arr[j][j] === 0) {
        checked = false
      }
    }
    if (checked) {
      return true
    }
  }

  {
    // 반대쪽 대각선 확인 (루프)
    let checked = true
    for (let j = 0; j < 3; j++) {
      if (arr[j][2-j] === 0) {
        checked = false
      }
    }
    if (checked) {
      return true
    }
  }

  return false
}
```

```js
// 강사님 풀이2- every , some 메소드 사용
// every 메소드: 모든 요소가 조건을 만족하면 true, 하나라도 조건을 만족하지 않으면 false를 반환한다.
// some 메소드: 요소 중에 하나라도 조건을 만족하면 true, 모두 조건을 만족하지 않으면 false를 반환
// 메소드를 잘 사용하면 루프만 사용했을 때보다 코드 길이를 많이 줄일 수 있다. // 강사님 풀이2
function bingo2(arr) {
  // 가로줄 확인 (some, every)
  const horizontal = arr.some(
    innerArr => innerArr.every(item => item === 1)
  )
  if (horizontal) {
    return true
  }

  // 세로줄 확인 (some, every)
  const vertical = [0, 1, 2].some(
    idx => arr.every(innerArr => innerArr[idx] === 1)
  )
  if (vertical) {
    return true
  }

  // 대각선 확인 (every)
  const diagonal = arr.every((item, index) => item[index] === 1)
  if (diagonal) {
    return true
  }

  // 반대쪽 대각선 확인 (every)
  const anti = arr.every((item, index) => item[2 - index] === 1)
  if (anti) {
    return true
  }

  return false
}
```


---

문제 6. (9 * 9) 오목 판이 배열에 저장되어 있습니다. 흑이 이긴 경우 1, 백이 이긴 경우 2, 아무도 이기지 않은 경우 0을 반환하는 함수를 작성하세요. (단, 칸이 비어있는 경우는 0, 흑은 1, 백은 2로 표현합니다.)
예:

```js
omok([
  [0, 0, 0, 0, 0, 0, 0, 0, 0,]
  [0, 0, 0, 0, 0, 0, 0, 0, 0,]
  [0, 0, 1, 0, 0, 0, 2, 0, 0,]
  [0, 0, 0, 1, 0, 0, 2, 0, 0,]
  [0, 0, 0, 0, 1, 0, 2, 0, 0,]
  [0, 0, 0, 0, 0, 1, 2, 0, 0,]
  [0, 0, 0, 0, 0, 0, 0, 0, 0,]
  [0, 0, 0, 0, 0, 0, 0, 0, 0,]
  [0, 0, 0, 0, 0, 0, 0, 0, 0,]
]) // -> 0

omok([
  [0, 0, 0, 0, 0, 0, 0, 0, 0,]
  [0, 0, 0, 0, 0, 0, 0, 0, 0,]
  [0, 0, 1, 0, 0, 0, 2, 0, 0,]
  [0, 0, 0, 1, 0, 0, 2, 0, 0,]
  [0, 0, 0, 0, 1, 0, 2, 0, 0,]
  [0, 0, 0, 0, 0, 1, 2, 0, 0,]
  [0, 0, 0, 0, 0, 0, 1, 0, 0,]
  [0, 0, 0, 0, 0, 0, 0, 0, 0,]
  [0, 0, 0, 0, 0, 0, 0, 0, 0,]
]) // -> 1

omok([
  [0, 0, 0, 0, 0, 0, 0, 0, 0,]
  [0, 0, 0, 0, 0, 0, 0, 0, 0,]
  [0, 0, 1, 0, 0, 0, 2, 0, 0,]
  [0, 0, 0, 1, 0, 0, 2, 0, 0,]
  [0, 0, 0, 0, 1, 0, 2, 0, 0,]
  [0, 0, 0, 0, 0, 1, 2, 0, 0,]
  [0, 0, 0, 0, 0, 0, 2, 0, 0,]
  [0, 0, 0, 0, 0, 0, 0, 0, 0,]
  [0, 0, 0, 0, 0, 0, 0, 0, 0,]
]) // -> 2
```
```js

// // 컴퓨터는 한 칸 한칸씩 본다.
// // 오목알을 x,o라고 나누면
// // 내가 지금까지 본 연속된 x의 개수를 기억해두면 된다.
// // o가 하나 나왔네? o하나가 연속되어있다는 사실을 기억
// // 아이디어: 내가 본 플레이어가 몇 번 연속해서 놓여져 있는지를 기억한다.
// // 연속해서 1을 5번 봤으면, return 1, 연속해서 2를 5번 봤으면 return 2를 해준다.

// 가로줄만 판별할 수 있는 함수
function omok(arr) {
  // 가로줄 확인
  for (let i = 0; i < 9; i++) {
    // currentPlayer에 초기값을 주지 않았으므로 처음에는 undefined값이 들어있음. 
    let currentPlayer;
    let count;
    for (let j = 0; j < 9; j++) {
      // 새로운 플레이어를 발견했을 때
      if (currentPlayer !== arr[i][j]) {
      currentPlayer = arr[i][j];
      count = 1;
      } else {
        count++;
      }
      // 만약 1이나 2가 5번 연속되어 있으면
      // if ((currentPlayer === 1 && count === 5) || (currentPlayer === 2 && count === 5))
    //분배 법칙으로 코드 줄이기
        if ((currentPlayer === 1 || courrentPlayer === 2) && count === 5) {
        return currentPlayer;
      }
    }
  }
}

```

---

문제 7. 배열을 입력받아 있는 요소 중 아무거나 하나를 골라서 반환하는 함수를 작성하세요.

예:

```js
// 내 풀이
randomItem([1, 2, 3, 4, 5]) // 1, 2, 3, 4, 5 중 아무거나 반환
```
```js
const randomItem = arr => {
  let randomNum = Math.floor(Math.random() * arr.length);
  return arr[randomNum];
}
```
```js
// 강사님 풀이
function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
```
---

문제 8. 배열을 입력받아, 요소들의 순서를 뒤섞은 새 배열을 반환하는 함수를 작성하세요. (단, 원본 배열이 변경되어서는 안 됩니다.)

예:

```js
shuffle([1, 2, 3, 4, 5]) // [3, 1, 4, 5, 2] 와 같이 순서가 뒤섞인 새 배열 반환
```
```js
// 내 풀이
const shuffle = arr => {
  const newArr = arr.slice();
  for (let i = newArr.length - 1; i > 0; i--) {
    let temp;
    let randomIndex = Math.floor(Math.random() * (i + 1));
    temp = newArr[i];
    newArr[i] = newArr[randomIndex];
    newArr[randomIndex] = temp;
  }
  return newArr;
}
```
```js
// 강사님 풀이
function shuffle(arr) {
  // 원본이 변경되지 않도록 사본으로 작업한다.
  const remain = arr.slice()

  // 반환할 새 배열
  const newArr = []

  for (let i = 0; i < arr.length; i++) {
    // 남아있는 놈들 중에 아무거나 골라서
    const randomIndex = Math.floor(Math.random() * remain.length)
    // newArr에 넣은 다음 remain에서 뺀다.
    newArr.push(remain[randomIndex])
    remain.splice(randomIndex, 1)
  }

  return newArr
}
```
