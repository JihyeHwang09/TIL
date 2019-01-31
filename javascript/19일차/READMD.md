# 예외 처리
## 동기식 코드에서의 예외 처리
- JavaScript 코드에서 발생할 수 있는 에러에는 다양한 것들이 있습니다. 문법 에러와 같이 프로그래머의 실수로 인해 에러가 발생하는 경우도 있지만, 네트워크 에러와 같이 코드와는 무관한 이유로 발생하는 에러도 있습니다.

- 코드 실행 중에 에러가 발생하면, 코드의 실행이 중단되어 그 시점에 실행 중이었던 작업을 완료할 수 없게 됩니다. JavaScript는 이로부터 코드의 실행 흐름을 원상복구할 수 있는 기능을 제공하며, try...catch...finally 구문을 사용하면 에러가 나더라도 코드의 실행을 지속할 수 있습니다.

```js
try {
  console.log('에러가 나기 직전까지의 코드는 잘 실행됩니다.');
  // Array 생성자는 배열의 길이를 인수로 받는다. -1이 들어가서 에러가 남
// try문 안에서 에러가 나지 않으면, catch문 안에 있는 코드는 실행이 되지 X
  new Array(-1); // RangeError: Invalid array length
  console.log('에러가 난 이후의 코드는 실행되지 않습니다.');
} catch (e) {
  console.log('코드의 실행 흐름이 catch 블록으로 옮겨집니다.');
  alert(`다음과 같은 에러가 발생했습니다: ${e.name}: ${e.message}`);
}
// try -catch문으로 에러를 잡지 않았다면, 아래 코드는 실행되지 X.
// 에러가 잡혀야만 그 후의 코드가 실행됨
console.log('에러가 잡혔다면, 다음에 나오는 코드도 문제없이 실행됩니다.')


// 에러가 나기 직전까지의 코드는 잘 실행됩니다.
// 코드의 실행 흐름이 catch 블록으로 옮겨집니다.
// 에러가 잡혔다면, 다음에 나오는 코드도 문제없이 실행됩니다.
```
- 에러가 났을 때 원상복구를 시도할 코드를 try 블록 내부에 작성하면, 에러가 발생했을 때 코드의 실행 흐름이 try 블록에서 catch 블록으로 옮겨갑니다. 이 때, catch 블록 안에서는 에러에 대한 정보를 담고 있는 객체(위 코드의 e)를 사용할 수 있습니다.

- try 블록은 예외 처리를 위해서만 쓰이는 것은 아닙니다. try 블록 바로 뒤에 finally 블록이 오면, finally 블록에 있는 코드는 try 블록 안에서의 에러 발생 여부와 관계 없이 **무조건 실행**됩니다. 심지어 try 블록 내에서 return, break, continue 등으로 인해 코드의 실행 흐름이 즉시 이동될 때에도 마찬가지입니다.

```js
for (let i of [1, 2, 3, 4, 5]) {
  try {
    //   i = 1
    //   i = 2
    //   i = 3
    if (i === 3) {
        // break를 만나면, 코드의 실행 흐름이 루프를 빠져나오게 되는데!!
        // for루프 안에 finally가 있으므로 -> finally 안의 코드를 실행한 후에!!
        // 루프를 빠져나온다.
      break;
    }
    // finally는 무조건 실행되어야 하므로 break를 만나서 루프를 빠져나가기 전에 finally를 실행한 후 빠져나간다.
  } finally {
    console.log(`현재 i의 값: ${i}`);
  }
}
```
 finally 블록은 catch 블록과도 같이 사용됩니다. 이 때 코드의 실행 순서를 정리해 보면 다음과 같습니다.

에러가 안 났을 때: try - finally
에러가 났을 때: try - 에러 발생 - catch - finally
아래 코드를 통해 코드의 실행 순서를 시험해보세요.
```js
try {
  console.log('try');
  new Array(-1); // RangeError: Invalid array length
} catch (e) {
  console.log('catch');
} finally {
  console.log('finally');
}



// try
// catch
// finally
```

```js
try {
  const length = prompt('배열의 길이를 입력하세요.')
  //prompt로 입력받은 값은 문자열이므로 parseInt로 정수를 써야 한다.
  const arr = new Array(parseInt(length))
} catch (e) {
  alert('제대로 된 숫자를 입력하세요.')
} finally {
  console.log('finally');
}
```

## 직접 에러 발생시키기

- Error 생성자와 throw 구문을 사용해서 프로그래머가 직접 에러를 발생시킬 수 있습니다.
```js

// 에러 생성자는 자바스크립트 자체에 내장되어 있는 생성자
// new Error 에러 객체를 throw한다.
const err = throw new Error('짝수가 아닙니다.')
// 에러 객체만 throw할 수 있다.
// 아래 코드는 에러가 발생하지 X
throw 1
```

```js
// 우리만의 Error 클래스를 만들고, 그 클래스를 이용해서 에러 처리를 할 수 있다.
class MyError extends Error {
    //...params는 나머지 매개변수 문법 
    // 나머지 매개변수들이 배열로 담긴다
  constructor(value, ...params) {
    super(...params);
    this.value = value;
    // name속성은 매개변수의 속성을 나타낸다.
    this.name = 'MyError';
  }
}

try {
  const even = parseInt(prompt('짝수를 입력하세요'));
  if (even % 2 !== 0) {
    throw new MyError(even, '짝수가 아닙니다.');
  }
} catch (e) {
  if (e instanceof MyError) {
    console.log(e.value);
  }
}
```
## 비동기식 코드에서의 예외 처리
### 비동기 콜백
- 비동기식으로 작동하는 콜백의 내부에서 발생한 에러는, 콜백 바깥에 있는 try 블록으로는 잡아낼 수 없습니다.
```js
function func1() {

  try {
    // setTimeout()은 작업큐에 이따가 실행해달라고 부탁하고 넘어가는 거므로
  // setTimeout()바깥에 try문으로 감싸고 있더라도
  // func1이 실행될 때는 setTimeout()이 실행되는 게 아니므로 에러가 잡히지 X
  setTimeout(() => {
    throw new Error('에러!');
  });
} catch (e) {
  console.error(e);
}
}
```
JavaScript 엔진은 에러가 발생하는 순간 호출 스택을 되감는 과정을 거칩니다. 이 과정 중에 try 블록을 만나야 코드의 실행 흐름을 원상복구시킬 수 있습니다. 위 예제에서 setTimeout에 넘겨진 콜백에서 에러가 발생하면, 호출 스택을 따라 올라가도 try 블록을 만나는 것이 아니므로, 코드의 실행 흐름이 catch 블록으로 옮겨지지 않는 것입니다.

따라서, 위 예제의 try 블록을 비동기 콜백 내부에 작성해주어야 합니다.
```js
// 
// 콜백 바깥이 아니라 안에 작성해야 에러를 잡을 수 있다.
setTimeout(() => {
  try {
    throw new Error('에러!');
  } catch (e) {
    console.error(e);
  }
});
```
### Promise
- Promise 객체는 세 가지 상태를 가질 수 있습니다.

pending - Promise 객체에 결과값이 채워지지 않은 상태
fulfilled - Promise 객체에 결과값이 채워진 상태(resolved라고도 함)
rejected - Promise 객체에 결과값을 채우려고 시도하다가 에러가 난 상태

Promise 객체가 rejected 상태가 되면, 이 Promise에 대해서는 then 메소드에 첫 번째 인수로 넘겨준 콜백이 실행되지 않고, 두 번째 인수로 넘겨준 콜백이 대신 실행됩니다. 그리고 이 콜백에는 에러 객체가 첫 번째 인수로 주어집니다.

```js
const p = new Promise(resolve => {
  const even = parseInt(prompt('짝수를 입력하세요'));
  if (even % 2 !== 0) {
    throw new Error('짝수가 아닙니다.');
  } else {
    resolve(even);
  }
});

p.then(even => {
  return '짝수입니다.';
  // 에러가 발생했을 때, 이 콜백이 실행된다
  //then 메소드의 2번째 인수로 에러 콜백을 넘겨준다
}, e => {
  return e.message;
}).then(alert);
```

혹은, catch 메소드를 통해 에러 처리 콜백을 지정해줄 수도 있습니다.
```js
p.then(even => {
  return '짝수입니다.';
}).catch(e => {
  return e.message;
}).then(alert);
```
만약, then 메소드의 연쇄 안에서 에러가 발생하면, try...catch 구문과 유사하게 처음 만나는 에러 처리 콜백으로 코드의 실행 흐름이 건너뛰는 결과를 낳게 됩니다.

```js
// undefined가 full filled 되어있는 Promise를 생성
Promise.resolve()
  .then(() => {
    // then 안에서 에러가 발생하면, 다음 then이 실행되는 게 X
    // catch콜백으로 실행 흐름이 건너뜀
    // try -catch처럼 Promise에서는 then ~catch를 사용할 수 있음
    // 우리가 이런 코드를 작성하지는 않더라도, 코드를 보고 해석할 수는 있어야 한다. 
    // Promise에 finally 메소드는 지금은 없으나 곧 추가될 예정임
    throw new Error('catch 메소드를 통해 예외 처리를 할 수 있습니다.');
  })
  .then(() => {
    console.log('이 코드는 실행되지 않습니다.');
  })
  .catch(e => {
    return e.message;
  })
  .then(console.log);
  ```
### 비동기 함수
앞에서 봤던 Promise 객체의 예외 처리 방식은, 일반적인 동기식 예외 처리 방식과 다르게 콜백을 사용하고 있어서 코드를 복잡하게 만드는 원인이 됩니다.

비동기 함수 내부에서는, rejected 상태가 된 Promise 객체를 동기식 예외 처리 방식과 동일하게 try...catch...finally 구문으로 처리할 수 있습니다.
```js
// 비동기 함수인 경우 -> rejected 상태인 함수를 await하면 에러가 발생하고,
// 그 에러는 try ~catch ~finally 구문으로 잡을 수 있다.
async function func() {
  try {
    // 'https://nonexistent-domain.nowhere'이런 도메인이 없으므로 요청이 에러가 남
    // 이에 대한 에러 처리를 try catch로 할 수 있음
    const res = await fetch('https://nonexistent-domain.nowhere');
  } catch (e) {
    console.log(e.message);
  }
}

func(); // 출력 결과: Failed to fetch
```

단, Promise 객체에 대해 await 구문을 사용하지 않는 경우, 에러가 발생해도 catch 블록으로 코드의 실행 흐름이 이동하지 않는다는 사실을 기억하세요.
- 비동기 함수인 경우 -> rejected 상태인 함수를 **await구문을 사용하지 않으면**, 에러가 발생해도 catch 블록으로 코드의 실행 흐름이 이동하지 않는다!!
```js
async function func() {
  try {
    fetch('https://nonexistent-domain.nowhere');
  } catch (e) {
    console.log(e.message);
  }
}

func(); // 아무것도 출력되지 않습니다.
```
