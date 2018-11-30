
- 강제로 상태를 초기화 하고 싶은 순간레 다른 key를 넣어주면 된다
- 

1. redirect 컴포넌트를 렌더링하거나 2. history 객체의 push나 replace 메소드를 사용해서 주소표시줄의 상태를 바꿀 수 있다.
- hoc를 써서 macth, location, history를 사용하게 할 수 있다. Provider, consumer와 비슷한 게 라우터에도 있다
- withRouter hoc를 둘러주면, 바로 HeaderView에 꽂아줄 수 있다
- 모든 컴포넌트에 다 둘러주면 의존성이 생기니까 필요할 때만 둘러주자.


cf) Homapage 
- 경로로는 페이지, 쿼리 스트링으로는 그 page에 입력할 데이터
- 경로를 가지고 데이터를 나타내면 문제가 생길 수 있다. 
- 계층 구조라는 형태가 경로


/city=서울&menu=치킨&address=156090

- 계층 구조로 표현하기 좋으면, 경로로 나타내기 좋음
서울, 우편번호, 치킨같이 계층구조가 아닌 경우는 쿼리스트링으로 표현
- location.search에 

{
  key: 'ac3df4', // not with HashHistory!
  <!-- 경로 -->
  pathname: '/somewhere'
  <!-- 쿼라 스트링 -->
  search: '?some=search-string',
  hash: '#howdy',
  state: {
    [userDefined]: true
  }
}


 URLSearchParams는 편한데 브라우저 지원이 부족, 실무에서는 qs라는 라이브러리를 사용함

**상태를 초기화하거나  componentDidMount를 다시 호출하고 싶을 때는 key를 바꿔준다**
-> lifeCycle을 이용하면 할 수는 있으나 안티 패턴이다. (부작용이 많다)


배포
1. 환경변수 설정
2. 
/*  /index.html  200
어떤 경로로 들어오더라도 /index.html을 실행하고 응답코드 200을 사용해라

백엔드 분에게 react router라는  pushState를 사용하고 있는데, 어떤 경로로 들어오더라도 /index.html을 응답하도록 만들어달라고 말할 줄 알아야.(백엔드와 소통법 따로 정리)

create-react-app 기반 프로젝트에서 이미지 사용하는 방법
- [create-react-app 기반 프로젝트에서 이미지 사용하는 방법](https://facebook.github.io/create-react-app/docs/adding-images-fonts-and-files)
1. public 폴더에 생 이미지 넣기 -> 잘 사용되지 않는 방법
data URI 도 경로처럼 사용할 수 있음. 이미지 파일을 임포트하면 자바스크립트의 문자열로 파일의 내용이 다 담겨있어서 요청 횟수를 줄일 수 있다
src/components폴더에 이미지를 넣는 게 좋다
/components폴더 안에 images안에 몰아넣거나 LoginFormView폴더를 만들어서 그 안에 이미지 넣거나

