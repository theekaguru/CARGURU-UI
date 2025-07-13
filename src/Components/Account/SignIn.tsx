import { Anim } from './Anim';
import vw1 from '../../assets/Account/vw1.jpg';
import {useForm} from "react-hook-form"
import { toast, Toaster } from 'sonner';
import { Navigate, useNavigate } from 'react-router-dom';
import { userApi } from '../../../features/api/userApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../../features/auth/authSlice';



type userLoginForm ={

      email: string,
      password: string, 
}

export const SignIn = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch();

 const { register , handleSubmit ,formState:{errors}} = useForm<userLoginForm>()
 
 const [loginUser , isLoading] =userApi.useLoginUserMutation()

  const onsubmit =async(data:userLoginForm) => {
    const loadingToastId =toast.loading("Logging account...")
    try {
      const res = await loginUser(data).unwrap()
      console.log(res)
      toast.success(res.message , {id:loadingToastId})
      dispatch(setCredentials(res))
     // Navigate("/login")
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
    
    <div className=" p-20 flex justify-center items-center ">
      <Anim />
      {/* Main SignIn Card */}
      <div className=" z-10 grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-[#a3a4a1]">
        {/* Left Side Image */}
        <div
          className="hidden md:flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${vw1})` }}
        >
        </div>
        {/* Right Side Form */}
        <form className="p-8  space-y-6" onSubmit={handleSubmit(onsubmit)}>
          <div className="text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg animate-pulse">
              Welcome to CarGuru!
            </h2>
            <p className="text-[#d6d4ce] text-base font-medium">
              Log in to start your engine
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#c2c0ba]">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="e.g. you@example.com"
                className="w-full h-8 px-4 rounded-lg border bg-[#b3afad] text-black placeholder-gray-500 border-gray-400 focus:outline-none focus:border-yellow-400"
                 {...register('email',{required:true})}
              />
              {errors.email && <span className='text-sm bg-gradient-to-r from-red-800 via-green-400 to-black bg-clip-text text-transparent drop-shadow-lg animate-pulse '>email is Required 💁‍♂️</span>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#b9b7af]">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full h-8 px-4 rounded-lg border bg-[#b3afad] text-black placeholder-gray-500 border-gray-400 focus:outline-none focus:border-yellow-400"
                {...register('password',{required:true})}
              />
               {errors.password && <span className='text-sm bg-gradient-to-r from-red-800 via-green-400 to-black bg-clip-text text-transparent drop-shadow-lg animate-pulse '>password is Required 💁‍♂️</span>}

            </div>
            <button
              type="submit"
              className="w-full py-3 text-lg font-bold text-white rounded-md bg-gradient-to-r from-[#bca16a] via-[#a3a4a1] to-[#666037] hover:scale-105 hover:shadow-xl transition-transform shadow-lg"
            >
              Log In
            </button>
          </div>
          <div className="flex flex-col items-center mt-4 gap-2 text-sm">
            <a href="/forgotpassword" className="text-[#bca16a] hover:underline">Forgot password?</a>
            <a href="/register" className="text-[#160d0b] hover:underline">Need an account? Register</a>
            <a href="/" className="text-[#888372] hover:underline">HomePage</a>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};
