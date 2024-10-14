import React, { useState, useEffect } from "react";
import Button from "@/components/common/Button";

type GeneralInfo = {
  phone: string;
  sfia_level: string;
  reported_to: string; // Name of the person reported to
  reported_to_id: string; // ID of the person reported to
};

type EditGeneralInfoProps = {
  initialData: GeneralInfo;
  onSave: (updatedData: GeneralInfo) => void;
  sfiaLevels: Array<{ id: string; level: string }>; // Add SFIA levels as prop
  reportedToOptions: Array<{ id: string; name: string }>; // Add Reported To options as prop
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
      (person) => person.id === initialData.reported_to_id
    );
    
    
    if (selectedPerson) {
      setEditableData({
        ...initialData,
        reported_to: selectedPerson.name, // Set the name based on the ID
        reported_to_id:selectedPerson.id,
      });
    }
  }, [initialData, reportedToOptions]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditableData({
      ...editableData,
      [name]: value,
    });
  };

  const handleReportedToChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedPersonId = e.target.value;
    const selectedPerson = reportedToOptions.find(
      (person) => person.id == selectedPersonId
    );

    if (selectedPerson) {
      setEditableData({
        ...editableData,
        reported_to: selectedPerson.name, // Store the name
        reported_to_id: selectedPerson.id, // Store the ID
      });
    }
  };

  const handleSave = () => {
    const { reported_to, reported_to_id, ...restData } = editableData;
    
    onSave({
      ...restData,
      reported_to: reported_to,
      reported_to_id: reported_to_id,
    });
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {/* Phone Field */}
      <label>
        Phone:
        <input
          type="text"
          name="phone"
          value={editableData.phone}
          onChange={handleInputChange}
          className="input"
        />
      </label>

      {/* SFIA Level Dropdown */}
      <label>
        SFIA Level:
        <select
          name="sfia_level"
          value={editableData.sfia_level}
          onChange={handleInputChange}
          className="input"
        >
          <option value="">Select SFIA Level</option>
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
          name="reported_to"
          value={editableData.reported_to_id} // Use the ID as the value
          onChange={handleReportedToChange} // Handle selection by ID
          className="input"
        >
          <option value="">Select Person</option>
          {reportedToOptions.map((person) => (
            <option key={person.id} value={person.id}>
              {person.name}
            </option>
          ))}
        </select>
      </label>

      {/* Save Button */}
      <Button
        onClick={handleSave}
        className="btn btn-primary mt-4 flex w-[100px] items-center justify-center"
      >
        Save
      </Button>
    </div>
  );
};

export default EditGeneralInfo;
