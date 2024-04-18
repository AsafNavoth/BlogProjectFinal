import express, {Express} from 'express';
import activityLogger from './middlewares/activityLogger';
import postsRoute from './routes/postsRoute';
import cors from 'cors'
import usersRoute from "./routes/authRoute";
import authRoute from "./routes/authRoute";

const app: Express = express();
app.use(cors({
    origin: 'http://localhost:3000',
    methods: "GET,POST,PUT,DELETE"
}))

app.use(express.json());
app.use(activityLogger);
const port = 3001;

app.use("/posts", postsRoute);
app.use("/oauth", authRoute)
app.use("/user", usersRoute)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
