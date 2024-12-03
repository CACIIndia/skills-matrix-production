import React, { useState, useEffect } from "react";
import Button from "@/components/common/Button";
import { GeneralInfo } from "@/lib/types/profile";



type EditGeneralInfoProps = {
  initialData: GeneralInfo;
  onSave: (updatedData: GeneralInfo) => void;
  sfiaLevels: Array<{ id: string; level: string }>; 
  reportedToOptions: Array<{ id: string; name: string }>; 
};

const EditGeneralInfo: React.FC<EditGeneralInfoProps> = ({
  initialData,
  onSave,
  sfiaLevels,
  reportedToOptions,
}) => {
  const [editableData, setEditableData] = useState<GeneralInfo>(initialData);

  // Effect to initialize state with reportedToId
  useEffect(() => {
    // Set the reported_to field using the initialData
    const selectedPerson = reportedToOptions.find(
      (person) => person.id === initialData.reportedTo,
    );

    if (selectedPerson) {
      setEditableData({
        ...initialData,
        reportedTo: selectedPerson.name, // Set the name based on the ID
        reportedToId: selectedPerson.id,
      });
    }
  }, [initialData, reportedToOptions]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setEditableData({
      ...editableData,
      [name]: value,
    });
  };

  const handleReportedToChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPersonId = e.target.value;
    const selectedPerson = reportedToOptions.find(
      (person) => person.id == selectedPersonId,
    );

    if (selectedPerson) {
      setEditableData({
        ...editableData,
        reportedTo: selectedPerson.name, // Store the name
        reportedToId: selectedPerson.id, // Store the ID
      });
    }
  };

  const handleSave = () => {
    const { reportedTo, reportedToId, ...restData } = editableData;

    onSave({
      ...restData,
      reportedTo: reportedTo,
      reportedToId: reportedToId,
    });
  };

  return (
    <div className='grid grid-cols-1 gap-4'>
      {/* Phone Field */}
      <label>
        Phone:
        <input
          type='text'
          name='phone'
          value={editableData.phone}
          onChange={handleInputChange}
          className='input'
        />
      </label>

      {/* SFIA Level Dropdown */}
      <label>
        SFIA Level:
        <select
          name='sfiaLevel'
          value={editableData.sfiaLevel}
          onChange={handleInputChange}
          className='input'
        >
          <option value=''>Select SFIA Level</option>
          {sfiaLevels.map((level) => (
            <option key={level.id} value={level.level}>
              {level.level}
            </option>
          ))}
        </select>
      </label>

      {/* Reported To Dropdown */}
      <label>
        Reported To:
        <select
          name='reportedTo'
          value={editableData.reportedToId} 
          onChange={handleReportedToChange} 
          className='input'
        >
          <option value=''>Select Person</option>
          {reportedToOptions
            .filter((person) => person.id !== editableData.id) 
            .map((person) => (
              <option key={person.id} value={person.id}>
                {person.name}
              </option>
            ))}
        </select>
      </label>

      {/* Save Button */}
      <Button
        onClick={handleSave}
        className='btn btn-primary mt-4 flex w-[100px] items-center justify-center'
      >
        Save
      </Button>
    </div>
  );
};

export default EditGeneralInfo;
