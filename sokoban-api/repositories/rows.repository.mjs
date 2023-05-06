import {Rows} from "../config/rows.config.db.mjs";

export class RowsRepository {
    /**
     *
     * @returns Retourne la liste des lignes
     */
    getAll() {
        return new Promise((resolve, reject) => {
            Rows.find({})
                .exec()
                .then((rows, err) => {
                    rows.sort((a, b) => a.row - b.row)
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows.map((row) => row.toObject()));
                    }
                });
        });
    }

    static async addRowsToBoards(boardId, rows) {
        try {
            let newRows = [];
            for (let [index, row] of rows.entries()) {
                newRows.push({
                    board_id: boardId,
                    row: index,
                    description: row,
                });
            }
            await Rows.create(newRows);
            return true;
        } catch (err) {
            return false;
        }
    }

    static async deleteRowsOfBoard(boardId) {
        try {
            await Rows.deleteMany({board_id: boardId});
            return true;
        } catch (err) {
            return false;
        }
    }
}
