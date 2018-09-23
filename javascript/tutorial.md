# tutorial
--

- JavaScript코드는 REPL이라는 도구를 이용해서 실행할 수 있다.
repl.it을 이용
- 
- JavaScript 언어는 모든 부분에서 대소문자를 구분한다.
- JavaScript는 세미콜론(;)을 이용해서 각 구문을 구분한다.
- JavaScript 언어는 공백에 민감하지 X. 코드를 읽기 쉽도록 공백을 깔끔하게 유지할 필요가 있다.

## 주석
- 지금은 실행하고 싶지 않은 코드가 있을 때, 코드에 부가적인 설명을 넣고 싶을 때 사용한다.
- 종류
  - // 한 줄 주석
    /* 여러 줄 주석 */


## 값(value)과 그 리터럴(literal)
- 값은 cpu를 떠다닌다.
- 문자열 값을 표현한 게 리터럴이라고 한다. 


## 값의 타입(type)
---
- JavaScript에서 다루어지는 모든 값은 그 **타입**을 가지고 있다.
typeof 1 => 'number' 
typeof 2.5 => 'number'
- JavaScript는 정수와 실수를 같은 종류(타입)으로 취급한다.
  typeof true => 'boolean'
   typeof false => 'boolean'
  -> true, false는  둘 다 boolean으로, 같은 종류이다. 
 --- 
 ## 표현식(expression)과 연산자(operator)
 ---
 > 연산의 대상이 되는 값 -> 피연산자
 > **값으로 변환될 수 있는 부분**을 표현식이라고 한다.
 > 연산자 우선순위: 수학과 같이 곱셈, 나눗셈은 덧셈, 뺄셈보다 연산자 우선순위가 높다.

 > 논리 연산
  - `|| 연산자`는 두 피 연산자 중 하나 이상이 true면 전체 결과값이 true가 된다. 
  - `&& 연산자`는 두 피 연산자가 모두 true여야 전체 결과값이 true가 된다. 

 > 진리값으로 취급하기
 - 값을 진리값처럼 취급할 수 있다.

## 변수(variable)
---
값을 재사용하기 위해서 변수를 사용한다.
- 종류
  -  `let` 변수
  -  `const`변수
 
 
 ## 제어 구문(흐름)
 ---
 - if 구문
 if (2 > 1) {
  console.log('괄호 안의 값이 `true`이면 이 영역의 코드가 실행됩니다.');
} else {
  console.log('괄호 안의 값이 `false`면 이 영역의 코드가 실행됩니다.');
}
-
   - (2 > 1)도 표현식이다. 이 계산의 결과값은 true이다.
    if (false) 
 ---
 // 조건문 
if (true) {
  alert('참일 때만 실행됩니다.')
} else {
  alert ('거짓일 때만 실행됩니다.')
}

---

// while 구문

* 만약에 javaScript가 무한루프에 빠졌을 경우-> 메뉴- 도구 더보기 - 작업 관리자 누르기
 -> 작업 관리자에 cpu 많이 잡아먹는 브라우저만 골라서 종료시키기
 
 - 반복문
 
  - 종류
  `for문`
  `while문`
  -  단순 반복을 할 때, for문을 while문보다 더 자주 쓴다.
 

## 함수(function)
- 'fuction' 키워드를 이용한 함수 선언
  > function calc(x, y, z) {
  let sum = x + y;
  return sum * z;
  // sum * z -> 반환값
}

- arrow function
  > 

- 함수를 호출하고, 함수는 값을 반환한다.



 
