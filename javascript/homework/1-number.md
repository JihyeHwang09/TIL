### 문제 7

2 이상의 자연수를 입력받아, 그 수가 소수인지 아닌지를 판별하는 함수를 작성하세요.
```js
function primeNumber(num) {
  if (num >= 2) {
  // 2 이상의 자연수일 경우에만 실행
    for (let i = 2; i < num; i++) {
   // 소수는 약수가 1과 자기 자신만 있는 경우이므로
   // 2부터 num-1까지만 반복문을 실행한다.
      return (num % i === 0) ? `${num}: 소수가 아님` : `${num}: 소수`;
    } 
    // 1과 자기자신이 아닌 수로 나누어 떨어질 경우(다른 약수가 있을 경우)에는 소수가 아니다.
  } else {
  // 입력한 값이 2 이상의 자연수가 아닐 경우, 에러 메시지 출력
      throw Error('2 이상의 자연수를 입력해주세요.');
  }
}
primeNumber(20);
primeNumber(19);
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
function rightTriangle(num) {
    if (num > 0) {
        // 라인 번호를 변수 i로 놓음.
        for (let i = 1; i <= num; i++) {
        // 라인 번호와 *의 개수가 같으므로 i값이 들어오면 *을 i의 개수만큼 반복해서 출력
            console.log(('* ').repeat(i));
        }
    } else {
    throw Error('양의 정수를 입력하세요');
    }
}

rightTriangle(1);
rightTriangle(3);
rightTriangle(5);
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
```js
function diamond(num) {
// 마름모를 삼각형과 역삼각형의 두 부분으로 나누어서 그리기
    if (num > 0) {
        // 윗부분 삼각형
        for (let i = 1; i <= num; i++) {
          // 공백 + i = num. 즉, 공백의 개수 = num - i. 
          // 공백과 '* '을 각각 반복후에 concat으로 연결
           console.log((" ").repeat(num - i).concat(('* ').repeat(i)));
        }
        // 아랫부분 역삼각형
        for (let j = num - 1; j >= 1 ; j--) {
        // 
          console.log((" ").repeat(num - j).concat(('* ').repeat(j)));
        }
    } else {
      throw Error('양의 정수를 입력해주세요.')
    }
}
diamond(1);
diamond(3);
diamond(5);
```
