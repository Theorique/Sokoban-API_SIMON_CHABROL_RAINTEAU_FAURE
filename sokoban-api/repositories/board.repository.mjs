import { Board } from "../config/board.config.db.mjs";
import { Rows } from "../config/rows.config.db.mjs";

export class BoardRepository {
  getAll() {
    /* Board.deleteMany({}).exec();
    Rows.deleteMany({}).exec(); */
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

  async create(boardId, name, nbRows, nbCols, rows) {
    try {
      let board = await Board.create({
        board_id: boardId,
        name: name,
        rows: nbRows,
        cols: nbCols,
      });
      let newRows = [];
      for (let [index, row] of rows.entries()) {
        newRows.push({
          board_id: boardId,
          row: index,
          description: row,
        });
      }
      await Rows.create(newRows);
      return board.toObject();
    } catch (err) {
      return null;
    }
  }
}
