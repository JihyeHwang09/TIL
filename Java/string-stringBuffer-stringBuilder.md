## String VS StringBuffer VS StringBuilder

### TL;DR

- 문자열 연산이 많고 단일 쓰레드이거나 동기화를 고려하지 않아도 되는 경우,
  StringBuilder를 사용하자.
- 멀티쓰레드 환경일 경우, String이나 StringBuffer의 사용을 고려해본다.
- 멀티쓰레드 환경이면서 문자열 연산이 적을 경우, String을 사용한다.
- 멀티쓰레드 환경이면서 문자열 연산이 많을 경우, StringBuffer를 사용한다.

---

### 공통점

String 클래스와 StringBuffer 클래스 모두 문자형 배열(char[])을 내부적으로 가지고 있다.

- String 클래스

```java
public final class String implements java.io.Serializable, Comparable {
    /* The value is used for character storage. */
    private char[] value;
}
```

- StringBuffer 클래스

```java
public final class StringBuffer implements java.io.Serializable {
    private char[] values;
}
```

### 차이점

#### 1. 인스턴스의 내용을 변경할 수 있는가?

- String 클래스 인스턴스의 내용은 변경할 수 없다.(immutable)
- 반면에, StringBuffer 클래스는 인스턴스의 내용을 바꿀 수 있다.(mutable)

String 클래스는 대표적인 불변객체이다.

#### 2. equals()를 오버라이딩 하는가?

- String 클래스는 equals()를 오버라이딩한다.
- StringBuffer 클래스는 eqauls()를 오버라이딩하지 않는다.

---

### 왜 구분해서 사용할까?

StringBuffer를 사용하면 thread-safe하게 문자열 연산을 수행할 수 있다.


---

### 참고

남궁성 저, Java의 정석 요약집 2판, 도우출판, 262~ 269(슬라이드 번호)
https://ifuwanna.tistory.com/221
https://jeong-pro.tistory.com/85
https://cjh5414.github.io/why-StringBuffer-and-StringBuilder-are-better-than-String/
