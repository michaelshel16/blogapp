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
      author,
      subtitle,
      content,
      image,
      email,
      postType,
      date
    } = req.body
   
    const user = await User.findOne({email:email})
    
      const newPost = new Post
    (
    {
      userId  : user._id,
      author  : author,
      email   : email,
      title   : title,
      subtitle: subtitle,
      content : content,
      postType: postType,
      image   : image,
      date    : date
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
      const {postId} = req.params
      
      const findPost = await Post.findOne({_id:postId})

      
      if(findPost)
      {
        Post.deleteOne(postId)
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

const getPost = async(req,res)=>{
  try 
  {
    const {id} = req.params;
    const post = await Post.findById(id)
    if(post)
    {
      res.status(200).json(post)
    }
    else
    {
      res.status(401).json({message:"No post found"})
    }
  } 
  catch (error) 
  {
     res.status(500).json({message:error.message})
  }



}

const getUserPosts = async(req,res) =>{

   try
   {
      const {userId}= req.params;

      const posts   = await Post.find({userId:userId}) 

      if(posts)
      {
        res.status(200).json(posts)
      }

      else
       res.status(400).json({message:"No posts found"})
      
   } 
   catch (error)
   {
       res.status(500).json({message:error.message})
   }

}

const getTechPosts = async(req,res)=>
{
  try 
  {
    
    const posts  = await Post.find({postType:"tech"})

    if(posts)
    {
      res.status(200).json(posts)
    }
    else
    res.status(400).json({message:"No tech posts found"})
    } 
  catch (error) 
  {
    res.status(500).json({message:error.message})
  }
}

const getReviewPosts = async(req,res)=>
{
  try 
  {
    
    const posts  = await Post.find({postType:"review"})

    if(posts)
    {
      res.status(200).json(posts)
    }
    else
    res.status(400).json({message:"No review posts found"})
    } 
  catch (error) 
  {
    res.status(500).json({message:error.message})
  }
}
const getBusinessPosts = async(req,res)=>
{
  try 
  {
    
    const posts  = await Post.find({postType:"business"})

    if(posts)
    {
      res.status(200).json(posts)
    }
    else
    res.status(400).json({message:"No tech posts found"})
    } 
  catch (error) 
  {
    res.status(500).json({message:error.message})
  }
}
const updatePost = async(req,res)=>{

  try 
  {
      const
      {
        userId,
        postId,
        author,
        email,
        title,
        subtitle,
        content,
        postType,
        image,
        date
       
       
      }  = req.body
      
      const post = Post.findById(postId)

      if(post){

       const updatedPost = new Post({
       
        userId:userId,
        author:author,
        email:email,
        title:title,
        subtitle:subtitle,
        content:content,
        postType:postType,
        image:image,
        date:date

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


module.exports = {register,login,createPost,getUserPosts,deletePost,updatePost,getTechPosts,getBusinessPosts,getReviewPosts,getPost}
