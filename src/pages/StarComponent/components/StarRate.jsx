import React, { useState ,useEffect} from 'react'
import './StarRate.css'
import axios from 'axios';
import {  Zoom, toast } from 'react-toastify';
import LoaderBtn from './../../../components/Loader/LoaderBtn';
const StarRate = (id) => {
    const [selectedStarCount,setSelectedStarCount]=useState(0);
    const [comment,setComment]=useState('');
    const[loader,setLoader]=useState(false);
    const handelComment=async (e)=>{
        
        e.preventDefault();
        const userToken = localStorage.getItem('userToken');
        try{
            setLoader(true);
            const {data}= await axios.post(`${import.meta.env.VITE_API_URL}/products/${id.id}/review`,{
            comment: comment,

            rating: selectedStarCount
        },{
            
                headers: { Authorization: `Tariq__${userToken}` }
            
        })
        toast.success('review added successfully', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Zoom,
        });
    }catch(error){
        toast.error(error.response.data.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Zoom,
        });
    }finally{
        setLoader(false);
        setComment('');
        setSelectedStarCount(0)
    }
    }
   
  return (
    <>
    <h4 className='py-2'>Reviews</h4>
   <form action="">
   <input type="text"  className="form-control w-50 " placeholder="Add Comment" name="comment" value={comment} onChange={(e)=>setComment(e.target.value)}/>
    <div className='stars my-2 '>
        {
            [...Array(5)].map((_,index)=>{
                return <span key={index} className={`${index+1<=selectedStarCount?'selected':''} fs-5 fw-bold mx-1`} onClick={()=>{
                    setSelectedStarCount(index+1)
                }}>&#9733;</span>
            })
        }
    </div>
    <input type="submit" className='btn btn-danger text-white fw-bold my-2' value={'Add'} onClick={(e)=>handelComment(e)} disabled={loader?'disabled':''}/>

</form>
 </>
   
    
  )
}

export default StarRate