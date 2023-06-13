import { todoModel } from "../models/todoModels.js";

const getallPosts = async(req,res)=>{
    try {
        const result =await todoModel.getPosts();
        return res.json ({ok:true,result});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ok:false,result:"error de servidor"})
    }
}

const getAllid = async(req,res) => {
    const {id}= req.params
    try {
      const result =await todoModel.getPostsid(id);
      return res.json ({ok:true,result});
  } catch (error) {
      console.log(error)
      if (error.code==="404")
      return res.status(404).json({ok:false,result:"no existe el registro"})
  }
  return res.status(500).json({ok:false,result:"error de servidor"})
  }

const agregarAll = async(req,res )=> {
    const {titulo,img,descripcion}= req.body
       try {
       const result =await todoModel.agregarPosts ({titulo,img,descripcion})
       return res.status(201).json ({ok:true,result});
     } catch (error) {
       console.log(error);
       return res.status(500).json({ok:false,result :"error de servidor"});
     };
   }

   const updatePost = async (req,res) => {
     const {id} = req.params
     const {titulo,img,descripcion} = req.body
     try {
       const result = await todoModel.update (id, {titulo,img,descripcion})
       return res.status(201).json ({ok:true,result});
     } catch (error) {
       console.log(error);
     }
   };

const deletePost = async (req,res) => {
  const { id} = req.params;
  try {
    const result = await todoModel.remove (id);
    return res.status(200).json ({ok:true,result});
  } catch (error) {
    console.log(error);
      return res.status(500).json({ok:false,result :"error de servidor"});
    }
  };
  

export const todoController = {
    getallPosts,
    getAllid,
   agregarAll,
   updatePost,
   deletePost
}