"use client";
import {useRouter } from 'next/navigation';
import React from 'react'
import { HiOutlineTrash } from 'react-icons/hi'

const Removebtn = ({id}) => {
  const router = useRouter();
const removeProduct = async()=>{
  const confirmed = confirm("Are you Sure");
  if(confirmed){
   const res= await fetch(`http://localhost:5000/api/v1/product/${id}`,{
      method:"DELETE",
    });
    if(res.ok){
      router.refresh();
    }
  }
};

  return (
    <div>
        <button onClick={removeProduct} className='text-red-600'>
            <HiOutlineTrash size={24}/>
        </button>
    </div>
  )
}

export default Removebtn;