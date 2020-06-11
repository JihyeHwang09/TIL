
TL;DR

예외(Exception)를 제대로 활용한다면, 프로그램의 가독성, 신뢰성, 유지보수성이 높아진다.
But, 잘못 사용한다면 반대의 효과가 나타나므로 효과적으로 사용할 줄 알아야 한다.

---
 

본격적으로 예외에 대해 알아보기 전, 오류와 예외의 차이에 대해 정리해보도록 하자.


오류(Error)와 예외(Exception)의 차이
오류(Error) : 프로그램이 정상적으로 실행되지 못하는 상황 (하드웨어적인 메모리와 관련된 문제)

오류는 보통 JVM이 자원 부족, 불변식 깨짐 등 더 이상 수행을 계속할 수 없는 상황을 나타낼 때 사용한다.

예외(Exception) : 처리가능한 오류 (처리할 경우 정상화할 수 있는 문제)


item 69. 예외는 진짜 예외 상황에만 사용하라
예외는 오직 예외 상황에서만 써야 한다.
절대로 일상적인 제어 흐름용으로 쓰여서는 안 된다.
잘 설계된 API라면 클라이언트가 정상적인 제어 흐름에서 예외를 사용할 일이 없게 해야 한다.


코드 69-1 예외를 완전히 잘못 사용한 예- 따라하지 말 것!
```java
// 이 코드는 무한루프를 돌다가 배열의 끝에 도달해서
// ArrayIndexOutOfBoundsException이 발생하면 끝을 내고 있다.
try {
    int i = 0;
    while(true)
        range[i++].climb();
} catch (ArrayIndexOutOfBoundsException e) {
}
```

표준 관용구대로 작성한 예
```java
for (Mountain m : range)
    m.climb();
```

item 70. 복구할 수 있는 상황에는 검사 예외를, 프로그래밍 오류에는 런타임 예외를 사용하라

호출하는 쪽에서 복구하리라 여겨지는 상황이라면, checked exception을 사용하자.


unchecked throwable의 종류
Runtime Exception

Error

프로그래밍 오류를 나타낼 때는 런타임 예외를 사용하자.

런타임 예외의 대부분은 전제조건을 만족하지 못했을 때 발생한다.

배열의 인덱스는 0에서 '배열 크기 -1'이어야 한다.

ArrayIndexOutOfBoundsException이 발생했다는 건 이 전제조건이 지켜지지 않았다는 뜻이다.

 

복구할 수 있는 상황이라면 checked exception를 사용하자.

프로그래밍 오류라면 unchecked exception를 던지자.

확실하지 않다면 unchecked exception를 던지자.

checked exception도 아니고, 런타임 예외도 아닌 throwable은 정의하지도 말자!

구현하는 unchecked throwable은 모두 RuntimeException의 하위 클래스여야 한다.

Error는 상속하지 말아야 할 뿐만 아니라, throw문으로 직접 던지는 일도 없어야 한다.

checked exception라면 복구에 필요한 정보를 알려주는 메서드도 제공하자.

쇼핑몰에서 물건을 구입하려는데, 잔고가 부족해서 checked exception이 발생했다고 해보자.

이 예외는 잔고가 얼마나 부족한지를 알려주는 접근자 메서드를 제공해야 한다.


item 71. 필요 없는 검사 예외 사용은 피하라
꼭 필요한 곳에만 사용한다면 checked exception는 프로그램의 안전성을 높여주지만,
남용할 경우 사용하기 고통스러운 API를 만든다.

API 호출자가 예외 상황에서 복구할 방법이 없다면, unchecked exception를 던지자.

복구가 가능하고 호출자가 그 처리를 해주길 바란다면, 우선 옵셔널을 반환해도 될지 고민하자.

옵셔널만으로는 상황을 처리하기에 충분한 정보를 제공할 수 없을 때만 checked exception를 던지자.


item 72. 표준 예외를 사용하라

표준 예외 사용시 장점
본인이 만든 API를 다른 사람이 익히고 사용하기 쉬워진다.
(많은 프로그래머에게 이미 익숙해진 규약을 그대로 따르기 때문)

만든 API를 사용한 프로그램도 낯선 예외를 사용하지 않게 되어 읽기 쉽게 된다.

예외 클래스 수가 적을수록 메모리 사용량도 주고, 클래스를 적재하는 시간도 적게 걸린다.

Exception, RuntimeException, Throwable, Error 직접 재사용하지 말자.

상황에 부합한다면 항상 표준 예외를 재사용하자.
이 때, API 문서를 참고해서 그 예외가 어떤 상황에서 던져지는지, 예외가 던져지는 맥락도 부합하는지 확인해야 한다.

더 많은 정보를 제공하길 원한다면, 표준 예외를 확장해도 좋다.
단, 예외는 직렬화할 수 있다는 사실을 기억하자. 직렬화에는 많은 부담이 따르니
이 사실만으로 나만의 예외를 새로 만들지 않아야 할 근거로 충분할 수 있다.


cf) 객체 직렬화란? 자바가 객체를 바이트 스트림으로 인코딩(직렬화)하고,
그 바이트 스트림으로부터 다시 객체를 재구성하는 (역직렬화) 매커니즘이다.
직렬화된 객체는 다른 VM에 전송하거나 디스크에 저장한 후 나중에 역직렬화할 수 있다.


자주 사용하는 예외들

예외

주요 쓰임

IllegalArgumentException

허용하지 않는 값이 인수로 건네졌을 때(null은 따로 NullPointerException으로 처리)

IllegalStateException

객체가 메서드를 수행하기에 적절하지 않은 상태일 때

NullPointerException

null을 허용하지 않는 메서드에 null을 건넸을 때

IndexOutOfBoundsException

인덱스가 범위를 넘어섰을 때

ConcurrentModificationException

허용하지 않는 동시 수정이 발견됐을 때

UnsupportedOperationException

호출한 메서드를 지원하지 않을 때


item 73. 추상화 수준에 맞는 예외를 던지라
상위 계층에서는 저수준 예외를 잡아서 자신의 추상화 수준에 맞는 예외로 바꿔 던져야 한다.(예외 번역)

아래 계층의 예외를 예방하거나 스스로 처리할 수 없고,
그 예외를 상위 계층에 그대로 노출하기 곤란하다면 예외 번역을 사용하라.


코드 73-1 예외 번역
```java
try {
   ... // 저수준 추상화를 이용한다.
} catch (LowerLevelException e) {
    // 추상화 수준에 맞게 번역한다.
    throw new HigherLevelException(...);
}
```

```java
/** 
* 이 리스트 안의 지정한 위치의 원소를 반환한다.
* @throws IndexoutOfBoundsException index가 범위 밖이라면,
* 즉 ({@code index < 0 || index >= size()})이면 발생한다.
*/
public E get(int index) { 
  Listiterator<E> i = listIterator(index);
  try {
    return i.next();
  } catch (NoSuchElementException e) {
    throw new IndexOutOfBoundsException("인덱스: " + index);
  }
}
```
  
예외를 번역할 때, 저수준 예외가 디버깅에 도움이 된다면, 예외 연쇄(exception chaining)를 사용하는 게 좋다.

예외 연쇄란 문제의 근본 원인(cause)인 저수준 예외를 고수준 예외에 실어 보내는 방식이다.

그러면, 별도의 접근자 메서드(Throwable의 getCause 메서드)를 통해 필요하면 언제든 저수준 예외를 꺼내볼 수 있다.

 

예외 연쇄를 이용하면 상위 계층에는 맥락에 어울리는 고수준 예외를 던지면서
근본 원인도 함께 알려주어 오류를 분석하기에 좋다.


코드 73-2 예외 연쇄
```java
try {
...// 저수준 추상화를 이용한다.
} catch (LowerLevelException cause) {
// 저수준 예외를 고수준 예외에 실어 보낸다.
  throw new HigherLevelException(cause);
}
```
고수준 예외의 생성자는 (예외 연쇄용으로 설계된) 상위 클래스의 생성자에 이 ‘원인’을 건네주어,

최종적으로 Throwable 생성자까지 건네지게 된다.

 


코드 73-3 예외 연쇄용 생성자
```java
class HigherLevelException extends Exception {
  HigherLevelException(Throwable cause)
  super(cause);
}
```
item 74. 메서드가 던지는 모든 예외를 문서화하라
검사 예외는 항상 따로따로 선언하고,
각 예외가 발생하는 상황을 자바독의 @throws 태그를 사용하여 정확히 문서화하자.

메서드가 던질 수 있는 예외를 각각 @throws 태그로 문서화하되,
비검사 예외는 메서드 선언의 throws 목록에 넣지 말자.

문서화를 해야 하는 이유: 발생 가능한 예외를 문서로 남기지 않으면,
다른 사람이 그 클래스나 인터페이스를 효과적으로 사용하기 어렵거나 심지어 불가능할 수도 있다.


item 75. 예외의 상세 메시지에 실패 관련 정보를 담으라
실패 순간을 포착하려면 발생한 예외에 관여된 모든 매개변수와 필드의 값을 실패 메시지에 담아야 한다.
단, 상세 메시지에 비밀번호나 암호 키 같은 정보까지 담아서는 안 된다.

예외의 상세 메시지와 최종 사용자에게 보여줄 오류 메시지를 혼동해서는 안 된다.
최종 사용자에게는 친절한 안내 메시지를 보여줘야 하는 반면,
예외 메시지는 가독성보다는 담긴 내용이 훨씬 중요하다.


item 76. 가능한 한 실패 원자적으로 만들라
호출된 메서드가 실패하더라도 해당 객체는 메서드 호출 전 상태를 유지해야 한다.

가장 간단한 방법은 불변 객체로 설계하는 것이다.

가변 객체의 메서드를 실패 원자적으로 만드는 가장 보편적인 방법은 작업 수행에 앞서,
매개변수의 유효성을 검사하는 것이다.

객체의 임시 복사본에서 작업을 수행한 다음,
작업이 성공적으로 완료되면 원래 객체와 교체하는 것이다.
데이터를 임시 자료구조에 저장해 작업하는 게 더 빠를 때 적용하기 좋은 방식이다.

어떤 정렬 메서드에서는 정렬을 수행하기 전에 입력 리스트의 원소들을 배열로 옮겨 담는다.
배열을 사용하면 정렬 알고리즘의 반복문에서 원소들에 훨씬 빠르게 접근할 수 있기 때문이다.
물론 이는 성능을 높이고자 취한 결정이지만,
혹시나 정렬에 실패하더라도 입력 리스트는 변하지 않는 효과를 덤으로 얻게 된다.)

4. 작업 도중 발생하는 실패를 가로채는 복구 코드를 작성하여 작업 전 상태로 되돌리는 방법이다.
  (주로 디스크 기반의 내구성을 보장해야 하는 자료구조에 쓰이는데, 자주 쓰이는 방법은 아니다.)


item 77. 예외를 무시하지 말라
예외는 문제 상황에 잘 대처하기 위해 존재하는데, catch 블록을 비워두면 예외가 존재할 이유가 없어진다.
물론, 예외를 무시해야 할 때도 있다.

어쨌든 예외를 무시하기로 했다면, catch 블록 안에 그렇게 결정한 이유를 주석으로 남기고
예외 변수의 이름도 ignored로 바꿔놓도록 하자.

예외를 적절히 처리하면 오류를 완전히 피할수도 있다.
무시하지 않고 바깥으로 전파되게만 놔둬도 최소한 디버깅 정보를 남긴 채 프로그램이 신속히 중단되게는 할 수 있다.


실수를 관리하는 문화

“실수는 예방하는 것이 아니라 관리하는 것이다.”
 

실수가 없으면 학습하지 못한다.

실수 관리를 하는 문화일수록 학습을 더 잘한다.

교육 쪽에는 실수 훈련이라는 개념이 있다. 

교육 중에 실수를 더 유도해야 오히려 학습 전이가 더 잘 일어난다. 

다양한 실수를 경험하는 걸 격려하고, 실수 사례를 배우고, 실수 시에 어떻게 대처하는가를 가르치는 교육이 더 효과적이라는 연구 결과가 많다. 

불확실한 상황에서 실수는 피할 수 없다.

 

 Q. 자신의 실수 문화를 예방에서 관리로 옮겨가려면 어떻게 해야 할까?

스스로에게 이 질문을 묻는 것이 불확실한 상황에서 학습을 높이기 위한 첫걸음이 될 것이다. 


출처
조슈아 블로크, Effective Java 3/E(인사이트)

김창준, 함께 자라기 애자일로 가는 길(인사이트)

https://docs.oracle.com/javase/specs/jls/se11/html/jls-11.html

https://johngrib.github.io/wiki/java-exception-handling/

Mirage.W

https://aroundck.tistory.com/3235

https://www.starstory.us/?p=934


https://tools.ietf.org/html/rfc7231#section-6.6

https://johngrib.github.io/wiki/Postel-s-law/

https://ko.wikipedia.org/wiki/%EA%B2%AC%EA%B3%A0%ED%95%A8%EC%9D%98_%EC%9B%90%EC%B9%99

https://www.yegor256.com/2015/07/28/checked-vs-unchecked-exceptions.html

 
