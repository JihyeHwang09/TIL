# 모던 웹 서비스의 구성요소
## Access Token & JWT
### JWT 실습
- ![Token Based Auth](https://i.stack.imgur.com/3NkXs.png)
- JWT는 서버가 만들어주는 토큰
- [JWT 실습](https://tidy-week.glitch.me/)


- 토큰 요청하기2// 로그인 안하면, 정보를 가져올 수 없게
- get 요청을 읽기전용, 정보를 보낼때는 post로 요청!
```js
// 토큰 받아오기
let token;
axios.post('/auth', {
  username: 'fast',
  password: 'campus'
}).then(res => {
  token = res.data.token
  console.log(`token: ${token}`)
})
//  axios에 post로 요청 보냄
// axios.post('/auth', {
//   username: 'fast',
//   password: 'campus'
// }).
// 까지 실행하면 promise 객체가 반환됨.
// 지금은 promise 객체가 비어있는 상태
// .then(res => {
//   token = res.data.token
//   console.log(`token: ${token}`)
// })
//then이후에 실행되면 promise 객체가 채워짐
```
```js
// 토큰으로 요청하기 1
axios.get('/auth', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
//  promise에 값이 채워지면(작업이 끝나면) 할 일 
}).then(res => {
  prettyPrint(res.data)
})
```
- 이 사용자 이름과 암호는 강사님이 미리 만들어두신 것. 
- 토큰은 사람마다 달라야 한다. 
```js
// 토큰으로 요청하기 2
// 로그인 안하면, 정보를 가져올 수 없게 한다. 
axios.get('/some-api', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
}).then(res => {
  prettyPrint(res.data)
})
```

```js
// 토큰으로 요청하기 3
axios.post('/count', null, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
}).then(res => {
  prettyPrint(res.data)
})
```
- 토큰을 포함시키지 않고 요청을 보내면, 401 에러가 난다. 
- postman이든 axios든 정해진 방법으로 요청을 보내면, 정보를 가져올 수 있다. 



```js
// 개발자 도구에서 입력한 코드들
// 토큰 받아오기
let token;
axios.post('/auth', {
  username: 'fast',
  password: 'campus'
}).then(res => {
  token = res.data.token
  console.log(`token: ${token}`)
})
Promise {<pending>}
VM138:8 token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZhc3QiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1NDExMjU3MTh9.FGx5UZwqhz1QY30vwoGpcVnCpQmOgVuOAQSly87maGI
token
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZhc3QiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1NDExMjU3MTh9.FGx5UZwqhz1QY30vwoGpcVnCpQmOgVuOAQSly87maGI"
```
```js
// 토큰으로 요청하기 2
axios.get('/some-api', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
}).then(res => {
  prettyPrint(res.data)
})
Promise {<pending>}
(index):102 {
  "ok": true,
  "message": "Hello JWT!"
}
```
```js
// 토큰으로 요청하기 3
axios.post('/count', null, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
}).then(res => {
  prettyPrint(res.data)
})
Promise {<pending>}
(index):102 {
  "ok": true,
  "count": 74
}

```
### Axios Instance
- Axios에서는 편의기능을 내장하고 있다.
- 위의 예제에서는 토큰이 포함된 요청을 보낼 때마다 매번 config 객체(axios.get의 두 번째 인자, axios.post의 세 번째 인자)를 통해 헤더를 설정해주고 있습니다. 모든 요청에 똑같은 식으로 헤더를 넣어주는 일은 번거롭고, 또 에러를 일으키기 쉽겠죠? (Don't Repeat Yourself!)

- Axios는 이렇게 중복된 설정을 하지 않도록 해주는 편의도구를 제공하고 있습니다. 그것을 Axios instance라고 부르는데, 한 번 config 객체를 넘겨서 Axios instance를 생성하면 해당 instance를 통해 보내는 요청에는 config 객체가 자동으로 설정됩니다.
```js
// Axios.create
const authedAxios = axios.create({
    // header를 여기서 설정해주면,
    // 인스턴스를 실행할 때마다 매번 이 헤더가 자동으로 요청을 보낼 때 포함됨 
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
authedAxios.get('/auth').then(res => {
  prettyPrint(res.data)
})
authedAxios.get('/some-api').then(res => {
  prettyPrint(res.data)
})
authedAxios.post('/count').then(res => {
  prettyPrint(res.data)
})
```

- 참고 링크
- (https://blog.outsider.ne.kr/1160)
- [react관련 강의 하시는 분 블로그](https://velopert.com/2448)


- [출처 url](https://swalloow.github.io/implement-jwt)
- ![JWT Web Token](https://cdn.auth0.com/blog/legacy-app-auth/legacy-app-auth-5.png)
- JWT에 대한 소개는 생략하고 Token이 어떻게 구성되어 있는지 간략하게 알아보겠습니다. JSON Web Token은 세 파트로 나뉘어지며, 각 파트는 점(.)에 의해 구분됩니다. 이를 테면 xxxxx.yyyyy.zzzzz 이런식입니다.

- Header는 토큰의 타입과 해시 암호화 알고리즘으로 구성되어 있습니다.
- Payload는 claim 정보를 포함하고 있습니다. userId, expire, scope 등이 여기에 해당합니다.
- 마지막으로 Signature는 secret key를 포함하여 암호화되어 있습니다.
- ![JWT Process](https://cdn.auth0.com/content/jwt/jwt-diagram.png)
- 일반적으로 JWT 토큰 기반의 인증 시스템은 위와 같은 프로세스로 이루어집니다. - 처음 사용자를 등록할 때 Access token과 Refresh token이 모두 발급되어야 합니다.
---
1. 먼저 사용자가 id와 password를 입력하여 로그인을 시도합니다.
2. 서버는 요청을 확인하고 secret key를 통해 Access token을 발급합니다.
3. 이후 JWT가 요구되는 API를 요청할 때는 클라이언트가 Authorization header에 Access token을 담아서 보냅니다.
4. 서버는 JWT Signature를 체크하고 Payload로부터 user 정보를 확인해 데이터를 리턴합니다.
---

- jwt는 토큰의 한 가지 형식일 뿐이다.
- 다른 토큰 형식을 사용할 수 있다. 
- 항상 똑같은 형식으로 토큰을 주고 받는 건 아니다.
- 세부적인 토큰 형식이나 토큰을 포함시키는 방식은 서버마다 다를 수 있다. 
- **토큰을 어떻게 포함시켜야 하는지 서버 개발자에게 물어봐야 한다.**
- **서버 개발자가 토큰을 어떻게 포함시킬지 설명서를 줄 것이다.**


### 쿠키와 토큰의 차이점
- `인증 토큰(Authentication Token)`
- 인증 토큰 저장소로 어떤 서버는 쿠키를 사용하는 경우
- 쿠키를 만들어내고 쿠키를 저장하는 것도 서버 개발자가 하는 일이다.
-  직접 관리하는 경우 
    - 여러 가지 방법 중 하나는 localStorage를 사용한다.
    - But 새로고침 버튼을 누르면 정보가 날아간다. (이유: 변수에 정보를 저장했기 때문에)
- 쿠키는 저장소이고, 토큰은 내가 누구인지 나타내는 값을 의미한다. 

### 토큰의 유효기간을 정하는 방법
- 김승하, abcd라는 토큰, 2018-11-07일 이라는 정보를 서버에 저장해 둔다. 
- 토큰의 유효기간이 지났으면, 서버에서 토큰이 유효하지 않다는 응답을 준다. 
- 토큰의 유효기간이 얼마 남지 않은 경우, 브라우저에 알려준다. 
- 오랜만에 어떤 사이트에 접속하면 토큰이 유효하지 않다고 뜰 수 있다.

# 비동기 프로그래밍
- 이 작업을 해달라고 부탁하고 넘어가는 것
- 그리고 작업이 끝나면, 이 통에 작업 결과물을 담아줄래?

### Promise
- Promise는 '언젠가 끝나는 작업'의 결과값'을 담는 통과 같은 객체이다. 
- Promise 객체가 만들어지는 시점에는 그 통 안에 무엇이 들어갈지 모를 수도 있다.
- 대신 then 메소드를 통해 콜백을 등록해서, 작업이 끝났을 때 결과값을 가지고 추가 작업을 할 수 있다. 

- Promise 객체를 생성하는 가장 쉬운 방법은 `Promise.resolve` 정적 메소드를 사용하는 것이다. 
```js
const p = Promise.resolve(1);
```
- 위 코드에서 `1`이라는 결과값을 갖는 Promise 객체를 생성했다.
- 그러나 이 코드는 비동기 작업을 하고 있지는 않다.

- 비동기 작업을 하는 Promise객체는 `Promise`생성자를 통해 만들 수 있다. 
```js
// 생성자 Promise에 new를 붙여줘서 인스턴스를 생성한다. 
// new Promise할 때는, 값을 반환하기 위해 resolve를 사용함
// then을 쓸 때는 그냥 return해주면 된다. 
// 브라우저에 부탁할 수도 있지만,
// resolve: 작업이 성공했을 때 실행할 것
// reject: 작업이 실패했을 때 에러 반환
//  new Promise((resolve, reject) => {}) 우리가 직접 Promise를 생성할 수 있다.
// resolve, reject 자리에는 각각 함수가 들어온다.
const p = new Promise((resolve, reject) => {
    // 이 자리에는 동기, 비동기 코드 둘 다 올 수 있다. 
  setTimeout(() => {
      // 2초 뒤에 작업큐에 등록됨. -> 호출 스택으로 옮겨져서 실행됨
    console.log('2초가 지났습니다.');
    // resolve('hello');
    // 작업이 성공했을 때 hello라는 문자열이 promise통에 들어감. 
    // 그때! 작업큐에 then메소드로 등록해둔 콜백이 작업큐에 들어감.
    resolve('hello');
  }, 2000);
});


// p.then(msg => {
//   console.log(msg); // hello
// })이 표현식의 결과도 promise객체를 반환한다.
// 함수 매개변수 이름인 msg는 내 마음대로 바꿔도 됨. But 사람들이 보통 많이 쓰는 msg로 썼음
// 그 전의 promise통이 채워지면, 그때! 작업큐에 이 콜백이 등록된다.
p.then(msg => {
  console.log(msg); // hello
  // 윗 줄의 promise통이 채워지면, 그때 이 then메소드에 있는 콜백 함수가 등록되고,
  // 이 promise통이 채워지면, 다음 then메소드가 실행된다. 
}).then((=> {
  ...
})).then((=> {
  ...
})).then((=> {
  ...
  //에러가 발생하면 catch라는 메소드가 실행됨
})).catch(err => {

})
// then메소드를 쓰면, 값이 채워졌을 때 실행할 코드를 등록할 수 있다. 


// 실행 순서: 먼저 Promise통이 생기고, 
// p.then 안에 있는 console.log(msg)가 실행된 후, Promise안에 있는 코드가 실행됨
```
- then 메소드에는 아주 중요한 특징이 있는데, 바로 then 메소드 자체도 Promise 객체를 반환한다는 것입니다. 이 때, 콜백에서 반환한 값이 곧 Promise의 결과값이 됩니다.

- then메소드를 사용하면 연이어 실행할 콜백 함수를 중첩해서 쓰지 않고(cf) 장풍 날리는 그림) 깔끔하게 콜백 함수를 쓸 수 있다.
- 이어붙이는 과정을 체이닝이라고 한다. 

- then 메소드에는 아주 중요한 특징이 있는데, 바로 then 메소드 자체도 Promise 객체를 반환한다는 것입니다. 이 때, 콜백에서 반환한 값이 곧 Promise의 결과값이 됩니다.

- 반환값이 다음 promise에 채워진다.
- 만일, 반환값이 promise라면(통 자체를 넘기면) -> 그 통을 열어서 안에 있는 내용물이 다음통에 들어간다.

> 15번 예제 코드(delya-promise-exmaple)는 슬랙에 강사님이 올려주시면, 붙여넣기!

- 이제 HTTP 통신을 할 때 Promise가 어떻게 사용되는지 살펴보겠습니다. 아래에 사용된 axios는 JavaScript를 통해 직접 요청을 보내기 위해 널리 사용되는 라이브러리입니다. GET 메소드로 요청을 보내기 위해 axios.get() 함수를 사용할 수 있는데, 이 때 Promise 객체가 반환됩니다.

```js
// 반환된 값이 promise 객체임 
const axios = require('axios');
const API_URL = 'https://api.github.com';

axios.get(`${API_URL}/repos/facebookincubator/create-react-app/issues?per_page=10`)
  .then(res => {
    console.log('최근 10개의 이슈:');
    res.data
      .map(issue => issue.title)
      .forEach(title => console.log(title));
    console.log('출력이 끝났습니다.');
  });
```
- 9번 예제와 17번 예제가 같은 동작을 하는 코드임
- promise의 핵심은 비동기 작업을 값으로 변환했다는 것이다.
- 비동기 작업을 값으로 바꾸면,
- 9번 예제 - 콜백으로 하는 방법
- 17번 예제 - promise 이용
    - 
```js
const API_URL = 'https://api.github.com';
const starCount = {};
const axios = require('axios');

// 1. Github에 공개되어있는 저장소 중, 언어가 JavaScript이고 별표를 가장 많이 받은 저장소를 불러온다.
axios.get(`${API_URL}/search/repositories?q=language:javascript&sort=stars&per_page=1`)
  // 2. 위 저장소에 가장 많이 기여한 기여자 5명의 정보를 불러온다.
  .then(res => axios.get(`${API_URL}/repos/${res.data.items[0].full_name}/contributors?per_page=5`))
  // 3. 해당 기여자들이 최근에 Github에서 별표를 한 저장소를 각각 10개씩 불러온다.
  .then(res => {
    //   ps는 promise로 이루어진 배열

    const ps = res.data.map(user => axios.get(`${API_URL}/users/${user.login}/starred?per_page=10`));
    return Promise.all(ps);
  })
// promise를 이용함
  .then(ress => Promise.all(ress.map(r => r.data)))
  // 아래의 코드처럼 콜백으로만 나타냈을 때는 엄청 길고 복잡함
//   if (repoArrs.length === 5) {
//           for (let repoArr of repoArrs) {
//             for (let repo of repoArr) {
//               if (repo.full_name in starCount) {
//                 starCount[repo.full_name]++;
//               } else {
//                 starCount[repo.full_name] = 1;
//               }
//             }
//           }
//           console.log(starCount);
//         }
//       });
//     }
// 와 같은 코드임




  // 4. 불러온 저장소를 모두 모아, 개수를 센 후 저장소의 이름을 개수와 함께 출력한다.
  .then(repoArrs => {
    for (let repoArr of repoArrs) {
      for (let repo of repoArr) {
        if (repo.full_name in starCount) {
          starCount[repo.full_name]++;
        } else {
          starCount[repo.full_name] = 1;
        }
      }
    }
    console.log(starCount);
  })

console.log('fetching...');
```
- then 메소드보다 더 밑에 있는 문법을 더 자주 사용함


### 비동기 함수 (Async Function)
- C#에 있는 async라는 문법을 빌려옴(ES2017에서 도입됨)

- 비동기 함수(async function)를 사용하면, 동기식 코드와 거의 같은 구조를 갖는 비동기식 코드를 짤 수 있다.
- async 키워드를 붙이면, 이 함수는 비동기 함수가 된다.
```js
// 비동기 함수
async function func1() {
  // ...
}

// 비동기 화살표 함수
const func2 = async () => {
  // ...
}

// 비동기 메소드
class MyClass {
  async myMethod() {
    // ...
  }
}
```

- 비동기 함수는 항상 Promise 객체를 반환한다는 특징을 갖습니다. 이 Promise의 결과값은 비동기 함수 내에서 무엇을 반환하느냐에 따라 결정되며, then 메소드와 똑같은 방식으로 동작합니다.
- 안에서 return을 하든 안하든 항상 Promise 객체를 반환한다. (cf) Generate 함수는 iterator객체를 항상 반환함)(함수에 반환하는 코드를 쓰든 안쓰든)

```js
async function func1() {
    > 질문: 통이 언제 만들어지는것인지?????
  return 1;
}

async function func2() {
    // 2가 채워진 통을 바로 생성하는 문법
  return Promise.resolve(2);
}
// func1()은 1이 들어있는 promise 객체
func1().then(console.log); // 1
// func2()는 2가 채워져있는 promise 객체 
func2().then(console.log); // 2
```
또 하나의 중요한 특징은 비동기 함수 내에서 await 키워드를 쓸 수 있다는 것입니다. await는 Promise의 then 메소드와 유사한 기능을 하는데, await 키워드 뒤에 오는 Promise가 결과값을 가질 때까지 비동기 함수의 실행을 중단시킵니다. 여기서의 '중단'은 비동기식이며, 브라우저는 Promise가 완료될 때까지 다른 작업을 처리할 수 있습니다.

await는 연산자이기도 하며, await 연산의 결과값은 뒤에 오는 Promise 객체의 결과값이 됩니다.

앞서 then 메소드를 사용했던 예제와 아래의 예제를 비교해보세요.
> 20번 코드 강사님이 조금 수정해서 올려주실 것임!!! 달라진 부분 수정하기
```js
// Promise 객체를 반환하는 함수.
function delay(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`${ms} 밀리초가 지났습니다.`);
      resolve()
    }, ms);
  });
}

async function main() {
    // 실행시키다가 promise통에 값이 채워질 때까지 기다리다가
    // 값이 채워지면 실행
    
const str1 = await delay(1000. 'hello');
//  await는 연산자임. 이 함수를 실행시킬 때 1초 뒤에 hello라는 값이 str1에 들어감.
console.log(str1);
const str2 = await delay(2000, 'world');
  const result = await Promise.resolve('끝');
  console.log(result);
}

main();
```
- await를 이용하면 기다렸다가 함수를 실행할 수 있다.
- await의 역할 2가지
    - promise가 값이 채워질 때까지 기다리는 것
    - promise 안의 결과값을 반환하는 것


- 비동기 함수의 가장 큰 장점은 동기식 코드를 짜듯이 비동기식 코드를 짤 수 있다는 것입니다. 아래 예제는 Github 데이터를 불러오는 예제를 비동기 함수를 사용해 다시 작성한 것입니다.
```js
// 21번 예제 코드가 3가지 방법중에 가장 간단
// 9, 17, 21번 예제 코드 비교
const axios = require('axios');
const API_URL = 'https://api.github.com';

async function fetchStarCount() {
  const starCount = {};

  // 1. Github에 공개되어있는 저장소 중, 언어가 JavaScript이고 별표를 가장 많이 받은 저장소를 불러온다.
  const topRepoRes = await axios.get(`${API_URL}/search/repositories?q=language:javascript&sort=stars&per_page=1`);

  // 2. 위 저장소에 가장 많이 기여한 기여자 5명의 정보를 불러온다.
  const topMemberRes = await axios.get(`${API_URL}/repos/${topRepoRes.data.items[0].full_name}/contributors?per_page=5`);

  // 3. 해당 기여자들이 최근에 Github에서 별표를 한 저장소를 각각 10개씩 불러온다.
  const ps = topMemberRes.data.map(user => axios.get(`${API_URL}/users/${user.login}/starred?per_page=10`));
  const starredReposRess = await Promise.all(ps);
  const starredReposData = starredReposRess.map(r => r.data)

  // 4. 불러온 저장소를 모두 모아, 개수를 센 후 저장소의 이름을 개수와 함께 출력한다.
  for (let repoArr of starredReposData) {
    for (let repo of repoArr) {
      if (repo.full_name in starCount) {
        starCount[repo.full_name]++;
      } else {
        starCount[repo.full_name] = 1;
      }
    }
  }
  return starCount;
}

fetchStarCount().then(console.log);
```
- then 메소드를 사용한 버전과 비교했을 때, 비동기 작업을 위해 콜백을 사용하는 부분이 모두 사라졌습니다.

- await 키워드는 for, if와 같은 제어 구문 안에서도 쓰일 수 있기 때문에, then 메소드를 사용할 때보다 복잡한 비동기 데이터 흐름을 아주 쉽게 표현할 수 있다는 장점이 있습니다. 다만, **비동기 함수 역시 Promise를 사용하기 때문에, 비동기 함수를 잘 쓰기 위해서는 여전히 Promise에 대해 잘 알고 있어야 합니다.**

- 비동기 함수는 await 도중 에러가 났을 때 이를 편하게 처리할 수 있는 방법도 지원하는데, 이에 대해서는 예외 처리 챕터에서 자세히 살펴보겠습니다.
- Generate 함수로도 비동기 처리를 할 수 있다.
- promise가 나오고 async, await가 나오기 전 그 사이에 Generate 함수로 비동기 프로그래밍을 구현했었다. 
```js
const co = require('co');
const axios = require('axios');
const API_URL = 'https://api.github.com';

function* fetchStarCount() {
  const starCount = {};

  // 1. Github에 공개되어있는 저장소 중, 언어가 JavaScript이고 별표를 가장 많이 받은 저장소를 불러온다.
  const topRepoRes = yield axios.get(`${API_URL}/search/repositories?q=language:javascript&sort=stars&per_page=1`);

  // 2. 위 저장소에 가장 많이 기여한 기여자 5명의 정보를 불러온다.
  const topMemberRes = yield axios.get(`${API_URL}/repos/${topRepoRes.data.items[0].full_name}/contributors?per_page=5`);

  // 3. 해당 기여자들이 최근에 Github에서 별표를 한 저장소를 각각 10개씩 불러온다.
  const ps = topMemberRes.data.map(user => axios.get(`${API_URL}/users/${user.login}/starred?per_page=10`));
  const starredReposRess = yield Promise.all(ps);
  const starredReposData = starredReposRess.map(r => r.data)

  // 4. 불러온 저장소를 모두 모아, 개수를 센 후 저장소의 이름을 개수와 함께 출력한다.
  for (let repoArr of starredReposData) {
    for (let repo of repoArr) {
      if (repo.full_name in starCount) {
        starCount[repo.full_name]++;
      } else {
        starCount[repo.full_name] = 1;
      }
    }
  }
  return starCount;
}

co(fetchStarCount).then(console.log);
```
- 어떤 회사에서는 Async와 await가 아니라 일부러 Generate함수와 yield를 사용하는 경우가 있다.
- 그 이유는, Generate 함수로 비동기 프로그래밍을 구현하면, yield를 이용해서 일시정지 구간을 개발자가 세밀하게 컨트롤할 수 있어서이다.

---
### 개발자의 영어 문서 읽는 습관의 중요성
- opensource 기술들이 특히 다 영어로 되어있음.
- angular는 구글에서 만든 것임
- react는 여러 가지 조합을 해서 써야 함. (그 여러가지는 대개 오픈소스이고 그 오픈소스는 다 영어로 되어있음.)
- 단어 단위로라도 영어로 된 공식 문설르 읽어야 정확하게 개발할 수 있다.
- 파파고 등을 이용해서 최대한 번역해서라도 읽기
- 개발자들이 쓰는 어투가 있다.
- 개발 문서들이 쓰는 단어가 다 비슷하다.

- - 공식 문서 영어로 된 문서를 하루에 10~20분 정도 매일 투자해서 읽기
- -> 영어 표현 정리해두기 
- 원본 공식 문서를 읽고 쓸 수 있으면 연봉이 달라진다.
- 새로운 기술을 빠르고 정확하게 사용할 수 있기 때문에

---
- 예제 코드만 잘 읽어도 사용법을 알 수 있다. 
- axios(config)
    - axops는 config라는 객체를 받는다.
```js
// Send a POST request
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
```
- axios(url[, config])
    - 개발문서에 대괄호[]가 나오면, 배열이 X.
    - []는 생략 가능하다는 뜻으로 널리 사용되는 표기법임.
    - []안에 있는 내용은 써도 되고 안 써도 된다.  
    - axios에 config객체를 넣어도, 안 넣어도 잘 작동한다는 의미임
```js
// Send a GET request (default method)
axios('/user/12345');
```


- Request method aliases
    - aliase는 별명이라는 뜻임
    - For convenience aliases have been provided for all supported request methods.
```js
axios.request(config)
axios.get(url[, config])// 설정 객체는 생략할 수 있다.
- axios.delete(url[, config])
axios.head(url[, config])
axios.options(url[, config])
- axios.post(url[, data[, config]])
// : 1. url만
// 2. url, data 이 2가지를 넘겨줄 수 있다.
// 3. url, data, config를 넘겨줄 수 있다.
axios.put(url[, data[, config]])
- axios.patch(url[, data[, config]])
```
- get과 post의 넘겨주는 객체가 다르다는 걸 기억!

- Request Config
    - These are the available config options for making requests. Only the url is required. Requests will default to GET if method is not specified.
```js
 // `params` are the URL parameters to be sent with the request
  // Must be a plain object or a URLSearchParams object
  ...
  params: {
    ID: 12345
  },
  ...
```
- Response Schema
    - The response for a request contains the following information.
    - 응답의 본문, 헤더, 상태 코드를 다 볼 수 있는 방법이 있다.

- 할 일, 게시판, 쇼핑몰 서버를 강사님이 주실 것임
- json-server는 node.js로 만들어져 있음 -> npm install로 설치할 수 있음
- json-server는 json파일만 만들면 서버를 띄울 수 있다.
- json-server는 로그인 기능이 X

### json-server
- 토큰을 암호화하기 위한 문자열이 필요하다
- 암호화를 위한 환경변수 설정이 필요
- 환경변수 설정하기
- 토큰을 생성할 때 사용할 비밀 키를 JWT_SECRET 환경변수로 설정해주어야 합니다.

- 혹은 .env 파일을 통해서 비밀 키를 설정해줄 수도 있습니다. 프로젝트 폴더에 .env 파일을 생성하고 아래와 같이 작성해주세요.
```js
JWT_SECRET=mysecret
```
- **내 생각대로 서버가 동작하는지 서버 사용하는 코드를 작성 후에는 postman으로 꼭 확인해보기**


---
### Single Source of Truth
- 상태를 저장하는 저장소가 여러 개 있는 경우에는 상태가 불일치하는 문제가 생길 수 있다. 
- -> 따라서 믿을 수 있는 상태 저장소는 딱 하나만 두는 게 좋다.
- 이런 원칙을 **Single source of Truth** 진리의 유일한 원천.이라고 한다. 
- 그래야 동기화가 잘 됨
- 매번 Single Source로부터 상태를 가져와서 매번 그려주는 게 좋다.
- -> 동기화해서 변경사항을 적용하고 버그를 줄일 수 있다. 
----

### 실시간 웹
- slack이나 trello같은 사이트 
- -> 다른 사람이 글 올리면 실시간으로 바로 볼 수 있음
- - 실시간 웹을 구현하기 위해 사용할 수 있는 기능이 여러가지 있는데,
- 그 중에 한 가지가 '웹소켓'이다. 웹소켓을 쓰면, 내가 요청을 보내지 않아도 응답을 받을 수 있다. (cf) 그냥 http를 쓰면 내가 요청을 보내야만 응답을 받을 수 있다.) 
- 웹소켓 연결이 맺어져 있으면 실시간으로 변경 사항이 반영됨
