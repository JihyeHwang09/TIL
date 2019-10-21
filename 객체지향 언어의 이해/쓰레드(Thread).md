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
    }
}
```
