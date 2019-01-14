
  ------------------------------------------------
  CSS 배경(Background) 스타일링
  ------------------------------------------------
  Background Design
  : 요소의 배경(background)은 요소의  content-box, border-box 아래에 있는 영역이다.
  (margin-box 제외)
  모던 브라우저에서는 배경을 차지하는 영역을 background-clip 속성을 사용하여 변경할 수 있다.

*  `background-color`: 배경색을 설정한다.
* `background-image`: 요소의 배경에 표시할 배경 이미지를 지정한다.
* `background-position`: 배경이 요소 배경 안에 표시되어야 하는 위치를 설정한다.
  1. position
    `background-position`: left|right top|bottom;
기본값: left top


  2. 좌표(pixel)
  `background-position`: x축 좌표 y축 좌표
  ex) `background-position`: 200px 200px;


  3. percentage 
  `background-position`: x축 y축
  ex) `background-position`: 20% 0%;
       `background-position`: 100% 0%;
       // 오른쪽 끝


* `background-repeat`: 배경을 반복할지 여부를 설정한다.
`background-repeat`: repeat | repeat-x | repeat-y | no-repeat
기본값: repeat;

  - repeat
  - repeat-x: x축으로 배경 이미지 반복
  - repeat-y: y축으로 배경 이미지 반복
  - no-repeat: 배경 이미지 반복하지 X


* `background-attachment`: 내용이 스크롤 될 때 요소의 배경 동작을 설정한다.
ex) `background-attachment`: fixed;
// 배경 이미지가 고정된 형태로 그 자리에 머물러 있음.


* `background`: 배경 속성을 모아 작성하는 속기법
- 모든 배경 속성을 묶어서 쓰고 싶을 때, `background를 사용.

- transparent는 기본값이기 떄문에 안 넣어줘도 상관 X.


* `background-size`: 배경 이미지의 크기를 동적으로 조정할 수 있다. 
`background-size`: width height
ex) `background-size`: 100px 100px;


* `background-clip`
* `background-origin`



```
body {
  

}

#css-background {

}

.bg-image {
  background: url("../images/NewYork-US.jpg) no-repeat center -20px;
  <!-- background-size: 100%쓰면 이미지가 다 들어오기는 한다. <br>But 비율이 맞지 않는다. 이미지가 작을 경우, 늘려서 끼워맞춰지게 됨.<br> ->이미지가 왜곡됨 -->
  <!-- background-size: contain; 사용 -->
   background-size: cover;
   
  <!-- 이미지를 늘려서 끼워맞추는 게 X. <br>원래 비율대로 이미지를 넣되, 커버를 씌우듯이 이미지 넣을 공간만큼만 이미지를 넣는 것임.  -->

}

.is-floral {

}

.is-model {

}

.background-clip {

}
```
