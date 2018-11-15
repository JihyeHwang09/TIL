import React from "react";
import classNames from "classnames";

import { ROWS, COLS } from "./constants";

const table = new Array(ROWS).fill(null).map(() => new Array(COLS).fill(null));

export default function Board(props) {
  const { joints, end, fruit } = props;

  return (
    <div className={classNames("board", { end })}>
      {table.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((col, colIndex) => (
            <div key={colIndex} className="col" />
          ))}
        </div>
      ))}
    </div>
  );
}
