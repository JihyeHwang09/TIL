# 업캐스팅(UPCASTING)과 다운캐스팅 (DOWNCASTING)
## 업캐스팅(UPCASTING)
> 상위 클래스의 객체 참조 변수에 하위 클래스의 인스턴스를 대입하는 것을 의미한다.
> 모든 객체 내의 모든 멤버에 접근할 수 없고, 상위 클래스의 멤버에만 접근이 가능하다.
```java
public class Main {
    public static void main(String args[]) {
        /*
        Top top = new Top();
        : 일반적으로 우리가 보는 객체 참조 변수에 인스턴스를 할당하는 부분
        그런 뒤에 top 객체는 통해 show()메소드를 호출하게 되면, 당연히 Top 클래스에 구현된 show()가 호출된다.
         */
        Top top = new Top();
        //상위 클래스 타입에 상위 클래스 인스턴스 대입
       top.show(); // 상위 클래스에서 호출됩니다.

        /*
        top = new Bottom();
        : 다음과 같이 상위 클래스인 Top 참조 변수에 하위 클래스의 인스턴스를 할당한다.(업캐스팅)
        그런 뒤에 마찬가지로 show() 메서드를 호출하게 되면, 이번엔 하위 클래스인 Bottom에 구현된 show()가 호출하게 된다.
         */
       top = new Bottom();
        //상위 클래스 타입에 하위 클래스 인스턴스 대입
        top.show(); // 하위 클래스에서 호출됩니다.
    }
}

class Top {
    public void show () {
        System.out.println("상위 클래스에서 호출됩니다.");
    }
}

class Bottom extends Top {
    public void show () {
        System.out.println("하위 클래스에서 호출됩니다.");
    }
}
```

---

### 추상 클래스 업캐스팅
> 상위 클래스가 추상 클래스일 때,
> 상위 클래스가 추상 클래스 일때 업캐스팅이 이루어지면 어떤식으로 동작되는지 살펴보자.

```java
public class Main {
    public static void main(String[] args) {
        Top top = new Bottom();
        //상위 클래스 타입에 하위 클래스 인스턴스 대입
        top.show(); // 하위 클래스에서 호출 됩니다.
        top.show2(); // 추상 메서드 재정의!!
        // top.show3(); // Error: Cannot resolve method 'show3()'
    }
}

abstract class Top {
    public void show () {
        System.out.println("상위 클래스에서 호출 됩니다.");
    }
    public abstract void show2();
}

class Bottom extends Top {
    public void show () {
        System.out.println("하위 클래스에서 호출 됩니다.");
    }
    public void show2 () {
        System.out.println("추상 메서드 재정의!!");
    }
    public void show3 () {
        System.out.println("show3() 호출");
    }
}
```
Top은 추상 클래스로 정의되었고, 하위 클래스에서 show() 메서드 구현을 강요하고 있다.
그런 다음 차례대로 show(), show2() 메서드를 호출하고 있다.

이상하다? 분명히 업캐스팅을 하면, 상위 클래스의 멤버만 접근이 가능하다고 했는데,
어떻게 하위 클래스의 멤버 메서드가 호출이 되는 걸까?
-> top과 bottom은 상속관계를 맺는 클래스로 show()와 show2() 메서드는 Top 클래스에 전부 정의가 되어 있다.
show()는 오버라이딩을 통해 하위 클래스의 메서드가 호출되는 것이며,
show2()도 마찬가지로 추상 메서드로 하위 클래스에서 구현된 show2()가 호출되는 것이다.

show3() 메서드 같은 경우에는, Top에 정의되어 있지 않고,
상속에 의한 확장된 클래스로 Botton에만 구현되어 있는 메서드이다.
**Top 클래스로 업캐스팅된 top 객체 참조 변수를 통해 show3() 메서드를 호출하려고 하면 오류가 발생한다.**

---
## 다운캐스팅 (DOWNCASTING)
> 업캐스팅이 되었던 객체 참조 변수가 원래의 형으로 되돌아오는 것

```java
public class Main {
    public static void main(String args[]) {
        Top top = new Bottom();
        //상위 클래스 타입에 하위 클래스 인스턴스 대입
        top.show(); // 하위 클래스에서 호출 됩니다.
        top.show2(); // 추상 메서드 재정의!!

        Bottom bottom = (Bottom) top;
        // 다운 캐스팅
        bottom.show3(); // show3() 호출
    }
}
abstract class Top {
    public void show () {
        System.out.println("상위 클래스에서 호출 됩니다.");
    }
    public abstract void show2();
}

class Bottom extends Top {
    public void show() {
        System.out.println("하위 클래스에서 호출 됩니다.");
    }

    public void show2() {
        System.out.println("추상 메서드 재정의!!");
    }

    public void show3() {
        System.out.println("show3() 호출");
    }
}
```

