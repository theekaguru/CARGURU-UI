import { useEffect, useState } from 'react';
import { FaCamera, FaEdit, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { SaveIcon } from 'lucide-react';
import type { RootState } from '../../../app/store';
import { userApi } from '../../../features/api/userApi';
import axios from 'axios';
import { toast, Toaster } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  firstname: string;
  lastname: string;
  email: string;
  userId: number;
}

export const Profile = () => {
  const cloud_name = 'dfty9bjsf';
  const preset_key = 'CARGURU-RIDES';
  const [ProfilePicture, setImageProfile] = useState<string>('');
  const [updateUserProfile] = userApi.useUpdateUserProfileMutation();
  const Navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, isAuthenticated, userType } = useSelector((state: RootState) => state.auth);
  const userId = user?.userId;

  const { data: userDetails } = userApi.useGetUserByIdQuery(userId, {
    skip: !isAuthenticated
  });

  const imageProfile = userDetails?.profileImage
    ? userDetails.profileImage
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(userDetails?.firstname || 'User')}&background=4ade80&color=fff&size=128`;

  const handleModalToggle = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    if (!isAuthenticated) {
      Navigate('/login');
    } else if (userType !== 'admin') {
      Navigate('/dashboard/analytics');
    }
  }, [isAuthenticated, userType, Navigate]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const loadingToastId = toast.loading("Updating your details...");
    const updateData = {
      ...data,
      userId: userId
    };
    try {
      const res = await updateUserProfile(updateData).unwrap();
      toast.success(res.message, { id: loadingToastId });
      reset();
      setIsModalOpen(false);
    } catch (error: any) {
      toast.error('Failed to update profile. Please try again.');
      toast.dismiss(loadingToastId);
    }
  };

const handleFileImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) {
    toast.error("No file selected!");
    return;
  }

  console.log("Selected file:", file); // ✅ Ensure a valid file is logged

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', preset_key);

  try {
    const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData);
    const data = res.data;
    setImageProfile(data.secure_url);
    toast.success("Image uploaded successfully");
  } catch (error: any) {
    console.error("Cloudinary upload error:", error.response?.data || error.message);
    toast.error("Image upload failed. Check Cloudinary preset and cloud name.");
  }
};


  useEffect(() => {
    const updateProfile = async () => {
      if (ProfilePicture && userDetails) {
        try {
          const res = await updateUserProfile({
            userId: userDetails.userId,
            profileImage: ProfilePicture,
            firstname: userDetails.firstname,
            lastname: userDetails.lastname,
            email: userDetails.email,
          }).unwrap();
          console.log("~updateProfile~res:", res);
        } catch (error) {
          console.error("Error updating profile image", error);
        }
      }
    };
    updateProfile();
  }, [ProfilePicture, userDetails]);

  return (
    <div className="min-h-screen text-white py-10 px-5">
      <Toaster />
      <div className="max-w-4xl w-full mx-auto rounded-lg shadow-lg p-5">
        <div className="flex flex-col md:flex-row flex-wrap items-center justify-between border-b border-gray-700 pb-5 mb-5 gap-4">
          <div className="relative flex items-center gap-4 w-full sm:w-auto">
            <img
              src={ProfilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-[#444009]"
            />
            <label className="absolute bottom-0 bg-[#342e0f] p-2 rounded-full cursor-pointer">
              <FaCamera />
              <input type="file" className="hidden" onChange={handleFileImage} />
            </label>

            <div className="min-w-0">
              <h2 className="text-2xl md:text-3xl font-bold text-green-600 truncate">{userDetails?.firstname}</h2>
              <p className="text-green-600 truncate">{userDetails?.email}</p>
            </div>
          </div>
          <button className="btn btn-warning flex items-center gap-2 w-full sm:w-auto justify-center">
            <FaEdit /> Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-[#888372] via-[#a3a4a1] to-[#504118] shadow-xl hover:scale-105 transition-transform duration-300 rounded-lg p-4">
            <h3 className="text-xl md:text-2xl font-bold mb-3">Personal Information</h3>
            <p className="mb-2">
              <span className="font-bold">First Name:</span> {userDetails?.firstname}
            </p>
            <p className="mb-2">
              <span className="font-bold">Last Name:</span> {userDetails?.lastname}
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#888372] via-[#a3a4a1] to-[#504118] shadow-xl hover:scale-105 transition-transform duration-300 rounded-lg p-4">
            <h3 className="text-xl md:text-2xl font-bold mb-3">Security Settings</h3>
            <p className="mb-2">
              <span className="font-bold">Password:</span> 🔒🤚
            </p>
            <button className="btn btn-secondary w-full sm:w-auto">Change Password</button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box w-full max-w-lg mx-auto">
            <div className="flex justify-center items-center mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-orange-500">Edit Profile</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-sm font-medium text-orange-500">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstname"
                  className="input w-full text-blue-500 text-sm"
                  defaultValue={user?.firstname}
                  {...register('firstname', { required: 'First name is required' })}
                />
                {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname.message}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="block text-sm font-medium text-orange-500">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="input w-full text-blue-500 text-sm"
                  defaultValue={user?.lastname}
                  {...register('lastname', { required: 'Last name is required' })}
                />
                {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname.message}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  disabled
                  className="input input-bordered w-full bg-gray-900 border-gray-600 text-white"
                  defaultValue={user?.email}
                  {...register('email', { required: 'Email is required' })}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-2">
                <button onClick={handleModalToggle} className="btn btn-error">
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
