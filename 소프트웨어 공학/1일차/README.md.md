- 다음 세대에 어떤 언어가 나올지, 어떤 특징이 있는지
- 리스트업된 언어 중에 나는 어떤 언어를 공부할 것인지를 계속 고민하고 공부해 나가야 한다.
- `Golang`
- `React`만 할거야. 라는 생각은 하지 말 것. 
- 한 기술에 매몰되는 것은 좋지 않다.
- 어떤 기술을 좋아하지 않더라도 이용해서 구현할 줄 알아야 한다. 
- 다른 언어나 기술에도 관심을 가지고 공부해 나가야 한다.

- 새로운 언어를 배울 때
- 튜토리얼이 없는 경우, 레퍼런스를 중심으로 공부 
- view.js 사이트에 들어가서 따라하다 보면 할 수 있다.
- 1. 레퍼런스 2. 도서 

### git
- window 사용자는 https://gitforwindows.org/를 설치하는 게 좋다. 
- git flow를 탑재하고 있는 git bash임. 
- mac os 사용자: git flow를 사용하려면, $brew install git-flow-avh 명령어를 넣으면 됨.

- git init을 하기 전에는(git이 연결되기 전에는) workspace만 있음(내 하드디스크)
- git init하면, .git이 생기고,  status(index)와 local repository라는 임시 공간이 생김.
- 변경 사항을 status에 올리게 됨.
- 라벨링하면 local repo까지 도달하게 됨.
- push하기 전에는, local repo에 쌓이게 됨.
- commit까지만 하면 local repo에 쌓여있다가 인터넷이 연결됐을 때 remote repository에 한꺼번에 push하면 됨.
- push하면 샌프란시스코에 있는 github 서버에 올라간다. 

- 변경사항인 블록이 스테이지에 올라가게 됨.(변화한 사항을 올리는 것임)


### visual studio code에서 키보드로만 작업하고 싶다.
- vim 관련 검색해서 설치하면 됨.  


### editor war
- `vi` VS `emacs`

### git 프로젝트 시작하는 방법 2가지

#### 
- mkdir 만들 폴더명(이 폴더명은 rep연결할 때 같은 폴더명으로 하기)
- git이 있는지 먼저 확인: `git --version`
- git init

- vi README.md
- vi 편집기에서 ~는 신경 안써도 됨. 내용을 입력하면 ~가 지워짐
- vi 모드가 존재하고 마우스를 사용할 수 X. 진입 장벽이 높다. 
- 처음 늘어오면 normal모드에 들어옴. 텍스트 편집은 안됨. 
- normal모드에서 insert모드로 들어가려면 `i`를 누르면 INSERT글씨가 왼쪽 하단에 뜸.
- insert모드에서 `esc` 1번 누르면, `normal` 모드로 돌아감
- 메뉴를 쓰기 위해서는 `shift`+`:` 치면 됨. 
- :+ 숫자 - 몇 번째 줄로 이동해라. 
- 저장
- 끄기
- :wq- 저장하면서 나가라
- :q!- 지금까지 작성한 거 저장하지 않고 vi를 나가라. 

- 다시 git bash창으로 돌아갔을 때, `cat 파일명.확장자명` 치면, 문서의 내용을 볼 수 있음.
- 항상 뭔가를 하기 전에는 add, commit, push전에는 git status를 입력하는 습관을 들이자.
- `git add 파일명.확장자명`
- 모든 shell은 `tab`을 누르면, 자동 완성이 된다.
- git remote add `cat(원격 저장소의 별명)` `연결할 ssh주소`
- 연결된 원격 저장소 이름 알아보기: `git remote`
- `git remote get-url origin(원격 저장소 별명)`: 연결된 git url 주소 알려줌. 
- 원격 저장소 지우기: `git remote remove cat(원격 저장소의 별명)`
- 처음 세팅할 때만 필요. git commit엔터치면 이제 vim으로 넘어가서 작성된다. `git config --global core.editor "vim"`

- 여태까지 등록했떤 모든 것을 확인할 수 있다. -> git config --list

- `git commit` 쳐서, vim모드로 넘어가면, `i` 누르고 타이핑
- 첫 줄에 제목 ex) Doc: Create README.md
- 세 번째 줄에 ex) I created README.md for describe this project.
- 내용을 작성하고 `esc`를 누르고, `:wq`나가는 순간 작성한 커밋 메시지가 
- `git push cat(원격 저장소의 별명) master`


- **git init을 ~홈 디렉토리에서 연결하면, 문제가 됨.**
- git repo는 프로젝트별로 독립적으로 각각 존재해야 한다. git에 연결된 repo들 사이에는 상하관계가 있어서는 안 된다.
- ex) document 폴더> dev 폴더 > 각 프로젝트별로 repo로 사용할 폴더 생성



- 이미 git이 존재하는 폴더에서 git을 연결하면 안된다. 

- 내용에 #적으면 주석이라는 뜻

- `vi .gitignore` vi하고 띄워쓰기 하나 넣어야 함. 
- .gitignore파일에 i누르고, `hidden/`하면, 폴더명에 `hidden/`이 들어있는 파일은 git에서 무시하겠다. 
- `*.py`도 적어두면, 확장자가 py인 모든 파일을 무시하라는 뜻 
- `.gitignore`를 적으면, 파일을 무시해라. 라는 뜻(단, 처음에 push 1번은 해야함.)
- git bash에서 `touch hidden/index.js` hidden이라는 디렉토리 밑에 index.js를 만들어라.
- `touch index.js` index.js파일을 만들어라. 

- git add.gitignore
- git commit -m "Conf: edit!! " .gitignore
- git command line에서는 !다음에 바로 특수문자 쓰면 안되고 한 칸 띄워줘야 한다. 

#### git repo 생성할 때 license
- apache license: 공개적이나 이건 내꺼다라고 소유권을 주장할 수 있다. 
- mit license: 공개적으로 마음껏 
- GNU GEneral Public License: 함부로 가져다가 소스코드 몇 줄만 써도 내 프로젝트는 gpl이 된다. 소송당할 수도 있음. 


### branch
- 협업할 때는 branch가 중요하다.
- commit하는 단위는 '동작'은 해야 한다.
- 모든 commit의 단위는 '동작' 단위이다.
- master에 올릴 때는 사용자가 사용할 수 있는 정도의 수준이 될 때 올린다.


### branch란?
- 시간 위에서 다른 공간이 존재할 수 있다.
- 분기점을 생성하고 독립적으로 코드를 변경할 수 있도록 도와주는 모델



- `git branch` - 현재 branch가 뜬다. 로컬에 가지고 있는 branch가 무엇이 있는지 볼 수 있다.
- `git branch -r` : remote 저장소에 있는 branch를 보여줌
- `git branch -a`: remote 저장소와 내 로컬에 있는 branch를 한 꺼번에 보고 싶을 때

- `git branch '새로 만들 branch의 이름'`: git branch 만들기 
- `git checkout stem(갈아타고 싶은 branch의 이름)`: 시간 이동하기
- `git branch`: 하이라이트 되어있는지(성공적으로 완료가 되었는지) 확인
- `git merge master`



- git을 add와 commit을 한꺼번에 하는 건 습관상 좋지 않다.
- git add와 commit을 따로 하는 습관을 들이자. 

- 분기를 쳐서 작업을 한 다음 밀어넣는 절차로 해야 네트워크에 가장 깔끔하게 남는다. 

- `git branch -D stem(branch의 이름)`: git branch 지우기
- **해당 branch안에 위치하면서 git branch -D stem(branch의 이름)을 적으면 삭제 X.** <br> 다른 branch로 위치를 옮겨간 다음에 삭제를 할 수 있다.


#### 특정한 time stamp로 이동하는 방법
- 특정한 시점(과거의 특정한 commit 시점)으로 돌아가기 위해서는 id를 알고 있어야 한다. 
- github > insight > network에서 특정한 시점으로 돌아가기를 원하는 시점을 클릭해주면 된다.
- commits를 누르고 나오는 목록 중에 commit 글씨 우측에 있는 id를 복사
- `git checkout 95440db781347fff806affb4c5f1b244a8a34d65(id)`를 git bash에 입력

- git checkout -b <new branch-name> 메시지가 뜨면, -> branch가 있는지 없는지 확인해서 없으면 만들라. 분기점을 쳐서(새로운 branch를 만들어서 하라는 뜻)
- `-b`를 앞에 붙여주면 브랜치를 생성함. 


- hotfix: master의 버전을 빠르게 변화시켜서. 긴급하게 수정해야 할 경우에 master(소비자가 쓰고 있는 버전)에 바로 변화를 줘야할 경우에 hotfix를 사용한다. 보안과 관련.

- 처음 프로젝트를 시작할 때, master와 branch를 만들고 시작한다.
- develop: 개발용 main 브랜치
- master: 소비자용 main 브랜치
- release: master와 develop으로 소스 코드를 보여주기 전에 이미지 최적화 등 후처리를 하는 브랜치


- 뭔가 일을 해야 한다면, develop에서 브랜치를 따서 일을 하고 집어 넣는다. 
- 텍스트 라인 단위로 인식을 하기 때문에 글자가 한 글자라도 다르면 오류가 난다.


#### 협업할 때
-  상대방의 repo를 방문해서 fork버튼을 누른다.
- forked from (원본 repo) 내가 fork해온 repo의 주소(clone)를 복사한다.
- git bash에 git clone <복사해온 repo의 주소를 붙여줌>
- git이 포함된 디렉토리 밑에서 하면 안됨.
- git checkout develop
- git branch feature/editREADME: 내가 이 기능을 하기 위해 했다고 적어주는 게 좋다.



- 가장 먼저 master와 develop을 만들어주고 그 이후에 feature를 따서 작업한다.
- 내가 복제한 저장소랑 원본 저장소랑 매치시켜주는 게 좋다.
- 받았던 시점에 비해서 일을 했으니까 반영시켜달라고 Pull request를 누른다.

