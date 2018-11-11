# 모던 웹 서비스의 구성요소
## Fetch API
### Fetch API
- 웹 브라우저의 **XMLHttpRequest를 대체**하기 위해 만들어진 새로운 HTTP client 표준
- 비교적 최근에 도입되어 IE 및 구형 안드로이드 브라우저(4.x)는 지원하지 않음
- [Fetch Polyfill](https://github.com/github/fetch)
    - transfiler는 최신 문법을 예전 문법으로 바꿔줌(문법만 바꿔주지, 최신 기능을 과거 문법으로 사용할 수 있게 하지는 X.)
    - 최신 브라우저 기능과 똑같이 만들어진 라이브러리 = 폴리필
    - ex) Array.prototype.includes(이 메소드는 ES2015나 ES2016에 추가됨. )
        - -> 라이브러리에서는 Array.prototype.includes Proposal이라는 라이브러리를 가져다가 사용하면 됨.
    - ex) fetch도 최신 기능인데, 이 기능을 사용하고 싶다면, fetch polyfill을 검색해서 사용하면 됨 
- isomorphic-fetch(https://www.npmjs.com/package/isomorphic-fetch)
---
- cf) XML 문서
- json이 만들어지기 전에는 xml이 많이 쓰였음.
    - 정보의 타입은 태그<>로, 내용은 <>안의 컨텐츠로 나타냈음
    - 데이터를 받아와도 그 안에 있는 데이터에 접근하려면 qeurySelector로 접근해야 함. (json은 parse하면 객체로 반환되서 쉽게 접근할 수 있음)
---

- Fetch API도 Axios처럼 promise 객체를 반환함


### Axios vs Fetch API
- Axios는 여러 편의기능(instance와 같이 설정을 재사용하거나 요청중인 연결을 취소하는 등)을 제공
- 다만, Axios는 내부적으로 XMLHttpRequest를 사용하고 있는데 Service Worker 등의 최신 기술이 XMLHttpRequest를 지원하지 않으므로, Service Worker를 사용할 예정에 있는 프로젝트에서는 Axios 대신 Fetch API를 사용해야만 함
- [정말 멋진 Fetch API](http://hacks.mozilla.or.kr/2015/05/this-api-is-so-fetching/)
```js
// fetch("/data.json")하면 promise 객체가 반환됨
// .then(function(res)에서 처음으로 응답을 기다림
// fetch를 쓰면 헤더가 먼저 도착. 헤더가 도착하면 => .then(function(res){}코드가 실행됨 
fetch("/data.json").then(function(res) {
  // res instanceof Response == true.
  if (res.ok) {
    //    res.json()을 쓰면 응답을 한 번 더 기다려야 함
    // 바디가 도착하면 => 그때, .then(function(data){}이 실행됨 
    res.json().then(function(data) {
      console.log(data.entries);
    });
  } else {
    console.log("Looks like the response wasn't perfect, got status", res.status);
  }
}, function(e) {
  console.log("Fetch failed!", e);
});
```
- Fetch API 의 가장 유용하고, 핵심적인 함수는 fetch() 함수이다. 가장 간단한 형태의 fetch() 함수는 URL 을 인자로 받고 응답을 처리하기 위한 promise 를 반환한다. 응답을 처리할 때 Response 객체를 이용할 수 있다.
---
- React 프로젝트에서 봤을 때, 현업에서 fetch와 axios가 반반 정도 사용되고 있음
- fetch가 더 확장되서 사용될 예정임

## HTTP Cache
### Cache
1. (무기 등의) 은닉처
2. 은닉하다
- 컴퓨터 분야에서의 캐시는 (주로 접근 속도의 개선을 위해) 데이터를 미리 복사해 놓는 임시 저장소, 혹은 그 임시 저장소에 데이터를 저장하는 행위를 가리킴

- 'cache' 혹은 'caching'이라는 용어 자체는 특정 기술을 가리키는 것이 아니라, 접근 속도를 개선하기 위해 따로 저장소를 두는 '방법'을 가리킴

- 컴퓨터의 아주 많은 부분(CPU, GPU, HDD, 네트워크, 웹, 데이터베이스...)에서 사용되고 있음
```
- ex) 하드디스크는 자석으로 0,1을 기록함(7,200 rpm)
- 메모리(RAM)에는 전기로 기록함 
- 하드디스크는 속도가 너무 느리니까 임시 저장소에 넣어서 기록함.
- 큰 데이터가 있으면 일단 캐시로 보낸다. 
- cpu의 동작 속도는 일반 메모리(RAM)보다 훨씬 빠름. But 용량은 작음. 
    - (ex) L3 캐시 메모리: 8MB, 메인 메모리: 8GB)
- 프로그램을 실행시키면, 메모리 -> 캐시메모리(cpu옆에 붙어있음)에 올림. 
```
- 자원의 효율적 로딩을 위한 웹 표준
- 서버에서 가져온 자원(HTML, CSS, JS, 이미지, ...)을 가까운 곳(브라우저, 혹은 다른 서버)에 저장해놓고 재사용
- 캐시를 할 것인지 말 것인지, 어떻게 할 것인지를 결정하는 규칙이 복잡하고, 브라우저마다 조금씩 다름

- 캐시를 사용하면, 원본과 사본이 달라지는 경우가 항상 생긴다.
- -> 그에 대한 처리를 어떻게 할 것인가.
    - ex) 원본과 사본이 달라지는 경우를 방지하기 위해서, 자원을 쓸 때마다 서버에 물어보고 쓰라고 하거나 유효기간을 하루로 주거나 등등의 처리를 해줄 수 있다. 

### Common Problem
- 캐시된 자원과 실제 자원의 내용이 달라지는 문제를 어떻게 해결할 것인가?
### Solution
- Expiration (만료): 정해진 시간이 지나면 캐시가 자동으로 삭제되도록 설정
- Validation (검증): 서버에 요청을 보내서 캐시를 계속 사용할 수 있는지 확인

### Cache 관련 헤더
- [Cache 범주](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers#Caching)

- [Conditionals 범주](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers#Conditionals)


- Cache-Control: (요청, 응답) 캐시와 관련된 다양한 기능을 하는 지시자를 포함. no-cache, max-age가 많이 사용됨. no-cache, max-age=0 지시자는 캐시를 사용하지 않도록 하거나, 캐시를 아직도 쓸 수 있는지 검증하기 위해 사용됨 (각각의 자세한 의미)(유효기간의 만료를 나타내기 위해 max-age를 사용)

```
- 자료를 통째로 보내는 게 X. 서버에서 식별자를 만들어서 예를 들어 1번을 붙임.
- 브라우저가 서버에 어떤 내용이 바뀌었는지 물어볼 때, 식별자 1이라는 숫자를 서버에 보내서 -> 그 식별자가 바뀌었는지 서버에 물어봄
- 전체 자원을 전송하지 않고도 자원이 바꿨는지를 확인할 수 있게 되는 것임
- 서버에서 원본 자료가 바뀔 때마다 식별자 번호를 붙임(버전 번호처럼)
- 서버에서 브라우저로 응답에 바뀐 자원과 바뀐 식별자 번호를 같이 보내줌.
```
- ETag: (응답) 캐시의 검증을 위해 사용되는 자원의 식별자. 주로 자원의 해시값이 사용되나, 마지막으로 수정된 시각, 혹은 버전 넘버를 사용하기도 함  
    - 해시값을 식별자로 사용함. 
---
    - [md5 Hash generator](http://www.miraclesalad.com/webtools/md5.php)
    - 해시(hash): 아래와 같은 특징을 갖고 있는 연산
        - 1. 같은 입력을 주면 항상 같은 출력이 나온다. 
        - 2. 입력이 조금이라도 달라지면 완전히 다른 출력이 나온다. 
       >![md5 Hash Generator]()
       >캡쳐 해둔 이미지 경로 넣기!!
         - 아무리 긴 문자열의 길이가 길더라도 Hash의 길이는 같다. 
---
- Expires: (응답) 캐시를 만료시킬 시각을 서버에서 명시적으로 지정

- Last-Modified
(응답) 원래 자료가 마지막으로 수정된 시각


- If-None-Match
(요청) 검증을 위해 사용됨. 이전에 저장해두었던 자원의 ETag 값을 If-None-Match 헤더의 값으로 요청에 포함시켜서 보내면, 서버는 해당 경로에 있는 자원의 ETag와 비교해보고 자원의 전송 여부를 결정
- **ETag, If-None-Match 를 묶어서 외울 것!!**
> 강사님이 슬랙에 식별자 일치할 때, 일치하지 않을 때 이미지 올려주실 것임
- 식별자가 바뀌지 않았을 경우에는 서버에서 브라우저로 응답을 보낼 때, body가 비어있는 상태로 응답함.(바뀐 내용이 없으므로)
- 자원이 바뀌었다면, 200 OK 상태 코드와 함께, body에 내용을 실어서 브라우저로 응답함.
- ETag 캐시가 가장 많이 사용된다.
- cf) netlify에 ETag 기능이 포함되어 있다.  
```

```


- If-Modified-Since
(요청) 검증을 위해 사용됨. 이전에 저장해두었던 자원의 Last-Modified 값을 If-Modified-Since 헤더의 값으로 요청에 포함시켜서 보내면, 서버는 해당 경로에 있는 자원의 Last-Modified와 비교해보고 자원의 전송 여부를 결정
- [브라우저 실습](https://wpsn-axios-example.glitch.me/)
- ctrl+shift+r or command+shift+r누르면 캐시가 지워지는 새로고침을 할 수 있다. 

- 
### Cacheable Methods
![Cacheable Methods](https://imgur.com/HEDlwPSl.png)
- POST 메소드는 Cacheable 범주에 포함되기는 하지만, 특별한 조건을 만족시켜야 하며 실무에서는 POST cache가 거의 사용되지 않습니다.

- delete, post나 fetch, put은 자원을 받아오는 메소드가 X -> 서버와 브라우저가 이 메소드들에는 캐시 기능을 사용하지 X 
- 캐시라는 건 자원을 불러오는 속도를 높이기 위해서 사용하기 때문에 서버에서 자료를 불러오는 경우(읽기)할 때 즉, get메소드 등을 사용할 때 캐시를 사용할 수 있다. 

- 캐시의 사용
- 브라우저는 이미 캐시를 잘 활용하도록 만들어져 있습니다.
- Express는 이미 캐시를 잘 활용하도록 만들어져 있습니다.
- Netlify는 이미 캐시를 잘 활용하도록 만들어져 있습니다.
오예
일단은 별다른 추가작업 없이도 편하게 캐시 기능을 사용할 수 있지만, 우리가 원하는대로 캐시가 동작하지 않을 때 그 원인을 파악하기 위해 캐시 관련 헤더는 숙지해두는 것이 좋습니다. 그리고 HTTP method를 용도에 맞게 사용하는 것도 중요합니다.

- **용도에 맞게 메소드를 사용하는 게 중요하다.**

- 서버와 내 컴퓨터 사이에 수많은 컴퓨터가 있다.
- ex) 서버 - CDN(Contents delivery network) - Porxy - 내 컴퓨터
- CDN
    - 자료를 제공하기 위한 네트워크
    - global Application Delivery Network
    - ex) netlify에도 CDN기능이 내장되어 있다. 

## GraphQL
---
- ex) REST API 예시
- GET/todos
- POST/todos
- GET/todos/3: 3번 글 가져오기
- DELETE/todos/3: 3번 글 지우기
---
### REST API의 단점
- (보통의 경우) 각각의 자원마다 경로가 따로 있음. 즉, 여러 자원이 동시에 필요한 경우에는 요청을 여러 번 보내야 함 (요청의 횟수 면에서 비효율적)
- (보통의 경우) 자원의 필요한 속성만 얻어올 수 없음. 즉, 일부 속성의 필요하더라도 전체 속성을 가져와야만 함 (요청의 용량 면에서 비효율적)

### GraphQL
- 프론트엔드에서 쓰는 SQL이라고 보면 됨 
- Facebook에서 2015년 공개한 데이터 질의 언어
- REST API를 대체하기 위해 만들어짐
- 클라이언트에서 필요한 데이터의 구조를 GraphQL 언어로 정의한 후 질의할 수 있고, 서버는 그에 맞게 구조화된 데이터를 응답
- 서버에서는 GraphQL 질의를 해석하기 위해 별도의 해석기가 필요하며, 여러 언어의 구현체가 나와있는 상태
- 별도의 언어라서 이 언어를 해석할 별도의 해석기가 필요한 것임
- 예전에는 node.js에서만 썼지만 현재는 다 사용가능함.
- 우리나라의 90%는 REST API를 사용하고 있지만 10% 정도는 GraphQL을 사용함
- [GraphQL](https://graphql.org/)
- [Github API 실습](https://developer.github.com/v4/explorer/)

- viewer: User!
- viewer필드는 User타입이다. 

-  Rest API: 경로를 queryString으로 표현했음.
    - ex) GEt.todos?title=React
- graphQL: 내가 어떤 자료를 원하는지 구조적으로 표현할 수 있음. 
- graphQL는 요청 1번으로 우리가 필요로 하는 여러 정보를 한꺼번에 가져올 수 있음. 
    - 내가 필요로 하는 정보만 골라서 가져올 수 있기 때문에 용량면에서도 효율적임

- [apolloGraphQl](https://www.apollographql.com/)
- 책 추천: High Performance Browser Networking의 번역본 
- 컴퓨터 네트워크 HTTP 하부에 TCP / IP가 쓰여지고 있음


---

### 템플릿 사용하는 경우
1. 목록 표시(똑같이 생긴 걸 여러 개 보여줘야 함)
2. 페이지 전환
- 우리는 프론트엔드 개발자니까 페이지를 새로고침하지 않고, DOM API를 만져서 요소들을 넣었다 뺐다 하기 위해서 사용함

> 슬랙에 올린 강사님 예제와 내 예제 각각 정리
1. 
2. 
---
git clone 복사하고 싶은 저장소 url git clone받을 폴더명(새로)
cd 새로 만든(git clone한 )폴더로 이동
저장소 초기화
rm -rf .git
git init
git add.
git status

