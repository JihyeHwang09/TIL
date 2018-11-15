class Counter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
    }
    render() {
        return (
            <div>
                <span>{this.state.count}</span>
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>증가</button>
                <button onClick={() => this.setState({ count: 0 })}>초기화</button>
            </div>
        )
    }
}

ReactDOM.render(
    <Counter />,
    document.querySelector('#root')
)