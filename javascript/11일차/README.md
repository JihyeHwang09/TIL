# DOM API
## 이벤트 객체
- `e.stopPropagation()` - 이벤트 전파 과정을 멈추기
    - 더 이상 이벤트 과정을 실행시키지 않는다. 
- 종종 사용하므로 기억할 것!
- `e.currentTarget` - '실제로 이벤트를 일으킨 요소'가 저장되어 있음
- 이벤트를 실제로 일으킨 요소와 이벤트가 등록되어 있는 요소는 같지 않을 수 있다.
    - ex) 버튼을 클릭했을 때 실제로 이벤트를 일으킨 요소는 버튼인데, 이벤트 리스너가 outer에서도 실행될 수 있다. 


#### `e.target`과 `e.currentTarget`
- `target`은 실제로 이벤트를 일으킨 요소 ex) 실제로 클릭한 요소. button을 누른 경우
- `currentTarget`에는 이벤트가 등록되어 있는 요소 ex) outer 클래스를 갖는 div를 가지고 있는 경우: outer가 나옴
- 보통은 `target`을 사용함. 


- 항상 캡쳐링이나 버블링이 일어나는 것은 아니다.
- 버블링이 일어나는 이벤트도 있고, 일어나지 않는 이벤트도 있다.  (ex) submit, focus, blur, change 등)
    - submit: form만을 위한 이벤트
    - foucs, blur: input만을 위한 이벤트


### 폼 이벤트
- 자료를 실제로 전송할 수 있는 이벤트 
- type = "text"인 경우에는 input을 쓰고, 다른 type인 경우에는 change를 쓴다. 
#### `change` vs `input`
- `change` - checkbox, radio 등의 타입을 갖는 input 요소나 select 요소에 사용자의 선택이 일어났을 때 발생
- `input` - text 타입을 갖는 input 요소나 textarea 요소의 값이 변경되었을 때(키보드 입력이 일어났을 때) 발생

---
- <div class="contenteditable" contenteditable>
    - contenteditable를 주면 input 이벤트가 발생

#### `focus` vs `blur`
---
- `focus` - 키보드 포커스가 해당 요소에 옮겨졌을 때 발생
    - 마우스를 누르든, 키보드로 누르든 포커스가 오면, focus가 출력됨
- `blur` - 키보드 포커스가 해당 요소에서 벗어났을 때 발생
    - 마우스든, 키보드든 포커스가 해당 요소에서 벗어나면, blur가 출력됨 

----
- `submit` - 폼 전송이 일어났을 때 발생 

### 폼 이벤트(submit)
[todo List(form 이용) codePen 예시]()

- 요즘은 form 태그의 내장 기능으로 전송하지 않고, 자바스크립트로 직접 구현을 해서 전송한다. -> 따라서 form태그의 속성을 세세하게 알 필요는 X. 가끔 예전에 만든 프로젝트를 만져야 할 때 알아야하기 때문에 알고는 있어야 함. 

- 실무에서 폼의 전송 기능을 거의 사용하지 않음에도, 폼 태그를 굉장히 많이 사용한다. (폼에 내장되어 있는 편리한 기능을 사용하기 위해서)
- 폼 태그에는 전송 기능 외에도 여러 가지 편리한 기능이 내장되어 있다.
    - ex) 폼 태그의 안에서 Enter를 눌렀을 때 전송되는 기능
    - ex) 폼 안에 있는 input 태그에 `required`를 주면, 해당 input태그가 입력되지 않고 빈칸이면 '이 입력란을 작성하세요'라고 창을 띄워주는 기능

- https://httpbin.org/post에 정보를 전송하면, 우리가 전송한 정보를 JSON 형태로 반환해서 보여줌
- 정보를 전송하는 방식: get방식, post방식
- 전송 버튼을 누를 때, 폼 안에서 엔터키를 누르거나 하면 정보를 전송할 수 있다. (브라우저의 내장 기능)
- form 안에 있는 button을 누르면 정보를 전송할 수 있다. (브라우저의 내장 기능)

- type에는 `submit`, `reset`, `button` 3가지가 있다. 
    - `submit`
    - `reset`: 초기값으로 다시 되돌아가게 함. 
    - `button`: 

- **form기능을 사용하되 브라우저 내장 기능을 사용하고 싶지 않은 경우(비활성화하기 위해서), `preventDefault` 메소드를 사용한다.**

- 사용자 입력 검증을 할 때, HTML5의 검증 기능을 사용(required를 주기)하거나 자바스크립트로 직접 사용자 입력 검증을 하거나 둘 다 혼합해서 사용하기도 한다. 


### 마우스 이벤트
- `click` / `dblclick` - 마우스 클릭 / 더블클릭
- `mouseover` / `mouseout` - 요소에 마우스 포인터가 **들어왔을 때 / 나갔을 때**
- `mousedown` / `mouseup` - 요소 위에서 마우스 **버튼**을 눌렀을 때 / 놓았을 때
- `mousemove` - 요소 위에서 마우스 포인터가 **움직일 때마다**

[Drag&Drop(실습)](https://codepen.io/jihyehwang09/pen/xyPvyZ)

- 스타일링은 자바스크립트에서 할 수도 있지만, 되도록이면 CSS로 스타일을 주는 것이 좋다. 
- 자바스크립트에서는 클래스를 넣었다 뺐다 조작해주고, 스타일링은 css에서 해주자. 

- 마우스 포인터가 갑자기 확 움직이면, 인식 못할 수도 있다.
- 브라우저가 인식하기에는 점으로 이동하는 것처럼 인식 하기 때문에  
```js
// boxEl.하면  마우스 포인터가 갑자기 확 움직이면, 인식 못할 수도 있다.
// 브라우저가 인식하기에는 점으로 이동하는 것처럼 인식 하기 때문
// document.으로 써야 함

// boxEl.addEventListener('mousedown', e => {
//   // 마우스를 눌렀을 때
//    dragging = true;
//  })
document.addEventListener('mousedown', e => {
  // 마우스를 눌렀을 때
   dragging = true;
 })
 ```
 >[과제]
- 박스의 중간 지점과 마우스가 일치하게 그 상태로 움직이려면 어떻게 해야 할 지
- 내가 누른 지점 그대로(마우스 포인터를 올렸을 때 그 마우스 포인터 위치 그대로) 부드럽게 움직이려면 어떻게 해야할 지


### 키보드 이벤트
- 한글은 잘 작동하지 않는다는 걸 기억해두기

- `keydown` / `keyup` - 키보드 버튼을 눌렀을 때 / 놓았을 때
- `keypress` - 문자가 입력되었을 때
- `keydown`에서 charCode와 keyCode는 없어질 예정임. 사용하지 X.

- input이벤트는 문서가 실행될 때 바로 document에 이벤트를 먹일 수 없으나(querySelector로 가져온 후 이벤트 붙일 수 있다.), keydown은 가능하다.
```js
document.addEventListener('keydown', e => {
})

document.querySelector('.todo-input').addEventListener('keypress', e => {

})
```

### 스크롤 이벤트
- `scroll` - 요소 내부의 콘텐츠가 스크롤 될 때마다
- `parallax Scrolling`
