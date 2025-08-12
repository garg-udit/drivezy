import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { createVehicle, uploadVehicleAndRCImages } from '../api/vehicleApi';

const AddVehicleForm = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: '',
    vehicleModel: '',
    vehicleBrand: '',
    vehicleNumber: '',
    pricePerDay: '',
    location: '',
    color: '',
    geared: '',
    vehicleCategory: '',
    securityAmount: '',
    description: '',
    images: [],
    rcDocument: null,
  });

  const [isValid, setIsValid] = useState(false);

  const validateStep = () => {
    if (step === 1) {
      const {
        title,
        vehicleModel,
        vehicleBrand,
        vehicleNumber,
        pricePerDay,
        location,
        color,
        geared,
        vehicleCategory,
        securityAmount,
        description,
      } = form;
      return (
        title &&
        vehicleModel &&
        vehicleBrand &&
        vehicleNumber &&
        pricePerDay &&
        location &&
        color &&
        geared &&
        vehicleCategory &&
        securityAmount &&
        description
      );
    }
    if (step === 2) return form.images.length >= 2 && form.images.length <= 4;
    if (step === 3) return form.rcDocument !== null;
    return false;
  };

  useEffect(() => {
    setIsValid(validateStep());
  }, [form, step]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e, key, index = null) => {
    const files = Array.from(e.target.files);
    if (key === 'images') {
      let newImages = [...form.images];
      if (index !== null && files[0]) {
        newImages[index] = files[0];
        newImages = newImages.filter(Boolean).slice(0, 6);
      }
      setForm({ ...form, images: newImages });
    } else if (key === 'rcDocument' && files[0]) {
      setForm({ ...form, rcDocument: files[0] });
    }
  };

  const removeImage = (index) => {
    const newImages = [...form.images];
    newImages.splice(index, 1);
    setForm({ ...form, images: newImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Prepare vehicle details payload
      const vehiclePayload = {
        title: form.title,
        vehicleModel: form.vehicleModel,
        vehicleBrand: form.vehicleBrand,
        vehicleNumber: form.vehicleNumber,
        pricePerDay: parseFloat(form.pricePerDay),
        location: form.location?.toUpperCase(),
        color: form.color,
        geared: form.geared,
        vehicleCategory: form.vehicleCategory.toUpperCase(),
        securityAmount: parseFloat(form.securityAmount),
        description: form.description,
      };

      // 2. Create the vehicle
      console.log(vehiclePayload);
      const res = await createVehicle(vehiclePayload);
      console.log("Vehicle Create Response:", res);

      const vehicleId = res?.data?.id; // ✅ Check that this exists
      if (!vehicleId) {
        throw new Error("Vehicle ID is missing in response");
      }


      // 3. Upload vehicle images + RC image
      await uploadVehicleAndRCImages(vehicleId, form.images, form.rcDocument);

      // 4. Success feedback
      toast.success('✅ Vehicle and images uploaded successfully!');

      // 5. Reset form
      setStep(1);
      setForm({
        title: '',
        vehicleModel: '',
        vehicleBrand: '',
        vehicleNumber: '',
        pricePerDay: '',
        location: '',
        color: '',
        geared: '',
        vehicleCategory: '',
        securityAmount: '',
        description: '',
        images: [],
        rcDocument: null,
      });
    } catch (error) {
      console.log(error);
      toast.error('❌ Failed to submit vehicle!');
    }
  };

  const nextStep = () => isValid && setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center px-4 py-12">
      <Toaster position="top-center" />
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span className={step >= 1 ? 'font-bold text-black' : ''}>Details</span>
            <span className={step >= 2 ? 'font-bold text-black' : ''}>Images</span>
            <span className={step === 3 ? 'font-bold text-black' : ''}>RC Upload</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div
              className={`h-full transition-all duration-300 rounded-full ${step === 1 ? 'w-1/3 bg-blue-500' : step === 2 ? 'w-2/3 bg-blue-500' : 'w-full bg-green-500'
                }`}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative min-h-[450px] pb-28">
          {/* Step 1 */}
          {step === 1 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  ['title', 'Vehicle Title'],
                  ['vehicleModel', 'Vehicle Model'],
                  ['vehicleBrand', 'Vehicle Brand'],
                  ['vehicleNumber', 'Vehicle Number'],
                  ['pricePerDay', 'Rent Price (₹/day)'],
                  ['color', 'Color'],
                  ['securityAmount', 'Security Amount (₹)'],
                ].map(([name, label]) => (
                  <div key={name}>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">{label}</label>
                    <input
                      name={name}
                      value={form[name]}
                      onChange={handleChange}
                      className="input w-full cursor-pointer"
                      type={['pricePerDay', 'securityAmount'].includes(name) ? 'number' : 'text'}
                    />
                  </div>
                ))}

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Location</label>
                  <select
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    className="input w-full cursor-pointer"
                  >
                    <option value="">Select Location</option>
                    <option value="DELHI">Delhi</option>
                    <option value="MUMBAI">Mumbai</option>
                    <option value="BANGALORE">Bangalore</option>
                    <option value="HYDERABAD">Hyderabad</option>
                    <option value="PUNE">Pune</option>
                    <option value="CHENNAI">Chennai</option>
                    <option value="KOLKATA">Kolkata</option>
                    <option value="AHMEDABAD">Ahmedabad</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Gear Type</label>
                  <select name="geared" value={form.geared} onChange={handleChange} className="input w-full cursor-pointer">
                    <option value="">Select Gear</option>
                    <option value="true">Manual</option>
                    <option value="false">Automatic</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Vehicle Category</label>
                  <select name="vehicleCategory" value={form.vehicleCategory} onChange={handleChange} className="input w-full cursor-pointer">
                    <option value="">Select Category</option>
                    <option value="TWO_WHEELER">2-Wheeler</option>
                    <option value="FOUR_WHEELER">4-Wheeler</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  className="input w-full cursor-pointer"
                />
              </div>
            </>
          )}

          {/* Step 2: Upload Images */}
          {step === 2 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Vehicle Images</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[...Array(6)].map((_, index) => {
                  const file = form.images[index];
                  const preview = file ? URL.createObjectURL(file) : null;

                  return (
                    <div
                      key={index}
                      className="aspect-square bg-gray-100 border border-gray-300 rounded-md flex items-center justify-center overflow-hidden relative"
                    >
                      {preview ? (
                        <>
                          <img src={preview} alt={`preview-${index}`} className="object-cover w-full h-full" />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-black bg-opacity-60 text-white w-7 h-7 text-lg rounded-full hover:bg-opacity-80"
                          >
                            ×
                          </button>
                        </>
                      ) : (
                        <span
                          className="text-3xl text-gray-400 font-bold cursor-pointer"
                          onClick={() => document.getElementById(`image-upload-${index}`).click()}
                        >
                          +
                        </span>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        id={`image-upload-${index}`}
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileChange(e, 'images', index)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Upload RC */}
          {step === 3 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload RC Document</label>
              <input
                type="file"
                accept="application/pdf,image/*"
                onChange={(e) => handleFileChange(e, 'rcDocument')}
                className="input cursor-pointer"
              />
              {form.rcDocument && (
                <div className="mt-3">
                  {form.rcDocument.type.startsWith('image/') ? (
                    <img
                      src={URL.createObjectURL(form.rcDocument)}
                      alt="RC"
                      className="w-20 h-20 rounded-md object-cover"
                    />
                  ) : (
                    <span className="text-sm bg-gray-100 px-3 py-1 rounded-full inline-block mt-2">
                      📄 {form.rcDocument.name}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step navigation */}
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="absolute bottom-6 left-6 bg-black text-white w-12 h-12 rounded-full flex items-center justify-center hover:scale-105 transition"
            >
              ←
            </button>
          )}
          {step < 3 && (
            <button
              type="button"
              onClick={nextStep}
              disabled={!isValid}
              className={`absolute bottom-6 right-6 text-white w-12 h-12 rounded-full flex items-center justify-center transition ${isValid ? 'bg-black hover:scale-105 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'
                }`}
            >
              →
            </button>
          )}
          {step === 3 && (
            <button
              type="submit"
              className="mt-6 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 block ml-auto"
            >
              Submit Vehicle
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddVehicleForm;
