import okb_colors from "@/colors";

export const LoginPopup: React.FC<{ onClose: () => void, logInWithGoogleAndRedirect: (onClose: () => void) => Promise<void>, signUpWithGoogleAndRedirect: (onClose: () => void) => Promise<void> }> = ({ onClose, logInWithGoogleAndRedirect, signUpWithGoogleAndRedirect }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      {/* Popup Content */}
      <div className="flex flex-col relative bg-white rounded-2xl shadow-md text-center p-12 max-w-lg gap-y-6 z-10">
        {/* Added "X" button */}
        <button className="absolute top-2 right-5 text-[#5F5F5F] text-[24px] font-bold" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-xl font-montserrat font-bold text-[20px]">Log in to save, message, and book appointments with professionals.</h2>
        <button className={`btn bg-[${okb_colors.okb_blue}] w-full text-[20px] font-montserrat font-semibold`} onClick={() => logInWithGoogleAndRedirect(onClose)}>
          Login
        </button>
        <p className="flex items-center justify-center font-montserrat">
          Don't have an account?<span className="mx-2"></span>
          <button className="text-[#000000] text-[18px] font-semibold underline" onClick={() => signUpWithGoogleAndRedirect(onClose)}>
            Create one here
          </button>
        </p>
      </div>
    </div>
  );
};
