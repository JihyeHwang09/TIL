# 자바의 정석
## ch6. 객체지향 개념1
### 3.4 return문 주의사항
#### 반환값이 있는 메서드는 모든 경우에 return문이 있어야 한다.
- 아래의 예시는 **b>= a일 경우에 return문이 없다.**
```java
int max (int a, int b) {
   // a > b일 경우
    if (a > b) {
        return a;
    }
    //  b>= a일 경우는??
```

- b >=일 경우에 return문을 추가한 예시
```java
int max (int a, int b) {
    // a > b일 경우
    if (a > b) {
        return a;
    // b>= a일 경우
    } else {
        return b;  
    }
}
```

#### return문의 개수는 **최소화**하는 것이 좋다.
```java
int max (int a, int b) {
    if (a > b) {
        return a;
    } else {
        return b;  
    }
}
```
```java
int max (int a, int b) {
    int result = 0;
    if (a > b) {
        result = a;
    } else {
        result = b;
    }
    return result;
}
```

### 3.6 JVM 메모리 구조
힙(Heap)
- 인스턴스가 생성되는 공간
- new 연산자에 의해서 생성되는 배열과 객체는 모두 여기에 생성된다. 

### 3.9 클래스메서드(static 메서드) 인스턴스메서드
- 메서드 내에서 인스턴스변수를 사용하지 않는다면 static을 붙이는 것을 고려한다.


### 3.10 멤버간의 참조와 호출
#### 메서드의 호출/ 변수의 접근
- 같은 클래스의 멤버간에는 객체생성이나 참조변수 없이 참조할 수 있다.
- But, static 멤버들은 인스턴스멤버들을 참조할 수 없다.


### 4.1 메서드 오버로딩(method overloading)
- **하나의 클래스에 같은 이름의 메서드를 여러 개 정의하는 것**을 `메서드 오버로딩`,
간단하게 오버로딩이라고 한다.  

### 4.2 오버로딩의 조건
- 메서드의 이름이 같아야 한다.
- 매개변수의 개수 또는 타입이 달라야 한다. 
- 매개변수의 개수와 타입이 같고, 리턴타입이 다른 경우에는 오버로딩이 아니다. 
(리턴타입은 오버로딩을 구현하는데 아무런 영향을 주지 못한다. ) 



### 4.3 오버로딩의 예
#### 오버로딩이 아닌 경우
- 매개변수의 이름이 다른 것은 오버로딩이 아니다.
```java
// 매개변수의 이름이 달라도
// 메서드의 이름이 같고 매개변수의 개수와 타입이 같으므로 오버로딩이 아니다.
int add (int a, int b) { return a+b; } 
int add (int x, int y) { return x+y; }
```
- 리턴타입은 오버로딩과 관계 없다.
```java
//리턴타입이 달라도
// 메서드의 이름이 같고 매개변수의 개수와 타입이 같으므로 오버로딩이 아니다.
int add (int a, int b) { return a+b; }
long add (int a, int b) { return (long)(a+b); }
```
#### 오버로딩인 경우
- 매개변수의 타입이 다르므로 오버로딩이 성립한다.
```java
long add (int a, long b) { return a+b; }
long add (long a, int b) { return a+b; }
```
- 오버로딩의 올바른 예- 매개변수는 다르지만 같은 의미의 기능을 수행
```java
int add (int a, int b) { return a+b; }
long add (long a, long b) {return a+b; }
int add (int[] a) {
    int result = 0;
    
    for (int i = 0; i < a.length; i++) {
        result += a[i];
    }
    return result;
}
```

### 생성자(constructor)란
#### 5.1 생성자란
- 인스턴스가 생성될 때마다 호출되는 `'인스턴스 초기화 메서드'`
- 모든 클래스에는 반드시 하나 이상의 생성자가 있어야 한다.
- 몇 가지 조건을 제외하고는 메서드와 같다.
cf) **인스턴스 초기화- 인스턴스 변수에 적절한 값을 저장하는 것**

```java
Card c = new Card();
// 1. 연산자 new에 의해서 메모리(heap)에 Card 클래스의 인스턴스가 생성된다.
// 2. 생성자 Card()가 호출되어 수행된다.
// 3. 연산자 new의 결과로, 생성된 Card 인스턴스의 주소가 반환되어 참조변수 c에 저장된다.  
```

### 5.2 생성자의 조건
#### 생성자의 조건
- 생성자의 이름은 클래스의 이름과 같아야 한다.
- 생성자는 리턴값이 없다. (하지만 void를 쓰지 않는다.)
##### 예시
```java
클래스 이름(타입 변수명, 타입 변수명, ...) {
    // 인스턴스 생성시 수행될 코드
    // 주로 인스턴스 변수의 초기화 코드를 적는다. 
}
```
```java
class Card {
//...
    Card() { // 매개변수가 없는 생성자
        // 인스턴스 초기화 작업
    }
    Card() { // 매개변수가 있는 생성자
        // 인스턴스 초기화 작업
    }   
}
```

### 5.3 기본 생성자
#### 기본 생성자란 
- **매개변수가 없는** 생성자
- 클래스에 생성자가 하나도 없으면 컴파일러가 기본 생성자를 추가한다.
(**생성자가 하나라도 있으면**, 컴파일러는 기본 생성자를 추가하지 않는다.)
```java
클래스이름() {}
Card() { } // 컴파일러에 의해 추가된 Card 클래스의 기본 생성자. 내용이 없다. 
```
> 모든 클래스에는 **반드시 하나 이상의 생성자가 있어야** 한다. 



### 5.5 생성자에서 다른 생성자 호출하기 - this()
-  `this()`
    - 생성자, 같은 클래스의 다른 생성자를 호출할 때 사용
    - `다른 생성자 호출`은 **생성자의 첫 문장에서만 가능**


### 5.6 참조변수 this
- `this`
    - 인스턴스 자신을 가리키는 참조 변수
    - **인스턴스의 주소**가 저장되어 있음
    - 모든 인스턴스 메서드에 지역변수로 숨겨진 채로 존재
 

### 5.7 생성자를 이용한 인스턴스의 복사
- 생성자에서 참조변수를 매개변수로 받아서 인스턴스변수들의 값을 복사한다. 
- 똑같은 속성값을 갖는 독립적인 인스턴스가 하나 더 만들어진다. 
- ![출처: Java의 정석- 남궁성 ](https://user-images.githubusercontent.com/37353837/65739810-9c106000-e121-11e9-9272-2ffd8708da7b.png)
```java
public class Car {
    String color; // 색상
    String gearType; // 변속기 종류- auto(자동), manual(수동)
    int door; // 문의 개수

//   Car () { // 생성자
//        color = "white";
//        gearType = "auto";
//        door = 4;
//    }
// 위 생성자 코드를 재사용성을 높인 코드로 바꾸면, 아래와 같다.
    Car () {
        // Card ("white", "auto", 4);
         this ("white", "auto", 4);
    }



    Car (String c, String g, int d) { // 생성자
        color = c;
        gearType = g;
        door = d;
    }
    // 위의 생성자 코드를 참조변수 this를 사용해서 변경
    // 인스턴스변수와 지역변수를 구별하기 위해 참조변수 this를 사용했다.
    // 생성자에서 참조변수를 매개변수로 받아서 인스턴스변수들의 값을 복사한다.
    Car (String color, String gearType, int door) {
        this.color = color;
        this.gearType = gearType;
        this.door = door;
        }

    Car (Car c) { // 인스턴스의 복사를 위한 생성자
        // 똑같은 속성값을 갖는 독립적인 인스턴스가 하나 더 만들어진다. 
//        color = c.color;
//        gearType = c.gearType;
//        door = c.door;
        // this를 사용한 코드로 바꾸면, 아래와 같다.
        this(c.color, c.gearType, c.door);
    }
}

class CarTest3 {
    public static void main(String[] args) {
        Car c1 = new Car();
        Car c2 = new Car(c1); // Car(Car c)를 호출
    }
}
```
