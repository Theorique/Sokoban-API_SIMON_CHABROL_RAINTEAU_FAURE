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

  async getBoardByName(req, res) {
    let name = req.params.name;
    let result = await this.repository.getByName(name);
    if(result != null) {
      res.send({ code: 200, result });
    } else {
      res.sendStatus(500);
    }
  }

  async createBoard(req, res) {
    const { boardId, name, nbRows, nbCols, rows } = req.query;
    let result = await this.repository.create(
      boardId,
      name,
      nbRows,
      nbCols,
      rows
    );
    if (result != null) {
      res.send({ code: 200, result });
    } else {
      res.sendStatus(500);
    }
  }
}
