### 문제 1

두 문자열을 입력받아, 대소문자를 구분하지 않고(case insensitive) 두 문자열이 동일한지를 반환하는 함수를 작성하세요.

예:
```
insensitiveEqual('hello', 'hello'); -> true
insensitiveEqual('hello', 'Hello'); -> true
insensitiveEqual('hello', 'world'); -> false
```
```js
// 긴 버전
function insensitiveEqual(str1, str2) {
  if (str1.toLowerCase() === str2.toLowerCase()) {
    return true
  } else {
    return false
  }
}
```
```js
// 짧은 버전
function insensitiveEqual(str1, str2) {
  return str1.toLowerCase() === str2.toLowerCase()
}
```

### 문제 2

문자열 `s`와 자연수 `n`을 입력받아, 만약 `s`의 길이가 `n`보다 작으면 `s`의 왼쪽에 공백으로 추가해서 길이가 `n`이 되게 만든 후 반환하고, 아니면 `s`를 그대로 반환하는 함수를 작성해보세요.

예:
```
leftPad('hello', 8); -> '   hello'
leftPad('hello', 3); -> 'hello'
```
```js
function leftPad(s, n) {
  if (s.length < n) {
    const spaceNum = n - s.length
    return ' '.repeat(spaceNum) + s
  } else {
    return s
  }
}
```
### 문제 3

문자열을 입력받아, 문자열 안에 들어있는 모든 모음(a, e, i, o, u)의 갯수를 반환하는 함수를 작성하세요.
```js
function count(str) {
  let num = 0
  for (let i = 0; i < str.length; i++) { 
    if (str[i] === 'a' || str[i] === 'e' || str[i] === 'i' || str[i] === 'o' || str[i] === 'u') {
      num += 1
    }
  }
  return num
}

count('hello')
```
### 문제 4

문자열을 입력받아, 해당 문자열에 포함된 문자의 종류와 갯수를 나타내는 객체를 반환하는 함수를 작성하세요.

예:
```
countChar('tomato'); -> {t: 2, o: 2, m: 1, a: 1}
```

### 문제 5

문자열을 입력받아 그 문자열이 회문(palindrome)인지 판별하는 함수를 작성하세요. (회문이란, '토마토', 'never odd or even'과 같이 뒤에서부터 읽어도 똑같이 읽히는 문자열을 말합니다.)
<!-- 우리가 입력받는 문자열의 공백은 무시하고 풀어볼 것 -->
```js
//내 풀이
const isPalindrome = (input) => {
    for (let i = 0; i < input.length; i++) {
      const left = i;
      const right = input.length -1 -i;
      if (input[left] !== input[right]) {
        return false;
      }   
    } 
    return true;
    // for문을 다 돌면서 비교했는데도 다른 게 없다면 회문이라는 거니까 return true쓰면 됨. 
} 
```
<!-- 
 강사님 풀이 
 비교했던 거를 또 비교하면 속도가 느려지므로 -->

<!-- input.length    input.length /2 -1
5               2 (0,1)
6               3 (0, 1, 2)
7               3 
8               4 (0, 1, 2, 3)
9               4 --> -->


```js
const isPalindrome = (input) => {
    for (let i = 0; i < input.length /2 -1; i++) {
      const left = i;
      const right = input.length -1 -i;
      if (input[left] !== input[right]) {
        return false;
      }   
    } 
    return true;
    // for문을 

```
### 문제 6

문자열을 입력받아, 그 문자열의 모든 '부분 문자열'로 이루어진 배열을 반환하는 함수를 작성하세요.

예:
```
subString('햄버거');
// 결과: ['햄', '햄버', '햄버거', '버', '버거', '거']
```
```js
const isPalindrome = (input) => {
  for (let i = 0; i <= input.length / 2 - 1; i++) {
    const left = i;
    const right = input.length - 1 - i;
    if (input[left] !== input[right]) {
      return false
    }
  }
  return true
}
```
### 문제 7

문자열을 입력받아, 해당 문자열에서 중복된 문자가 제거된 새로운 문자열을 반환하는 함수를 작성하세요.

예:
```
removeDuplicates('tomato'); -> 'toma'
removeDuplicates('bartender'); -> 'bartend'
```
```js
// str += 't'
// str += 'o'
// 뭘 봤는지 기억하는 문자열 변수를 만든다.
// 본 적 x -> 가져다 붙이고, 본 적 o -> 가져다 붙이지 x.

const removeDuplicates = (str) => {
  let memory ='';
  // 빈 문자열을 할당할 때 '' 사이에 띄어쓰지 X. 공백문자도 문자열이다. 
  for (let i = 0; i < str.length; i++) {
    if (!memory.includes(str[i])) {
      memory += str[i];
    }
  }
  return memory;
}
```

### 문제 8

이메일 주소를 입력받아, 아이디 부분을 별표(`*`)로 가린 새 문자열을 반환하는 함수를 작성하세요.

- 루프로 먼저 풀어보세요.
- `split` 메소드를 이용해서 풀어보세요.
```js
<!--  강사님 풀이1 - 루프로 풀이 -->
// 새로 글씨를 쓸 빈칸을 만들어둔다.
// 아직 @을 본 적 없다는 사실을 기억해 둔다. 
// 입력받은 문자열을 한 글자씩 본다.
// 아직 @을 본 적이 없다면 *를 쓴다.
// @을 본 적이 있다면 위에서 본 글씨를 그대로 쓴다.

const removeId = (input) => {
  let seen = false
  let memory = ''
  for (let i = 0; i < input.length; i++) {
    // 내가 지금 보고 있는 글자가 '@' 이면
    if (input[i] === '@') {
      // seen의 값을 true로 바꾼다.
      seen = true
    }

    // seen이 true이면
    if (seen) {
      // 내가 지금 보고 있는 글자를 그대로 memory에 덧붙인다.
      memory += input[i]  
    } else {
      // 아니면, 별표를 대신 덧붙인다.
      memory += '*'
    }
  }
  // 변환한 결과를 반환한다.
  return memory
}
```
```js
<!--  강사님 풀이2 - `split` 메소드 사용한 풀이 -->
const removeId2 = (input) => {
  // '@'을 기준으로 쪼갠 후
  const splitted = input.split('@')
  // id 부분과 같은 길이를 갖는 별표 문자열을 만든다.
  const stars = '*'.repeat(splitted[0].length)
  // 별표를 @, 도메인 부분과 이어붙인 후 반환한다.
  return stars + '@' + splitted[1]
}
```

### 문제 9

문자열을 입력받아, 대문자는 소문자로, 소문자는 대문자로 바꾼 결과를 반환하는 함수를 작성하세요.

```js
// 내 풀이1 - 루프 사용
function swapCase(input) {
// 소문자로 바꿨는데 소문자랑 똑같다 -> 소문자
// 대문자로 바꿨는데 대문자랑 똑같다 -> 대문자
let memory = '';
for (let i = 0; i < input.length; i++) {
    if (input[i] === input[i].toUpperCase()) {
    memory += input[i].toLowerCase();
    
    }
    if (input[i] === input[i].toLowerCase()) {
    memory += input[i].toUpperCase();
    }
  }
    return memory;
}

swapCase('JavaScript');
 'jAVAsCRIPT';
```
```js
<!-- 강사님 풀이1 -->
// 배열을 사용하지 않고, 루프를 사용해서 풀기
function swapCase(input) {
  let memory = ''
  for (let i = 0; i < input.length; i++) {
    if (input[i].toUpperCase() === input[i]) {
      memory += input[i].toLowerCase()
    } else {
      memory += input[i].toUpperCase()
    }
  }
  return memory
}

swapCase('JavaScript')
```
```js
<!-- 내 풀이2- arr메소드 사용 -->
function swapCase2(input) {
  let memory ='';
  const arr = Array.from(input);
  for (let item of arr) {
     if (item === item.toUpperCase()) {
    memory += item.toLowerCase();
    }
    if (item === item.toLowerCase()) {
    memory += item.toUpperCase();
    }
  }   
    return memory;
}
swapCase2('JavaScript');
```
```js
<!-- 강사님 풀이2 -->
// 배열 메소드를 사용해서 풀기
const swapCase = input => Array.from(input)
  .map(c => c.toUpperCase() === c ? c.toLowerCase() : c.toUpperCase())
  .join('')

swapCase('JavaScript')
```



### 문제 10

문자열을 입력받아, 각 단어의 첫 글자를 대문자로 바꾼 결과를 반환하는 함수를 작성하세요. (문자열에 개행이 없다고 가정합니다.)
```js
// 내 풀이 - 다 못품(제대로 작동 X)
function swapCaseFirst(str) {
  const arr = str.split(" ");
  let memory =;
  memory = arr.slice();
  for (let i = 0; i < arr.length; i++) {
     
   memory[i][0] = arr[i][0].toUpperCase();
  //  대입이 안됨..............

  }
  return memory;
}

swapCaseFirst('i am hungry');
```

```js
// 강사님 풀이1- 배열을 사용하지 않고, 루프를 사용해서 풀기
function capitalize(input) {
  let seenBlank = true
  let memory = ''

  for (let i = 0; i < input.length; i++) {
    if (seenBlank) {
      memory += input[i].toUpperCase()
    } else {
      memory += input[i]
    }

    if (input[i] === ' ') {
      seenBlank = true
    } else {
      seenBlank = false
    }
  }

  return memory
}

capitalize('i am hungry')
```
```js
// 강사님 풀이2- 배열 메소드를 사용해서 풀기
const capitalize = input => input.split(' ')
  .map(word => word.slice(0, 1).toUpperCase() + word.slice(1))
  .join(' ')

capitalize('i am hungry')
```

### 문제 11

문자열을 입력받아, 문자열 안에 들어있는 단어 중 가장 긴 단어를 반환하는 함수를 작성하세요. (문자열에 개행이 없다고 가정합니다.)

### 문제 12

문자열 `s`과 자연수 `n`을 입력받아, `s`의 첫 `n`개의 문자만으로 이루어진 새 문자열을 반환하는 함수를 작성하세요.

### 문제 13

Camel case의 문자열을 입력받아, snake case로 바꾼 새 문자열을 반환하는 함수를 작성하세요.

### 문제 14

Snake case의 문자열을 입력받아, camel case로 바꾼 새 문자열을 반환하는 함수를 작성하세요.

### 문제 15

`String.prototype.split`과 똑같이 동작하는 함수를 작성하세요.

예:
```
split('Hello World'); -> ['Hello World']
split('Hello World', ' '); -> ['Hello', 'World']
split('let,const,var', ',') -> ['let', 'const', 'var']
```

### 문제 16

2진수를 표현하는 문자열을 입력받아, 그 문자열이 나타내는 수 타입의 값을 반환하는 함수를 작성하세요. (`parseInt`를 사용하지 말고 작성해보세요.)

예:
```
convertBinary('1101'); -> 13
```

### 문제 17

숫자로만 이루어진 문자열을 입력받아, 연속된 두 짝수 사이에 하이픈(-)을 끼워넣은 문자열을 반환하는 함수를 작성하세요.

예:
```
insertHyphen('437027423'); -> '4370-274-23'
```
