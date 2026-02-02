import React from "react";

function AddPhoto({ setImage, image }) {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {image ? (
        <img
          src={URL.createObjectURL(image)}
          alt="profile"
          className="w-20 h-20 rounded-full object-cover border border-gray-700"
        />
      ) : (
        <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 text-sm">
          Photo
        </div>
      )}

      <label className="cursor-pointer text-sm text-blue-500 hover:underline">
        Add profile photo
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>
    </div>
  );
}

export default AddPhoto;
