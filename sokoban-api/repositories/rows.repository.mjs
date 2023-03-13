import { Rows } from "../config/rows.config.db.mjs";

export class RowsRepository {
  getAll() {
    return new Promise((resolve, reject) => {
      Rows.find({})
        .exec()
        .then((rows, err) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows.map((row) => row.toObject()));
          }
        });
    });
  }
}
