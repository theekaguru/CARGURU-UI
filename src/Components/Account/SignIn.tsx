import { Anim } from './Anim';
import vw1 from '../../assets/Account/vw1.jpg';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../../features/api/userApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';

type userLoginForm = {
  email: string;
  password: string;
};

export const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userLoginForm>();

  const [loginUser, { isLoading }] = userApi.useLoginUserMutation();

  const onsubmit = async (data: userLoginForm) => {
    const loadingToastId = toast.loading('Logging in...');
    try {
      const res = await loginUser(data).unwrap();
      toast.success(res?.message, { id: loadingToastId });

      dispatch(
        setCredentials({
          user: {
            userId: res.userId,
            firstName: res.firstname,
            lastName: res.lastname,
            email: res.email,
          },
          token: res.generatedtoken,
          userType: res.userType ?? 'client',
        })
      );

      if (res.userType === 'admin') {
        navigate('/admindashboard/analytics');
      } else {
        navigate('/dashboard/activities');
      }
    } catch (err: any) {
      console.error('Login failed:', err);
      toast.error('Failed to Login: ' + (err.data?.message || err.message || err.error || err));
      toast.dismiss(loadingToastId);
    }
  };

  return (
    <>
      <Toaster richColors position="top-right" />

      <div className="min-h-screen p-6 md:p-20 bg-gradient-to-br from-[#0C1729] via-[#1D3C6E] to-[#2D4974] flex justify-center items-center">
        <Anim />

        <div className="z-10 grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-[#a3a4a1] bg-[#0f1c2f]/90 backdrop-blur-md">
          {/* Left Side Image */}
          <div
            className="hidden md:flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${vw1})` }}
          />

          {/* Right Side Form */}
          <form className="p-8 space-y-6 w-full" onSubmit={handleSubmit(onsubmit)}>
            <div className="text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#6896C0] via-white to-[#1D3C6E] bg-clip-text text-transparent drop-shadow-lg animate-pulse">
                Welcome to CarGuru!
              </h2>
              <p className="text-[#b5c3d9] text-base font-medium">
                Log in to start your engine
              </p>
            </div>

            <div className="space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-white/80">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="e.g. you@example.com"
                  className="w-full h-10 px-4 rounded-lg bg-white/90 text-black placeholder-gray-500 border border-[#a3a4a1] focus:outline-none focus:ring-2 focus:ring-[#6896C0]"
                  {...register('email', { required: true })}
                />
                {errors.email && (
                  <span className="text-sm text-red-300 animate-pulse">
                    Email is required 💁‍♂️
                  </span>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-white/80">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full h-10 px-4 rounded-lg bg-white/90 text-black placeholder-gray-500 border border-[#a3a4a1] focus:outline-none focus:ring-2 focus:ring-[#6896C0]"
                  {...register('password', { required: true })}
                />
                {errors.password && (
                  <span className="text-sm text-red-300 animate-pulse">
                    Password is required 💁‍♂️
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 text-lg font-bold text-white rounded-md bg-gradient-to-r from-[#6896C0] via-[#1D3C6E] to-[#0C1729] hover:scale-105 hover:shadow-xl transition-transform shadow-lg"
              >
                {isLoading && (
                  <span className="loading loading-spinner text-blue-300 mr-2"></span>
                )}
                Log In
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col items-center mt-4 gap-2 text-sm">
              <a href="/forgotpassword" className="text-[#6896C0] hover:underline">
                Forgot password?
              </a>
              <a href="/register" className="text-[#a3a4a1] hover:underline">
                Need an account? Register
              </a>
              <a href="/" className="text-white/60 hover:underline">
                HomePage
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
