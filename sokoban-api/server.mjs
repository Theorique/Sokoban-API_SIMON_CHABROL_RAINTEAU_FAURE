import express from 'express';
import {engine} from 'express-handlebars';
import {mongoose} from 'mongoose';
import cors from 'cors';

import {boardRoutes} from './routes/board.route.mjs';
import {BoardRepository} from './repositories/board.repository.mjs';
import {BoardController} from './controllers/board.controller.mjs';

import {rowsRoutes} from './routes/rows.route.mjs';
import {RowsRepository} from './repositories/rows.repository.mjs';
import {RowsController} from "./controllers/rows.controller.mjs";

import {defaultRoutes} from './routes/default-route.mjs';

const hostname = '127.0.0.1';
const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors({
    origin: '*'
}));
app.engine("hbs", engine({extname: ".hbs"}));
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());
app.use(express.static("assets"));

const boardRepository = new BoardRepository();
const boardController = new BoardController(boardRepository);

const rowsRepository = new RowsRepository();
const rowsController = new RowsController(rowsRepository);

app.use('/', defaultRoutes(null));
app.use('/boards', boardRoutes(boardController));
app.use('/rows', rowsRoutes(rowsController));

app.delete('/boards', boardRoutes(boardController));

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/sokoban").catch(error => handleError(error));

app.listen(PORT, () => {
    console.log(`Server running at http://${hostname}:${PORT}`);
});
