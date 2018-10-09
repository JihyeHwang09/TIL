### 문제 1

두 정수 `start`, `end`를 입력받아, `start`부터 `end`까지의 모든 정수를 배열로 반환하는 함수를 작성하세요.

예:
```
range(3, 6); -> [3, 4, 5, 6]
```
```js
function range(start, end) {
  // const로 써도 배열 안의 값이 바뀌는 건 가능. 재대입이 불가능한 거지 값을 바꾸지 못하는 상수의 개념이 X.  
  const arr = [];
  // 이 표현식이 false가 되면 루프가 끝난다.
  // 루프의 표현식이 true인 한 루프가 실행된다.

  for (let i = start; i <= end; i++) {
    arr.push(i);
  }
  return arr;
}

range(3, 6);
```

### 문제 2

수 타입의 값으로만 이루어진 배열을 입력받아, 그 값들의 합을 구하는 함수를 작성하세요.
```js
// 내 풀이1- reduce 사용
function sum(arr) {
 return arr.reduce((acc, item) => acc + item, 0);
}
sum([1, 2, 3]);
```
```js
// 내 풀이2- 루프 사용
function sum2(arr) {
  let memory =0;
  for (let i = 0; i < arr.length; i++) {
    memory += arr[i];
  }
  return memory;
}
sum2([1, 2, 3]);
```

### 문제 3

배열을 입력받아, falsy인 요소가 제거된 새 배열을 반환하는 함수를 작성하세요.
```js
// 내 풀이 & 강사님 풀이
function removeFalsy(arr) {
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      // Boolean(arr[i]) or !!arr[i]로 적어줘도 되지만, arr[i]를 적어줘야 한다.  )
      newArr.push(arr[i]);
    }
  }
  return newArr;
}
removeFalsy([0, 1, NaN, 3]);
// -> [1, 3]

```

### 문제 4

배열을 입력받아, 중복된 요소가 제거된 새 배열을 반환하는 함수를 작성하세요.
```js
// 내 풀이
function removeSame(arr) {
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (!newArr.includes(arr[i])) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

// removeSame(['tomato', 'hi', 'hello', 'hi', 'tomato']);
removeSame([1, 2, 3, 4, 1, 4, 3, 1]);
```
### 문제 5

수 타입의 값으로만 이루어진 두 배열을 입력받아, 다음과 같이 동작하는 함수를 작성하세요.
- 두 배열의 같은 자리에 있는 요소를 더한 결과가 새 배열의 요소가 됩니다.
- 만약 입력받은 두 배열의 길이가 갖지 않다면, 긴 배열에 있는 요소를 새 배열의 같은 위치에 포함시키세요.

예:
```
addArray([1, 2, 3], [4, 5, 6, 7]) -> [5, 7, 9, 7]
```
```js
// 내 풀이
function addArray (arr1, arr2) {
  let shorter = [];
  let longer = [];
  let newArr = [];
  if (arr1.length > arr2.length) {
    shorter = arr2;
    longer = arr1;
  } else {
    shorter = arr1;
    longer = arr2;
  }
    for (let i = 0; i < shorter.length; i++) {
      newArr.push(shorter[i] + longer[i]);
    }
    console.log(newArr.length)
    for (let i = newArr.length; i < longer.length; i++) {
      newArr.push(longer[i]);
    }
    return newArr;
}
```
```js
// 강사님 풀이
// ### 문제 5

// 수 타입의 값으로만 이루어진 두 배열을 입력받아, 다음과 같이 동작하는 함수를 작성하세요.
// - 두 배열의 같은 자리에 있는 요소를 더한 결과가 새 배열의 요소가 됩니다.
// - 만약 입력받은 두 배열의 길이가 갖지 않다면, 긴 배열에 있는 요소를 새 배열의 같은 위치에 포함시키세요.

// 예:
// ```
// addArray([1, 2, 3], [4, 5, 6, 7]) -> [5, 7, 9, 7]
// ```
function addArray(arr1, arr2) {
  // 긴 배열에다가 짧은 배열을 더하면 안전하게 더할 수 있으니까
  // 먼저 긴 배열과 짧은 배열을 정해준다.
  let longer
  let shorter

// 배열 그대로 longer와 shorter에 넣으면 원본 배열이 변경된다는 문제가 있다.
  // if (arr1.length > arr2.length) {
  //   longer = arr1
  //   shorter = arr2
  // } else {
  //   longer = arr2
  //   shorter = arr1
  // }

  if (arr1.length > arr2.length) {
    // 원본 배열을 변경하지 않기 위해 사본을 만들어준다.
    // slice 메소드는 배열을 복사할 때도 사용한다.

    // 아예 새 배열을 만들어서 그 배열에 값을 넣어주면, 코드가 더 길어지기 때문에 사본을 만드는 게 더 편하다. 
    longer = arr1.slice();
    shorter = [...arr2];
  } else {
    longer = Array.from(arr2);
    shorter = arr1.slice();
  }
  // undefined랑 숫자랑 더하면 NaN이 나옴. 여기에 조건을 i < longer.length로 주면 NaN도 값으로 들어간다.

  for (let i = 0; i < shorter.length; i++) {
    // shorter[3]은 없으므로 undefined가 튀어나옴. 
    // undefined + 숫자 = NaN이 나옴.
    longer[i] = longer[i] + shorter[i]
  }
  return longer;
}
addArray([1, 2, 3], [4, 5, 6, 7]);

```

### 문제 6

배열을 입력받아, 배열의 요소 중 두 개를 선택하는 조합을 모두 포함하는 배열을 작성하세요.

예:
```
combination([1, 2, 3]); -> [[1, 2], [1, 3], [2, 3]]
```
```js
// 내 풀이
function combination(arr) {
  const newArr = [];
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      newArr.push([arr[i], arr[j]]);
    }
  }
  return newArr;
}

combination([1, 2, 3]);
```

### 문제 7

'금액'과 '동전의 종류가 들어있는 배열'를 입력받아, 최소한의 동전을 사용해서 금액을 맞출 수 있는 방법을 출력하는 함수를 작성하세요.
(단, 동전의 종류가 들어있는 배열에는 큰 동전부터 순서대로 들어있다고 가정합니다.)
// while사용
// 이 금액 단위를 바라보고 있다~ 하다는 사실을 기억해둬야 한다.


예:
```
coins(263, [100, 50, 10, 5, 1]);
// 출력
100
50
10
1
1
1
```
```js
// 내 풀이
 function coins(input, coin) {
  let currentIndex = 0;
  let remain = input;
  while (remain > 0) {
    // for문으로는 for ( ;remian >0; )로 조건을 줄 수 있다. 
    // 만약 남은 금액이 현재 보고 있는 코인보다 남은 금액이 크면
    if (remain >= coin[currentIndex]) {
      // 남은 금액에서 현재 보고 있는 코인을 뺀다.
      // remain = remain - coin[currentIndex];
      remain -= coin[currentIndex];
      console.log(coin[currentIndex]);
      // 작으면
    } else {
      // 현재 보고 있는 코인의 다음 코인으로 넘어간다. (인덱스 번호를 1 증가시킨다.)
      currentIndex++;
    }

  }
}


coins(263, [100, 50, 10, 5, 1]);
```
```js
// 강사님 풀이1
function coins(input, coinTypes) {
// coinTypes를 내림차순 정렬
  coinTypes.sort((x, y) => y - x);
  // 남은 액수
  let remain = input;
  // 현재 내가 보고있는 동전
  let currentIndex = 0;
  // remain > 0 조건만 주면, 남은 액수가 보고있는 동전 단위보다 작으면 무한대로 currentIndex가 증가하게 된다. 따라서, currentIndex가 무한대로 커지지 않도록 조건을 방어코드를 써준다.
  while(remain > 0 && currentIndex < coinTypes.length) {
    // 남은 액수가 내가 지금 보고있는 동전보다 크거나 같으면
    if (remain >= coinTypes[currentIndex]) {
      console.log(coinTypes[currentIndex]);
      remain -= coinTypes[currentIndex];
    } else {
      // 다음 동전으로 넘어간다.
      currentIndex++;
    }
  }
}

// coins(263, [100, 50, 10, 5, 1]);
// coins(263, [100, 50, 10, 5]);
coins(263, [50, 100, 10, 5, 1]);
```
```js
// 강사님 풀이2 - 중첩 루프 사용
function coins(input, coinTypes) {
// coinTypes를 내림차순 정렬
  coinTypes.sort((x, y) => y - x);
  // 남은 액수
  let remain = input;
  // 현재 내가 보고있는 동전
  let currentIndex = 0;
  // remain > 0 조건만 주면, 남은 액수가 보고있는 동전 단위보다 작으면 무한대로 currentIndex가 증가하게 된다. 따라서, currentIndex가 무한대로 커지지 않도록 조건을 방어코드를 써준다.
  for (let i = 0; coinType[])
    // 남은 액수가 내가 지금 보고있는 동전보다 크거나 같으면
    if (remain >= coinTypes[currentIndex]) {
      console.log(coinTypes[currentIndex]);
      remain -= coinTypes[currentIndex];
    } else {
      // 다음 동전으로 넘어간다.
      currentIndex++;
    }
  }
}

// coins(263, [100, 50, 10, 5, 1]);
// coins(263, [100, 50, 10, 5]);
coins(263, [50, 100, 10, 5, 1]);
```
### 문제 8

수 타입의 값만 들어있는 배열을 입력받아, 해당 배열을 오름차순 정렬하는 함수를 작성하세요. (`Array.prototype.sort`를 사용하지 않고 작성해보세요. [선택 정렬](https://ko.wikipedia.org/wiki/%EC%84%A0%ED%83%9D_%EC%A0%95%EB%A0%AC)을 참고하세요.)
