
------------------------------------------------
#### CSS 타이포그래피 (Typography)
------------------------------------------------

## 폰트(Fonts) 스타일 속성
> 폰트에 영향을 주는 속성으로 적용되는 모양, 크기, 굵기, 기울임 등.

 * `font-family`: 글자 모양
 * `font-size`: 글자 크기
 * `font-weight`: 글자 굵기(두께)
 * `font-style`: 글자 기울임
 * `font-variant`: 소문자를 작은 대문자로 바꾸는 속성
---
※ 글자 색상은 color 속성으로 설정.
* `color keywords`: `red`, `green`, `blue`, `pink`, `black`
* hex color code: #RRGGBB / 0 ~ 9, a ~ f 
* 예) #1868a7
  - rgb VS rgba의 차이 rgba는 불투명도까지 나타낸다. 
  - 각 256가지 색을 나타내고, 0부터 시작하기 떄문에 **번호는 256까지 X**. 256-1인 255까지가 정상적인 색으로 나옴!
  - rgb, rgba: `RED`, `GREEN`, `BLUE`, `ALPHA`

* 예) 
  - rgba(127,255,0,1): a가 1이면 **불투명**한 색
  - rgba(127,255,0,0.3): a가 0.3이면 **반투명**한 색

* `hsl`, `hsla`: HUE(각도), `ATURATION(채도), LIGHTNESS(명도), ALPHA (투명도)
```css
예) hsla(360,60%,70%,1)
```
* `saturation(채도)`: 100%면 순색(원색)에 가까움.  
* `lightness(명도)`: 0%에 가까우면, 검정색<br> 100%에 가까우면, 흰색임.


> 웹브라우저는 운영체제가 지원하는 기본 폰트(웹 안전 폰트)만 
> 화면에 렌더링 한다. (참고: cssfontstack.com)
- 즉, 사용된 폰트가 사용자 컴퓨터에 없으면 렌더링 X.

* 웹 안전 폰트
- Arial [sans-serif]: 고딕체
- Verdana [sans-serif]: 고딕체
- Courier New [monospace]: 코드체(공간이 동일)
- Georgia [serif]: 명조체
- Times New Roman [serif]: 명조체
- Trebuchet MS [serif]: 명조체

> 하지만 웹 안전 폰트만으로 디자인 하는 디자이너는 없다!
Helvetica는 디자이너가 애용하는 폰트이지만...
Windows는 기본 지원하지 않는다. (Mac OSX는 지원)

※ 비주얼 디자인 과정에서 적용 가능한 웹폰트를 사용해야 한다.
  폰트 저작권에 주의! (참고: hyundaicard.com)

※ 저작권 걱정 없는 폰트
  fonts.google.com
  google.co.kr/search?q=무료+웹폰트

--------------------------------------------------

`텍스트(Text) 레이아웃` 속성
- 텍스트 간격 및 레이아웃 기능에 영향을 주는 속성으로
  행간, 자간, 어간, 정렬, 변형, 꾸밈, 그림자
> 사용자가 읽기 편한 간격: `자간` <  `어간`  < `행간` 순으로 넓어야 한다. 
-> 염두에 두고 디자인할 것!
  * `line-height`
  > **줄 높이**를 정하는 속성
    - default: `1.25`임. **1.5이상 줘야 글을 읽기가 용이해짐.**
```css
  ex) line-height: 1.5;
```

* `letter-spacing`
> **글자** 사이의 간격(자간)
  - default값: `0`
```css
ex) letter-spacing: -0.024em;
```
* `word-spacing`
> **단어** 사이의 간격
픽셀 단위나 em으로 조정할 것 
```css
ex) 
  word-spacing: 1px;
  word-spacing: 0.02em;
```

* `text-align` 
> 정렬
- default값: `왼쪽`
```css
ex) text-align: center; 
// 가운데 정렬
text-align: right;
// 오른쪽 정렬
text-align: left;
//왼쪽 정렬
```
* `text-indent`
> 들여쓰기
- +값, -값 사용할 수 있음.

* `+`: 오른쪽으로 **들여쓰기**됨.
* `-`: 왼쪽으로 **내어쓰기**됨.
```css
ex1) text-indent: 1em; 
// 각 문단의 첫째줄만 들여쓰고 싶을 때
cf)  padding-left: 1em;
// 텍스트 전체를 들여쓰고 싶을 때 
```

* `text-transform`
> 대문자로 또는 소문자로 바꾸는 속성
```css
 text-transform: `uppercase`;
모두 대문자로 바꿈
 text-transform: lowercase;
 // 모두 소문자로 바꿈
```

* `text-decoration`
> 선으로 텍스트를 꾸미는 속성
```css
ex) text-decoration: underline;
// 밑줄 치기
// 글자를 판독하기 어렵게 하기 때문에 권장되지 X.
text-decoration: overline underline line-through;
// text-decoration: overline-> 위에 공간을 만들어서 줄을 그어줌.
// text-decoration: line-through; -> 글씨 중간에 취소선을 그어줌.
```
* `text-shadow`
> 그림자
x축 y축 blur sprea color;
```css
ex1)  text-shadow: 4px -3px 10px #9bdbde;
ex2)  text-shadow: 0px 3px 10px #943978;
```

*  `white-space`
> 공백을 처리하는 방법
  - white-space: `pre`
  - white-space: `pre-line`;
  - white-space: `nowrap`;
  <br> nowrap은 가로 한줄로 쭈욱~ 나열됨. 

**단어의 분리를 어떻게 할 것인지 결정**

(공백/띄어쓰기) 수고했어 오늘도
(음절) 수 고 했 어 오 늘 도


*  `word-break`: `break-all`;
> 박스의 가로 영역을 넘친 단어 내에서
> 임의의 분리 여부를 결정하여 줄바꿈에 관여


*  `word-wrap`
> 긴 단어 처리하는 방법 
-  default: `normal`
  - `normal`: 글자가 길어도 끊어지지 않고 한 줄에 
  - `break-word`: 강제로 끊어서 줄바꿈 함


