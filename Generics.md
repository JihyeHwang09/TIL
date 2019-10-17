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
