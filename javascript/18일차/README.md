### 업데이트 방식

1. [비관적(pessimistic) 업데이트] 사용자 입력 -> 수정 요청 -> 성공 시 화면 갱신

- 사용자에게는 불편하지만, 개발자에게는 쉬움 

2. [낙관적(optimistic) 업데이트]사용자 입력 -> 바로 화면 먼저 갱신 -> 수정 요청
    - ex) slack, trello
- 네트워크 요청은 항상 성공과 실패로 나뉜다는 걸 명심해야 한다.(ex) 지하철처럼 네트워크가 불안정한 곳에서 접속할 때)
- 사용자에게는 편하지만, 개발자에게는 어려움(실패했을 경우 원상복구하는 기술을 구현하는 게 어려움)
- 수정 요청
    - 성공 -> 끝
    - 실패 -> 원상복구

- 화면을 그릴 때는 비관적 업데이트 or 낙관적 업데이트로 그려줄 지를 정해야 함. (서버가 멀리 떨어져 있기 때문에 신경 써야함)
- 멀리 떨어져 있는 서버에 통신을 해야 하기 때문에 항상 실패할 가능성이 존재함
- 사용자가 원래 쓰던 경험을 존중하기 위해서는 주로 낙관적 업데이트를 사용

- 비용을 들여서 낙관적 업데이트를 해야 하는 필요성이 있으면, 낙관적 업데이트를 구현. 아니면, 더 쉬운 비관적 업데이트로 구현

- 사용자가 무엇을 기대하는지를 고려하는 게 중요하다. 


----

- 비동기 함수를 호출했을 때 반환되는 promise에는 비동기 함수 내부에서 반환한 값이 채워진다. 
---

- 화면을 모두 다시 그리는 코드 - 개발자에게는 좋지만, 기계에게는 좋지 않은 코드(속도도 느리고) 

- 필요한 부분만 갱신하는 코드 - 개발자에게는 고통스러운 코드, 기계에게는 좋은 코드

- React는 개발자는 화면을 모두 다시 그리는 코드를 짜면서도 기계에게는 필요한 부분만 갱신할 수 있게 알아서 바꿔주는 라이브러리임(DOM API를 직접 만져서 쓰는 게 아니라)

---

- 개발용 API서버, 운영용 API 서버를 따로 둠
- 테스트할 때는 개발용 API서버에 접속할 수 있고, 운영할 때는 운영용 API 서버에 접속할 수 있어야 함.
- baseURL은 고정되어 있는 게 아니라, 그때그때마다 밖에서 변경할 수 있어야 함


- Parcel에서 .env파일로 환경변수를 사용한다.


###Plural routes
- 경로 사용법
- 게시물 목록 전체를 가져오고 싶을 때
GET    /posts
- 1번 게시물 가져오고 싶을 때
GET    /posts/1
POST   /posts
PUT은 우선 건너뜀
PUT    /posts/1
- 1번 게시물 수정하고 싶을 때
PATCH  /posts/1
DELETE /posts/1



### Filter
- 조건을 만족하는 특정 요소들을 가져오기 위해 사용
Use . to access deep properties

- 게시물을 가져오는데, title은 json-server고 게시자가 typicode일 때
GET /posts?title=json-server&author=typicode
>캡쳐 이미지 넣기
-  id가 1이거나 id가 2인 경우의 게시물을 가져온다 
GET /posts?id=1&id=2
>캡쳐 이미지 넣기
- 우선은 넘어감
<!-- 객체 안에 객체가 들어있는 경우 사용함.  -->
GET /comments?author.name=typicode



### Paginate
Use _page and optionally _limit to paginate returned data.

In the Link header you'll get first, prev, next and last links.

- 한 페이지에 자료가 2개씩 나오는 페이지들 중의 1페이지
GET/posts?_page=1&_limit=2

- 한 페이지에 자료가 15개씩 나오는 페이지들 중의 2페이지
GET/posts?_page=2&_limit=15
 _page=페이지 번호
_limit= 한 페이지에 나올 게시물 수

GET /posts?_page=7
GET /posts?_page=7&_limit=20


10 items are returned by default(기본적으로 한 페이지에 10개임)




### Sort
Add _sort and _order (ascending order by default)

GET /posts?_sort=views&_order=asc
GET /posts/1/comments?_sort=votes&_order=asc
For multiple fields, use the following format:

GET /posts?_sort=user,views&_order=desc,asc

오름차순(Ascending) -> asc
내림차순(Descending) -> desc

- id 내림차순 정렬(최신글부터 보여주기 위해서)
ex) https://fds-json-server-bbs.glitch.me/posts?_sort=id&_order=desc

- id 내림차순 정렬(최신글부터 보여주기)+한 페이지에 게시물 2개로 하되, 첫 페이지를 보여주기
https://fds-json-server-bbs.glitch.me/posts?_sort=id&_order=desc&_limit=2&_page=1



### Slice
Add _start and _end or _limit (an X-Total-Count header is included in the response)

- id가 20인것부터 30인것까지 가져오고 싶다. 
GET /posts?_start=20&_end=30


GET /posts/1/comments?_start=20&_end=30
GET /posts/1/comments?_start=20&_limit=10
Works exactly as Array.slice (i.e. _start is inclusive and _end exclusive)


### Operators
Add _gte or _lte for getting a range
조회수가 10보다 크거나 같고 조회수가 20이하인 게시물


GET /posts?views_gte=10&views_lte=20
Add _ne to exclude a value

GET /posts?id_ne=1


Add _like to filter (RegExp supported)

GET /posts?title_like=server

- gte = greater than or equal: 크거나 같은
- less than or equal: 작거나 같은

* 비교!!
- 정확히 title이 React인 것만 고르고 싶을 때
https://fds-json-server-bbs.glitch.me/posts?title=React
- title에 React라는 문자열이 포함되어 있는 경우 다 고르고 싶을 때
https://fds-json-server-bbs.glitch.me/posts?title_like=React



### Full-text search
Add q

GET /posts?q=internet
- 텍스트로 상품 검색할 때
-  prop이라는 문자열이 포함되어 있는 게시물 골라올 때???????
ex)https://fds-json-server-bbs.glitch.me/posts?q=prop




### Relationships
자료들 간의 관계가 맺어져 있을 때
ex) 게시물, 댓글간의 관계

To include children resources, add _embed
- 게시물과 댓글을 한꺼번에 가져오고 싶을 때 embed를 사용
GET /posts?_embed=comments
- 1번 게시물만 가져올 건데, 그 1번 게시물의 자식인 댓글까지 가져오고 싶다.
GET /posts/1?_embed=comments
ex) https://fds-json-server-bbs.glitch.me/posts/1?embed=comments
- 배열이 아닌 객체가 반환된다. 
```js
{
    "id": 1,
    "userId": 1,
    "title": "프론트엔드 입문자를 위한 도서 목록",
    "body": "자바스크립트 완벽 가이드\n프론트엔드 개발자를 위한 자바스크립트 프로그래밍"
}
```



- comment와 user등등도 관계가 맺어져 있음.
To include parent resource, add _expand

- 1번 게시물의 정보와 + 작성자 정보까지 받아오고 싶을 때
ex) https://fds-json-server-bbs.glitch.me/posts/1?_expand=user
```js
{
    "id": 1,
    "userId": 1,
    "title": "프론트엔드 입문자를 위한 도서 목록",
    "body": "자바스크립트 완벽 가이드\n프론트엔드 개발자를 위한 자바스크립트 프로그래밍",
    "user": {
        "id": 1,
        "username": "fds"
    }
}
```

GET /comments?_expand=post
GET /comments/1?_expand=post



To get or create nested resources (by default one level, add custom routes for more)

GET  /posts/1/comments
- posts/1 의 자식이되는 comments를 만들 것이다.
POST /posts/1/comments


- 같은 이름의 queryString을 여러 번 사용할 경우에는 URLSearchParams.append()를 사용한다.
(특정 키/값을 새로운 검색 매개변수를 추가)


embed: 자식 불러오기
expand: 부모 불러오기
ex)   const {data: postList} = await api.get('/posts?_expand=user')


- 게시물 데이터 - 자식 댓글 데이터 
- 게시글을 기준으로 한 부모 데이터나 자식 데이터는 가져올 수 있으나 부모의 부모, 자식의 자식은 가져올 수 X(이런 기능이 X)

- 개발자 도구 실습
```js
const p = new URLSearchParams()
// undefined
p.append('id', 1)
// undefined
p.append('id', 2)
// undefined
p.toString()
// "id=1&id=2"
```
