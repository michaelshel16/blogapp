const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const User   = require("../model/User.js");
const Post   = require("../model/Post.js");






 const register = async(req,res)=>
{
   
  try 
  {
    const
    {
      firstName,
      lastName,
      email,
      password

    } = req.body

    const findUser = await User.findOne({email:email});



    const salt         = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password,salt)
   if(!findUser){
    const newUser = new User({

        firstName:firstName,
        lastName:lastName,
        email:email,
        password :passwordHash    
      })

    const savedUser = await newUser.save();
    res.status(201).json(savedUser)
  }
  else
  {
    res.status(401).json({message:"User already exist"})
  }
  } 
  catch (error) 
  {
      res.status(500).json({error:error.message});
  }


}

const login = async(req,res)=>
{
   try
   { const
    {
        email,
        password
    } = req.body
     
    
    const user = await User.findOne({email:email})
     if(!user)
     
     return res.status(400).json({message:"User doesn't exist"});
     
     const isMatch = bcrypt.compare(password,user.password)

     if(!isMatch)
     return res.status(401).json({message:"Invalid Crendentials"});

     const token = jwt.sign({id:user._id},process.env.JWT_CODE);

     delete user.password;

     res.status(200).json({token,user});
   
   } 
   
   catch (error)
   {
     res.status(500).json({error:error.message});
   }


}

const createPost = async(req,res)=>{
   
  try 
  {
    const{
      title,
      content,
      image,
      email,
      postType
    } = req.body
   
    const user = await User.findOne({email:email})
    
    const newPost = new Post
    (
    {
      userId : user._id,
      email:email,
      title:title,
      content:content,
      image:image,
      postType:postType
    })

    await newPost.save();
    res.status(201).json(newPost);
  } 
  catch (error) 
  {
     res.status(500).json({error:error.message})
  }



}

const deletePost = async( req,res)=>{
     
    try 
    {
      const{userId} = req.body
      
      const findPost = Post.findById(userId);

      if(findPost)
      {
        Post.deleteOne(userId)
        res.status(201).json({message:"Post deleted successfully"})
      }
      else
      {
        res.status(401).json({message:"No Post found "})
      }

    } 
    catch (error)
    {
       res.status(500).json({error:error.message})
    }


}

const updatePost = async(req,res)=>{

  try 
  {
      const
      {
        userId,
        title,
        email,
        image,
        content,
       
      }  = req.body
      
      const post = Post.findById(userId)

      if(post){

       const updatedPost = new Post({
       
        title:title,
        content:content,
        image:image

       })
       
        await updatedPost.save()

        
        res.status(201).json(updatedPost)
      
      }
        else
        {
          res.status(401).json({message:"Post not found "});
        }

  } 
  catch (error) 
  {
     res.status(500).json({error:error.message});
  }
}


module.exports = {register,login,createPost,deletePost,updatePost}
