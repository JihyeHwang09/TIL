class MenuSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            menu: null // 메뉴가 선택된 적 없다는 사실을 나타내기 위해 null 저장
        }
    }

    // 이벤트 핸들러에서 호출할 함수는 handle*로 시작하게 이름을 짓는 것이 관례
    handleSelect(menu) {
        this.setState({
            menu
        })
    }

    render() {
        const { menu } = this.state
        const status = menu ? `현재 선택된 메뉴: ${menu}`
         : '현재 선택된 메뉴가 없습니다.'
        return (
            <div>
                <button onClick={() => this.handleSelect('짜장면')}>짜장면</button>
                <button onClick={() => this.handleSelect('짬뽕')}>짬뽕</button>
                <button onClick={() => this.handleSelect('볶음밥')}>볶음밥</button>
                <div>{status}</div>
            </div>
        )
    }
}

ReactDOM.render(
    <MenuSelector />,
    document.querySelector('#root')
)