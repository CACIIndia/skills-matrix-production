import axios from 'axios';

const uploadCertificate = async (
    file: File,
    createdBy: string,
    name: string,
    obtainedDate: string,
    expiryDate: string,
    description:string,
  ): Promise<{ certificate_url: string }> => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      return new Promise<{ certificate_url: string }>((resolve, reject) => {
        reader.onloadend = async () => {
          const base64Certificate = reader.result?.toString().split(',')[1];
  
          if (!base64Certificate) {
            reject(new Error("Unable to get base64 certificate data."));
            return;
          }
  
          try {
            // Send the base64 string and metadata in the request body
            const response = await axios.post('/api/certificates/upload-certificate', {
              base64Certificate,
              createdBy,
              name,
              obtainedDate,
              expiryDate,
              description
            });
            resolve(response.data); 
          } catch (error) {
            reject(error); // Handle any error during the upload
          }
        };
  
        reader.onerror = (error) => reject(new Error("Error reading file: " + error));
      });
    } catch (error) {
      throw new Error("Unexpected error during certificate upload: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };
  


export  {uploadCertificate};