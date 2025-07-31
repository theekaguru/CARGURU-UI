import sumertime from '../../assets/Account/summertime vw.jpg';
import { useForm } from "react-hook-form";
import { Anim } from './Anim';
import { userApi } from '../../features/api/userApi';
import { toast, Toaster } from 'sonner';
import { useNavigate } from 'react-router-dom';

type userRegisterForm = {
  firstname: string,
  lastname: string,
  contactPhone: number,
  email: string,
  password: string,
  address: string,
  confirmationCode: string,
};

export const SignUp = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<userRegisterForm>();
  const [registerUser, { isLoading }] = userApi.useRegisterUserMutation();

  const onsubmit = async (data: userRegisterForm) => {
    const loadingToastId = toast.loading("Creating account...");
    try {
      const res = await registerUser(data).unwrap();
      toast.success(res.message, { id: loadingToastId });
      navigate("/login");
    } catch (err: any) {
      console.log('Failed to register:', err);
      toast.error('Failed to register: ' + (err.data?.message || err.message));
      toast.dismiss(loadingToastId);
    }
  };

  return (
    <>
      <Toaster richColors position="top-right" />
      <div className="min-h-screen p-4 sm:p-6 md:p-12 bg-gradient-to-br from-[#0C1729] via-[#1D3C6E] to-[#2D4974] flex justify-center items-center">
        <Anim />
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl border border-[#a3a4a1] bg-[#0f1c2f]/90 backdrop-blur-md">
          
          {/* Left Image */}
          <div
            className="hidden md:flex items-center justify-center bg-cover bg-center min-h-[300px]"
            style={{ backgroundImage: `url(${sumertime})` }}
          />

          {/* Right Form */}
          <form
            className="p-6 sm:p-8 space-y-6 w-full"
            onSubmit={handleSubmit(onsubmit)}
          >
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#6896C0] via-white to-[#1D3C6E] bg-clip-text text-transparent drop-shadow-lg animate-pulse">
                Join CarGuru!
              </h2>
              <p className="text-[#b5c3d9] text-sm sm:text-base font-medium">
                Create an account to start your ride
              </p>
            </div>

            <div className="space-y-4">
              {[
                { id: "firstname", label: "First Name", placeholder: "e.g. Daniel" },
                { id: "lastname", label: "Last Name", placeholder: "e.g. Smith" },
                { id: "contactPhone", label: "Phone Number", placeholder: "e.g. 0712345678", type: "tel" },
                { id: "email", label: "Email Address", placeholder: "e.g. you@example.com", type: "email" },
                { id: "address", label: "Address", placeholder: "e.g. Nai, 254" },
                { id: "password", label: "Password", placeholder: "Create a strong password", type: "password" },
                { id: "confirmationCode", label: "Confirmation Code", placeholder: "Code sent to your email" },
              ].map(({ id, label, placeholder, type = "text" }) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-sm font-semibold text-white/80">
                    {label}
                  </label>
                  <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    className="w-full h-10 px-4 rounded-lg bg-white/90 text-black placeholder-gray-500 border border-[#a3a4a1] focus:outline-none focus:ring-2 focus:ring-[#6896C0] text-sm sm:text-base"
                    {...register(id as keyof userRegisterForm, { required: true })}
                  />
                  {errors[id as keyof userRegisterForm] && (
                    <span className="text-sm text-red-300 animate-pulse">
                      {label} is required 💁‍♂️
                    </span>
                  )}
                </div>
              ))}

              <button
                type="submit"
                className="w-full py-3 text-base sm:text-lg font-bold text-white rounded-md bg-gradient-to-r from-[#6896C0] via-[#1D3C6E] to-[#0C1729] hover:scale-105 hover:shadow-xl transition-transform shadow-lg"
              >
                {isLoading && (
                  <span className="loading loading-spinner text-blue-300 mr-2"></span>
                )}
                Register
              </button>
            </div>

            <div className="flex flex-col items-center mt-4 gap-2 text-sm text-white/60">
              <a href="/login" className="hover:underline">
                Already have an account? Log in
              </a>
              <a href="/" className="hover:underline">
                HomePage
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
