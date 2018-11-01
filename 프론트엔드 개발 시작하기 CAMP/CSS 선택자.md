-----------------------
# CSS 선택자(Selector)
-----------------------

* 선택자는 CSS뿐만 아니라 자바스크립트에서도 유용하게 사용될 수 있다.

* CSS는 HTML 요소를 선택하는데 있어 다양한 선택자 옵션을 제공한다. 

> selector(대상) {property(속성):value(값)}

<head>
    <style type="text/css">
    h1 {font-size: 100%} 
     /* Element Type Selector */
    a {text-decoration:none}
    img {border: 0}
    </style>
</head> 


<head>
    <style type="text/css">
    h1, h2, h3, h4, h5,h6{font-wieght: normal}   
     /* Grouping: 여러 개의 요소(태그 선택자)를 일괄적으로 묶어주고, 일괄적으로 디자인해주는 것 */
    a, img, p {border:none}
    h3 span, h4 span{position:fixed:left:-2em}
    </style>

</head> 


<head>
    <style type="text/css">
    * {margin:0:padding:0};
    /* Universal Selector(전체 선택자): HTML에 존재하는 모든 요소에 일괄적으로 스타일링 주고자 할 때*/
    html body * {text-decoration:none}
    p.declation * {text-transform:capitalize}
    </style>
</head> 


<head>
    <style type="text/css">
    p.note{}
     /* Class Selector(클래스 선택자)  */
    .floatLeft{}
    .positionAbs{}
    </style>
</head> 


<head>
    <style type="text/css">
    p.note.floatLeft{}
    /* Multi Class Selector(말 그대로 여러 개의 클래스가 붙은 선택자) 
    단락 요소(p)가 note라는 클래스와 floatLeft라는 클래스를 둘 다 가질 때  
     .note와 .floatLeft 사이에 띄면 X! */
    .section.article{}
    .positionAbs{}
    </style>
</head> 

<head>
    <style type="text/css">
    ul#nav{}
    /* ID Selector(아이디 선택자)
    Hash(#)값을 통해서 아이디를 선택하게 된다.*/
    div#figure{}
    #site_info{}
    </style>
</head> 

<head>
    <style type="text/css">
    p strong{}
    /* Descendant Selector  */
    /* '단락 내부에 있는 strong을 찾아서 꾸며주세요~'라는 뜻 */
    ul li a {}
    /* 비순차 목록인 ul 내부의 li 요소를 찾은 다음에 a 요소
    -> 결국 꾸며지는 건 ul도 X, li도 X!! a요소를 최종적으로 찾은 다음에 꾸민다. 
    -> 맨 마지막에 나오는 요소를 꾸민다. */
    h3 span {}
    </style>
</head> 


# CSS 선택자(Selector)

 요소 선택자 (Element Type Selector)
    figure { ... }
 그룹핑 (Grouping)
    `a`, `abbr`, `.note`, `#about-css` { ... }
    -> class도 묶어 줄 수 있다.

전체 선택자 (Universal Selector)
    * { ... }
    ->*를 사용해서 모든 요소를 선택할 때 쓴다. 
    -  특정 영역 내에 있는 모든 요소를 선택할 때도 쓸 수 있다.
    ex)  #about-css * {}
    -> id가 about-css 속성값을 가진 내부의 모든 요소를 가리키게 된다.
    section이라든가 body는 포함되지 X. 

클래스 선택자 (Class Selector)
    - 대소문자 구분하기 때문에 반드시 확인해야 한다.
    .class { ... }

멀티 클래스 선택자 (Multi Class Selector)
    <비교>
     * 띄어쓰기에 따라 의미가 완전히 달라진다. 
    .class1.class2 { ... }: 하나의 요소가 2개의 클래스를 가진 형태 (멀티 클래스 선택자)
    .class1. class2 { ... }: class1을 가진 요소가 내부에 class2를 가지고 있을 때 쓴다. (자손 선택자)


     ex) .note.box {}
     ->note라는 클래스 가진 요소 중에 box라는 클래스를 가지고 있다면, note와 box 클래스 2개가 모두 가지고 있다면~


아이디 선택자 (ID Seletor): id값이 동일한 대상을 찾는다. 
    #id { ... }
    ex) #about-css {}
    -> id가 about-css인 요소에 적용한다. 


자손 선택자 (Descendent Selector):  클래스 or 아이디를 이용해서 꾸밀 수 있다. 
    h1 abbr {  ... }
    -> 'h1이 포함한 abbr을 찾아서 꾸며주세요~' 라는 뜻
    .note abbr { ... }
   

자식 선택자 (Descendent Selector): 부모의 직접적인 자식만 나타낸다. 
    .parent > .child { ... }

## 자손 선택자 vs 자식 선택자
자손 선택자: ex) 아들, 손주
자식 선택자: 직계 자식만 선택할 수 있음. ex) 아들

ex1) <h1>
        <strong>
            <strong>
                <abbr>
    h1의 자손 선택자: <strong>, <strong>, <abbr>
    h1의 자식 선택자: 바로 밑의 <strong>만 해당 됨. 
ex2) 
    body * {} : body 요소 내부의 모든 자손 선택
    body > * {} : body 요소 내부의 모든 자식(Child) 선택



속성 선택자 (Attribute Selector)
    : 속성 선택자[] 앞에 아무것도 붙어있지 않다면. *가 생략되어 있다고 보면 된다. 

    [id] { ... }
    -> id 속성을 가지고 있다면~
    ex) 
    a[id] { ... }
    -> a요소가 id 속성값을 가지고 있다면~

    [class] { ... }
    [title] { ... }
    [shape] { ... }

    [shape][title]{ ... }
    -> shape과 title 속성을 둘 다 가지고 있다면~


    <area shape="" coords="" href="">
    <area shape="" coords="" href="" title="">



[class="note box"] { ...  }
-> 정확하게 "note box"라는 이름의 클래스를 찾기 때문에
클래스명이 "box note"일 경우에는 찾을 수 X.

-> class의 경우에는 
.box {}
.note {} 
가 좀 더 유연하게 사용할 수 있다.


    



    [id="about-css] { ... }
    -> id값이 about-css라면~ 해당 요소를 선택해서 꾸며주게 된다. 
    이걸 쉽게 쓰라고 만들어진 표현법이 hash(#) 표현법이다. 
    #about-css { ... }

    [class="note"] { ... }
    .note { ... }




^="": ~로 시작하는 것
ex) 
[title^="Scalable"] { ... }
-> title 요소 중,  ""안의 Scalable이라는 단어로 시작하는 것을 모두 찾고 싶을 때


$="": ~로 끝나는 것
ex) 
[title$="Language"] { ... }
-> title 요소 중,  ""안의 Language이라는 단어로 끝나는 것을 모두 찾고 싶을 때

*="": ~를 포함하는 것
ex) 
[title*="Markup"] { ... }
-> title 요소 중,  ""안의 Markup이라는 단어를 포함하는 것을 모두 찾고 싶을 
-> CSS는 완벽하게 대소문자를 구분하기 때문에 "Markup"과 "markup"을 다르게 받아들인다. 

    [href^="http://"] { ... }
    -> href 속성값이 ^로 시작한다면, 속성값이 "http://"로 (""안의 단어로) 꼭 시작해야 한다.

    [src$=".svg"] { ... }
    -> .svg는 확장자임('.'으로 시작하므로) 확장자가 svg인 파일들을 이미지로 불러오는 모든 요소들을 찾게되는 것이다.

    [src*="phone"] { ... }
    -> src에 포함된 단어 중에 "phone"이 들어간 걸 모두 찾아온다. 



고급 속성 선택자

가상 클래스 선택자(Link Pseudo-class)
a:link, a:visited{}
anchor element가 기본적으로 가지고 있는 상태는 link element이다.
1번 이상 방문한 사이트는 표시가 되어야 한다. -> visited 방문했다는 가상클래스를 사용할 수 있다. 

a:hover, a:active{}
hover: 마우스가 올라간 상태
active: 마우스로 클릭한 순간 -> 마우스 클릭한 걸 떼게 되면 active가 해제되는 것임

p:hover{}

input:focus
-> focus가 된 상태
input:focus:hover
-> focus가 된 상태에서 마우스가 올라가면(hover)~



[가상 클래스(Pseudo Class)]

:link { ... }
:visited { ... }

:hover { ... }
> hover는 마우스에 의존하는 속성
:active { ... }


:focus { ... }
:focus:hover { ... }
-> keyboard에 focusing이 간 상태에서 마우스가 올라가게 되면, 디자인이 변경된다. 

:focus:active { ... }
-> focus가 된 후에 클릭이 될 때 디자인이 변경된다. 
> 가상 클래스는 연이어서 사용할 수 있다. 


:first-child { ... }
> :first-child는 :nth-child(1)과 같다.  

:last-child { ... }
>자식이 4개 라면-> last-child와 nth-child(4)와 같다. 
:nth-child(n) { ... }
>()안에는 공식이 사용될 수 있다. 
1st
2nd
3rd
4th
5th
...
nth


ex)
link-list last-child(2n-1) {}
link-list last-child(odd) {}
> 홀수 번째
link-list last-child(2n) {}
link-list last-child(even) {}
> 짝수 번째
> CSS에서는 단축해서 홀수는 (odd),(even)을 사용한다. 
link-list last-child(3n) {}
> 3의 배수 번째에만

:lang(ko) { ... }

ex) 디자인 상에서 한글과 영문은 각기 다른 디자인을 적용해달라는 요구가 있을 수 있음. 그 나라의 언어에 맞게 폰트를 변경할 떄 가상클래스를 사용하면 된다. 

:lang(en) {
    font-family: "Times New Roman";
    <!-- 명조계열체 -->
  }
:lang(ko-KR) {
    font-family: "Spoqa Han Sans";
    <!-- 고딕계열체 -->
  }


가상 요소(Pseudo Element): 가상 클래스와는 다르다. 
: 1개 사용 -> 가상 클래스 
                            vs :: 2개 사용-> 가상 요소
::first-letter { ... }
::first-line { ... }
::before { ... }
::after { ... }

