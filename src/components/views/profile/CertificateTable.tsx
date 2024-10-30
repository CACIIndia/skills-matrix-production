import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";

interface Certificate {
  id: number;
  name: string;
  obtainedDate: string;
  expiryDate: string;
  url: string;
  description: string;
}

interface CertificateTableProps {
  certificates: Certificate[];
  onEdit: (id: number, updatedCertificate: Omit<Certificate, "id">) => void; 
  onDelete: (id: number) => void;
  onDownload: (url: string) => void; 
  onAddCertificate: (newCertificate: Omit<Certificate, "id">) => void;
}

const CertificateTable: React.FC<CertificateTableProps> = ({
  certificates,
  onEdit,
  onDelete,
  onDownload,
  onAddCertificate,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newCertificate, setNewCertificate] = useState<Omit<Certificate, "id">>(
    {
      name: "",
      obtainedDate: "",
      expiryDate: "",
      url: "",
      description: "",
    },
  );

  const [editingCertificate, setEditingCertificate] = useState<
    Omit<Certificate, "id">
  >({
    name: "",
    obtainedDate: "",
    expiryDate: "",
    url: "",
    description: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  // Toggle modal visibility
  const handleToggleAddModal = () => {
    setIsAddModalOpen((prev) => !prev);
  };

  const handleToggleEditModal = () => {
    setIsEditModalOpen((prev) => !prev);
  };

 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (isEditModalOpen) {
      setEditingCertificate((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewCertificate((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewCertificate((prev) => ({ ...prev, certificateFile: file }));
    }
  };

  // Handle certificate upload
  const handleUploadCertificate = () => {
    onAddCertificate(newCertificate);
    handleToggleAddModal();
    setNewCertificate({
      name: "",
      obtainedDate: "",
      expiryDate: "",
      url: "",
      description: "",
    });
  };

  // Handle certificate edit
  const handleEditCertificate = (id: number, cert: Certificate) => {
  
    const obtainedDateObj = new Date(cert.obtainedDate);
    const expiryDateObj = new Date(cert.expiryDate);
    
    // Format the dates to 'YYYY-MM-DD'
    const formattedObtainedDate = obtainedDateObj.toISOString().split('T')[0];
    const formattedExpiryDate = expiryDateObj.toISOString().split('T')[0];
  
    console.log(cert.expiryDate, formattedExpiryDate, "formattedObtainedDate", formattedObtainedDate);
  
    setEditingId(id);
    setEditingCertificate({
      ...cert,
      expiryDate: formattedExpiryDate,
      obtainedDate: formattedObtainedDate,
    });
    handleToggleEditModal();
  };
  

  const handleUpdateCertificate = () => {
    if (editingId !== null) {
      onEdit(editingId, editingCertificate);
      handleToggleEditModal();
      setEditingCertificate({
        name: "",
        obtainedDate: "",
        expiryDate: "",
        url: "",
        description: "",
      });
      setEditingId(null);
    }
  };

  return (
    <div className='min-h-[400px]'>
      <div className='card card-grid max-h-[400px] min-w-full'>
        <div className='card-header flex items-center justify-between'>
          <h3 className='card-title'>Certificates</h3>
          <button
            className='btn btn-sm btn-icon btn-clear btn-primary'
            onClick={handleToggleAddModal}
          >
            <CiSquarePlus size={32} />
          </button>
        </div>

        <div className='card-body'>
          <div className='scrollable-x-auto max-h-[300px] overflow-y-auto'>
            <table className='table-border table min-h-[200px] min-w-full'>
              <thead className='sticky top-0 z-10 bg-white'>
                <tr>
                  <th className='w-[60px]'>S.No</th>
                  <th className='w-[280px]'>Name</th>
                  <th className='min-w-[135px]'>Obtained Date</th>
                  <th className='min-w-[135px]'>Valid Until</th>
                  <th className='min-w-[135px]'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {certificates.length === 0 ? (
                  <tr>
                    <td colSpan={5} className='text-center'>
                      No Records
                    </td>
                  </tr>
                ) : (
                  certificates.map((cert, index) => (
                    <tr key={cert.id}>
                      <td>{index + 1}</td>
                      <td>
                        <span className='text-sm font-semibold text-gray-900'>
                          {cert.name}
                        </span>
                      </td>
                      <td>{cert.obtainedDate}</td>
                      <td>{cert.expiryDate}</td>
                      <td className='flex gap-3 text-xl'>
                        <button
                          className='text-primary'
                          onClick={() => handleEditCertificate(cert.id, cert)} // Trigger edit modal
                          title='Edit'
                        >
                          <i className='ki-filled ki-notepad-edit' />
                        </button>
                        <button
                          className='text-danger'
                          onClick={() => onDelete(cert.id)}
                          title='Delete'
                        >
                          <FaTrash />
                        </button>
                        <button
                          className='text-success'
                          onClick={() => onDownload(cert.url)}
                          title='Download'
                        >
                          <i className='ki-filled ki-folder-down' />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Certificate Modal */}
      {isAddModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='w-[600px] rounded-md bg-white p-6 shadow-lg'>
            <h3 className='mb-4 text-lg font-semibold'>Add New Certificate</h3>

            {/* Certificate Name */}
            <label className='mb-1 block text-sm font-medium text-gray-700'>
              Certificate Name
            </label>
            <input
              type='text'
              name='name'
              placeholder='Enter certificate name'
              value={newCertificate.name}
              onChange={handleInputChange}
              className='mb-4 w-full border p-2'
            />

            {/* Certificate File */}
            <label className='mb-1 block text-sm font-medium text-gray-700'>
              Upload Certificate File
            </label>
            <input
              type='file'
              name='certificateFile'
              accept='application/pdf'
              onChange={handleFileChange}
              className='mb-4 w-full border p-2'
            />

            {/* Obtained Date */}
            <label className='mb-1 block text-sm font-medium text-gray-700'>
              Obtained Date
            </label>
            <input
              type='date'
              name='obtainedDate'
              value={newCertificate.obtainedDate}
              onChange={handleInputChange}
              className='mb-4 w-full border p-2'
            />

            {/* Valid Until */}
            <label className='mb-1 block text-sm font-medium text-gray-700'>
              Valid Until
            </label>
            <input
              type='date'
              name='expiryDate'
              value={newCertificate.expiryDate}
              onChange={handleInputChange}
              className='mb-4 w-full border p-2'
            />

            <label className='mb-1 block text-sm font-medium text-gray-700'>
              Description
            </label>
            <input
              type='text'
              name='description'
              placeholder='Enter certificate description'
              value={newCertificate.description}
              onChange={handleInputChange}
              className='mb-4 w-full border p-2'
            />

            <div className='flex justify-end gap-4'>
              <button
                className='btn btn-secondary'
                onClick={handleToggleAddModal}
              >
                Cancel
              </button>
              <button
                className='btn btn-primary'
                onClick={handleUploadCertificate}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Certificate Modal */}
      {isEditModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='w-[600px] rounded-md bg-white p-6 shadow-lg'>
            <h3 className='mb-4 text-lg font-semibold'>Edit Certificate</h3>

            {/* Certificate Name */}
            <label className='mb-1 block text-sm font-medium text-gray-700'>
              Certificate Name
            </label>
            <input
              type='text'
              name='name'
              placeholder='Enter certificate name'
              value={editingCertificate.name}
              onChange={handleInputChange}
              className='mb-4 w-full border p-2'
            />

            <label className='mb-1 block text-sm font-medium text-gray-700'>
              Edit Certificate File
            </label>
            <input
              type='file'
              name='certificateFile'
              
              accept='application/pdf'
              onChange={handleFileChange}
              className='mb-4 w-full border p-2'
            />

            {/* Obtained Date */}
            <label className='mb-1 block text-sm font-medium text-gray-700'>
              Obtained Date
            </label>
            <input
              type='date'
              name='obtainedDate'
              value={editingCertificate.obtainedDate}
              onChange={handleInputChange}
              className='mb-4 w-full border p-2'
            />

            {/* Valid Until */}
            <label className='mb-1 block text-sm font-medium text-gray-700'>
              Valid Until
            </label>
            <input
              type='date'
              name='expiryDate'
              value={editingCertificate.expiryDate}
              onChange={handleInputChange}
              className='mb-4 w-full border p-2'
            />

            {/* Description */}
            <label className='mb-1 block text-sm font-medium text-gray-700'>
              Description
            </label>
            <input
              type='text'
              name='description'
              placeholder='Enter certificate description'
              value={editingCertificate.description}
              onChange={handleInputChange}
              className='mb-4 w-full border p-2'
            />

            <div className='flex justify-end gap-4'>
              <button
                className='btn btn-secondary'
                onClick={handleToggleEditModal}
              >
                Cancel
              </button>
              <button
                className='btn btn-primary'
                onClick={handleUpdateCertificate}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateTable;
