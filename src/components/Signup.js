import React, { useState } from 'react'
import {TailSpin} from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import {RecaptchaVerifier,getAuth,signInWithPhoneNumber} from 'firebase/auth';
import app, { usersRef } from '../firebase/firebase'
import swal from 'sweetalert';
import { addDoc } from 'firebase/firestore';
import bcrypt from 'bcryptjs-react'

const auth = getAuth(app);
const Signup = () => {
  const navigate=useNavigate();
  const [form,setForm]=useState({
    name:"",
    mobile:"",
    password:""
  })
  const [loading,setLoading]=useState(false)
  const [otp,setOtp]=useState("")
  const [otpSent,setOtpSent]=useState(false)

  const generateRecaptcha=()=>{
    window.recaptchaVerifier=new RecaptchaVerifier('recaptcha-container',{
      'size':'invisible',
      'callback':(response)=>{

      }
    },auth)
  }

  const requestOtp = () =>{
    setLoading(true);
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth,`+91${form.mobile}`,appVerifier)
    .then(confirmationResult =>{
      window.confirmationResult=confirmationResult;
      swal({
        text:"OTP Sent",
        icon:"success",
        buttons:false,
        timer:3000,
      });
      setOtpSent(true);
      setLoading(false);

    }).catch((error)=>{
      console.log(error)
      swal({
        text:error.message,
        icon:"error",
        buttons:false,
        timer:3000,
      });
    })
  }

  const verifyOtp=()=>{
    try{
      setLoading(true);
      window.confirmationResult.confirm(otp).then((result)=>{
        uploadData();
        swal({
          text:"Successfully Registered",
          icon:"success",
          buttons:false,
          timer:3000,
        });
      });
      setLoading(false)
      navigate("/login");
    } catch(error){
      swal({
        text:error.message,
        icon:"error",
        buttons:false,
        timer:3000,
      })
      console.log(error)
    }
  }
  const uploadData=async ()=>{
    try{
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(form.password, salt);
      await addDoc(usersRef,{
        name:form.name,
        password:hash,
        mobile:form.mobile
      });
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className='w-full flex flex-col mt-6 items-center'>
      <h1 className='text-2xl font-bold'>Sign Up</h1>
      {/* Signup form start */}
        {
        otpSent ?
        <>
          <div class="p-2 w-full md:w-1/3">
                <div class="relative">
                  <label class="leading-7 text-sm text-gray-300">
                    Enter OTP
                  </label>
                  <input
                    id="otp"
                    name="otp"
                    value={otp}
                    onChange={(e)=>setOtp(e.target.value)}
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div class="p-2 w-full">
                <button onClick={verifyOtp} class="flex mx-auto text-white bg-emerald-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-500 rounded text-lg">
                  {loading?<TailSpin height={25} color="white"/>:'Confirm OTP'}
                </button>
              </div>
        </>

        :<>
              <div class="p-2 w-full md:w-1/3">
                <div class="relative">
                  <label class="leading-7 text-sm text-gray-300">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={(e)=>setForm({...form,name:e.target.value})}
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

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
                <button onClick={requestOtp} class="flex mx-auto text-white bg-emerald-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-500 rounded text-lg">
                  {loading?<TailSpin height={25} color="white"/>:'Request OTP'}
                </button>
              </div>
        </>
      }
        <div>
          <p>Already have an account? <Link to={'/login'}> <span className='text-blue-400'>Login</span> </Link></p>
        </div>
        <div id='recaptcha-container'></div>
    </div>
  )
}

export default Signup;
