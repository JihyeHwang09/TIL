// 다음 단계로 갈 때, 점수를 어딘가에 저장해둬야 한다. 기억해 둘 변수를 만들자.
let score = 0;
// 다른 곳에서도 사용할 수 있게 answer를 전역변수로 빼준다.(가장 바깥인 전역에 써준다.)
const rightModalEl = document.querySelector("right-modal");
const wrongModalEl = document.querySelector(".wrong-modal");

// html에 쓰여져 있는 것을 가져오는 것이기 때문에 미리 선택해서 변수에 담아줄 수 있다.

// rgb코드를 텍스트로도, 3가지 보기의 색깔로도 화면에 뿌려줘야 한다.
// 랜덤하게 rgb 컬러 코드를 만드는 작업을 함수로 만들자.
// rgb(0~255, 0~255, 0~255)를 리턴해주는 함수
function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb${r}, ${g}, ${b}`;
}
// 이벤트 리스너 등록해주기
// option 클래스를 가지고 있는 요소들(총 3개)에 접근해서 순회하면서
// 각각의 optionEl에 클릭 이벤트를 붙여준다.
document.querySelectorAll(".option").forEach((optionEl, index) => {
  optionEl.addEventListener("click", e => {
    // 이 함수에서 스코프 바깥쪽에 있는 변수 index를 쓰고 있으니 클로저다.
    // 이 함수랑 클로저인 index = 0이 묶여서 저장되어 있다.
    if (anwer === index) {
      // if(opitons[index] === options[answer])로 비교할 수도 있으나
      // 둘 다 숫자니까 (answer === index)로 비교해도 된다.
      score++;
      // 정답인 보기를 클릭했을 때, THAT'S RIGHT!이라는 메시지와 NEXT STAGE 버튼을 보여주자.
      rightModalEl.addEventListener("open");
    } else {
      // score를 초기화하기 전에 (score값이 날아가기 전에)
      // score를 화면에 띄워줘야 하기 대문에 'score=0' 코드보다 먼저 적어준다.
      // score-in-modal 요소를 가져아서 score에 쌓인 점수를 html에 넣어준다.
      doucment.querySelector(".score-in-modal").textContent = score;
      score = 0;
      // TOO BAD! :(라는 메시지와 SCORE: 점수, PLAY AGAIN 버튼을 보여주자.
      // wrongModal 요소를 가져와서 open클래스를 붙여주자.
    }
    document.querySelector("score-text").textContent = score;
    // newStage()를 호출할 때가 아니라, nmew stage나 play again 버튼을 눌렀을 때
    // 색깔을 변경해줘야 하므로 newStage()코드를 여기에 써주지 않는다.
  });
});
// 매 판마다 다시 만들어줘야 하므로 -> 재사용해야하니까 함수로 만들어줘야겠다. 
function newStage() {
    // 색깔 바꿔주기
    // randomColor()를 options라는 배열에 넣어서 활용하자
    // options는 바깥에서 쓸 일이 없으니까 전역변수로 따로 안 빼줘도 된다.
    const options = [randomColor(), randomColor(), randomColor()];
    // doccument.querySelectorAll('.option')는 nodeList라서 forEach메소드를 사용할 수 있다.
    // 첫 번째, 두 번째, 세 번째 옵션이 들어가면서 각각 다른 색깔을 넣어준다.
    // nodeList의 forEach 메소드에도 currentValue, currentIndex, listObj를 파라미터로 받는다. -> 배열처럼 index 사용가능하다.
    document.querySelectorAll(".option").forEach((optionEl, index) => {
        // (첫 번째 div, 0), (두 번째 div, 1), (세 번째 div, 2)가 인수로 들어온다.
        // 옵션 하나하나마다 이 작업을 한다.
        // 총 3번 실행된다. 실행될 때마다 randomColor를 반환하니까 각기 다른 색깔이 들어간다.
        optionEl.style.backgroundColor = options[index];
    });
    // 답이 될 보기의 순서는 고정되어 있지 않고 랜덤하게 정해져야 한다.
    // 정답의 인덱스값을 0, 1, 2 중에 랜덤하게 넣는다.
    answer = Math.floor(Math.random() * 3);
    // 색깔 코드를 글씨로 표현해주는 color-text 클래스에 3가지 보기 중 하나의 rgb 코드를 글씨로 넣어준다. 
    document.querySelector(".color-text").textContent = options[answer];
}

newStage();

// next stage 버튼을 클릭하면, 새로운 판을 실행해주자.
// 'THAT'S RIGHT!'이라는 메시지와 NEXT STAGE버튼'을 안 보이게 해주자.
// -> open 클래스를 떼주자.
document.querySelector('.next-stage').addEventListener('click', e =>{
    newStage();
    //document.querySelector('.right-modal')이 여러 번 쓰이니까 변수에 담아서 사용하자.
    // rightModal요소에 open 클래스를 떼준다. 
    rightModalEl.classList.remove('open');
})
// play again 버튼을 클릭하면, 새로운 판을 실행해주자.
// 'TOO BAD! :(라는 메시지와 SCORE: 점수, PLAY AGAIN 버튼'을 안보이게 해주자.
// -> open 클래스를 떼주자.
document.querySelector('play-again').addEventListener('click', e => {
    newStage();
    wrongModalEl.classList.remove('open');
});
