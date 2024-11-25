import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import AddCertificateModal from "./AddCertificate";
import EditCertificateModal from "./EditCertificateModal";
import { Certificate, SkillCategory } from "@/lib/types/profile";
import "react-datepicker/dist/react-datepicker.css";

interface CertificateTableProps {
  certificates: Certificate[];
  onEdit: (id: string, updatedCertificate: Omit<Certificate, "id">) => void;
  onDelete: (id: string,refetch:()=>void) => void;
  onDownload: (url: string, createdById: string, name: string) => void;
  onAddCertificate: (newCertificate: Omit<Certificate, "id">) => void;
  categoryskills: SkillCategory[];
  refetch:()=>void
}

const CertificateTable: React.FC<CertificateTableProps> = ({
  certificates,
  onEdit,
  onDelete,
  onDownload,
  onAddCertificate,
  categoryskills,
  refetch
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [editingCertificate, setEditingCertificate] = useState<Omit<Certificate, "id">>({
    name: "",
    obtainedDate: null,  
    expiryDate: null, 
    url: "",
    description: "",
    createdById: "",
    certificateFile:  null,
  categoryId:"",
  categoryName:  ""
  });

  const [editingFile, setEditingFile] = useState<File | undefined>();
  const [editingId, setEditingId] = useState<string | null>(null);

  // Toggle modal visibility
  const toggleAddModal = () => setIsAddModalOpen(prev => !prev);
  const toggleEditModal = () => setIsEditModalOpen(prev => !prev);

  
  // Handle file changes for both adding and editing certificates
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setEditingFile(file);
  };

  // Handle certificate addition
  const handleAddCertificate = (newCertificate:Certificate) => {
    
    onAddCertificate(newCertificate);
    toggleAddModal();
    resetEditingCertificate();
  };

  const handleEditCertificate = (id: string, cert: Certificate) => {
    setEditingId(id);
    setEditingCertificate(cert);
    toggleEditModal();
  };
  

  const handleUpdateCertificate = (values:Certificate) => {
    if (editingId !== null) {
      onEdit(editingId, {...values,certificateFile:editingFile || null});
      toggleEditModal();
      resetEditingCertificate();
    }

    
  };

  const resetEditingCertificate = () => {
    setEditingFile(undefined);
    setEditingId(null);
  };

  return (
    <div className='min-h-[400px]'>
      <div className='card card-grid max-h-[400px] min-w-full'>
        <div className='card-header flex items-center justify-between'>
          <h3 className='card-title'>Certifications</h3>
          <button className='btn btn-sm btn-icon btn-clear btn-primary' onClick={toggleAddModal}>
            <CiSquarePlus size={32} />
          </button>
        </div>

        <div className='card-body'>
          <div className='scrollable-x-auto max-h-[300px] overflow-y-auto'>
            <table className='table-border table min-w-full'>
              <thead className='sticky top-0 z-0 bg-white'>
                <tr>
                  <th className='w-[60px]'>#</th>
                  <th className='w-[150px]'>Category</th>
                  <th className='w-[280px]'>Name</th>
                  <th className='min-w-[135px]'>Obtained Date</th>
                  <th className='min-w-[135px]'>Valid Until</th>
                  <th className='min-w-[135px]'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {certificates?.length === 0 ? (
                  <tr>
                    <td colSpan={6} className='text-center'>
                      No Records
                    </td>
                  </tr>
                ) : (
                  certificates?.map((cert, index) => (
                    <tr key={cert.id}>
                      <td>{index + 1}</td>
                      <td>{cert.categoryName}</td>
                      <td>
                        <span className='text-sm font-semibold text-gray-900'>{cert.name}</span>
                      </td>
                      <td>{cert.obtainedDate ? new Date(cert.obtainedDate).toLocaleDateString() : "N/A"}</td>

                      <td>{cert.expiryDate ? new Date(cert.expiryDate).toLocaleDateString() : "N/A"}</td>

                      <td className='flex gap-3 text-xl '>
                        <button
                          className='text-primary'
                          onClick={() => handleEditCertificate(cert.id || "", cert)}
                          title='Edit'
                        >
                          <i className='ki-filled ki-notepad-edit  border border-red-100' />
                        </button>
                        <button
                          className='text-danger'
                          onClick={() => onDelete(cert.id || "",refetch)}
                          title='Delete'
                        >
                          <FaTrash />
                        </button>
                        <button
                          className='text-success'
                          onClick={() => onDownload(cert.url || "", cert.createdById||"", cert.name)}
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
        <AddCertificateModal
         isAddModalOpen={isAddModalOpen}
         handleToggleAddModal={toggleAddModal}
         handleUploadCertificate={handleAddCertificate}
          categoryskills={categoryskills}
        />
      )}

      {/* Edit Certificate Modal */}
      {isEditModalOpen && (
        <EditCertificateModal
        isEditModalOpen={isEditModalOpen}
        handleToggleEditModal={toggleEditModal}
          handleUpdateCertificate={handleUpdateCertificate}
          categoryskills={categoryskills}
          editingCertificate={editingCertificate}
          handleFileChange={handleFileChange}
       
        />
      )}
    </div>
  );
};

export default CertificateTable;
