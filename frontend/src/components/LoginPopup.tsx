export const LoginPopup: React.FC<{ onClose: () => void, logInWithGoogleAndRedirect: (onClose: () => void) => Promise<void>, signUpWithGoogleAndRedirect: (onClose: () => void) => Promise<void> }> = ({ onClose, logInWithGoogleAndRedirect, signUpWithGoogleAndRedirect }) => {

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="relative bg-white p-8 rounded shadow-md text-center space-y-4">
        {/* Added "X" button */}
        <button className="absolute top-2 right-2 text-[#5F5F5F] text-[24px] font-bold" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-xl font-bold">Log in to save, message, and book appointments with professionals</h2>
        <button className="btn bg-[#E5E5E5] w-full" onClick={() => logInWithGoogleAndRedirect(onClose)}>
          Login
        </button>
        <p>
          Don't have an account?{' '}
          <button className="text-[#000000] font-bold" onClick={() => signUpWithGoogleAndRedirect(onClose)}>
            Create one here
          </button>
        </p>
      </div>
    </div>
  );
};