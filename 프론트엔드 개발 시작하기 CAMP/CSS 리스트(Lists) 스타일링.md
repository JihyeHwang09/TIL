
  ------------------------------------------------
  CSS 리스트(Lists) 스타일링
  ------------------------------------------------
  HTML <ul>, <ol>, <li>, <dl>, <dt>, <dd>


리스트 디자인 


HTML 목록과 관련된 속성
• list-style-type: upper-alpha | korean-hangul-formal ... 
• list-stye-position: outside | inside 
• list-style-image: url("star.svg") 
• list-style: square url("star.svg") inside (속기shorthand 유형 작성법) 


HTML 정의 목록 스타일링
 숫자 값(Numeric values)예를 들어 요소의 너비, 테두리 두께, 폰트 크기를 지정하는 길이 값으로 단위없는 정수입니다.백분율(%, Percentages)크기나 길이를 지정하는데 사용할 수 있고, 기본 글꼴 크기를 지정하는데 사용합니다.색상(Colors)배경색, 텍스트 색상 등을 지정합니다.좌표 위치(Coordinate positions)화면의 좌측 상단을 기준으로 position 설정된 요소의 위치를 ​​설정합니다.기능(Functions)배경 이미지, 배경 이미지 그레디언트(Gradient)를 설정하는 경우에 사용합니다.

HTML 속성을 사용한 순차 목록 출력 설정
 ```
<ol start="9"> 
```

HTML 속성을 사용한 순차 목록 리버스 출력 설정
```
<ol start="9" reversed> 
```

HTML 속성을 사용한 순차 목록 항목(item) 출력 설정
``` 
<ol>  <li value="2"> ... </li>  <li value="4"> ... </li> </ol>
```
