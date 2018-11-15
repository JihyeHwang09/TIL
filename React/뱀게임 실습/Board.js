import React, { Component } from "react";
import { ROWS, COLS } from "./constants";
import classnames from "classnames";

const table = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => null)
);

class Game extends Component {
    state = {
        joints: [{ x: 3, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 0 }],
        fruit: { x: 5, y: 5 },
        direction: null,
        end: false
    };
    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown);
    }
    handleKeyDown = e => {
        e.preventDefault();
        switch (e.key) {
            case "ArrowDown":
                this.setState({ direction: "down" });
                break;
            case "ArrowUp":
                this.setState({ direction: "up" });
                break;
            case "ArrowLeft":
                this.setState({ direction: "left" });
                break;
            case "ArrowRight":
                this.setState({ direction: "right" });
                break;
        }
        this.setState(prevState => {
            let { joints: prevJoints, fruit: prevFruit, direction, end } = prevState;
            if (end) {
                return {
                    joints: prevJoints,
                    fruit: prevFruit,
                    direction,
                    end
                };
            }
            let [{ x: prevHeadX, y: prevHeadY }] = prevJoints;
            switch (direction) {
                case "left":
                    prevHeadX -= 1;
                    break;
                case "right":
                    prevHeadX += 1;
                    break;
                case "up":
                    prevHeadY -= 1;
                    break;
                case "down":
                    prevHeadY += 1;
                    break;
            }
            let newHead = { x: prevHeadX, y: prevHeadY };
            let newFruit = prevFruit;
            let newJoints = prevJoints;
            let newEnd = end;
            if (newHead.x === prevFruit.x && newHead.y === prevFruit.y) {
                newFruit = this.setFruit();
            } else {
                newJoints.pop();
            }
            if (
                newHead.x < 0 ||
                newHead.x >= COLS ||
                newHead.y < 0 ||
                newHead.y >= ROWS ||
                prevJoints.some(joint => joint.x === newHead.x && joint.y === newHead.y)
            ) {
                newEnd = true;
            }
            newJoints.unshift(newHead);
            return {
                joints: newJoints,
                fruit: newFruit,
                direction,
                end: newEnd
            };
        });
    };
    setFruit = () => {
        const { joints } = this.state;
        let newFruit;
        do {
            newFruit = {
                x: Math.floor(Math.random() * COLS),
                y: Math.floor(Math.random() * ROWS)
            };
        } while (
            joints.some(joint => joint.x === newFruit.x && joint.y === newFruit.y)
        );
        return newFruit;
    };

    render() {
        const { joints, fruit } = this.state;
        const score = joints.length;
        return (
            <div>
                {table.map((row, rowIdx) => (
                    <div className={classnames("row")} key={rowIdx}>
                        {row.map((col, colIdx) => (
                            <div
                                className={classnames(
                                    "col",
                                    {
                                        joint: joints.some(
                                            joint => joint.x === colIdx && joint.y === rowIdx
                                        )
                                    },
                                    { fruit: fruit.x === colIdx && fruit.y === rowIdx }
                                )}
                                key={colIdx}
                            />
                        ))}
                    </div>
                ))}
                <div>{score}</div>
            </div>
        );
    }
}

export default Game;
