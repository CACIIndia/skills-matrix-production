import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import AddCertificateModal from "./AddCertificate";
import EditCertificateModal from "./EditCertificateModal";
import { Certificate, Skill, Training } from "@/lib/types/profile";
import "react-datepicker/dist/react-datepicker.css";
import Table from "@/components/common/Table/Table";
import { getFormattedDate } from "@/components/common/Date-Handling/DateFormat";


type TableHeaders = {
  key: string;
  label: string;
  sortable?: boolean;
  className?: string;
};
type CategorySkillsData = {
  category: string;
  categoryId?: string; 
  skills: Skill[];
};
interface CertificateTableProps {
  headers: TableHeaders[];
  certificates: Certificate[];
  onEdit: (id: string, updatedCertificate: Omit<Certificate, "id">) => void;
  onDelete: (id: string, refetch: () => void) => void;
  onDownload: (url: string, createdById: string, name: string) => void;
  onAddCertificate: (
    newCertificate: Omit<Certificate, "id">,
    refetch: () => void,
  ) => void;
  categorySkills: CategorySkillsData[];
  refetch: () => void;
  trainingData: Training[];
  isSearchable: boolean;
  addNewData: boolean;
  noDataMessage: string;
}

const CertificateTable: React.FC<CertificateTableProps> = ({
  headers,
  certificates = [],
  onEdit,
  onDelete,
  onDownload,
  onAddCertificate,
  categorySkills,
  refetch,
  trainingData = [],
  isSearchable,
  addNewData,
  noDataMessage
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState<
    Omit<Certificate, "id">
  >({
    name: "",
    obtainedDate: null,
    expiryDate: null,
    url: "",
    description: "",
    createdById: "",
    certificateFile: null,
    categoryId: "",
    categoryName: "",
    skillId: "",
    skillName: "",
    trainingRecordId: "",
   /*  trainingRecordCategoryId: "",
    trainingRecordCategoryName: "",
    trainingRecordSkillId: "",
    trainingRecordName: "", */
    isTrainingLinked: false
  });

  const [editingFile, setEditingFile] = useState<File | undefined>();
  const [editingId, setEditingId] = useState<string | null>(null);

  // Toggle modal visibility
  const toggleAddModal = () => setIsAddModalOpen((prev) => !prev);
  const toggleEditModal = () => setIsEditModalOpen((prev) => !prev);

  // Handle file changes for both adding and editing certificates
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setEditingFile(file);
  };

  // Handle certificate addition
  const handleAddCertificate = (newCertificate: Certificate) => {
    onAddCertificate(newCertificate, refetch);
    toggleAddModal();
    resetEditingCertificate();
  };

  const handleEditCertificate = (id: string, cert: Certificate) => {
    setEditingId(id);
    setEditingCertificate(cert);
    toggleEditModal();
  };

  const handleUpdateCertificate = (values: Certificate) => {
    if (editingId !== null) {
      onEdit(editingId, { ...values, certificateFile: editingFile || null });
      toggleEditModal();
      resetEditingCertificate();
    }
  };

  const resetEditingCertificate = () => {
    setEditingFile(undefined);
    setEditingId(null);
  };


  const renderCell = (key: string, value: string, rowData: Certificate) => {
    switch (key) {
      case "obtainedDate":
        case "expiryDate":
          return value ? getFormattedDate(value) : "N/A";
      case "actions":
        return (
          <div className='flex gap-3 text-xl'>
            <button
              className='text-primary'
              onClick={() => handleEditCertificate(rowData?.id || "", rowData)}
              title='Edit'
            >
              <i className='ki-filled ki-notepad-edit' />
            </button>
            <button
              className='text-danger'
              onClick={() => onDelete(rowData?.id || "", refetch)}
              title='Delete'
            >
              <FaTrash />
            </button>
            <button
              className='text-success'
              onClick={() =>
                onDownload(
                  rowData?.url || "",
                  rowData?.createdById || "",
                  rowData?.name,
                )
              }
              title='Download'
            >
              <i className='ki-filled ki-folder-down' />
            </button>
          </div>
        );
      default:
        return value;
    }
  };

  return (
    <div className='min-h-[400px]'>
      <Table
        headers={headers}
        isSearchable={isSearchable}
        addNewData={addNewData}
        setIsAddModalOpen={setIsAddModalOpen}
        data={certificates}
        renderCell={renderCell}
        isPaginated={true}
        noDataMessage={noDataMessage}
      />

      {/* Add Certificate Modal */}
      {isAddModalOpen && (
        <AddCertificateModal
          isAddModalOpen={isAddModalOpen}
          handleToggleAddModal={toggleAddModal}
          handleUploadCertificate={handleAddCertificate}
          categorySkills={categorySkills}
          trainingData={trainingData}
        />
      )}

      {/* Edit Certificate Modal */}
      {isEditModalOpen && (
        <EditCertificateModal
          isEditModalOpen={isEditModalOpen}
          handleToggleEditModal={toggleEditModal}
          handleUpdateCertificate={handleUpdateCertificate}
          categorySkills={categorySkills}
          editingCertificate={editingCertificate}
          handleFileChange={handleFileChange}
          trainingData={trainingData}
        />
      )}
    </div>
  );
};

export default CertificateTable;
