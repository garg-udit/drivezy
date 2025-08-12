import { api } from "./api";


export const createVehicle = (payload) => {
  return api.post('/vehicles/create', payload);
};

export const uploadVehicleAndRCImages = async (vehicleId, images, rcDocument) => {
  const formData = new FormData();
  images.forEach((img) => formData.append('vehicleImages', img));
  if (rcDocument) {
    formData.append('rcImage', rcDocument);
  }

  return api.post(
    `/vehicles/${vehicleId}/upload-images`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};



export const fetchMyVehicles = async () => {
  const token = localStorage.getItem('token');
  return api.get(`/vehicles/myVehicles`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getVehicleById = (vehicleId) => {
  return api.get(`/vehicles/${vehicleId}`);
};


