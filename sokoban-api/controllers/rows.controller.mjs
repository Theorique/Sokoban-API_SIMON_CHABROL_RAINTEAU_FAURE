export class RowsController { 
    repository;

    constructor(repository) {
      this.repository = repository;
    }

    showList(req, res) {
      this.repository
        .getAll()
        .then((rows) => {
          console.log('rows', rows);
          //res.render("rows-list", { rows });
          res.json(rows);
        })
        .catch((err) => {
          console.log("showList error", err);
          res.sendStatus(500);
        });
    }
}