export class BoardController {
    repository;

    constructor(repository) {
        this.repository = repository;
        this.repository
            .getAll().then((boards) => {
            if (boards.length === 0) {
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
        let nbCols = 9;
        let nbRows = 6;
        let rows = [
            "..####...",
            "###..####",
            "#.....C.#",
            "#.#..#C.#",
            "#.x.x#.P#",
            "#########"
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
            .catch(() => {
                res.sendStatus(500);
            });
    }

    /**
     * Récupère un tableau grace à son identifiant
     * @param {*} req
     * @param {*} res
     */
    async getBoardByName(req, res) {
        let boardId = req.params.name;
        let result = await this.repository.getByBoardId(boardId);
        if (result != null) {
            res.send({code: 200, result});
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
        const {boardId, name, nbRows, nbCols, rows} = req.query;
        let result = await this.repository.create(
            boardId,
            name,
            nbRows,
            nbCols,
            rows
        );
        if (result != null) {
            res.send({code: 200, result});
        } else {
            res.sendStatus(500);
        }
    }

    async editBoard(req, res) {
        const boardIdToChange = req.params.boardId;
        const {boardId, name, nbRows, nbCols, rows} = req.query;
        if (await this.repository.editBoard(boardIdToChange, boardId, name, nbRows, nbCols, rows))
            res.sendStatus(200);
        else
            res.sendStatus(500);
    }

    async deleteBoard(req, res) {
        let boardId = req.params.boardId;
        if (await this.repository.deleteBoard(boardId))
            res.sendStatus(200);
        else
            res.sendStatus(500);
    }
}
