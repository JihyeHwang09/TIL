# 자바의 정석
## ch7. 객체지향 개념2
### 1.1 상속(inheritance)의 정의와 장점
#### 상속이란?
- **기존의 클래스를 재사용**해서 새로운 클래스를 작성하는 것
- 두 클래스를 조상과 자손으로 관계를 맺어주는 것
- 자손은 조상의 모든 멤버를 상속받는다. (**생성자, 초기화블럭은 제외!**)
- 자손의 멤버개수는 조상보다 적을 수 없다.(자손의 멤버개수 **>=** 조상의 멤버개수)


- 상속을 이용하기 전 예시
```java

class Point3D {
    int x;
    int y;
    int z;
}

```
- 상속을 이용한 예시
```java
class Point {
    int x;
    int y;
}
// Point3D가 Point에 있는 int x, int y를 상속받았으므로
// int z만 추가해주면 됨
class Point3D extends Point {
    int z;
}
```

### 1.2 클래스간의 관계
#### 상속 관계(inheritance)
> 조상의 변경은 자손에 영향을 미치지만, 자손의 변경은 조상에 아무런 영향을 미치지 않는다.
- ![자바의 정석 - 남궁성](https://user-images.githubusercontent.com/37353837/65745341-6033c580-e136-11e9-81e7-acccc603de80.png)
#### 포함 관계(composite)
- 포함이란?
    - 한 클래스의 멤버변수로 다른 클래스를 선언하는 것
    - 작은 단위의 클래스를 먼저 만들고, 이들을 조합해서 하나의 커다란 클래스를 만든다.
    
- 포함(composite)을 이용하기 전 예시
```java
class Circle {
    int x; // 원점의 x좌표
    int y; // 원점의 y좌표
    int r; // 반지름(radius)
}
```
- 포함(composite)을 이용한 예시1
```java
class Point {
    int x;
    int y;
}

class Circle {
    Point c = new Point(); // 원점
    int r; // 반지름(radius)
}
```

- 포함(composite)을 이용한 예시2
```java
class Car {
    Engine e = new Engine(); // 엔진
    Door[] d = new Door[4]; // 문, 문의 개수를 넷으로 가정하고 배열로 처리했음
}
```
### 1.3 클래스간의 관계 결정하기- 상속 vs 포함
```java
class Point {
    int x;
    int y;
}
```
#### 상속 관계
> ~은 ~이다.(is-a)
- ex) 원(Circle)은 점(Point)**이다.** 
- Circle **is a** Point.
```java
class  Circle extends Point {
    int r; // 반지름(radius)
}
```
#### 포함 관계
> ~은 ~을 가지고 있다.(has-a)
- ex) 원(Circle)은 점(Point)을 **가지고 있다.** 
- Circle **has a** Point.
```java
class Circle {
    Point c = new Point(); // 원점
    int r; // 반지름(radius) 
}
```

##### 예제1
- 원(Circle)은 도형(Shape)**이다.**: 상속 관계 
- 원(Circle)은 점(Point)을 **가지고 있다.**: 포함 관계
```java
class Shape {
    String color = "blue";
    void draw() {
    // 도형을 그린다. 
    }
}
```

```java
class Point {
    int x;
    int y;
    
    Point () {
        this(0, 0);
    }
    
    Point (int x, int y) {
        this.x = x;
        this.y = y;
    }
}
```
```java
class Circle extends Shape {
    Point center;
    int r;

    Circle () {
        this(new Point(0, 0), 100);
    }
    Circle (Point) {
        this.center = center;
        this.r = r;
    }
}
```
```java
class Triangle extends Shape {
    point [] p;
    
    Triangle (Point [] p) {
        this.p = p;
    }
    Triangle (Point p1, Point p2, Point p3) {
        p = new Point [] (p1, p2, p3);
    }      
}

```

```java
Circle c1 = new Circle();
Circle c2 = new Circle(new Point(150, 150), 50);

Point [] p = (new Point(100, 100),
              new Point(140, 50),
              new Point(200, 100)
              );
Triangle t1 = new Triangle(p); 
```

##### 예제2
```java
class Deck {
    final int CARD_NUM = 52; // 카드의 개수
    Card c [] = new Card[];
    
    Deck () {
    int i = 0;
    }   
    for (int k = Card.KIND_MAX; k > 0; k--) {
        for (int n = 1; n < Card.NUM_MAX + 1; n++) {
            c[i++] = new Card(k, n);
        }
    }
    Card pick (int index) { // 지정된 위치(index)에 있는 카드 하나를 선택한다. 
        return c [index % CARD_NUM];
    }
    Card pick () { // Deck에서 카드 하나를 선택한다. 
        int index = (int)(Math.random() * CARD_NUM);
    }   
    void shuffle () {
        for (int n = 0; n < 1000; n++) {
            Card temp = c[0];
            c[0] = c[i];
            c[i] = temp;
        }
    }
} // Deck 클래스의 끝
```


### 1.4 단일 상속(single inheritance)
>  Java는 **단일상속만을 허용**한다. (C++은 다중상속 허용)
```java
class TVCR extends TV, VCR { // 이와 같은 표현은 허용하지 않는다. 
}
```
> 비중이 높은 클래스 하나만 상속관계로, 나머지는 포함 관계로 한다. 
```java
class TV {
    boolean power; // 전원상태(on/off)
    int channel;  // 채널
    
    void power() {power = !power;}
    void channelUp () {++channel;}
    void channelDown() {--channel;}
}
```
```java
class VCR {
    boolean power; // 전원상태(on/off)
    int counter = 0;
    void power () { power = !power;}
    void play () {/* 내용 생략 */}
    void stop () {/* 내용 생략 */}
    void rew () {/* 내용 생략 */}
    void ff () {/* 내용 생략 */}
}
```

```java
class TVCR extends TV {
    VCR vcr = new VCR();
    int counter = vcr.counter;
    void play () {
        ver.play();
    }
    void stop () {
        vcr.stop();
    }
    void rew () {
        vcr.rew();
    }
    void ff() {
        vcr.ff();    
    }
}
```

### 1.5 Object 클래스
> 모든 클래스의 최고 조상
- 조상이 없는 클래스는 자동적으로 Object 클래스를 상속받게 된다.
- 상속계층도의 최상위에는 Object 클래스가 위치한다.
- **모든 클래스는 Object 클래스에 정의된 11개의 메서드를 상속받는다.**
(ex) toString(), equals(Object obj), hashCode(), ...)

---
## 오버라이딩(overriding)
### 2.1 오버라이딩(overriding)이란?
> 조상클래스로부터 **상속받은 메서드의 내용을**
> 상속받는 클래스에 맞게 **변경하는 것**을 `오버라이딩`이라고 한다.
- cf) override -vt: ~위에 덮어쓰다(overwrite), ~에 우선하다
```java
class Point {
    int x;
    int y;
    
    String getLocation () {
        return "x : " + x + ", y: " + y;
    }
}

class Point3D extends Point {
    int z;
    String getLocaiton () { // 오버라이딩
        return "x: " + x + ", y: " + y + ", z: " + z;
    }   
}
```
### 2.2 오버라이딩의 조건
1. 선언부(이름, 매개변수, 리턴타입)가 같아야 한다. 
2. 접근제어자를 좁은 범위로 변경할 수 없다.
- ex) 조상의 메서드가 protected라면, 범위가 같거나 넓은 protected나 public으로만 변경할 수 있다.
3. 조상 클래스의 메서드보다 많은 수의 예외를 선언할 수 없다.
```java
import java.io.IOException;
import java.sql.SQLException;

class Parent {
    void parentMethod () throws IOException, SQLException {
       // ...
    }
}
class Child extends Parent {
    void parentMethod () throws IOException {
    // ...
    }       
}
class Child2 extends Parent {
    void parentMehod () throws Exception {
    // ...
    }
}
```
### 2.3 오버로딩 vs 오버라이딩
- `오버로딩 (over loading)`: 기존에 없는 새로운 메서드를 정의하는 것(new)
- `오버라이딩(overriding)`: 상속받은 메서드의 내용을 변경하는 것(change, modify)
```java
class Parent {
    void parentMethod () {}
}
class Child extends Parent {
    void parentMethod () {} // 오버라이딩 
    void parentMethod (int i) {} // 오버로딩
    
    void childMethod () {} // 새로운 메서드 생성
    void childMethod (int i) {} // 오버로딩
    void childMethod () {} // 에러!! 중복 정의임
}
```
> 오버라이딩은 상속받은 메서드의 내용을 변경하는 것이지, 
>같은 클래스 내에서 새로 생성한 메서드를 똑같이 선언하면 중복 정의가 됨! 

### 2.4 super 
#### 참조변수
- `this`
    - 인스턴스 자신을 가리키는 참조변수
    - 인스턴스의 주소가 저장되어 있음
    - 모든 인스턴스 메서드에 지역변수로 숨겨진 채로 존재
- `super`
    - this와 같음
    - 조상의 멤버와 자신의 멤버를 구별하는 데 사용
```java
class Parent {
    int x = 10;
}
class Child extends Parent {
    int x = 20;
    void method () {
        System.out.println("x=" + x);
        System.out.println("this.x=" + this.x);
        System.out.println("super.x=" + super.x); 
    }
}
```
```java
public static void main(String[] args){
  Child c = new Child();
    c.method();
}
```
#### 조상의 생성자
- 자손 클래스의 인스턴스를 생성하면, **자손의 멤버와 조상의 멤버가 합쳐진 하나의 인스턴스**가 생성된다.
- 조상의 멤버들도 초기화되어야 하기 때문에 **`자손의 생성자`의 첫 문장에서 `조상의 생성자`를 호출해야 한다.**
> Object 클래스를 제외한 모든 클래스의 생성자 첫 줄에는 
> 생성자(1) 같은 클래스의 다른 생성자 또는 2) 조상의 생성자)를 호출해야 한다.
> **그렇지 않을 경우, 컴파일러가 자동적으로 `super();`를 생성자의 첫 줄에 삽입한다.** 
```java
class Point extends Object {
    int x;
    int y;
    
    Point () {
        this(0, 0);
    }
    
    Point (int x, int y) {
        super(); // Object();
        this.x = x;
        this.y = y;
    }
    
    String getLocation () {
        return "x: " + x +  " ,y: " + y; 
    }
}

class Point3D extends Point {
    int z;
    
    point3D (int x, int y, int z) {
//        super(); // Point()를 호출
//        this.x = x;
//        this.y = y;
        super(x, y); // 조상의 생성자  Point(int x, int y) {}를 호출
        this.z = z;
    }
    
    String getLocation () { // 오버라이딩
        return "x: " + x + ", y: " + y + ", z: " + z;
    }
}

class PointTest {
    public static void main(String[] args){
      Point3D p3 = new Point3D(1, 2, 3);
    }
}
```
---
## 제어자(modifier)란?
- 하나의 대상에 여러 개의 제어자를 조합해서 사용할 수 있으나, 접근제어자는 단 하나만 사용할 수 있다.

### `static` - 클래스의, 공통적인
> static이 사용될 수 있는 곳- 멤버변수, 메서드, 초기화 블럭
#### 대상
##### 멤버변수
- 모든 인스턴스에 공통적으로 사용되는 클래스변수가 된다.
- 클래스 변수는 인스턴스를 생성하지 않고도 사용 가능하다.
- 클래스가 메모리에 로드될 때 생성된다.
##### 메서드
- 인스턴스를 생성하지 않고도 호출이 가능한 static 메서드가 된다.
- static 메서드 내에서는 인스턴스 멤버들을 직접 사용할 수 없다.
```java
class StaticTest {
    //  static - 멤버변수
    // 모든 인스턴스에 공통적으로 사용되는 클래스변수가 된다.
    static int width = 200;
    static int height = 120;
    
    static { // 클래스 초기화 블럭
    // static 변수의 복잡한 초기화 수행
    }
    
    // static - 메서드
    // 인스턴스를 생성하지 않고도 호출이 가능한 static 메서드가 된다.
    // static 메서드 내에서는 인스턴스 멤버들을 직접 사용할 수 없다.
    static int max (int a, int b) {
        return a > b? a : b;
    }
}
```

