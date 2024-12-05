import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import AddCertificateModal from "./AddCertificate";
import EditCertificateModal from "./EditCertificateModal";
import { Certificate, SkillCategory } from "@/lib/types/profile";
import "react-datepicker/dist/react-datepicker.css";
import SortingPagination from "@/components/common/Table/SortingPagination";
import { tableSearch } from "@/lib/utils/tableSearch";

interface CertificateTableProps {
  certificates: Certificate[];
  onEdit: (id: string, updatedCertificate: Omit<Certificate, "id">) => void;
  onDelete: (id: string, refetch: () => void) => void;
  onDownload: (url: string, createdById: string, name: string) => void;
  onAddCertificate: (newCertificate: Omit<Certificate, "id">) => void;
  setCertificatesData: React.Dispatch<React.SetStateAction<Certificate[]>>;
  initialcertificates: Certificate[];
  categoryskills: SkillCategory[];
  refetch: () => void;
}

const CertificateTable: React.FC<CertificateTableProps> = ({
  certificates = [],
  onEdit,
  onDelete,
  onDownload,
  setCertificatesData,
  initialcertificates,
  onAddCertificate,
  categoryskills,
  refetch,
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
  });

  const [editingFile, setEditingFile] = useState<File | undefined>();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc" | null;
  }>({ key: "", direction: null });

  const sortData = (data: Certificate[]) => {
    if (!sortConfig.key || !sortConfig.direction) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof Certificate] ?? null;
      const bValue = b[sortConfig.key as keyof Certificate] ?? null;

      if (aValue === null && bValue === null) return 0;
      if (aValue === null) return sortConfig.direction === "asc" ? -1 : 1;
      if (bValue === null) return sortConfig.direction === "asc" ? 1 : -1;

      const isAscending = sortConfig.direction === "asc";

      return isAscending
        ? (aValue as string | number) > (bValue as string | number)
          ? 1
          : -1
        : (aValue as string | number) < (bValue as string | number)
          ? 1
          : -1;
    });
  };

  const paginatedData = sortData(certificates).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(certificates.length / itemsPerPage);

  const handleTrainingSearch = (query: string) => {
    const filteredData = tableSearch(query, initialcertificates, [
      "name",
      "categoryName",
      "obtainedDate",
      "expiryDate",
    ]);

    setCertificatesData(filteredData);
  };

  const getSortClass = (key: string) => {
    if (sortConfig.key !== key) return "";
    return sortConfig.direction === "asc" ? "asc" : "desc";
  };

  const handleSort = (key: keyof Certificate) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

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
    onAddCertificate(newCertificate);
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

  return (
    <div className='min-h-[400px]'>
      <div className='grid'>
        <div className='card card-grid h-full min-w-full'>
          <div className='card-header flex items-center justify-between'>
            <div className='input input-sm flex max-w-48 items-center'>
              <i className='ki-filled ki-magnifier' />
              <input
                placeholder='Search..'
                type='text'
                className='ml-2'
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  handleTrainingSearch(e.target.value);
                }}
              />
            </div>
            <h3 className='card-title'>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className='btn btn-sm btn-icon btn-clear btn-primary'
              >
                <CiSquarePlus size={32} />
              </button>
            </h3>
          </div>

          <div className='card-body'>
            <table className='table-border table' data-datatable-table='true'>
              <thead>
                <tr>
                  <th className='w-[60px]'>#</th>
                  <th
                    className='w-[150px] cursor-pointer'
                    onClick={() => handleSort("categoryName")}
                  >
                    <span className={`sort ${getSortClass("categoryName")}`}>
                      <span className='sort-label'>Category</span>
                      <span className='sort-icon'></span>
                    </span>
                  </th>
                  <th
                    className='w-[280px] cursor-pointer'
                    onClick={() => handleSort("name")}
                  >
                    <span className={`sort ${getSortClass("name")}`}>
                      <span className='sort-label'>Name</span>
                      <span className='sort-icon'></span>
                    </span>
                  </th>
                  <th
                    className='min-w-[135px] cursor-pointer'
                    onClick={() => handleSort("obtainedDate")}
                  >
                    <span className={`sort ${getSortClass("obtainedDate")}`}>
                      <span className='sort-label'>Obtained Date</span>
                      <span className='sort-icon'></span>
                    </span>
                  </th>
                  <th
                    className='min-w-[135px] cursor-pointer'
                    onClick={() => handleSort("expiryDate")}
                  >
                    <span className={`sort ${getSortClass("expiryDate")}`}>
                      <span className='sort-label'>Valid Until</span>
                      <span className='sort-icon'></span>
                    </span>
                  </th>
                  <th className='min-w-[135px] overflow-hidden'>Actions</th>
                </tr>
              </thead>

              <tbody>
                {paginatedData.map((cert, index) => (
                  <tr key={cert.id}>
                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>{" "}
                    <td>{cert.categoryName}</td>
                    <td>{cert.name}</td>
                    <td>
                      {cert.obtainedDate
                        ? new Date(cert.obtainedDate).toLocaleDateString()
                        : "N/A"}
                    </td>{" "}
                    <td>
                      {cert.expiryDate
                        ? new Date(cert.expiryDate).toLocaleDateString()
                        : "N/A"}
                    </td>{" "}
                    <td className='flex gap-3 text-xl'>
                      <button
                        className='text-primary'
                        onClick={() =>
                          handleEditCertificate(cert.id || "", cert)
                        }
                        title='Edit'
                      >
                        <i className='ki-filled ki-notepad-edit' />
                      </button>
                      <button
                        className='text-danger'
                        onClick={() => onDelete(cert.id || "", refetch)}
                        title='Delete'
                      >
                        <FaTrash />
                      </button>
                      <button
                        className='text-success'
                        onClick={() =>
                          onDownload(
                            cert.url || "",
                            cert.createdById || "",
                            cert.name,
                          )
                        }
                        title='Download'
                      >
                        <i className='ki-filled ki-folder-down' />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <SortingPagination
              currentPage={currentPage}
              totalItems={certificates.length}
              itemsPerPage={itemsPerPage}
              setCurrentPage={setCurrentPage}
              setItemsPerPage={setItemsPerPage}
            />
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
