import {BlogPost} from "../models/blogpost.js";
//Get All Posts
export const getAllBlogPostsService = () => {
  return new Promise(async (resolve, reject) => {

      const allblogPosts = await BlogPost.find();
     console.log(allblogPosts)
if(allblogPosts.length>0){
console.log("HERE")
  return resolve(allblogPosts);
}else{return reject();}
    

    
   
  });
};
//Get by id
export const getBlogPostByIdService = async (id) => {
  return new Promise(async (resolve, reject) => {
try {
  const allblogPosts = await BlogPost.findOne({_id :id});
 console.log(allblogPosts!=null)
  return resolve(allblogPosts);
} catch (error) {
  reject();
}
   

  });

 

};
export const deleteBlogPostService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const allblogPosts = await BlogPost.deleteOne({_id :id});
     if(allblogPosts.deletedCount>0){
      return resolve({message:"Post Deleted"});
     }
     return reject();
    } catch (error) {
      console.log(error);
      reject();
    }
       
  });
};
//save blog post
export const saveBlogPostService = (blogPost) => {
  return new Promise(async (resolve, reject) => {
    console.log(blogPost)
    try {
      const post = BlogPost({...blogPost});
       await post.save();
      return resolve(post);
    } catch (error) {
      
      let validationError={};
      for ( const valerr in error.errors) {
        validationError[valerr] = error.errors[valerr].message;

      }
      return reject(validationError);
    }
  
   
  
   
  });
};
//update the blog post
export const updateBlogPostService = (id,blogpost) => {
  return new Promise(async (resolve, reject) => {
    const updatedItem = await Item.findByIdAndUpdate(id, blogpost, {
      new: true, 
    });

    if (updatedItem) {
     return resolve(updatedItem);
    } else {
    return reject();
    }
  });
};
