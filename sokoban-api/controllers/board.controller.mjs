export class BoardController {
  repository;

  constructor(repository) {
    this.repository = repository;
    this.repository
      .getAll().then((boards) => {
        if(boards.length == 0) {
          console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
          this.initBoard();
        }
      })
  }

  /**
   * Permet d'initialiser la base de données si elle est vide
   */
  initBoard() {
    let boardId = "simple";
    let name = "A simple board";
    let nbCols = 10;
    let nbRows = 5;
    let rows = [
      "##########",
      "#x.x#....#",
      "#...CC.P.#",
      "#........#",
      "##########"
    ]
    this.repository.create(
      boardId,
      name,
      nbRows,
      nbCols,
      rows
    );
    boardId = "difficult";
    name = "A difficult board";
    nbCols = 8;
    nbRows = 8;
    rows = [
      "########",
      "####xCP#",
      "####.C.#",
      "####.C.#",
      "#xx#.C##",
      "#.....##",
      "#.x...##",
      "########"
    ];
    this.repository.create(
      boardId,
      name,
      nbRows,
      nbCols,
      rows
    );
  }

  /**
   * Retourne la liste des tableaux
   * @param {*} req 
   * @param {*} res 
   */
  showList(req, res) {
    this.repository
      .getAll()
      .then((boards) => {
        res.json(boards);
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  }

  /**
   * Récupère un tableau grace à son identifiant
   * @param {*} req 
   * @param {*} res 
   */
  async getBoardByName(req, res) {
    let name = req.params.name;
    let result = await this.repository.getByName(name);
    if(result != null) {
      res.send({ code: 200, result });
    } else {
      res.sendStatus(500);
    }
  }

  /**
   * Permet de créer un tableau
   * @param {*} req 
   * @param {*} res 
   */
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
