import { useEffect, useState } from 'react';
import { FaCamera, FaEdit, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { SaveIcon } from 'lucide-react';
import type { RootState } from '../../../app/store';
import { userApi } from '../../../features/api/userApi';
import axios from "axios";


interface User {
  userId: number;
  profileImage: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  contactPhone: string;
  address: string;
  userType: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export const Profile = () => {

      const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

      const userId = user?.userId;

      const {data:userDetails} = userApi.useGetUserByIdQuery(userId , {
      
      })

      const [updateUserProfile] = userApi.useUpdateUserProfileMutation()

      console.log("🚀🚀🚀~ userProfile~userId",userDetails);

      const {register,handleSubmit,formState: { errors },} = useForm<User>();

      const [isModalOpen, setIsModalOpen] = useState(false);


      const imageProfile = userDetails?.imageProfile
          ? userDetails.imageProfile
          : `https://ui-avatars.com/api/?name=${encodeURIComponent(userDetails?.firstname || 'User')}&background=4ade80&color=fff&size=128`;




     const handleModalToggle = () => setIsModalOpen(!isModalOpen);

     const cloud_name = "dfty9bjsf";
     const preset_key = "CARGURU-RIDES";



  const onSubmit: SubmitHandler<User> = async (data) => {
    console.log("Static profile data submitted:", data);
  };

const handleFileImage = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
       try {
        const res = await axios(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,{
          method: 'POST',
          data: formData
        });
        const data = res.data;
        console.log(data.secure_url);
        console.log("🚀🚀🚀~handle File Image" ,data);
       } catch (error) {
        console.log(error);
       }
  }

  useEffect(()=>{
    const updateProfile = async() => {
      if(imageProfile){
        try {
          const res = await updateUserProfile({userId:userId , profileImage:imageProfile}).unwrap()
          console.log("~updateProfile~res:",res);
        } catch (error) {
          
        }
      }
    }
    updateProfile()
  },[imageProfile])

  return (
    <div className="min-h-screen text-white py-10 px-5">
      <div className="max-w-4xl mx-auto rounded-lg shadow-lg p-5">
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-700 pb-5 mb-5">
          <div className="relative flex items-center gap-4 mb-4 md:mb-0">
            <img
              src={imageProfile}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-[#444009] "
            />
            <label className="absolute bottom-0 bg-[#342e0f] p-2 rounded-full cursor-pointer">
              <FaCamera />
              <input type="file" className="hidden"  onChange={handleFileImage}/>
            </label>
  

     {/* User Details Heading */}
            <div>
              <h2 className="text-3xl font-bold text-green-600">{userDetails?.firstname}</h2>
              <p className="text-green-600">{userDetails?.email}</p>
            </div>
          </div>
          <button
            className="btn btn-warning flex items-center gap-2"
            onClick={handleModalToggle}
          >
            <FaEdit /> Edit Profile
          </button>
        </div>


     {/* Personal Information */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-[#888372] via-[#a3a4a1] to-[#504118]  shadow-xl  hover:scale-105 transition-transform duration-300 rounded-lg p-4">
            <h3 className="text-2xl font-bold mb-3">Personal Information</h3>
            <p className="mb-2">
              <span className="font-bold">First Name:</span> {userDetails?.firstname}
            </p>
            <p className="mb-2">
              <span className="font-bold">Last Name:</span> {userDetails?.lastname}
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#888372] via-[#a3a4a1] to-[#504118]  shadow-xl  hover:scale-105 transition-transform duration-300 rounded-lg p-4">
            <h3 className="text-2xl font-bold mb-3">Security Settings</h3>
            <p className="mb-2">
              <span className="font-bold">Password:</span> 🔒🤚
            </p>
            <button className="btn btn-secondary">Change Password</button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="flex justify-center items-center mb-4 ">
              <h2 className="text-2xl font-bold text-orange-500">
                Edit Profile
              </h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-orange-500"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstname"
                  className="input w-full text-blue-500 text-sm"
                  defaultValue={user?.firstname}
                  {...register("firstname", {
                    required: "First name is required",
                  })}
                />
                {errors.firstname && (
                  <p className="text-red-500 text-sm">
                    {errors.firstname.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-orange-500"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="input w-full text-blue-500 text-sm"
                  defaultValue={user?.lastname}
                  {...register("lastname", {
                    required: "Last name is required",
                  })}
                />
                {errors.lastname && (
                  <p className="text-red-500 text-sm">
                    {errors.lastname.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium "
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  disabled
                  className="input input-bordered w-full bg-gray-900 border-gray-600 text-white"
                  defaultValue={user?.email}
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleModalToggle}
                  className="btn mr-2 btn-error"
                >
                  <FaTimes /> Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <SaveIcon /> Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
