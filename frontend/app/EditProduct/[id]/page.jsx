import React from 'react'

const getTopicById = async(id)=>{
  try {
    const res = await fetch(`http://localhost:5000/api/v1/product/${id}`,{
      cache:"no-store",
    });

   if(!res.ok){
    throw new Error("Failed to fetch topic")
   }
   return res.json();
  } catch (error) {
    console.log("Can't edit properly",error);
  }
} 


 export default async function EditProduct  ({params})  {
  const {id}=params;
  const {topic} = await getTopicById(id);
  const {title,description,price,rating,review,image} = topic;
  console.log("id:",id);
  return (
    <div>
        <EditProductform id={id} title={title} description={description} price={price} rating={rating} review={review} image={image}/>
    </div>
  )
}

