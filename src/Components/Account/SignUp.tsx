import sumertime from '../../assets/Account/summertime vw.jpg';
import {useForm} from "react-hook-form"
import { Anim } from './Anim';
import { userApi } from '../../../features/api/userApi';
import { toast, Toaster } from 'sonner';
import { useNavigate } from 'react-router-dom';

type userRegisterForm ={
      firstname: string,
      lastname: string,
      contactPhone: number,
      email: string,
      password: string, 
      address: string,
      confirmationCode:string,
      // "userType": "admin",
      // "emailVerified": true
}

export const SignUp = () => {
   const navigate = useNavigate();

  const { register , handleSubmit ,formState:{errors}} = useForm<userRegisterForm>()

  const [registerUser, {isLoading}] = userApi.useRegisterUserMutation()
    


  const onsubmit =async(data:userRegisterForm) =>{
    const loadingToastId =toast.loading("creating account...")
    try {
      const res = await registerUser(data).unwrap()
      //console.log(res)
      toast.success(res.message , {id:loadingToastId})
      navigate("/login")
    } catch (err:any) {
      console.log('failed register:',err);
      toast.error('failed to register:' + (err.data?.message))
      toast.dismiss(loadingToastId)
      
    }
  }

  return (
        <>
        
    <Toaster
    richColors
    position='top-right'
    />
    <div className=" min-h-screen flex justify-center items-center ">
      <Anim />
      {/* Main SignUp Card */}
      <div className="z-10 grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl rounded-2xl overflow-hidden backdrop-blur-none shadow-2xl border border-[#a3a4a1]">
        {/* Left Side Form */}
        <form className="p-8 space-y-6  " onSubmit={handleSubmit(onsubmit)}>
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg animate-pulse">
              Welcome to CarGuru!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-base font-medium">
              Ride like there's no tomorrow
            </p>
          </div>

          <div className="space-y-1">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700">first Name</label>
              <input
                className="w-full h-8 px-4 rounded-lg border bg-[#b3afad] text-black placeholder-gray-500 border-gray-400 focus:outline-none focus:border-yellow-400"
                id="name"
                type="text"
                placeholder="e.g. daniel"
                {...register('firstname',{required:true})}  
              />
               {errors.firstname && <span className='text-sm bg-gradient-to-r from-red-800 via-green-400 to-black bg-clip-text text-transparent drop-shadow-lg animate-pulse '>First Name is Required 💁‍♂️</span>}

            </div>
             <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700">last Name</label>
              <input
                className="w-full h-8 px-4 rounded-lg border bg-[#b3afad] text-black placeholder-gray-500 border-gray-400 focus:outline-none focus:border-yellow-400"
                id="name"
                type="text"
                placeholder="e.g. example"
              {...register('lastname',{required:true})} 
              />
              {errors.lastname && <span className='text-sm bg-gradient-to-r from-red-800 via-green-400 to-black bg-clip-text text-transparent drop-shadow-lg animate-pulse '>Last Name is Required 💁‍♂️</span>}
           
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">Phone Number</label>
              <input
                className="w-full h-8 px-4 rounded-lg border bg-[#b3afad] text-black placeholder-gray-500 border-gray-400 focus:outline-none focus:border-yellow-400"
                id="phone"
                type="tel"
                placeholder="e.g. 0712345678"
                {...register('contactPhone',{required:true})}
              />
              {errors.contactPhone && <span className='text-sm bg-gradient-to-r from-red-800 via-green-400 to-black bg-clip-text text-transparent drop-shadow-lg animate-pulse '>contact is Required 💁‍♂️</span>}

            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email Address</label>
              <input
               className="w-full h-8 px-4 rounded-lg border bg-[#b3afad] text-black placeholder-gray-500 border-gray-400 focus:outline-none focus:border-yellow-400"
                id="email"
                type="email"
                placeholder="e.g. you@example.com"
              {...register('email',{required:true})}
              />
              {errors.email && <span className='text-sm bg-gradient-to-r from-red-800 via-green-400 to-black bg-clip-text text-transparent drop-shadow-lg animate-pulse '>email is Required 💁‍♂️</span>}

            </div>


            <div>
              <label htmlFor="address" className="block text-sm font-semibold text-gray-700">address</label>
              <input
                className="w-full h-8 px-4 rounded-lg border bg-[#b3afad] text-black placeholder-gray-500 border-gray-400 focus:outline-none focus:border-yellow-400"
                id="address"
                type="address"
                placeholder="e.g . Nai , 254"
                {...register('address',{required:true})}
              />
              {errors.address && <span className='text-sm bg-gradient-to-r from-red-800 via-green-400 to-black bg-clip-text text-transparent drop-shadow-lg animate-pulse '><address></address> is Required 💁‍♂️</span>}

            </div>


            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
              <input
                className="w-full h-8 px-4 rounded-lg border bg-[#b3afad] text-black placeholder-gray-500 border-gray-400 focus:outline-none focus:border-yellow-400"
                id="password"
                type="password"
                placeholder="Create a strong password"
                {...register('password',{required:true})}
              />
              {errors.password && <span className='text-sm bg-gradient-to-r from-red-800 via-green-400 to-black bg-clip-text text-transparent drop-shadow-lg animate-pulse '>password is Required 💁‍♂️</span>}

            </div>


            <div>
              <label htmlFor="confirmationCode" className="block text-sm font-semibold text-gray-700">confirmationCode</label>
              <input
                className="w-full h-8 px-4 rounded-lg border bg-[#b3afad] text-black placeholder-gray-500 border-gray-400 focus:outline-none focus:border-yellow-400"
                id="confirmationCode"
                type="confirmationCode"
                placeholder=" code sent from your email"
                {...register('confirmationCode',{required:true})}
              />
              {errors.confirmationCode && <span className='text-sm bg-gradient-to-r from-red-800 via-green-400 to-black bg-clip-text text-transparent drop-shadow-lg animate-pulse '>confirmationCode is Required 💁‍♂️</span>}

            </div>

            
            <button
              type="submit"
              className="w-full py-3 text-lg font-bold text-white rounded-md bg-gradient-to-r from-[#bca16a] via-[#a3a4a1] to-[#756b41] hover:scale-105 hover:shadow-xl transition-transform shadow-lg"
            >
              Create Account
            </button>
            <div className="flex flex-col items-center mt-4 gap-2 text-sm">
              <a href="/login" className="text-blue-400 hover:underline">Already have an account? Log in</a>
            </div>
          </div>
        </form>

        {/* Right Side Image */}
        <div
          className="hidden md:flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${sumertime})` }}
        ></div>
      </div>
    </div>
    </>
  );
};
