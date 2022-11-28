import express from "express";
import router from "./router";
import fileUpload from "express-fileupload";
import cors from "cors";

const app = express();
app.use(cors());
app.use(fileUpload({}));
app.use(express.static("static"));
app.use(express.json());
app.use(router);

app.listen(3000, () =>
  console.log("REST API server ready at: http://localhost:3000")
);
