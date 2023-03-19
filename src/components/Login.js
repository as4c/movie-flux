import { doc, getDocs, query, where } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import {TailSpin} from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs-react';
import swal from 'sweetalert';
import {AppState} from '../App'
import { usersRef } from '../firebase/firebase';


const Login = () => {

  const useAppState = useContext(AppState);
  const navigate=useNavigate();

  const [form,setForm]=useState({
    mobile:"",
    password:""
  })
  const [loading,setLoading]=useState(false)

  const login = async()=>{
    setLoading(true)
    try {
      const qr = query(usersRef,where('mobile','==',form.mobile))
      const querySnapShot = await getDocs(qr);

      querySnapShot.forEach((doc)=>{
        const _data=doc.data();
        const isUser = bcrypt.compareSync(form.password,_data.password);
        if(isUser){
          useAppState.setLogin(true);
          useAppState.setUserName(_data.name);
          swal({
            text:"Logged In",
            icon:"success",
            buttons:false,
            timer:3000,
          });
          navigate('/');
        }else{
          swal({
            text:"Invalid Credentials",
            icon:"error",
            buttons:false,
            timer:3000,
          });
        }
      })
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div className='w-full flex flex-col mt-8 items-center'>
      <h1 className='text-2xl font-bold'>Login</h1>
      {/* Login form start */}

              <div class="p-2 w-full md:w-1/3">
                <div class="relative">
                  <label class="leading-7 text-sm text-gray-300">
                    Mobile No.
                  </label>
                  <input
                    type={'number'}
                    id="mobile"
                    name="mobile"
                    value={form.mobile}
                    onChange={(e)=>setForm({...form,mobile:e.target.value})}
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              
              <div class="p-2 w-full md:w-1/3">
                <div class="relative">
                  <label class="leading-7 text-sm text-gray-300">
                    Password
                  </label>
                  <input
                    type={'password'}
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={(e)=>setForm({...form,password:e.target.value})}
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>  
              <div class="p-2 w-full">
                <button onClick={login} class="flex mx-auto text-white bg-emerald-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-500 rounded text-lg">
                  {loading?<TailSpin height={25} color="white"/>:'Login'}
                </button>
              </div>

      {/* Login form end */}
        <div>
          <p>Don't have an account? <Link to={'/signup'}> <span className='text-blue-400'>Sign Up</span> </Link></p>
        </div>
      
    </div>
  )
}

export default Login
