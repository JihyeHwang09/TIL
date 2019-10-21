# 쓰레드(Thread)
> 실행 중인 프로그램을 프로세스(Process)라고 부른다.
> 한 개의 프로세스는 한 가지 일을 수행하지만, Thread를 사용하게 되면,
> 한 프로세스 내에서 여러가지 작업을 동시에 수행할 수 있게 된다.

## 기본적인 쓰레드 사용
Thread를 상속받아 run() 메소드를 오버라이딩함으로써 간단한 Thread를 구현해보자.
쓰레드 동작을 위해 Thread를 상속받는 Thread1 클래스를 구현한다.
Main 영역에서 Thread1 클래스의 객체를 생성하고 start() 메서드를 호춯함으로써 쓰레드를 동작시킨다.

```java
class Thread1 extends Thread {
    // thread 인덱스를 넘겨받는 생성자와 쓰레드의 동작을 구현하는 run()메서드를 오버라이딩 한다.
    int index;

    public Thread1 (int index) {
        this.index = index;
    }
    public void run () {  //실제로 Thread가 동작하는 내용을 구현
        System.out.println(index + "번째 Thread Start");
        try {
            Thread.sleep(2000);   //단순히 2초동안 thread가 생성되었다가 종료된다.
        } catch (Exception e) {

        } finally {
            System.out.println(index + "번째 Thread End");
        }
    }
}

class ThreadTest {
    public static void main (String args[]) {
        Thread1 thread1 = new Thread1(1); //위에 구현한 클래스 객체 생성
        Thread1 thread2 = new Thread1(2);
        Thread1 thread3 = new Thread1(3);

        thread1.start();
        thread2.start();
        thread3.start();
        // 매 실행마다 결과 다르게 나옴
        // 1번째 Thread Start
        // 2번째 Thread Start
        // 3번째 Thread Start
        // 3번째 Thread End
        // 2번째 Thread End
        // 1번째 Thread End

    }
}
```

---

## join()을 통한 쓰레드 구현
- 위에 예제 실행 결과를 보면 첫 번째 쓰레드가 먼저 시작했음에도 불구하고 3번째 thread가 먼저 끝났다는 메세지가 먼저 뜬다.
- 이것은 thread1 쓰레드를 실행하다가 실행 흐름이 thread3로 옮겨지게 되면서 이런 경우가 발생한다.
- 하지만, 첫 번째 쓰레드가 끝난 후,  두 번째 쓰레드가 실행되고
- 두 번째 쓰레드가 끝난 후 세 번째 쓰레드가 실행되도록 하고 싶은 경우가 있을 것이다.
- 이런 경우 사용하는 것이 `join()`이다.

```java
class Thread1 extends Thread {
    int index;

    public Thread1 (int index) {
        this.index = index;
    }
    public void run () {
        System.out.println(index + "번째 Thread Start");
        try {
            Thread.sleep(2000);
        } catch (Exception e) {}
            System.out.println(index + "번째 Thread End");
    }
}

class ThreadTest {
    public static void main (String args[]) throws InterruptedException {
        Thread1 thread1 = new Thread1(1);
        Thread1 thread2 = new Thread1(2);
        Thread1 thread3 = new Thread1(3);

        thread1.start();
        thread1.join();  // thread1이 종료될 때까지 기다린다.
        thread2.start();
        thread2.join(); // thread2가 종료될 때까지 기다린다.
        thread3.start();
        // 1번째 Thread Start
        // 1번째 Thread End
        // 2번째 Thread Start
        // 2번째 Thread End
        // 3번째 Thread Start
        // 3번째 Thread End
    }
}
```
- `start()` 호출 후에 `join()` 메서드를 호출하는 구조이다.
- `join()`은 **해당 쓰레드가 종료될 때까지 대기 상태**에 있도록 해준다.


---

## Runnable 인터페이스
- Thread 클래스를 상속받아 thread를 구현하는 방법도 있지만, Runnuable 인터페이스를 구현하도록 하는 방법도 있다.
-  위에 예제를 Runnable 인터페이스를 구현하는 방법으로 수정해보자.
```java

class ThreadTest {
    public static void main (String args[]) throws InterruptedException {
        Thread thread1 = new Thread(new Thread1(1));
        Thread thread2 = new Thread(new Thread1(2));
        Thread thread3 = new Thread(new Thread1(3));

        thread1.start();
        thread2.start();
        thread3.start();
    }
}
```
- Thread를 상속받는 대신, Runnable 인터페이스를 구현함으로써 thread를 사용하는 방식이다.
- ThreadTest에서 Thread 생성 정보로 구현한 클래스의 객체를 넘겨줌으로써 객체를 생성하는 방식이다.

---

## Synchronized 키워드를 활용한 동기화
> 동기화란 여러 개의 쓰레드가 한 개의 자원을 사용하고자 할 때,
> 해당 쓰레드를 제외한 나머지 쓰레드는 접근을 못하도록 막는 것을 의미한다.

- 예제는 각 쓰레드가 공통 자원을 사용하는데 있어서 순차적으로 한 번씩 사용해야 하는 자원에 대해 접근한다고 가정을 했다.


- 프로그램은 thread1, thread2, thread3가 Resource 객체의 Resource_index를 0번부터 차례대로 호출해서 사용하려고 한다.
- 한 번 사용하고나면, Resource_index를 1 증가시킨다.
- 동기화되지 않은 상태이며, 결과를 먼저 보자.
- 0번째 자원은 여러 번 사용되었을 뿐만 아니라, 순차적으로 자원을 사용하지도 못하고 있다. 

```java
class ThreadTest {
    public static void main (String args[]) throws InterruptedException {
        Resource resource = new Resource();
        Thread thread1 = new Thread (new Thread1(resource, "1번 쓰레드"));
        Thread thread2 = new Thread (new Thread1(resource, "2번 쓰레드"));
        Thread thread3 = new Thread (new Thread1(resource, "3번 쓰레드"));

        thread1.start(); //차례대로 쓰레드를 실행
        thread2.start();
        thread3.start();

//        1번 쓰레드=0번째 resource 사용
//        3번 쓰레드=0번째 resource 사용
//        3번 쓰레드=2번째 resource 사용
//        3번 쓰레드=3번째 resource 사용
//        1번 쓰레드=1번째 resource 사용
//        2번 쓰레드=0번째 resource 사용
//        2번 쓰레드=6번째 resource 사용
//        2번 쓰레드=7번째 resource 사용
//        1번 쓰레드=5번째 resource 사용

    }
}

public class  Thread1 implements Runnable {
    private Resource resource;
    private String name;

    public Thread1(Resource resource, String name) {
        this.resource = resource;
        this.name = name;
    }
    public void run() {
        try {
            for (int i = 0; i < 3; i++) {
                resource.getResource(name); // 0번 index부터 차례대로 자원을 사용
            }
        } catch (Exception e) {}
    }
}


class Resource {
    private  int Resource_index = 0;
    public void getResource (String name) {
        System.out.println(name + "=" + Resource_index + "번째 resource 사용"); // 자원을 사용했다고 가정
        Resource_index++; // 다음 자원의 index
    }
}

---

```java
class ThreadTest {
    public static void main (String args[]) throws InterruptedException {
        Resource resource = new Resource();
        Thread thread1 = new Thread (new Thread1(resource, "1번 쓰레드"));
        Thread thread2 = new Thread (new Thread1(resource, "2번 쓰레드"));
        Thread thread3 = new Thread (new Thread1(resource, "3번 쓰레드"));

        thread1.start(); //차례대로 쓰레드를 실행
        thread2.start();
        thread3.start();

//        1번 쓰레드=0번째 resource 사용
//        3번 쓰레드=0번째 resource 사용
//        3번 쓰레드=2번째 resource 사용
//        3번 쓰레드=3번째 resource 사용
//        1번 쓰레드=1번째 resource 사용
//        2번 쓰레드=0번째 resource 사용
//        2번 쓰레드=6번째 resource 사용
//        2번 쓰레드=7번째 resource 사용
//        1번 쓰레드=5번째 resource 사용

    }
}

public class  Thread1 implements Runnable {
    private Resource resource;
    private String name;

    public Thread1(Resource resource, String name) {
        this.resource = resource;
        this.name = name;
    }
    public void run() {
        try {
            for (int i = 0; i < 3; i++) {
                resource.getResource(name); // 0번 index부터 차례대로 자원을 사용
            }
        } catch (Exception e) {}
    }
}


class Resource {
    private  int Resource_index = 0;
    // 동기화
    // 이번에는 한 번 사용된 자원은 재사용되지 않았고, 순차적으로 잘 사용하고 있다. 
    public synchronized void getResource (String name) { 
        System.out.println(name + "=" + Resource_index + "번째 resource 사용"); // 자원을 사용했다고 가정
        Resource_index++; // 다음 자원의 index
    }
}
```
