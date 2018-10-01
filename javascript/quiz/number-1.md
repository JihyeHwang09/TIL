### 문제 1

두 수를 입력받아 큰 수를 반환하는 함수를 작성하세요.
```js
function larger(x, y) {
  const a = x;
  const b = y;
  let c;

  // a가 크면 a를 c에 넣고, 아니면 b를 c에 넣는다.
  if (a > b) {
    c = a;
  } else {
    c = b;
  }
  return c;
}
```

```js
function larger(x, y) {
  let c;

  if (x > y) {
    c = x;
  } else {
    c = y;
  }
  return c;
}

console.log(larger(3,2));
console.log(larger(3,6));
```

```js
function larger(x, y) {
  if (x > y) {
    return x;
  } else {
    return y;
  }
}
```

```js
function larger(x, y) {
  return x > y? x : y;
}
```


### 문제 2

세 수를 입력받아 그 곱이 양수이면 `true`, 0 혹은 음수이면 `false`, 둘 다 아니면 에러를 발생시키는 함수를 작성하세요.

에러를 발생시키는 코드는 다음과 같습니다.

```js
throw new Error('입력값이 잘못되었습니다.');
```

```js
function isPositive(x, y, z) {
  if (x * y * z > 0) {
    return true;
  } else if (x * y * z <= 0) {
    return false;
  } else {
    throw new Error('입력값이 잘못되었습니다.');
  }

}

console.log(isPositive(1, 2, 3));
console.log(isPositive(1, 2, -3));
console.log(isPositive(1, 2, '3');
```


### 문제 3

세 수 `min`, `max`, `input`을 입력받아, 다음과 같이 동작하는 함수를 작성하세요.
- `min`보다 `input`이 작으면, `min`을 반환합니다.
- `max`보다 `input`이 크면, `max`를 반환합니다.
- 아니면 `input`을 반환합니다.

예:
```
limit(3, 7, 5); -> 5
limit(3, 7, 11); -> 7
limit(3, 7, 0); -> 3
```

```js
function limit(min, max, input) {
  if (min > input) {
    return min;
  } else if (max < input) {
    return max;
  } else {
    return input;
  }
}
```

### 문제 4

어떤 정수가 짝수인지 홀수인지 출력하는 함수를 작성하세요. 이를 이용해서, 1부터 20까지의 수가 각각 짝수인지 홀수인지 출력하는 프로그램을 작성하세요.

```js
function evenOrOdd(x) {
  // 만약 x가 짝수면 'x: 짝수' 라고 출력
  
  if (x%2 === 0) {
    console.log(x + ': 짝수');
  } else {
    console.log(`${x}: 홀수`);
  }
  // 아니면 'x: 홀수'라고 출력 
// `홀수 ${x}: 홀수` 식으로 쓰면 +를 여러 번 쓰지 않고 쓸 수 있다. 
}


for (let i = 0; i < 20; i++) {
  evenOrOdd(i + 1);
}
```

### 문제 5

100 이하의 자연수 중 3과 5의 공배수를 모두 출력하는 프로그램을 작성하세요.
```js
for (let i = 0; i < 100; i++) {
  const num = i + 1
  if ((num % 15 === 0) && (num % 5 === 0)) {
    console.log(`${num}: 공배수`)
  } else {
    console.log(`${num}: 아님`)
  }
}
```

```js
for (let i = 0; i < 100; i++) {
  print(i + 1)
}

function print(num) {
  if ((num % 3 === 0) && (num % 5 === 0)) {
    console.log(`${num}: 공배수`)
  } else {
    console.log(`${num}: 아님`)
  }
}
```
### 문제 6

자연수를 입력받아, 그 수의 모든 약수를 출력하는 함수를 작성하세요.
```js
function print(x) {
  for (let i = 0; i < x; i++) {
    const num = i + 1
    if (x % num === 0) {
      console.log(`${num}: 약수`)
    } else {
      console.log(`${num}: 아님`)
    }
  }
}
```

### 문제 7

2 이상의 자연수를 입력받아, 그 수가 소수인지 아닌지를 판별하는 함수를 작성하세요.
- 강사님께서 '판별하는 함수'라고 문제를 내면, true or false로 반환하는 함수를 만들라는 뜻임.

```js
// 강사님 풀이
function isPrime(x) {
  // 소수: 1과 자기자신밖에 약수가 없는 수
   // -> 1과 자기자신이 아닌 약수가 하나라도 있으면 소수가 아니다.
   for (let i = 2; i < x; i++) {
     //우리가 체크해야 하는건 1과 자기자신 빼고 나머지들 중에 약수가 있는지를 보려고 하므로 조건식을 이렇게 세움.
     if (x % i === 0) {
       return false;
       //return은 함수 안에 있건 말건 루프 뿐만 아니라 함수 자체를 종료시킨다.
     }
   } return true;
   // for문을 다 돌아서 나온다는건 1과 자기자신 이외의 약수가 없다는 뜻이므로 return true를 써준다. 
}
```

### 문제 8

1부터 100까지의 수를 차례대로 출력하되, 자릿수에 3, 6, 9중 하나라도 포함되어 있으면 '짝!'을 대신 출력하는 프로그램을 작성하세요.
```js
for (let i = 0; i < 100; i++) {
  const num = i + 1
  const str = num.toString()
  if (str.includes('3') || str.includes('6') || str.includes('9')) {
    console.log('짝!')
  } else {
    console.log(num)
  }
}
```

### 문제 9

양의 정수를 입력받아, 다음과 같은 패턴의 출력을 하는 함수를 작성하세요.

1을 입력받은 경우:
```
*
```

3을 입력받은 경우:
```
*
* *
* * *
```

5를 입력받은 경우:
```
*
* *
* * *
* * * *
* * * * *
```
```js
// 강사님 풀이1- 중첩 루프를 사용
// 중첩 루프를 사용할 때는 변수를 i, j, k, l, m, n순으로 쓰는 게 관례임. 
  function print(height) {
  for (let i = 0; i < height; i++) {
    // 한 줄 출력
    let stars = '';
    for (let j = 0; j < i + 1; j++) {
    // 별 표 하나를 출력
      stars += '* ';
    // console.log()는 실행될 떄 줄바꿈을 해버리는 특징이 있다.
    // 그래서 반드시 별표 하나를 출력할 때 사용하는 게 X. 루프를 다 돌고 나와서 한 번 써줘야 함.
    }
    console.log(stars);
  }
}
```
```js
// 강사님 풀이2- repeat 메소드를 사용
  function print(height) {
    for (let i = 0; i < height; i++) {
    const stars = '* '.repaet(i + 1);
    console.log(stars);
  } 
}
```
```js
// 강사님 풀이3- repeat 메소드를 사용한 풀이 2에서 변수 stars에 담지 않고 바로 console.log에 출력함. 
  function print(height) {
    for (let i = 0; i < height; i++) {
    console.log( '* '.repeat(i + 1));
  } 
}
```

### 문제 10

양의 정수를 입력받아, 다음과 같은 패턴의 출력을 하는 함수를 작성하세요.

1를 입력받은 경우:
```
*
```

3를 입력받은 경우:
```
  *
 * *
* * *
 * *
  *
```

5를 입력받은 경우:
```
    *
   * *
  * * *
 * * * *
* * * * *
 * * * *
  * * *
   * *
    *
```
* 표를 그려서 규칙을 찾아볼 것
- ex) n번째 공백  *
      1      2   1
      2      1   2
      3      0   3
```js
// 강사님 풀이-1
function print(height) {
  for (let i = 0; i < height; i++) {
    const n = i + 1;
    const line = ' '.repeat(height - n) + '* '.repeat(n);
    // 공백 = 높이(height) - n(번째)
    console.log(line);
  }
    for (let i = height - 2; i >= 0; i--) {
    const n = i + 1;
    const line = ' '.repeat(height - n) + '* '.repeat(n);
    console.log(line);
  }
}
// 위 아래 코드가 중복되어 있어서 반복되는 코드 뭉치인 부분을 함수로 만들 수 있다. 
```


```js
// 강사님 풀이-2(풀이-1에서 중복되는 코드를 새로운 함수로 만들어서 넣고 print함수에서는 호출하도록 만듦.) 

// 중복되는 코드를 printLine이라는 함수를 새로 만들어서
//그 안에 코드 뭉치를 넣어두고, print 함수 내에서는 이 printLine 함수를 호출하도록 쓰도록 만듦. 
function printLine(height, i) {
  const n = i + 1;
  const line = ' '.repeat(height - n) + '* '.repeat(n);
  console.log(line);
}
function print(height) {
  for (let i = 0; i < height; i++) {
   printLine(height, i);
  }
    for (let i = height - 2; i >= 0; i--) {
   printLine(height, i);
  }
}

```


### 문제 11

두 수를 입력받아서, 두 수의 최대공약수를 반환하는 함수를 작성하세요. ([유클리드 호제법](https://ko.wikipedia.org/wiki/%EC%9C%A0%ED%81%B4%EB%A6%AC%EB%93%9C_%ED%98%B8%EC%A0%9C%EB%B2%95)을 참고하세요.)

### 문제 12

세 수를 입력받아 큰 것부터 차례대로 출력하는 함수를 작성하세요.

### 문제 13

자연수 `n`을 입력받아, `n`번째 피보나치 수를 반환하는 함수를 작성하세요.
