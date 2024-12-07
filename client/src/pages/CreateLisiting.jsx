import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
} from "firebase/storage";
import React from "react";
import { app } from "../firebase";
import { useState } from "react";

export default function CreateLisiting() {
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });


  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };



  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done.`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };


  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };




  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            className="border p-3 rounded-lg"
            text="text"
            id="name"
            placeholder="Name"
            maxLength={60}
            minLength={10}
            required
          />
          <textarea
            className="border p-3 rounded-lg"
            text="Description"
            id="Description"
            placeholder="Description"
            required
          />
          <input
            className="border p-3 rounded-lg"
            text="address"
            id="address"
            placeholder="Address"
            required
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-4" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-4" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-4" />
              <span>parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-4" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-4" />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 items-baseline">
            <div className="flex items-center gap-2 ">
              <input
                type="number"
                id="beds"
                min={1}
                max={10}
                required
                className=" border border-grey-300 p-3 rounded-lg"
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="baths"
                min={1}
                max={10}
                required
                className=" border border-gray-300 p-3 rounded-lg"
              />
              <p>Baths</p>
            </div>
            <div className="flex flex-col items-center ">
              <input
                type="number"
                id="regularPrice"
                min={1}
                max={10}
                required
                className=" border border-grey-300 p-3 rounded-lg"
              />
              <p>Regular Price</p>
              <span className="text-xs"> (rs / month)</span>
            </div>
            <div className="flex  flex-col items-center ">
              <input
                type="number"
                id="discounted Price"
                min={1}
                max={10}
                required
                className=" border border-grey-300 p-3 rounded-lg"
              />
              <p>Discounted price</p>
              <span className="text-xs"> (rs / month)</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images :
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded w-full "
              type="file"
              id="image"
              accept="image/*"
              multiple
            />
            <button
              onClick={handleImageSubmit}
              type="button"
              disabled={uploading}
              className="text-green-700 border border-green-700 rounded-lg p-3 hover:opacity-95 disabled:opacity-85 "
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url) => {
              <div key={url}className="flex justify-between p-3 border items-center">
                <img
                  src={url}
                  alt="listing Image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  onClick={()=> handleRemoveImage}
                  className="p-3 text-red-700 rounded uppercase hover:opacity-75"
                >
                  Delete
                </button>
              </div>;
            })}
          <button className="uppercase bg-slate-700 text-white rounded-lg hover:opacity-95 disabled:opacity-80 p-3">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
