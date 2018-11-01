# 프로토타입(Prototype)

- 함수가 실행될 때마다 객체가 새로 만들어지고 함수도 매번 새로 만들어진다.
- 객체 안에 메소드를 만들어서 이렇게 매번 만들어지는건 메모리 낭비다.
- 비슷한 객체들의 속성을 하나로 모아두기 위해서 쓰는 게 `프로토타입(Prototype)`이다.
- `프로토타입 상속(prototype inheritance)`:프로토타입 기능을 이용해 한 객체에서 다른 객체의 기능을 가져와 사용하는 것을 말한다.
- 프로토타입 상속은 기능을 물려받는 것이다. 부모, 자식으로 표현하기도 한다.
    - ex) `personPrototype`의 자식에는 person1, person2가 있다.

- 상속을 받은 객체라고 하더라도 실제로 상속받은 게 이 객체 안에 들어있는 게 X.
```js
const parent = {
  a: 1
};
const child = {
  b: 2
};
Object.setPrototypeOf(child, parent);
// childe가 parent를 상속받는다고 하더라도,
// child 안에는 실제로 a라는 속성이 없다.
console.log(child); // { 'b': 2 }
```

- child 객체에 확인해 봤는데 없으면 계속 부모를 따라 올라가서 확인해본다.<br> object까지 올라갔는데도 없으면 `undefined`를 반환한다.(없는 속성을 반환하라고 하면 undefined를 반환하므로)


### `프로토타입의 체인(연쇄)(Prototype Chain)`
- 프로토타입의 체인을 올라가다가 처음 만나는 속성을 사용한다. 더 위의 부모까지 올라가지 않는다.
- 객체를 쓸 때마다 `프로토타입 체인`은 **항상** 동작한다.
    - cf) 배열에는 push라는 메소드가 없다. 배열의 부모에 push라는 메소드가 있다. 프토타입 체인이 동작해서 push라는 메소드가 작동하는 것이다.
- `자식`.isPrototypeOf(`부모`) 메소드
    - 어떤 객체가 다른 객체의 프로토타입 체인에 존재하는지 확인하기 위해 사용한다.  
```js
    obj1.isPrototypeOf(obj3); // true
    obj2.isPrototypeOf(obj3); // true
``` 

### 속성 가리기 (Property Shadowing)
- 프로토타입 체인의 상위에 있는 속성이 하위 속성에 의해 가려지는 현상

### 프로토타입을 간접적으로 변경하는 것은 불가능
- 속성을 읽어올 때만 프로토타입 체인을 사용할 수 있다. 
- 속성을 쓰거나 지우는 등의 작업을 할 때는 프로토타입 체인을 사용할 수 없다.
- 즉, 자식 객체를 통해서 프토토타입 체인을 이용해서 부모 객체의 속성을 변경하거나 삭제할 수 X. 
- 어떤 객체의 속성을 변경하거나 속성을 삭제하는 작업은 그 객체의 프로토타입에 아무런 영향을 미치지 않는다.


# 생성자 (Constructor)
- Person.prototype에 객체를 저장한 적이 없지만 객체가 저장이 되어 있다.
- 생성자로부터 인스턴스를 생성하면, 인스턴스의 부모는 `생성자.prototype`이 된다.
```js
// Person 생성자 예제
function Person(name) {
  this.name = name;
  this.age = age;
}
Person.prototype.familyName = '김';
// person1.familyName;의 결과값은 '김'이 된다.
Person.prototype.introduce = function () {
    console.log(`안녕하세요, ${this.familyName}${this.name}입니다.`)
    // 이 this는 person1을 가리킨다. 
}
erson.compareAge = function(person1, person2) {
  if (person1.age < person2.age) {
    return '첫 번째 사람의 나이가 더 많습니다.';
  } else if (person1.age === person2.age) {
    return '두 사람의 나이가 같습니다.';
  } else {
    return '두 번째 사람의 나이가 더 많습니다.';
  }
}


const person1 = new Person('승하');
// person1의 부모는 Person.prototype이 된다.
person1.introduce();
const person2 = new Person('아준');
person2.introduce();
```

- 요즘은 클래스를 많이 쓰는 편. 
- 클래스를 알려면 먼저 이걸 잘 이해해야 한다.

- (function keyword 함수로 만들어진) 메소드 내부의 this는 호출되는 시점에 결정된다.(화살표 함수에서의 this는 동작 방식이 다르다.)
- cf) 화살표 함수의 this는 정의되는 시점에 결정된다.

- 함수가 정의되는 시점
- 함수가 호출되는 시점

- 함수가 만들어질 때(정의될 때), this가 무엇을 가리키는지 정해지는 게 X.


### constructor
- `객체.constructor`를 사용하면 객체가 어떤 생성자로부터 생성되었는지를 알아낼 수 있다. 

## 정적 메소드
- 생성자 속성에 직접 지정된 메소드를 정적메소드라고 한다.
- ex) `Number.isNaN`, `Object.getPropertyOf`등의 함수들은 모두 정적 메소드이다.


### `reduce` 메소드
```js
const arr = [1, 2, 3];

arr.reduce((acc, item) => acc + item, 0); // 6
```
- 초기 누적값: 0
- 마지막의 누적값이 결과값이 된다. 
- 누적값: accumulator
- ex) 문자열 길이의 총합을 구하고 싶다. 


- `reduce` 메소드를 가지고 `map`, `filter`, `sort` 등 다른 메소드를 만들수도 있다.
```js
// fileter 직접 구현하기 
function filter(arr, func) {
  return arr.reduce(function(acc, item) {
    if (func(item)) {
      acc.push(item)
    }
    return acc
  }, [])
}


const arr = [1, 2, 3, 4, 5]

filter(arr, x => x % 2 === 0)
```
- 배열을 반환할 거니까 빈 배열을  초기 누적값으로 줌.

- reduce메소드에 초기누적값을 넘겨주지 않으면, 배열의 첫번째 값이 초기누적값으로 사용됨. 
- reduce를 쓸 때는 항상 초기값을 넣어주자.
```js
const arr = ['Denton', 'Roy', 'Jay'];
arr.reduce((acc, item) => acc + item, 0);
// Denton33
```

## 배열을 순회할 때, 순회 중인 배열을 편집하면 안된다. 
## 루프를 돌면서 배열에 뭔가를 편집하고 싶다면, 새 배열을 만들어서 편집해라. 