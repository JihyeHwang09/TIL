# Chapter2. "Hello World!"
## 들어가기
-  "Hello World!"라는 문자열을 '얼럿(Alert)창, 도큐먼트(Document), 콘솔(Console)'등에 표시해 보고, <br> 각 방식의 차이점을 알아보자.

## 'Hello, World!'를 화면에 출력하기

### 2.1.02 템플릿 구조 살펴보기

- HTML문서는 `<Doctype(문서 유형 선언부)>`, `<html>태그`로 구성된다.
- `<html>태그`의 구성
    -  `<head>태그`: 웹 페이지에 대한 여러 설정을 관리
    -  `<body>태그`: 페이지 본문에 해당


#### `<html> 태그`의 `lang 속성`
> 전체 HTML 페이지에 대한 언어 속성. 일반 브라우저에서는 큰 차이가 없지만
> 시각 장애인을 위한 리더기 등의 기본 언어 설정으로 쓰이므로 
> 웹 접근성(Accessibility) 측면에서 매우 중요한 값이다.

####   `<head>태그`의 `meta charset 속성` 
- `UTF-8`로 설정하지 않는 경우(생략하는 경우), 브라우저들이 착각하고 다른 캐릭터셋으로 웹페이지를 읽다가 한글 등이 깨지는 경우가 발생한다.


####  `<head>태그`의 `<title>태그`
- 웹 페이지의 제목
- 이 태그의 내용이 브라우저 창 꼭대기에 나타나므로 꼭 잊지 말고 작성해야 한다.

####  `<body>태그`
- 실제로 화면에 보여지는 영역
- `<div>태그`나 `<table>태그` 등을 사용한 레이아웃 요소들과 `<span>`, `<img>` 등을 이용한 컨텐츠 요소를 모두 포함한다.
- 즉, 화면에 보여줄 모든 항목들을 갖고 있다.
- 그 외에도 `<style>태그`


###  2.1.03 팝업 경고창 띄우기
```js
<!DOCTYPE html>
<html lang="ko-KR">
    <head>
        <title>Title</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="css/style.css" rel="stylesheet">
        <script>
            alert('Hello, World!');
        </script>
    </head>
    <body>
    </body>
</html>
```

- `<script>태그`는 `<head>태그` 또는 `<body>태그` 어느 쪽에든 있을 수 있는데, 각각의 장단점이 있다. ('DOM 엘리먼트' 부분과 관련)
- `alert()`를 실행하면 작은 팝업창이 뜨면서 'Hello, World!'와 같이 우리가 입력한 문자열을 표시해준다.
    - `alert()`와 같은 함수(Function)에 넘겨주는 값: `인자` or `인자값`이라고 한다.
- 자바스크립트에서는 한 문장의 끝을 `세미콜론(;)`으로 표현한다.
    - 브라우저들이 많이 똑똑해져서 어느 정도는 세미콜론 없이 엔터(Enter)만 입력해도 문장이 끝났다고 이해하기는 하지만, <br> 세미콜론을 넣는 것이 여러모로 안전하다.
- `alert()`를 사용하면 에러 메시지나 중요한 알림을 사용자에게 전달할 때 유용하다.
    - 모든 브라우저에서 잘 작동하므로 `디버깅(Debuggin, 오류 검색/수정)`을 위한 최소한의 장치이기도 하다.

####  '모든 브라우저에서 잘 작동한다'는 말의 의미
- 각 브라우저는 HTML을 표현하는 방법, 자바스크립트를 실행하는 방법 등이 모두 다르다. 
- 즉, 하나의 브라우저에서 이렇게 작동했다고 해서 다른 브라우저에서도 독같이 작동한다는 보장이 없다.
- 웹 프론트엔드 개발에서는 여러 브라우저에서 모두 동일하게 작동하도록 하는 `크로스브라우징(Cross-Browsing)` 또는 `크로스브라우저(Cross-Browser)`개발이 매우 중요하다.


### 2.1.04 도큐먼트에 문자열 출력하기

```js
<!DOCTYPE html>
<html lang="ko-KR">
    <head>
        <title>Title</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="css/style.css" rel="stylesheet">
        <script>
            document.write('<b>Hello, World!</b>');
        </script>
    </head>
    <body>
    </body>
</html>
```
####  `document.write()`함수의 특징
- 입력된 문자열 중 태그에 해당하는 부분을 알아서 구분하여 생성한다.
- `<b>Hello, World!</b>`라는 문자열 그대로 출력하지 않고, 실제 <b>태그가 생성되어 문자열에 볼드가 입혀진 것을 볼 수 있다.
- `document.write()`함수로 작성된 문자열은 브라우저 입장에서는 개발자가 작성한 코드와 정확히 동일하다.
- 태그가 포함되어 있으면 그 태그를 생성해 버린다.
- 단순한 `<b>태그`이외에도 아예 `<script>`태그나 `<iframe>`태그를 생성하도록 하여 복잡한 로직을 행할 때도 있지만,
- 이러한 코드는 유지/보수가 매우 힘들고 제약 사항이 많다.
- 특수한 경우가 아니면 사용하지 않는 것이 좋다.
    
### 2.1.05 콘솔에 문자열 출력하기
```js
<!DOCTYPE html>
<html lang="ko-KR">
    <head>
        <title>Title</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="css/style.css" rel="stylesheet">
        <script>
            alert('Hello, World!');

            document.write('<b>Hello, World!</b>');

            console.log('Hello, World!');
        </script>
    </head>
    <body>
    </body>
</html>
```
- `console.log()`함수는 개발용 도구로서, 일반 화면이 아닌 [개발자 도구]에서만 출력을 확인할 수 있다.
- 콘솔은 결과를 보는 용도 이외에도 직접 자바스크립트 코드를 실행시키는 용도로도 사용된다.

### 2.1.06 개발자 도구 살펴보기

- 콘솔은 실제 사용자에게 보이는 부분이 아니기 때문에 console.log()와 같이 콘솔과 관련된 함수는 오로지 개발이나 디버깅 용도로만 사용해야 한다.

####  콘솔의 출력 스타일 바꾸기
-  콘솔에 출력되는 글씨의 스타일을 바꿀 수 있는 기능
```js
console.log('%cHello, World!', 'color: blue; font-size: 20px');
```
- 출력하고 싶은 문자열 앞에 '%c'를 붙이고, 두 번째 인자로 원하는 CSS 스타일을 넣어준다. 
    - -> 그 스타일이 적용된 채로 콘솔에 출력된다. (단, IE에서는 제대로 동작하지 않을 수 있음)

####  엘리먼츠(Elements) 탭
- 현재 도큐먼트에 있는 모든 엘리먼트(요소)들을 보여주는 곳
- 각 엘리먼트간의 관계, 각각에 적용된 스타일, 이벤트들을 한 눈에 볼 수 있고, 수정할 수 있다.
- `user agent stylesheet`: 사용자가 지정해 준 스타일이 아닌 브라우저의 기본 스타일 
- 스타일 탭: 가장 하위에 브라우저 디폴트 스타일이 위치하고, 위쪽으로 갈수록 우선순위가 높은 스타일이 위치한다.
    - 아래 쪽의 값을 덮어씌우는(Overwrite) 구조로 되어 있다.
    - 같은 엘리먼트에 서로 다른 스타일이 적용되었을 때 우선순위에 따라 스타일이 결정된다.

