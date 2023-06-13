import { pool } from "../db/connection.js";
 
const getPosts = async () => {
   const {rows} = await pool.query("select * from posts");
   return rows
   };
const getPostsid =async(id)=>{
      const text = "SELECT * FROM posts WHERE id= $1";
      const {rows}= await pool.query(text,[id]);
      if (rows.length===0){
         throw ({code:"404"})
      }
      return rows[0]
   
   }
const agregarPosts = async ({titulo,img,descripcion}) => {
      const text = "INSERT INTO posts (titulo,img,descripcion) values ($1,$2,$3) Returning *"
      const {rows}= await pool.query(text,[titulo,img, descripcion]);
      return rows [0]
   };
const update = async (id,{titulo,img,descripcion})=> {
  const text = "UPDATE posts SET titulo = $1, img = $2, descripcion = $3 WHERE id = $4 RETURNING* "
  const {rows} = await pool.query(text, [titulo, img, descripcion, id]);
  return rows [0];

}
const remove = async (id) => {
   const text = "DELETE FROM posts WHERE id = $1 RETURNING* "
   const { rows} = await pool.query (text, [id])
   return rows [0];
}
   export const todoModel = { 
       getPosts,
       getPostsid, 
       agregarPosts,
       update,
       remove
   }