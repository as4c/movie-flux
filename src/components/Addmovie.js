import { addDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { movieRef } from "../firebase/firebase";
import swal from "sweetalert";
import { AppState } from "../App";
import { useNavigate } from "react-router-dom";

const Addmovie = () => {

    const useAppState = useContext(AppState)
    const navigate = useNavigate();
    const[form,setForm]=useState([{
        title:'',
        year:'',
        desc:'',
        imageUrl:'',
        rating:0,
        rated:0
    }])
    const [loading,setLoading]=useState(false)

    const addMovie =async ()=>{
      setLoading(true)
        try{
          if(useAppState.login){

            await addDoc(movieRef,form);
            swal({
                title:'Successfully Added',
                icon:'success',
                buttons:false,
                timer:3000
            })
            setForm({
              title:'',
              year:'',
              desc:'',
              imageUrl:'',
            })
          }else{
            navigate('/login')
          }
          
        } catch(err){
              swal({
                  title:err,
                  icon:'error',
                  buttons:false,
                  timer:3000
              })
          }
        setLoading(false)
    }


  return (
    <div>
     
      <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-8 mx-auto">
          <div class="flex flex-col text-center w-full mb-4">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
              Add Movie
            </h1>
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div class="flex flex-wrap -m-2">
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="title" class="leading-7 text-sm text-gray-300">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={(e)=>setForm({...form,title:e.target.value})}
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="year" class="leading-7 text-sm text-gray-300">
                    Year
                  </label>
                  <input
                    type="year"
                    id="year"
                    name="year"
                    value={form.year}
                    onChange={(e)=>setForm({...form,year:e.target.value})}
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="imageUrl" class="leading-7 text-sm text-gray-300">
                    Poster Link
                  </label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={form.imageUrl}
                    onChange={(e)=>setForm({...form,imageUrl:e.target.value})}
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 text-sm text-gray-300">
                    Description
                  </label>
                  <textarea
                    id="desc"
                    name="desc"
                    value={form.desc}
                    onChange={(e)=>setForm({...form,desc:e.target.value})}
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div class="p-2 w-full">
                <button onClick={addMovie} class="flex mx-auto text-white bg-emerald-500 border-0 py-2 px-8 focus:outline-none hover:bg-emerald-600 rounded text-lg">
                  {loading?<TailSpin height={25} color="white"/>:'Submit'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Addmovie;
