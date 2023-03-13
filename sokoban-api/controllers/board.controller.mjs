export class BoardController {
  repository;

  constructor(repository) {
    this.repository = repository;
  }

  showList(req, res) {
    this.repository
      .getAll()
      .then((boards) => {
        //res.render("board-list", { boards });
        res.json(boards);
      })
      .catch((err) => {
        console.log("showList error", err);
        res.sendStatus(500);
      });
  }

  createBoard(req, res) {
    console.log("createBoard", req.query);
    const { boardId, name, nbRows, nbCols, rows } = req.query;
    console.log("rows", rows[0])
    this.repository
      .create(boardId, name, nbRows, nbCols, rows)
      .then((board) => {
        res.send({ code: 200, board });
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  }

}
