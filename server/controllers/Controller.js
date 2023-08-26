const bcrypt       = require('bcrypt');
const jwt          = require('jsonwebtoken');
const User         = require("../model/User.js");
const Post         = require("../model/Post.js");
const { response } = require('express');
const fs           = require("fs");
const nodemailer   = require('nodemailer');
const { error }    = require('console');
const Mailgen      = require('mailgen');








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

const findUser = async(req,res) =>
{
  try 
  {
    const{email} = req.body;

    const findUser = await User.findOne({email:email})

    if(findUser)
    {
      res.status(200).json(findUser)
    }
    else
    {
      res.status(400).json({message:"User not found"})
    }
  } 
  catch (error) 
  {
    res.status(500).json({error:error.message})
  }
}
const googleAccountRegister = async(req,res) =>
{
   try
   {
    const
    {
      name,
      email,
      
      
    } = req.body
    
    const salt         = await bcrypt.genSalt();
    const firstName    = name&&name.split(' ')[0];
    const templastName = name&&name.split(' ')[1];
    const surName      = "no last name"
    let lastName       = ""
    templastName===""?lastName=surName:lastName=templastName
    const passwordHash = await bcrypt.hash(firstName,salt)
     
    const findUser = await User.findOne({email:email});

    if(!findUser)
    {
      const newUser = new User({

        firstName:firstName,
        lastName:lastName,
        email:email,
        password :passwordHash    
      })

      const savedUser = await newUser.save()
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

const gmailLogin = async (req,res)=>
{ 
  try 
{   
  
const{email,token} = req.body
  
const user = await User.findOne({email:email})
if(!user)
{
  res.status(401).json({message:"User doesn't exist"})
}

else
{
 

  res.status(200).json({token,user})
}

  
} catch (error) {
    res.status(500).json({error:error.message})
}
  
 


}

const passwordResetVerify =  (req,res) =>
{  
const {email,Otp} = req.body



  
 let config = 
 {
  service:'gmail',
  auth:
  {
    user:process.env.ADMIN_EMAIL ,
    pass:process.env.ADMIN_EMAIL_PASSWORD
  }
 }

 let transporter = nodemailer.createTransport(config)
 
 let Mailgenerator = new Mailgen(
  {
    theme:'default',
    product :
    {
      name:'Mailgen',
      link:'https://mailgen.js/'
    }
  })

  let response = 
  {
    body:
    { name:"Tech Blogs",
      intro:`Otp for changing your password ${Otp}`,
      
      outro:'Happy blogging'
    }
  }

  let mail = Mailgenerator.generate(response)

  let message = {
    from:process.env.ADMIN_EMAIL,
    to:email,
    subject:"User password reset",
    html:mail
  }

  transporter.sendMail(message)
  .then((response)=>
  {
    response.status(200).json({message:"Email sent sucessfully"})
  })
  .catch((error)=>
  {
    response.status(401).json({error:error.message})
  })
 
} 




  
  


const passwordReset = async (req,res) =>
{
    try 
    {
      const{email,newPassword} = req.body

      const salt            = await bcrypt.genSalt()
      const passwordHash    = await bcrypt.hash(newPassword,salt);
      
      const updatedUser     =await User.findOneAndUpdate(
        {email:email},{password:passwordHash},
        {new:true})

      if(updatedUser)
      {
        res.status(200).json(updatedUser)
      }
      else
      {
        res.status(401).json({message:"No user found"})
      }
      
    } catch (error) {
      res.status(500).json({error:error.message})
    }
}
const createPost = async(req,res)=>{
   
  try 
  {
    

    const 
    {
      author,
      email ,  
      title ,  
      subtitle,
      content ,
      postType,
      image ,  
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

const deletePost = async(req,res)=>{
     
    try 
    {
       const {postId}      = req.params
       const {post}        = Post.findById({_id:postId})
       const fileName      = post.image
       const directoryPath = "/public/"
       Post.findByIdAndDelete({_id:postId})
       .then((response)=>
       res.status(201).json(response))
       


       .catch((error)=>
       res.json(error))
       
       
    } 
    catch (error) 
    {
       res.status(500).json({message:error.message})
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
      
      const updatedPost = await Post.findOneAndUpdate({postId:postId},
        {
        userId:userId,
        author:author,
        email:email,
        title:title,
        subtitle:subtitle,
        content:content,
        postType:postType,
        image:image,
        date:date
        },{new:true})

      if(updatedPost){

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


module.exports = {findUser,register,login,createPost,getUserPosts
  ,deletePost,updatePost,getTechPosts,
  getBusinessPosts,getReviewPosts,getPost,passwordResetVerify,
  passwordReset,
  googleAccountRegister,gmailLogin}
