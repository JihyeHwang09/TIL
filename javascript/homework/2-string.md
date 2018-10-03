### 문제 11

문자열을 입력받아, 문자열 안에 들어있는 단어 중 가장 긴 단어를 반환하는 함수를 작성하세요. (문자열에 개행이 없다고 가정합니다.)
```js
// 풀이1 - split 메소드를 사용하지 않고, for 루프 사용
function getlongest(str) {
  let seenblank = false;
  let longest = '';
  let word = '';
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ' ') {
      seenblank = true;
    } else {
      seenblank = false;
    }
    if (seenblank) {
      if (longest.length < word.length) {
        longest = word;
      }
        word = '';
    } else {
      word += str[i];
      if (i === str.length - 1) {
        if (longest.length < word.length) {
          longest = word;
        }
      }
    }
  }
  return longest;
}
getlongest('happy tomato hi alphabet');

```
```js
//  풀이2 - split메소드, for...if 구문 사용
const getlongest2 = str => { 
 const arr = str.split(' ');
 console.log(arr);
  let memory = '';
  for (let item of arr) {
    if (item.length > memory.length) {
      memory = item;
    } 
  } 
  return memory;
}
getlongest2('happy tomato hi alphabet');
```

### 문제 12

문자열 `s`과 자연수 `n`을 입력받아, `s`의 첫 `n`개의 문자만으로 이루어진 새 문자열을 반환하는 함수를 작성하세요.
```js
const newstr = (str, n) => {
 return str.slice(0, n);
}
newstr('hello', 2);
```
### 문제 13

Camel case의 문자열을 입력받아, snake case로 바꾼 새 문자열을 반환하는 함수를 작성하세요.
```js 

function toSnakeCase(input) {
  // 대문자를 만나면 대문자를 소문자로 바꾼다.
  // '_'를 넣는다.
  // 대문자가 있는 문자열은 대문자로 바꿔준다.
  // snake case로 바꾼 새 문자열을 어딘가에 저장해두고 출력한다.
  let memory = '';

  for (let i = 0; i < input.length; i++) {

    if (input[i] === input[i].toUpperCase()) {
      memory += '_';
      memory += input[i].toLowerCase();
    } else {
      memory += input[i];
    }
  }
  return memory;
}

toSnakeCase('iAmHungry');
// i-am-hungry
toSnakeCase('youAreAGirl');
//you-are-a-girl
```
### 문제 15

`String.prototype.split`과 똑같이 동작하는 함수를 작성하세요.

예:
```
split('Hello World'); -> ['Hello World']
split('Hello World', ' '); -> ['Hello', 'World']
split('let,const,var', ',') -> ['let', 'const', 'var']
```
```js

function split(str, seperator) {
  let seen = false;
  let memory = '';
  let arr = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === seperator) {
      seen = true;
    } else {
      seen = false;
    }
    if (seen) {
      arr.push(memory);
      memory = '';
    } else {
      memory += str[i];
      console.log(memory);
      if (i === str.length - 1) {
        arr.push(memory);
      }
    }
  }
  return arr;
}
```
