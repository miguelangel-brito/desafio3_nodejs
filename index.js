import * as dotenv from "dotenv";
dotenv.config();

import { agregarPosts, getPosts, getPostsid} from "./db/index.js"
import express from "express";
import cors from "cors"
const app = express();

app.use(cors());
app.use(express.json());

//0. GET para ver ruta raiz
app.get("/", (req, res) => {
    res.json({ ok: true, result: "Acceso permitido a ruta raiz" });
});


app.get('/posts', async(req,res) => {

    try {
        const result =await getPosts();
        return res.json ({ok:true,result});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ok:false,result:"error de servidor"})
    }
});

app.get("/posts/:id", async(req,res) => {
  const {id}= req.params
  try {
    const result =await getPostsid(id);
    return res.json ({ok:true,result});
} catch (error) {
    console.log(error)
    if (error.code==="404")
    return res.status(404).json({ok:false,result:"no existe el registro"})
}
return res.status(500).json({ok:false,result:"error de servidor"})
});


app.post('/posts', async(req,res )=> {
 const {titulo,img,descripcion}= req.body
    try {
    const result =await agregarPosts({titulo,img,descripcion})
    return res.status(201).json ({ok:true,result});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ok:false,result :"error de servidor"});
  }

});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log("servidor listo en http://localhost:" + PORT);
});