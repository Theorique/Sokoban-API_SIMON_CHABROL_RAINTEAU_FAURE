import express from 'express';
import { engine } from 'express-handlebars';
import { mongoose } from 'mongoose';
import cors from 'cors';
import { defaultRoutes } from './routes/default-route.mjs';
const hostname = 'localhost';
const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(express.static("assets"));

app.use('/', defaultRoutes(null));

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/sokoban").catch(error => handleError(error));;

app.listen(PORT, () => {
  console.log(`Server running at http://${hostname}:${PORT}`);
});
