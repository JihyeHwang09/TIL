```java
try {
 //예외 발생 예상 지역
} catch (예외_발생_예상_클래스 객체) {
//예외 발생시 처리할 내용
} finally () {
/예외 발생 여부와 상관없이 무조건 처리해야 할 내용
}
```

## 1. try~catch~finally
- 예외처리 구문은 총 3개의 구문으로 나누어진다.
- 첫 번째 try{} 구문 안에는 예외가 발생 될 것으로 예상되는 코드가 들어간다.
- ex) (예를 들어 배열을 사용하는 경우 범위를 벗어나는 인덱스를 사용하는 경우,
- 정수를 0으로 나누려는 경우,
-  사용자가 어떤 파일을 열고자 하는데 파일이 존재하지 않는 경우 등)
-  사용자의 예상치 못한 오류가 발생 할 수 있는 코드가 try 구문안에 들어온다.

- catch 구문은 try구문에서 예외가 발생되면, 처리해야 할 내용이 온다.
- 다음은 finally 구문으로 예외 발생 여부와는 상관없이 처리해야 할 내용이 오며, 생략이 가능하다.

```java
public class ExceiptionExample {
    public static void main(String[] args) {
        // 인덱스 0~4까지만 존재
        int number[] = new int[5];
        try {
            //
            number[5] = 10;
        } catch (ArrayIndexOutOfBoundsException e) {
            // catch 구문에서는 예외 발생시 넘어온 예외 객체의 메세지를 출력하고
            // 어떤 오류가 발생했는지를 보여주고 있다.
            System.out.println(e.getMessage());
            System.out.println("인덱스 범위를 넘어갔어요.");
            //  finally 구문은 예외 처리가 발생하든 발생하지 않든 실행되는 구문이다.
            //  실제로 try 구문에서 예외가 발생되지 않아도 finally 구문의 내용은 실행이 된다.
        } finally {
            System.out.println("예외 발생 여부와 상관없이 저는 실행이 돼요");
        }
    }
}
```
- 실제로 의도적으로 예외를 발생시키고 처리하는 예제 소스
- int형 배열은 크기가 5로 선언이 되었지만 8번째 라인에서 index 5를 사용하고 있다.
- 이때 ArrayIndexOutBoundsException 예외가 발생이 되고 catch 구문이 실행이 된다.

---

## 2. 예외 전가시키기
- try~catch 구문을 사용하지 않고 throws 키워드를 사용하여 예외를 전가시키는 방법도 있다.
- 전가는 예외가 발생할 수 있는 내용이 들어있는 메서드에서 예외를 처리하지 않고,
- **해당 메서드를 호출한 곳에서 예외를 처리하도록 처리를 전가시키는 것**이다.

```java
class ExceptionExample {
    public static void main(String[] args) {
        int number[] = new int[5];

        try {
            sum(number);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            System.out.println("인덱스 범위를 넘어갔어요");
        } finally {
            System.out.println("예외 발생 여부와 상관없이 저는 실행이 돼요");
        }
    }
    public static void sum(int[] number) throws Exception {
        number[5] += number[4];
    }
 }
```
 - 이번에는 sum() 메서드에서 의도적으로 예외를 발생시키는 코드이다.
 - sum() 내부에서 try ~ catch문을 통해서 예외처리를 하지 않고 함수 옆에 throws 키워드를 통해서 예외를 전가시키고 있다.
 - 이것은 sum() 메서드 내부에서 예외가 발생되면 sum() 메서드에서 해당 예외를 처리하지 않고
 - sum() 메서드를 호출한 영역, 즉 메인 영역에서 예외를 처리하도록 한다.
 
 ---
 
 ## 3. 사용자 예외 만들기
- 예외 클래스들의 최상위 클래스인 Exception 클래스를 상속받아 사용자 예외를 만들어 보자.
- 예외 발생시 출력되는 에러 보고 형식을 우리가 원하는 대로 처리하기 위해
또는 특정 사건에 대한 예외 상황을 모아서 한꺼번에 처리할 방법으로 사용하기 위해서 사용된다.

```java
class ExceptionExample {
    public static void main(String[] args) {
        int number[] = new int[5];

        try {
            sum(number);
        } catch (Exception e) {
            MyException em = new MyException("배열 인덱스 초과", e);
            System.out.println(em.getMessage());
        } finally {
            System.out.println("예외 발생 여부와 상관없이 저는 실행이 돼요");
        }
    }
    /*
    sum() 메서드에서 의도적으로 예외를 발생시키고 메인으로 처리를 전가하고 있다.
    메인의 catch 구문에서 예외처리 객체를 전달받아 직접 만든 Exception 객체를 생성하고 있다.
     */
    public static void sum(int[] number) throws Exception {
        {
            for (int i = 0; i < 5; i++) {
                number[i] = 1;
            }
        }
    }
 }
 class MyException extends Exception {
    private String msg;
    private Throwable cause;

    public MyException() {
        super("사용자 정의 Exception");
    }
    // Exception 클래스를 상속받고, 예외처리에서 쓰일 메세지와 예외 발생시 넘어온 예외 객체를 인자로하는
    // 상위 클래스의 생성자를 호출하는 생성자를 정의하고 있다.
    public MyException(String msg, Throwable cause) {
        super(msg, cause);
        this.msg = msg;
        this.cause = cause;
    }
 }
```




