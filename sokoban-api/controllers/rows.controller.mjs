export class RowsController { 
    repository;

    constructor(repository) {
      this.repository = repository;
    }

    showList(req, res) {
      this.repository
        .getAll()
        .then((rows) => {
          res.json(rows);
        })
        .catch(() => {
          res.sendStatus(500);
        });
    }
}