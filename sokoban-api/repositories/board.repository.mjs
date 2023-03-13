import { Board } from "../config/board.config.db.mjs";
import { Rows } from "../config/rows.config.db.mjs";

export class BoardRepository {
  getAll() {
    return new Promise((resolve, reject) => {
      Board.find({})
        .exec()
        .then((boards, err) => {
          if (err) {
            reject(err);
          } else {
            resolve(boards.map((board) => board.toObject()));
          }
        });
    });
  }

  create(boardId, name, nbRows, nbCols, rows) {
    console.log('create board', boardId, name, nbRows, nbCols);
    /* Board.deleteMany({}) */
    return new Promise((resolve, reject) => {
      Board.create({ board_id:boardId, name:name, rows:nbRows, cols:nbCols }).exec()
      .then((err, board) => {
          if (err) {
            reject(err);
          } else {
            for(let [index, row] of rows) {
              Rows.create({board_id: boardId, row: index, description: row});
            }
            resolve(board.toObject());
          }
        });
    });
  }
}
