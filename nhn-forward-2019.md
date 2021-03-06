## '깃'깔나는 Git 워크플로 알아보기- 신승엽/NHN Edu
## Git flow

- feature

    merge commit을 생성하여 커밋한다.

- release 브랜치: 소프트웨어 배포를 하기 위해 준비하는 브랜치

배포전에 소소한 버그를 고친다.

develope에서 생성한다. 버전 태그를 이용해서 표시해준다.

- hotfix
    - 버그를 고치는게 목적이기 때문에 master에서 브랜치를 딴다.

## Github flow

- Git flow가 대부분의 경우 너무 복잡하다고 생각함
- 훨씬 간단한 work flow를 사용하게 됨

- topic branch
- 업무가 완료되지 않았어도 꾸준히 push한다.
- 구성원 모두 끊임없이 커뮤니케이션할 수 있게 한다.
- 기능을 개발하는 도중에 언제든지 Pull Request를 개설할 수 있다.

봇을 통한 배포 자동화

배포 명령

- CI 빌드 통과
- 락 가능
- master 브랜치 최신 커밋 존재

배포 15분간은 모니터링을 함.

롤백이 필요할 경우, 다시 master를 배포해준다.

배포에 이상이 없을 경우, 배포를 해준다.

---

Github은 빠른 배포를 굉장히 중요하게 생각한다.

배포 과정을 완전 자동화하여서 배포를 할 수 있도록 허락을 받을 필요가 없다.

## GitLab flow

Git flow는 너무 복잡하다고 생각함

GitHub flow는 너무 간단

Gitlab flow는 여러가지 케이스에서의 모범 사례를 소개한다.

매우 빈번하게 배포한다.→ 지속적인 배포

- 지속적인 배포가 어려울 때
- 환경별 배포가 필요할 때
    - 각 테스트에서 통과한 커밋만 다음 단계로 머지할 수 있다.
- 릴리즈 소프트웨어일 때
    - 각 버전 브랜치에 chrry-pick
    - upstream first 전략과 비슷하다.

개발이 완료되지 않았더라도 중간 결과를 팀 내에 공유하라.

항상 이슈 트래커 시스템을 생성하라.

Commit을 자주하고 push도 자주하라.

- 커밋을 작게 나누면 context를 이해하는데 도움이 될 것이다.
- push를 자주해주면, pull request 페이지가 자주 갱신되기 때문에
- pull request를 자주 받을 수 있어 논의와 피드백을 받아서 코드 향상에 도움이 될 수 있다.

---

NHN edu 서버 개발팀에서 개발하는 방식

브랜치 전략

rebase를 이용하여 정돈된 상태를 유지

개발 서버에 배포한 후, QA를 진행한다.

일정마다 별도의 브랜치가 존재하기 때문에  따로 릴리즈 브랜치는 생성하지 않았음

실서버에는 master 브랜치를 배포한다.

rebase를 진행하다 보면, 연속된 충돌 상황이 발생할 때가 있음

만일 연속된 충돌 상황이 발생할 경우, ...

hotfix의 경우에도 pull request를 생성한다.

pull request에서 리뷰와 테스트를 진행한다.

hotfix가 완료된 후에도 각 개발 일정 브랜치는 develop으로 rebase한다.

- 브랜치 전략의 목적

각 브랜치의 역할을 나누어 사용하는 것

커밋 히스토리를 파악하게 편하게 하는 것

- rebase에 대한 이해가 있을 때 이러한 전략을 적용할 수 있을 것이다.

---

### 개발 플로우

- merge를 하고 싶으면, 유닛테스트를 반드시 통과해야 한다.
- Jenkins를 이용한 자동 테스트
    - GitHub Pull Reqeust Builder 플로그인 설치
        - 테스트 Job 실행
        - 테스트 결과
        - 성공 여부에 따라 merge 가능 여부를 알려준다.
    - SonarQube를 이용한 정적 분석
        - 자동 코드 리뷰 툴
            - 코드 스멜이나 오류 등을 자동으로 잡아준다.
            - 사용하지 않는 import 등 실수나 놓친 부분을 알려준다.
    - Github PR+Jenkins + SonarQube
        - 사람은 좀 더 비즈니스 로직에 집중해서 리뷰가 가능하다.

## 결론

### 대표적인 워크 플로우들

### NHN의 워크 플로우

- [ ]  브랜치 전략?
- [ ]  rebase를 사용할까?
- [ ]  pre-merge 테스트?
- [ ]  정적 분석?

→ 자신만의 답을 찾아보자.

---
## DDD-Lite@Spring- 정명주/NHN

값 객체

페이지 Aggregate

불변식

- 데이터 변경의 단위
- 트랜잭션의 단위
- 락의 범위가 되기도 한다.

Aggregate

- Aggregate의 경계를 어떻게 잡을 것인가가 가장 핵심이다!
- 가장 어려운 부분이다.

Dooray! 위키 명세

- 검색 변경을 발행하게 된다.

Domain Event

결합도를 드라마틱하게 낮출 수 있다.

- `분할 정복`이 핵심!
- 퍼사드 패턴
- 구독할 때는 관심사를 분리하는 게 중요하다!

Repository

의존성 방향

패키지 구조 

- 사진

결론

- 기술보다 도메인이 먼저다
- 도메인을 먼저 바라보고 기술을 개발하자.

- 골든 크로스
- 학습 곡선
    - Data Driven
    - Domain Driven- 복잡성을 감당할 수 있다.

- 학습 곡선을 넘을 수 있다면, 골든 크로스 지점을 넘을 수 있다면
- 핵심 도메인은 Domain Driven하게 전술적 패턴을 적용해서 개발하면

복잡성을 제어할 수 있을 것이다.

---

## HTTP API 설계, 후회, 고민- 이경환/NHN
- HTTP Cache를 함께 고민해서 설계할 것
- 프로젝트 태그 관리
    - 업무에 태그를 붙이는 상황
    - 파일처럼 생각할 수 있다.
- 권한이 없는 프로젝트?

- PUT VS PATCH
    - PATCH를 잘 살펴보지 않은 것을 후회하고 있다.

- HTTP Cache 적용은 쉬운가?
    - 리소스를 잘게 쪼개서
- 권한 관리의 어려움
    - 필드별로 권한이 다른 경우

- HTTP API 설계시, 미리 잘 정해두면 좋은 것
- 1. 리소스에 어울리는 단어들- 비슷한 뜻을 가진 단어들이 혼용되는 것을 방지
- 2. flag성 이름- 규칙을 정하자
    - _flag, _able
    - is_, has_, can_
- 3. 날짜, 날짜 시간 필드명
    - _At, _On, DateTime
    - ex) createdAt, createOn, createDateTime
    - Date(시간 없이, 날짜만 필요한 경우가 있음)
    - 미래 시간을 나타내는 네이밍 규칙(만료 시간 등)
    - 날짜 시간값 포맷- ISO8601, UNIX Epoch Time
- 4. query parameter도 정확한 이름으로 짓는게 좋다.

---
## Spring JPA의 사실과 오해- 신동민/NHN
cf) 조영호님의 첫번째 책- 객체지향의 사실과 오해

## 연관관계 매핑

내부적으로 Foreign key 이용

단방향 매핑이될 수 있다.

양방향

복잡하고 어렵다.

- 가이드 라인: 대개의 경우는 단방향 매핑이면 충분하다.

반대 방향으로의 객체 그래프 탐색이 필요할 때 양방향을 사용한다.

일대다 단방향 연관관계에서는 양방향 연관관계 매핑을 사용하는게

insert 쿼리 사용시...

N+1 문제에 대해 흔히들 하는 오해

시점의 차이일 뿐이지, 결국에는 참조가 일어난다고 하면

LAZY 전략을 사용해도 N+1 문제가 발생한다.

findAll() 메서드는 N+1 문제가 발생시키지 않는다?X

- Pagination과 Fetch JOIN은 따로 분리하자.

---

## Spring Data JPA Repository

- Repository: JPA가 아니라 Spring Framework에서 제공해주는 것

Page vs Slice

- slice타입으로 선언된 메서드는 페이지 count값이 없음

연관관계 매핑

사실상 단방향 매핑만으로 연관관계 매핑은 이미 완료

일대다 단방향 연관관계처럼 특수한 경우에는

추가적인 업데이트가 일어나지 않으므로 양방향으로 변경

JPA Repository

---
