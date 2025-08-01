import { useEffect, useState } from 'react';
import { FaCamera, FaEdit, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { SaveIcon } from 'lucide-react';
import axios from 'axios';
import { userApi } from '../../features/api/userApi';
import { toast, Toaster } from 'sonner';
import type { RootState } from '../../app/store';





interface FormValues {
  firstname: string;
  lastname: string;
  email: string;
  userId: number;
}

export const UserProfile = () => {
  const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const preset_key = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const [imageProfile, setImageProfile] = useState<string>('');
  const [updateUserProfile] = userApi.useUpdateUserProfileMutation();
  const navigate = useNavigate();

  const { user, isAuthenticated, userType } = useSelector((state: RootState) => state.auth);
  const userId = user?.userId;

  const { data: userDetails = [] } = userApi.useGetUserByIdQuery(userId, {
    skip: !isAuthenticated,
  });
  console.log(userDetails);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();



  const profilePicture = userDetails?.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(userDetails?.firstname)}&background=4ade80&color=fff&size=128`;

  const handleModalToggle = () => { setIsModalOpen(!isModalOpen); };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (userType !== 'admin') {
      navigate('/dashboard/settings');
    }
  }, [isAuthenticated, userType, navigate]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const loadingToastId = toast.loading("Updating your details...");
    try {
      const res = await updateUserProfile({ ...data, userId }).unwrap();
      toast.success(res.message, { id: loadingToastId });
      reset();
      setIsModalOpen(false);
    } catch (error: any) {
      toast.error('Failed to update profile. Please try again.', error);
      toast.dismiss(loadingToastId);
    }
  };

  const handleFileImage = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    try {
      const res = await axios(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
        method: "POST",
        data: formData
      });
      const data = await res.data;
      console.log("handleFileImage~data:", data);
      setImageProfile(data.secure_url);
    } catch (err: any) {
      console.log(err);
      toast.error('Image upload failed.');
    }
  };

  useEffect(() => {
    const updateProfilePic = async () => {
      if (imageProfile && userDetails) {
        const loadingToastId = toast.loading("Updating your profile image...");
        try {
          const res = await updateUserProfile({
            userId: userDetails.userId,
            profileImage: imageProfile,
          }).unwrap();
          toast.success(res.message, { id: loadingToastId });
        } catch (error: any) {
          toast.error('Failed to update profile picture. Please try again.', error);
          toast.dismiss(loadingToastId);
        }
      }
    };

    updateProfilePic();
  }, [imageProfile, userDetails]);

return (
  <div className="min-h-screen bg-gradient-to-br from-[#1b264f] via-[#223a70] to-[#274690] text-white px-4 py-10 font-[Inter]">
    <Toaster richColors position="top-right" />

    <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Profile Sidebar */}
      <div className="md:w-1/3 bg-[#1b264f] p-6 rounded-2xl shadow-lg flex flex-col items-center border border-[#274690]/40">
        <div className="relative mb-4">
          <img
            src={profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-[#81c3d7]"
          />
          <label className="absolute bottom-1 right-1 bg-[#81c3d7] text-[#1b264f] p-2 rounded-full cursor-pointer shadow-md hover:bg-white transition">
            <FaCamera />
            <input type="file" className="hidden" onChange={handleFileImage} />
          </label>
        </div>
        <h2 className="text-2xl font-semibold text-[#81c3d7]">{userDetails?.firstname}</h2>
        <p className="text-sm text-[#d3e4f5] mt-1">{userDetails?.email}</p>
        <button
          onClick={handleModalToggle}
          className="mt-6 px-4 py-2 w-full rounded-md bg-[#81c3d7] text-[#1b264f] font-semibold hover:bg-white transition"
        >
          <FaEdit className="inline-block mr-2" />
          Edit Profile
        </button>
      </div>

      {/* Information Section */}
      <div className="md:w-2/3 flex flex-col gap-6">
        <div className="bg-[#223a70] p-6 rounded-2xl shadow-inner border border-[#274690]/30">
          <h3 className="text-xl font-bold mb-4 text-[#81c3d7]">Personal Details</h3>
          <div className="space-y-2 text-sm">
            <p><span className="font-semibold text-[#81c3d7]">First Name:</span> {userDetails?.firstname}</p>
            <p><span className="font-semibold text-[#81c3d7]">Last Name:</span> {userDetails?.lastname}</p>
            <p><span className="font-semibold text-[#81c3d7]">Email:</span> {userDetails?.email}</p>
          </div>
        </div>

        <div className="bg-[#223a70] p-6 rounded-2xl shadow-inner border border-[#274690]/30">
          <h3 className="text-xl font-bold mb-4 text-[#81c3d7]">Security</h3>
          <div className="flex justify-between items-center">
            <p className="text-sm"><span className="font-semibold text-[#81c3d7]">Password:</span> ••••••••</p>
            <button className="px-4 py-1 text-sm bg-[#81c3d7] text-[#1b264f] rounded hover:bg-white transition">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Modal */}
    {isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-[#1b264f] w-full max-w-md p-6 rounded-2xl shadow-2xl border border-[#274690]/30">
          <h2 className="text-2xl font-bold text-center mb-6 text-[#81c3d7]">Update Profile</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm mb-1 text-[#81c3d7]">First Name</label>
              <input
                className="w-full p-2 rounded-md bg-[#223a70] border border-[#81c3d7] text-white"
                defaultValue={user?.firstname}
                {...register('firstname', { required: 'First name is required' })}
              />
              {errors.firstname && <p className="text-red-400 text-sm">{errors.firstname.message}</p>}
            </div>
            <div>
              <label className="block text-sm mb-1 text-[#81c3d7]">Last Name</label>
              <input
                className="w-full p-2 rounded-md bg-[#223a70] border border-[#81c3d7] text-white"
                defaultValue={user?.lastname}
                {...register('lastname', { required: 'Last name is required' })}
              />
              {errors.lastname && <p className="text-red-400 text-sm">{errors.lastname.message}</p>}
            </div>
            <div>
              <label className="block text-sm mb-1 text-[#81c3d7]">Email</label>
              <input
                disabled
                className="w-full p-2 rounded-md bg-[#274690] border border-[#81c3d7] text-white cursor-not-allowed"
                defaultValue={user?.email}
                {...register('email')}
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handleModalToggle}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
              >
                <FaTimes className="inline-block mr-1" /> Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#81c3d7] text-[#1b264f] hover:bg-white rounded-md font-semibold"
              >
                <SaveIcon className="inline-block mr-1" /> Save
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
);


};

export default UserProfile;
