import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
allowExitOnIdle: true,
});
 

export const getPosts = async () => {
const {rows} = await pool.query("select * from posts");
return rows
};
export const getPostsid =async(id)=>{
   const text = "SELECT * FROM posts WHERE id= $1";
   const {rows}= await pool.query(text,[id]);
   if (rows.length===0){
      throw ({code:"404"})
   }
   return rows[0]

}

export const agregarPosts = async ({titulo,img,descripcion}) => {
   const text = "INSERT INTO posts (titulo,img,descripcion) values ($1,$2,$3) Returning *"
   const {rows}= await pool.query(text,[titulo,img, descripcion]);
   return rows [0]
};