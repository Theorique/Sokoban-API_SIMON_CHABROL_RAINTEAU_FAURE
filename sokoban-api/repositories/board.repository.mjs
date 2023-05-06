import { Board } from "../config/board.config.db.mjs";
import { Rows } from "../config/rows.config.db.mjs";

export class BoardRepository {
  /**
   * Retourne la liste de tout les tableaux
   */
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

  /**
   * Retourne le tableau possedant le board_id recherché
   * @param {String} boardId Id recherché
   * @returns 
   */
  async getByName(boardId) {
    let board = await Board.findOne({board_id:boardId}).exec();
    if(board == null)
      return null;
    let rows = await Rows.find({board_id:boardId}).exec();
    rows.sort((a, b) => a.row - b.row);
    return this.createReturnedBoardWithRows(board, rows);
  }

  /**
   * Permet de retourner un objet tableau avec les attribut de base
   * @param {*} board attributs du tableau à créer
   * @returns le tableau créé
   */
  createReturnedBoard(board) {
    let boardToReturn = {};
    boardToReturn.board_id = board.board_id;
    boardToReturn.name = board.name;
    boardToReturn.nbRows = board.rows;
    boardToReturn.nbCols = board.cols;
    return boardToReturn;
  }

  /**
   * Permet de retourner un objet tableau avec les attribut de base et ses lignes
   * @param {*} board attributs du tableau à créer
   * @param {*} rows lignes du tableau à créer
   * @returns le tableau créé
   */
  createReturnedBoardWithRows(board, rows) {
    let boardToReturn = this.createReturnedBoard(board);
    boardToReturn.text = "";
    for(let row of rows) {
      boardToReturn.text += row.description+"\n"
    }
    boardToReturn.text = boardToReturn.text.substring(0,boardToReturn.text.length-2);
    return boardToReturn;
  }

  /**
   * Permet d'insérer un tableau dans la base de données 
   * @param {String} boardId Identifaint du tableau 
   * @param {String} name Nom du tableau
   * @param {int} nbRows Nombre de lignes du tableau
   * @param {int} nbCols Nombre de colonnes du tableau
   * @param {String[]} rows Descriptif des lignes du tableau
   * @returns L'objet créé
   */
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

  async deleteBoard(boardId) {
    try {
      let rowsResults = await Rows.deleteMany({board_id: boardId});
      console.log("rowsResults", rowsResults.deletedCount);
      let boardResults = await Board.deleteOne({board_id: boardId});
      console.log("boardResults", boardResults.deletedCount);
      return true;
    } catch (e) {
      return false;
    }
  }
}
