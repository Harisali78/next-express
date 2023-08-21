// "use client";
import axios from 'axios';
// import {useRouter } from 'next/navigation';
// import React from 'react'
// import { HiOutlineTrash } from 'react-icons/hi'

// const Removebtn = ({id}) => {
//   const router = useRouter();
export const removeProduct = async(id)=>{
  const confirmed = confirm("Are you Sure");
  if(confirmed){
  const res = await axios.delete(`http://localhost:5000/api/v1/product/${id}`)
  }
};

//   return (
//     <div>
//         <button onClick={removeProduct} className='text-red-600'>
//             <HiOutlineTrash size={24}/>
//         </button>
//     </div>
//   )
// }

// export default Removebtn;