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

  async getByName(name) {
    let board = await Board.findOne({board_id:name}).exec();
    let rows = await Rows.find({board_id:name}).exec();
    rows.sort((a, b) => a.row - b.row);
    let boardToReturn = this.createReturnedBoardWithRows(board, rows);
    return boardToReturn;
  }

  createReturnedBoard(board) {
    let boardToReturn = {};
    boardToReturn.board_id = board.board_id;
    boardToReturn.name = board.name;
    boardToReturn.nbRows = board.rows;
    boardToReturn.nbCols = board.cols;
    return boardToReturn;
  }

  createReturnedBoardWithRows(board, rows) {
    let boardToReturn = this.createReturnedBoard(board);
    boardToReturn.text = "";
    for(let row of rows) {
      boardToReturn.text += row.description+"\n"
    }
    boardToReturn.text = boardToReturn.text.substring(0,boardToReturn.text.length-2);
    return boardToReturn;
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
