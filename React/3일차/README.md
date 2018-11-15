# 리스트와 키

- React element가 들어있지 않은 배열로부터 React element가 들어있는 배열을 만들 수 있다. -> 화면에 바로 그릴 수 있다.

## 기본적인 목록 컴포넌트
- Warning: 에러는 아니지만, 코드에 문제가 있으니 확인해야 한다.

- **map 메소드를 사용할 때는 key를 써줘야 한다.**

## 키
- 키를 지정해주면 어떤 아이템이 바뀌었는지, 추가되었는지, 삭제 되었는지를 React에게 알려줄 수 있습니다.
- 어떤 자료가 있고, 그 자료의 식별자가 있다면 -> 그 식별자를 key로 사용하는 게 좋다. 
- **대부분의 경우 데이터의 ID를 키로 사용한다.**

- eX1) 유저정보 userId나 userName(사이트에 가입하는 그 아이디)를 key로 사용한다.


- 최후의 수단으로 배열의 index를 key로 사용하는 방법을 사용한다. 

- 항목 간 순서가 바뀔 수 있는 경우 키에 배열의 인덱스를 사용하지 않는 게 좋다.
- ex) todolist를 예로 들면, setState를 사용해서 변경해주면 순서가 뒤죽박죽이 될 수 있으므로 key에 index를 사용하지 않는 게 좋다. (삭제, 위로, 아래로 등을 누르면 순서가 섞여버릴 수 있음)

- React에게 배열을 그려달라고 하려면, 거기에 key를 꼭 넣어줘야 한다. 그 안에 있는 요소 각각에 key를 넣어야 한다.

- key를 사용하지 않으면, 여러 가지 문제가 발생할 수 있다.

- 주의할 점
- key로 쓰는 값은 서로 다른 key를 붙여야 한다.(같은 key값을 가지면 안된다.)
- 3개의 li에 1, 1, 2를 붙이면 x! (cf) 주민등록번호가 같은 사람이 없음)


## 키로 컴포넌트 추출하기
- 키는 바로 바깥쪽의 배열에 대해서만 의미를 가집니다.
- **map에서 바로 반환되는 element안에 key를 넣어줘야 한다. ->map 메소드 안에 적어야 한다.**
>mistakes에 적어주기 

## 키는 형제 중에서 고유한 값이어야한다.
- key라는 이름은 아래쪽(자식 컴포넌트)에서 props로 받아서 사용할 수 없다. 

- **`key`와 `ref`는 Reac
t가 특별하게 취급하는 이름이기 때문에 자식 Component에서 prop으로 받아서 사용할 수 없다.**
>mistakes에 적어주기 



- 클래스는 인스턴스를 만들려고 사용하는 것이다.
- Game컴포넌트는 클래스이므로 React가 알아서 new Game()해서 인스턴스를 생성해서 Game컴포넌트에 붙여놓는다. Game instance에 state라는 속성이 저장된다.
- Game컴포넌트에서 this.setState, this.props에서 쓰이는 this가 이 클래스의 인스턴스를 가리킨다.
- 실제로 클래스의 인스턴스가 생성되고, 개발자가 this를 쓰면, 그 인스턴스를 만지는 것이다.

- 화면이 어떻게 표시되는지에 따라서, 그에 따른 state를 가질 수 있다.
- 화면에 표시되지 않는 Component의 state가 살아있을 수 없다. (메모리에서 사라짐.)

- new Game()해서 인스턴스가 생성되서 React의 기억에 촥~ 달라붙는다. 
- Game이라는 노드가 사라지면, React의 기억에서 그 노드에 달려있던 인스턴스의 state도 같이 날아간다.(메모리에서 사라진다.)

- 함수형 컴포넌트는 인스턴스를 만들어서 붙여놓을 수 때문에 상태를 가질 수 없는 것이다.
ex)
function Option(props) {}는 인스턴스를 만들 수 없다. 

- 이 내용은 엄청나게 어려우므로 흘려들을 것: 함수형 컴포넌트도 상태를 기록할 수 있는 저장소가 있고, 여기에 상태를 저장하는 방식으로 기능이 추가되고 있는 것 같다. -> 아직 추가된 건 X

>중요!
- **Component가 그려져야 상태를 가질 수 있다.**
- -> 'React의 기억'이 바뀌면, 상태가 날아갈 수 있다.
- React는 key값이 바뀌면, 상태가 다 날아간다.
- key가 배열안에서만 사용되는 게 X
- **상태 초기화를 위해 key를 바꿔주는 기법도 많이 사용된다.**

# 폼

- HTML 폼(form) 요소는 그 자체가 내부 상태를 가진다.
ex)
- 체크박스 - 체크 여부를 알아서 기억함
- input태그 - 자기가 알아서 기억하고, 지가 알아서  변경도 한다.
- select태그
- text area

- form element에 각각의 상태 저장소가 있고, React Component에 상태 저장소가 있다. 각각이 따로 상태를 가지고 있다는 걸 기억
- -> 각각 따로 상태를 가지고 있는 게 좋을 때도 있고, 좋지 않을 때도 있다. 

- React에서는 form element가 상태를 가지지 못하도록 만드는 기능이 있다.

- 사용자가 입력한 상태를 읽어와서 사용자에게 feedback을 잘 할 수 있어야 한다.
- 사용자가 숫자를 입력해야 하는 field에 알파벳을 입력하고 있으면, 경고를 주는 등의 feedback을 잘 할 수 있어야 한다.
- -> 상태를 공유하기 위해 위쪽으로 상태를 끌어올리는 게 좋다.
- form이 내부에서 상태를 가지는 게 아니라, 위쪽으로 끌어올려서 제어할 수 있게 한다.

## 제어되는 컴포넌트 (Controlled Components)
vs uncontrolled Componets
> 많이 사용되는 용어! 따로 정리해두기(TIL에)

- 서로 다른 2가지의 상태 저장소가 있고, 업데이트하는 방법도 다르다. 
- 우리가 했던 todolist 예제에서는 상태 저장소가 2개가 있었던 것임
- 공유되는 상태를 끌어올리는 게 좋다.
- input에 그 자체의 상태를 없애버리고, 사용자에게 피드백을 보여주는 컴포넌트에서는 input태그의 상태가 필요 -> 가장 가까운 공통 조상이 상태를 가지는 게 좋다.


- 상태를 전부 다 React에서 관리하게 할 수 있다.
- input 태그를 만들 때, value prop에 문자열을 넘겨주면, 제어되는 컴포넌트가 되서 자체적인 상태를 가지지 않는 컴포넌트가 된다. 

- 화면을 바꾼다. -> input필드 안에 있는 내용을 바꾸려면, React에 있는 상태를 바꿔준다.

- input에 입력이 일어났을 때, 무언가 처리를 하고싶다면, onChange속성을 사용한다.



> input 이벤트와 change 이벤트의 차이점 찾아보기(DOM에서는 다름)

- React에서는 사용자의 입력이 일어날 때마다 뭔가를 해주고 싶다면 -> <input>, <select>, <textarea> 등에서  `onChange`속성을 사용하면, React가 알아서 잘 붙여준다.

- React에서는 value로 제어되는 컴포넌트로 만들어준 후, onChange로 

- e.target.value에는 지금 선택된 옵션의 value값이 들어있다. 

## 제어되는 컴포넌트(Controlled Componentes)
제어되는 컴포넌트?
- input,select, textarea가 화면을 그리는 기능만을 갖게 만들어주는 것이다. 그 자체로는 상태가 변경되지도 않고 제어되지 않게 만드는 것이다.
- 제어되는 컴포넌트는 React의 상태를 바꿔야 화면이 바뀌게 되는 것이다. 

제어되는 컴포넌트를 사용하는 이유
- 사용자의 입력을 아주 세밀하게 컨트롤
- 사용자가 입력할 때마다 바로바로 feedback을 주고 싶을 때 사용

만드는 방법 
: value상태, handleChange함수 하나를 만들어야 한다. 

## 여러 input 제어하기
- 실제로는 form 전부를 제어되게 만드는 게 귀찮고 복잡한 과정임
- 전부 제어되는 컴포넌트가 되게 하면서도 편하게 코딩할 수 있게 만드는 라이브러리를 사용 -> formik 라이브러리를 사용

>formik 라이브러리를 사용

## 제어되는 입력 필드의 Null 값
- 이 부분은 강사님이 그냥 넘어가심

## 제어되는 컴포넌트에 대한 대안책
- 제어되지 않는 컴포넌트를 잘 사용하려면 React의 세계로 DOM객체를 가져와야 한다.
- React에서 만지는 객체는 DOM객체가 아니다. 
- 이 작업을 querySelector로 할 수가 없다.
- cf) ref라는 속성이 DOM객체를 가져올 때 사용하는 속성이다.

# State 끌어올리기
- 화씨, 섭씨 예제가 복잡해서 넘어가심

---
>기억할 것!!
- 1. 여러 자식들이 공유하는 상태가 필요할 때 
- 2. 자식 컴포넌트들끼리 통신해야 할 때
- -> 부모로 상태를 끌어올려서 관리하는 게 좋다. 
---


# 합성(조합) (composition) vs 상속 (inheritance)

## 다른 컴포넌트를 담기
---
- ex) 쇼핑몰 프로젝트
- 헤더나 푸터는 어느 페이지에나 나타난다.
- 
---

종종 컴포넌트에 어떤 자식이 들어올 지 미리 알 수 없는 경우가 있습니다. 이는 범용의 “박스” 역할을 하는 Sidebar 나 Dialog 같은 컴포넌트에서 많이 나타나는 패턴입니다.

이러한 경우, children이라는 특별한 prop을 통해 자식 요소를 출력에 그대로 전달하는 방법을 사용해보세요.
- children이라는 prop은 React가 특별히 관리하는 prop이다.
```js
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```

```js
function WelcomeDialog() {
  return (
    //   FancyBorder에 chidren이라고 넘기지 않았지만,
    //   그 안에 있는 h1과 p가 children이 됨
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
```
---
>기억할 것
props.children이라는 특별한 prop이 있다.
prop으로 element를 넘길 수 있다.
- -> 부모로부터 받은 element를 화면에서 그려줄 수 있다. 
---

컴포넌트를 만들고 싶은데, 빈칸을 만들고 싶을 때
- ex) 레이아웃은 만들어 두고, 컨텐츠 영역만 갈아끼우고 싶을 때 사용


## 특수화 (Specialization)
- ex) 로그인 dialog, 경고 dialog 등
특수한 경우인 컴포넌트를 만들어야 하는 경우
- -> React에서는 상속이 아닌 합성, 조합을 사용한다.

- cf) 상속에서 부모는 좀 더 일반적이고 포괄적인 경우, 자식은 특수한 경우. 라서 보통은 상속을 이용하는데, React에서는 상속을 이용하지 X!. 상속을 쓰지 말라고 React팀에서도 얘기하고 있음



---
할일 목록 실습

React에서는 컴포넌트 하나에 파일 하나를 만든다.
- 하나의 파일에 컴포넌트 여러 개 두는 경우 거의 없다.

React코드는 항상 맨 윗줄에 이 코드가 있어야 한다.
import React from 'react'

- className이라는 라이브러리를 사용하면 class 이름을 동적으로 생성할 수 있다.
[className 라이브러리(npm 페이지)](https://www.npmjs.com/package/classnames)

- 사용법: 이 class를 포함시킬 것인지 포함시키지 않을 것인지 true, false로 객체로 넘긴다.
classNames('foo', { bar: true }); // => 'foo bar'


SandBox에서 npm추가하는 법
- 좌측 Add Dependendy에 키워드로 검색