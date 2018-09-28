### 문제 7

2 이상의 자연수를 입력받아, 그 수가 소수인지 아닌지를 판별하는 함수를 작성하세요.
```js
function primeNumber(num) {
  if (num >= 2) {
    for (let i = 2; i < num; i++) {
      if (num % i === 0) {
        return `${num}: 소수가 아님`
      } else {
        return `${num}: 소수`
      }
    }
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
        for (let i = 1; i <= num; i++) {
            console.log(('* ').repeat(i));
        }
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
    if (num > 0) {
        for (let i = 1; i <= num; i++) {
           console.log((" ").repeat(num - i).concat(('* ').repeat(i)));
        }
        for (let j = num - 1; j >= 1 ; j--) {
          console.log((" ").repeat(num - j).concat(('* ').repeat(j)));
        }
    }
}
diamond(1);
diamond(3);
diamond(5);
```
