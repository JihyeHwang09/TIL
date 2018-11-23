# 고차 컴포넌트 (Higher-Order Components)
- 컴포넌트를 받아서 컴포넌트를 반환하는 그저 함수일 뿐이다
- 컴포넌트x. 
- 함수가 컴포넌트가 되려면, 컴포넌트가 아니라 엘리먼트를 반환해야 한다.

## 횡단 관심사(Cross-Cutting Concerns)를 위해 HOC 사용하기
코드는 자세히 읽지 x
```js
const CommentListWithSubscription = 
withSubscription(
  CommentList,
  (DataSource) => DataSource.getComments()
);

const BlogPostWithSubscription = withSubscription(
  BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id)
);
```
첫 번째 인수는 감싸지는 컴포넌트입니다. 두 번째 인수로 주어진 함수는 DataSource 와 props를 이용해 필요한 데이터를 받아옵니다.
(데이터를 어떻게 가져올지)

- 클래스도 값이니까 매개변수로 넘겨줄 수 있다




## 원래 컴포넌트를 변경하지 마세요. 합성을 사용하세요.
- 클래스 컴포넌트에서 메소드 문법을 사용하면, 프르토 타입에 들어감 -> But 이렇게 하지 말것. 다른 컴포넌트에도 영향을 끼침. 좋지 x

- 입력받은 컴포넌트를 직접 변경하지 x

## 관례: HOC와 무관한 prop은 감싸진 컴포넌트에 넘기세요.
HOC는 컴포넌트에 기능을 추가합니다. 그러므로 컴포넌트의 사용법을 극단적으로 바꾸어서는 안 됩니다. 

- 컴포넌트를 구현할 때가 아니라, 사용할 때 사용법은 prop이다

## 관례: 합성을 최대한 활용하세요.
-  HOC는 여러 가지 인자를 받을 수 있다

HOC의 가장 일반적인 모양은 이렇게 생겼습니다.
```js
// React Redux's `connect`
// redux와 react를 연결 -> connect
// connect(commentSelector, commentActions)는 redux와 react를 어떻게 연결할 지를 받음. 고차컴포넌트를 반환

const ConnectedComment = connect(commentSelector, commentActions)(CommentList);
```
다시 말해서, connect는 HOC를 반환하는 고차 함수입니다!




- 고차 컴포넌트를 사용이 Consumer보다 편한 방법

- HOC를 사용할 경우, 컴포넌트 계층이 깊어지는 문제가 생김

- 익명 함수를 썼을 때, React 개발자 도구에 Unknown이 표시됨

## 관례: 원활한 디버깅을 위해 displayName도 감싸주세요.

```js
function withSubscription(WrappedComponent) {
  class WithSubscription extends React.Component {/* ... */}
  WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
  return WithSubscription;
}

function getDisplayName(WrappedComponent) {
    // WrappedComponent.displayName가 있으면 그 이름을,
    // WrappedComponent.name가 있으면 그 이름을,
    // 다 없으면 익명으로 써라
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
```



## render 메소드 안에서 HOC를 사용하지 마세요.
- HOC는 한 번만 적용되게 만들어줘야 한다.
- render 매소드는 언제 어디서든 
-> 매번 새로운 컴포넌트를 그린다. - 컴포넌트 새로운 타입이라서 상태를 매번 닐려버린다는 문제가 있다. (React는 엘리먼트의 타입이나 key값이 바뀌면 상태를 다 날려버리고 새로 그린다. )

- export하는쪽에서 HOC를 둘러주는 게 관례

### Ref는 전달되지 않습니다.
- key와 ref는 prop으로 전달되지 x
 ref가 진짜 prop이 아니고, key와 마찬가지로 React에 의해 특별 취급되기 때문입니다. 만약 여러분이 HOC에서 반환하고자 하는 컴포넌트에 ref를 추가한다면, 그 ref는 안쪽 컴포넌트가 아니라 `가장 바깥쪽의 컨테이너 컴포넌트에 대한 인스턴스`를 가리키게 되는 문제가 발생

- ref라는 이름으로 전달이 불가능하므로, ref라는 이름이 아니라 innerRef라는 이름으로 ref객체를 받은 다음 innerRef라는 이름으로 다른 컴포넌트에 prop으로 넘겨주는 기법을 사용하는 게 관례
