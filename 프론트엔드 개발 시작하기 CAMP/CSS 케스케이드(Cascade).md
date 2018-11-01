---
# CSS 케스케이드(Cascade)
---
## 케스케이딩(Cascading)이란?

  cascading:

    The process of combining several style sheets
    and resolving conflicts between them.

    Håkon Wium Lie (CSS 공동 창시자)는 CSS에 관한
    PHD 논문에서 
    "여러 스타일 시트를 결합하고 이들 사이의
    충돌을 해결하는 프로세스"라는 용어로 "Cascade"를
    말하고 있다.

    https://www.wiumlie.no/2006/phd/

  CSS(Cascading Style Sheets )는 캐스케이드 개념이
  중요하다는 것을 약어에서 강조. 가장 기본적인 수준에서는
  규칙 순서가 중요하지만 그보다 더 복잡하다는 것을 말한다.

    1. 중요성 (Importance)
       !important 선언은 다른 모든 선언보다 우선권을 가진다.

      [NOTE]
      !important가 적용된 속성을 덮어 쓰려면, 다시 !important를
      사용해야 하기에 최대한(절대!!) 사용하지 않도록 노력해야 한다.

    2. 특성 (Specificity)
       선택자의 우선권에 대한 척도.
       각 척도를 1, 10, 100, 1000 단위로
       생각하면 이해하기 좋다.


       요소 선택자 < 클래스 선택자 < ID 선택자 < 인라인 스타일
       0,0,0,1        0,0,1,0      0,1,0,0      1,0,0,0

      [NOTE]
        *, >, +, ~ 등 콤비네이터(Combinators),
        :not() 가상 클래스는 특성에 영향을 주지 X!

      [예시]
        *                         -- 0000


        a                         -- 0001 
        > (a요소는 요소선택자이기 때문에 1점)


        a.link                    -- 0011
        > (a요소: 1점 + link라는 이름의     **클래스**니까 10점)


        li:nth-child(2) a:hover   -- 0022
        > (li요소: 1점 + a요소: 1점 + li:nth-child(2)는 가상클래스이다. 가상클래스도 클래스이기 때문에 10점 + :hover도 가상클래스이기 떄문에 10점)


        .nav:nth-child(2) a:hover -- 0031
        > .nav: 실제 클래스 10점 + v:nth-child(2): 가상클래스 10점 + :hover 10점 + a요소 1점)


        #outer a                  -- 0101
        > (#outer: id선택자 100점 + a요소: 1점)


        #outer #inner a           -- 0201
        >(#outer: id선택자 100점 + #inner: id선택자 100점 + a요소: 1점 )


        style="color: tan"        -- 1000
        >(inline 스타일 시트: 1000점)


                                  -- `!important`
                                  (inline 스타일 시트도 무력화 시키는 게 `!important`이다. `!important`를 쓰면 함께 지옥에 가는 것임. 안 쓰는 게 좋다!! 최대한 쓰지 않도록! )

    3. 소스 코드의 순서
      : 중요성, 특성이 설정되지 않았거나 동일한 경우
      나중에 나온 소스의 스타일이 우선권을 가진다.

      [예시]
```
        p { color: #930212; }
        p { color: #d5727e; } // 우선권을 가진다.

        p.note { color: #930212; } // note라는 클래스 10점 + p요소 1점= 11점이 되므로 -> 우선권을 가진다.  
        p { color: #d5727e; } 

        p.note { color: #930212; } // .note 클래스: 10점 + p요소: 1점 = 11점
        #target p { color: #d5727e; } // #target: id선택자 100점 + p요소 1점 = 101점
        우선권을 가진다. 


        <p style="color: maroon"> // inline 스타일은 1000점

```

1.  가장 약한 점수를 가지고 있다고 해도 !important flag를 꽂게 되면, 
`!important`가 우선하게 된다.

2. html 파일 요소에 직접 스타일링 하는 것이다. (inline 스타일)



  참고: https://goo.gl/BAhjiN





