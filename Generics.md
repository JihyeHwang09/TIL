# Generics

```java
    List list = new ArrayList<>();
    list.add("hello");
    // get() 메서드가 Object를 반환하므로 컴파일 에러 발생
    // String str = list.get(0);
```

### 1.5 이전
```java
    List list = new ArrayList();
    list.add("hello");
    String str = (String) list.get(0);
```
### Generics
```java
    // Generics를 선언할 수 있는 타입이 객체 타입이기 때문에 기본 자료형인 int나 string이 아닌
    // Integer나 String을 사용한다.
    // 타입 아규먼트를 이용해서 컴파일 타임에 타입을 제한해서 타입 안정성을 확보한다.
    List<String> list = new ArrayList<String>();
    list.add("hello");
    String str = list.get(0);
```

---
### 제네릭 클래스
```java
 public class MyList<T> {
    private T[] ts;
    private int cursor;

    @SuppressWarnings("unchecked")
    MyList() {
        this.ts = (T[]) new Object[10];
    }

    void add(T t) {
        this.ts[cursor++] = t;
    }
    T get(int idx) {
        return this.ts[idx];
    }
}
```
### 제네릭 
```java
class MyList2 {
    private Object[] ts;
    private int cursor;

    MyList2() {
        this.ts = new Object[10];
    }

    <T> void add(T t) {
        this.ts[cursor++] = t;
    }

    @SuppressWarnings("unchecked")
    <T> T get(int idx) {
        return (T) this.ts[idx];
    }
```
### 제네릭 클래스 VS 제네릭 메서드
- 모든 인터페이스에서 한가지 타입을 다뤄야하는 자료구조성 클래스에는 제네릭 클래스가 어울린다.
- 유틸성 메서드에는 제네릭 메서드가 어울린다.
- 조슈아 블로크는 이펙티브 자바에서 가능하면 `제네릭 메서드`로 만들것을 권장한다.
- 제네릭 클래스는 사용하는 쪽에서 타입 아규먼트를 지정하면서 `제네릭 클래스`를 사용하고 있음을 알리지만,
**제네릭 메서드는 좀 더 유연하게 작동하기 때문에 `제네릭 메서드`로 만드는 것을 권장한다.**
---
### 출처: https://slides.com/changyong/generics#/6
