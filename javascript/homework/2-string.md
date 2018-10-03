### 문제 11

문자열을 입력받아, 문자열 안에 들어있는 단어 중 가장 긴 단어를 반환하는 함수를 작성하세요. (문자열에 개행이 없다고 가정합니다.)
```js
// 풀이1 - split 메소드를 사용하지 않고, for 루프 사용


// longest에 값을 대입
function getlongest(str) {
// seenblank: 공백을 봤는지 안봤는지 여부를 boolean형으로 저장
  let seenblank = false;
// longest: 가장 긴 단어를 저장할 변수
  let longest = '';
// word: 공백을 보기 전까지의 글자를 적립해둘 변수
  let word = '';
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ' ') {
      seenblank = true;
    } else {
      seenblank = false;
    }
    if (seenblank) {
// 공백을 만나면 그 전까지 적립했던 글자들(단어)의 길이와 longest의 길이를 비교
      if (longest.length < word.length) {
// -> 단어의 길이가 더 길면, longest에 대입 
        longest = word;
      }
// word를 빈 문자열로 비워준다.
        word = '';
    } else {
// 공백을 만나지 않으면, 단어에 str[i]를  쌓는다. 
      word += str[i];
      if (i === str.length - 1) {
// 만약, 입력받은 문자열 str의 끝부분 인덱스에 도달했을 경우, 
// longest와 그 전까지 적립했던 글자들의 길이를 비교 
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
// splist 메소드를 이용하여 '공백'을 기준으로 나눠서 배열에 담아준다.
 const arr = str.split(' ');
  let longest = '';
 // for...of 루프를 돌면서 단어(item)의 길이와 longest의 길이를 비교한다.
  for (let item of arr) {
// 단어(item)의 길이가 longest의 길이보다 길면, 
    if (item.length > longest.length) {
// longest의 값을 item의 값으로 바꿔준다.
      longest = item;
    } 
  } 
  return longest;
}
getlongest2('happy tomato hi alphabet');
```

### 문제 12

문자열 `s`과 자연수 `n`을 입력받아, `s`의 첫 `n`개의 문자만으로 이루어진 새 문자열을 반환하는 함수를 작성하세요.
```js
const newstr = (str, n) => {
  // slice 메소드를 이용해서 문자열의 첫번째칸(인덱스 0번째부터 n개만큼) 잘라서 반환한다.
 return str.slice(0, n);
}
newstr('hello', 2);
```
### 문제 13

Camel case의 문자열을 입력받아, snake case로 바꾼 새 문자열을 반환하는 함수를 작성하세요.
```js 

function toSnakeCase(input) {

  // snake case로 바꾼 새 문자열을 어딘가에 저장해두고 반환해야 하므로 변수 memory를 만든다.
  let memory = '';

  for (let i = 0; i < input.length; i++) {
  // 대문자로 바꾼 문자열이 원본 문자열과 같은지 비교한다.
    if (input[i] === input[i].toUpperCase()) {
  // 대문자를 만나면 '_'를 넣는다. 그리고 대문자를 소문자로 바꿔준다. 
      memory += '_';
      memory += input[i].toLowerCase();
    } else {
  // 소문자이면, 변수 memory에 한 글자씩 쌓아준다.   
      memory += input[i];
    }
  }
  return memory;
}

toSnakeCase('iAmHungry');
// i_am_hungry
toSnakeCase('youAreAGirl');
//you_are_a_girl
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

function split(str, flag) {
  // seen: 구분자를 봤는지 안봤는지 여부를 boolean형으로 저장
  let seen = false;
  // memory: 문자열을 저장하는 변수 
  let memory = '';
  // arr: 빈 배열을 만든다.
  let arr = [];
  // 입력한 문자열의 길이만큼 루프를 돌면서
  for (let i = 0; i < str.length; i++) {
    // 구분자(flag)와 str[i]값이 같다면 
    if (str[i] === flag) {
      // seen에 true값을 대입한다.
      seen = true;
    } else {
      // 구분자(flag)와 str[i]값이 다르다면
      // seen에 false값을 대입한다.
      seen = false;
    }
    // seen에 true값이 들어있다면(구분자를 봤다면)
    if (seen) {
    // memory에 쌓여있는 글자를 배열의 가장 오른쪽에 추가한다.
      arr.push(memory);
    // memory는 새로운 문자열을 쌓을 것이므로 빈 문자열로 만들어준다.
      memory = '';
      // seen에 false값이 들어있다면(구분자를 보지 않았다면)
    } else {
      // 한 글자(str[i])를 memory에 쌓아준다.
      memory += str[i];
      // 입력한 문자열의 마지막 번째까지 도달했다면, 
      if (i === str.length - 1) {
      // memory에 쌓여있는 글자를 배열의 가장 오른쪽에 추가한다.
        arr.push(memory);
      }
    }
  }
  // for 루프를 돌면서 만든 배열을 반환한다.
  return arr;
}
```
