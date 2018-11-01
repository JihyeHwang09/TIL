(function() {
  /* 게임 시작 여부 */
  let start = false;

  /* 화이트 타이머 엘리먼트 */
  let whiteTime = 0;
  const whiteTimerEl = document.querySelector(".white-timer");
  /* 블랙 타이머 엘리먼트 */
  let blackTime = 0;
  const blackTimerEl = document.querySelector(".black-timer");
  /* 통합 타이머*/
  let timerID;
  // 타이머에 '분 : 초'가 1초마다 동적으로 바뀌도록 한다.
  const timer = type => {
    // 일정시간마다 반복실행하는 함수인 setInterval(){}을 사용한다.
    // 변수 선언을 하지 않아도 잘 작동한다.
    // 변수를 사용하는 이유는 변수를 저장하면, 나중에 타이머를 중지할 경우 변수와 clearInterval() 함수를 사용해 중지시킬 수 있기 때문이다.
    timerID = setInterval(() => {
      // 블랙 차례일 경우
      if (type === "black") {
        // ':'을 기준으로 앞쪽은 60으로 나눈 몫
        // ':'을 기준으로 뒷쪽은 60으로 나눈 나머지
        blackTimerEl.textContent = `${String(
          parseInt(++blackTime / 60)
          // 2자리를 주는데, 만약에 자리가 비어있으면 0으로 채운다. 
        ).padStart(2, 0)}
        :
        ${String(blackTime % 60).padStart(2, 0)}`;
        // 화이트 차례일 경우
      } else {
        whiteTimerEl.textContent = `${String(
          parseInt(++whiteTime / 60)
        ).padStart(2, 0)}
        :
        ${String(whiteTime % 60).padStart(2, 0)}`;
      }
      // setInterval()의 지연시간을 준다. (밀리초 단위). 1초 단위로 실행되게 하기 위해 지연시간을 1000 준다.
    }, 1000);
  };
  /* 오목 기본 값 */
  let omok = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  /* 흑백 여부 */
  let flag = false;
  /* 게임 리셋 */
  const reset = () => {
    // omok판의 상태를 나타내는 2차원 배열의 값을 모두 0으로 초기화해준다.
    omok = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    // 오목판에 둔 오목알들을 없애준다.
    // 한 칸씩 돌면서 white, black 클래스를 떼준다.
    document
      .querySelectorAll(".col")
      .forEach(item => item.classList.remove("white", "black"));
    // start = false;
    // flag = false;
    start = flag = false;
    // start버튼에 GAME START 글씨를 넣어준다.
    startBtnEl.textContent = "GAME START";
    // 화이트 타이머에 00:00를 넣어준다.
    // 블랙 타이머에 00:00를 넣어준다.
    // whiteTimerEl.textContent = "00:00";
    // blackTimerEl.textContent = "00:00";
    whiteTimerEl.textContent = blackTimerEl.textContent = "00:00";
    // whiteTime과 blackTime에 0을 넣어준다.
    whiteTime = blackTime = 0;
    // clearInterval()를 이용해서 타이머 timerID를 중지시킨다. 
    clearInterval(timerID);
  };
  /* 시작 버튼 엘리먼트*/
  const startBtnEl = document.querySelector(".startBtn");
  /* 시작 버튼 이벤트 */
  // 시작 버튼을 누르면,       
  // 게임 시작 여부를 나타내는 변수인 start의 값이 
  startBtnEl.addEventListener(
    "click",() => (
      start = 
      start ? 
      // start가 true이면 reset()함수를 실행하고, start에 false값을 넣어준다.
      (reset(), false)
        : 
        // white 타이머가 실행되도록 한다. -> timer에 white를 넣는다.
        // start버튼에 STOP 글씨를 넣고, start에 true값을 넣어준다. 
        (timer("white"), (startBtnEl.textContent = "STOP"), true)
      )
  );
  /*  */
  const init = () => {
    document.querySelectorAll(".col").forEach(el => {
    //  오목판을 클릭하면 실행할 이벤트
      el.addEventListener("click", e => {
        // 변수 start의 값이 false이면, 함수 실행을 종료시킨다.
        if (start === false) return;
        // 중복 체크
        // white나 black클래스가 들어있으면 -> 알림창을 띄워주고, 함수 실행을 종료시킨다. 
        if (el.classList.contains("white") || el.classList.contains("black")) {
          swal({
            title: "중복된 자리입니다!",
            type: "error",
            confirmButtonText: "계속 하기"
          });
          return;
        }

        // 사용자가 오목알을 놓은 자리의 좌표값을 가져온다.
        // row와 col변수에 저장한다.
        let row = el.closest(".row").classList[0].split("-")[1];
        let col = el.classList[0].split("-")[1];
        // 블랙 차례였으면-> 화이트 차례로 변경
        // 화이트 차례였으면 -> 블랙 차례로 변경
        // flag변수의 값이 true이면, black을 type에 넣는다.
        // flag 변수의 값이 flase이면, white값을 type에 넣는다. 
        let type = flag ? "black" : "white";
        // 클래스리스트에 type을 붙여준다.
        el.classList.add(type);
        // blackHover 클래스와 whiteHover클래스를 떼준다.
        el.classList.remove("blackHover", "whiteHover");
        // 타이머 timerID를 중지시킨다. 
        clearInterval(timerID);
        // 블랙 타이머가 작동하고 있었다면 -> 화이트 타이머가 작동하게 한다.
        // 화이트 타이머가 작동하고 있었다면 -> 블랙 타이머가 작동하게 한다. 
        // flag값이 false이면, black을
        // flag값이 ture이면, white를 
        // 타이머에 넣는다. 
        timer(!flag ? "black" : "white");
        // 15 X 15의 오목에서 클래스명에는 1부터 15까지 줬고,
        // 인덱스값은 0부터 14까지 이므로 row와 col에서 각각 1을 뺀 값이 2차원 배열의 인덱스값이 된다. 
        // 사용자가 알을 놓은 자리에 해당하는 자리에 "black"이나 "white"라는 문자열을 넣어준다. 
        omok[row - 1][col - 1] = type;
        // 오목을 판별하는 함수인 checkOMok()에 type을 넣어서 
        if (checkOmok(type)) {
          // setTimeout(function(){지연시간 뒤에 실행될 코드}, 지연시간(delay time))
          // setTimeout을 주지 않으면, 오목이 되었을 때 오목알이 그려지기 전에 알림창이 뜨기 때문에 준다.
          // 화면이 그려지는 시간이 alert창이 뜨는 시간보다 더 오래 걸리므로
          setTimeout(() => {
          // flag값이 true이면 백, flase이면 흑이 이겼다고 alert창을 띄워준다.
            swal(`${flag ? "백" : "흑"}이 이겼습니다.`);
            // reset 함수를 실행시킨다.
            reset();
            // 지연시간을 0.2초로 준다. 
          }, 200);
        }
        // flag에 true이면 false를, false이면 true값으로 바꿔준다. 
        flag = !flag;
      });
      // 이벤트 버블링을 막기 위해서 mouseenter가 아닌 mouseenter를 사용한다.
      // mouseenter이벤트가 일어나면 실행될 코드
      el.addEventListener("mouseenter", e => {
        // 만약에 start의 값이 false이거나
        // white 클래스가 있거나
        // black클래스가 있으면
        // 함수를 종료시킨다. 
        if (
          start === false ||
          el.classList.contains("white") ||
          el.classList.contains("black")
        )
          return;
        // flag값이 true이면 blackHover를 클래스에 추가하고
        // flag값이 flase이면 whiteHover 클래스를 추가한다.
        el.classList.add(flag ? "blackHover" : "whiteHover");
      });

      // mouseleave이벤트가 발생하면 실행할 코드
      el.addEventListener("mouseleave", e =>
      // blackHover클래스와 whiteHover클래스를 뗀다. 
        el.classList.remove("blackHover", "whiteHover")
      );
    });
  };
  /* 오목 판별 함수*/
  const checkOmok = type => {
    // 왼쪽 대각선 오목여부를 count한다.
    let leftCross = 0,
    // 오른쪽 대각선 count
      rightCross = 0,
      leftReverse = 0,
      rightReverse = 0;
    for (let i = 0; i < omok.length; i++) {
      // 가로 vertical과 세로 vertical에 0으로 초기화
      let horizon = (vertical = 0);
      // 
      for (let j = 0; j < omok.length; j++) {
        // omok의 한칸씩 보면서 type이 같은 경우에만 오목 판별 여부를 검사한다.
        if (omok[i][j] === type) {
          // 그 전의 칸의 type과 이번에 보고있는 칸의 type이 같으면
          // 가로를 count하는 변수인 horizon을 1증가시킨다. 
          horizon++;
          // 그 전 칸의 type과 이번에 보고있는 칸의 type이 다르면
          // 0으로 초기화한다.
        } else {
          horizon = 0;
        }
        if (omok[j][i] === type) {
          vertical++;
        } else {
          vertical = 0;
        }
        // 가로, 세로 오목 판별
        // 가로 오목 count변수의 값이 5이거나 
        // 세로 오목 count변수의 값이 5이면 
        // true값을 반환하고 함수를 종료시킨다. 
        if (horizon === 5 || vertical === 5) {
          return true;
        }
        // 왼쪽 대각선 윗삼각형
        if (i + j < omok.length && omok[j][i + j] === type) {
          leftCross++;
        } else {
          leftCross = 0;
        }
        // 왼쪽 대각선- 정가운데, 아랫삼각형
        if (i + j < omok.length && omok[i + j][j] === type) {
          rightCross++;
        } else {
          rightCross = 0;
        }

        if (leftCross === 5 || rightCross === 5) {
          return true;
        } 
        // 오른쪽 대각선 - 윗 삼각형, 정가운데
        if (i + j < omok.length && omok[omok.length - 1 - j][i + j] === type) {
      
          leftReverse++;
        } else {
          leftReverse = 0;
        }
        // i + j가 omok의 길이보다 길면 오목판을 벗어나므로 -> i + j < omok.length 조건을 준다. 
        // 오른쪽 대각선 - 아랫 삼각형
        if (
          i + j < omok.length &&
          omok[omok.length - 1 - (i + j)][j] === type
        ) {
          rightReverse++;
        } else {
          rightReverse = 0;
        }
        if (leftReverse === 5 || rightReverse === 5) {
          return true;
        }
      }
    }
    // 오목 판별을 다 했는데도 오목이 되지 않았다면-> false를 반환한다. 
    return false;
  };
  /* 이벤트 등록 함수 실행 */
  init();
  /* 도움말 문구 띄우기 */
  swal(
    "오목은 가로, 세로 대각선으로 같은 색 알을 다섯 개 먼저 늘어놓으면 승리하는 게임입니다",
    "",
    "question"
  );
})();
