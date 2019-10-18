# 자바가 확장한 객체 지향 - this와 super 키워드
## this 키워드
> 자기 자신애 대한 객체 참조값을 가진다. 메서드 내에서 사용되어 지고 static 메서드에서는 사용 할 수 없다.

### 매개변수와 객체가 가지는 변수의 이름이 같을 경우
- 보통 생성자의 인자로 받는 변수의 이름과 객체에 속해있는 멤버 변수의 이름이 같은 경우에
이 두 개를 구분하기 위해 this를 사용한다.

```java
public class Student {
    private String name;
    private int age;
    private String email;
    private String number;

    public Student (String name, int age, String email, String number) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.number = number;
    }

    public Student get_student () {
        return this;
    }
}
```
Student class의 생성자 부분을 보면, 매개변수로 name, age, email, number 이름로 매개변수를 얻어오고 있다.
문제는 Student가 가지는 멤버변수의 이름도 동일하다는 것이다.
이때, 매개변수와 객체의 멤버변수를 구별해서 사용하기 위해 this 키워드를 사용하였다.


### 생성자 내에서 다른 생성자를 호출하기 위해
- 여러 개의 생성자를 오버로딩하여 구현하는 경우, 코드 중복을 피하기 위해서
-> 즉, 같은 클래스에서 오버로딩된 다른 생성자를 호출할 때 사용한다.

- 최초 인자 두 개를 가지는 생성자를 호출하게 되면, 그 안에는 this 키워드를 통하여
인자 4개를 갖는 같은 객체 내의 다른 생성자를 호출하고 있다.


### 메서드에서 자기 자신을 반환하고 싶을 때
- 객체 자신을 반환하고 싶을 때 this 키워드를 사용한다.
```java
public class student {
    
    private String name;
    private int age;
    private String email;
    private String number;
    
    public student(String name,int age,String email,String number)
    {
        this.name=name;
        this.age=age;
        this.email=email;
        this.number=number;
    }
    public student get_student()
    {
        return this;
    }
}
```
## super 키워드
상위 클래스(객체)를 가리킨다.
보통 하위 클래스에서 상위 클래스의 메서드를 사용하고자 할 때, super 키워드를 사용한다.

```java
public class A {
    public void show () {
        System.out.println("저는 상위 A 클래스입니다.");
    }
}
```

A를 상속받는 B클래스를 선언하고, 상위 클래스의 show()를 오버라이딩 한다.
안에는 super.show()를 통해 상위 클래스의 show()를 한 번 호출한 뒤 다른 내용을 구현하고 있다.
```java
public class B extends A
{
    public void show()
    {
        super.show();
        System.out.println("저는 B클래스입니다.");
    }
}
```
이렇게 구현을 한 뒤, 외부에서 B의 show()를 호출 할 경우
먼저 상위 클래스인 A의 show()가 먼저 호출이 되고 그 다음 새롭게 구현한 내용이 실행된다.

```java
class StudentTest {
    public static void main(String[] args) {
        B b = new B();
        b.show();
    }
}
```
---
### 출처
- [08 [객체 지향 언어의 이해] 자바가 확장한 객체 지향 - this와 super 키워드]: https://lktprogrammer.tistory.com/27?category=672211
