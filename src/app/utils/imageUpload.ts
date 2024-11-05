import axios from 'axios';

 const uploadImage = async (file: File, id:string): Promise<{ image_url: string }> => {
  try {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise<{ image_url: string }>((resolve, reject) => {
      reader.onloadend = async () => {
        const base64Image = reader.result?.toString().split(',')[1];

        if (!base64Image) {
          reject(new Error("Unable to get base64 image data."));
          return;
        }

        try {
          const response = await axios.post('/api/upload-image', { base64Image,userId:id });
          resolve(response.data); 
        } catch (error) {
          reject(error); // Handle any error during the upload
        }
      };

      reader.onerror = (error) => reject(new Error("Error reading file: " + error));
    });
  } catch (error) {
    throw new Error("Unexpected error during image upload: " + (error instanceof Error ? error.message : "Unknown error"));
  }
};


function updateProfileImage(imageUrl: string): void {
  // Select all elements with class 'profile_image' and cast them to HTMLImageElement[]
  const profileImages: NodeListOf<HTMLImageElement> = document.querySelectorAll('.profile_image');


  // Loop through each element and update the 'src' attribute with the new image URL
  profileImages.forEach((imageElement: HTMLImageElement) => {
    imageElement.src = imageUrl;
  });
}


export {updateProfileImage ,uploadImage}

