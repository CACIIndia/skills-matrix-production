import React, { useState } from "react";
import Button from "@/components/common/Button";

type GeneralInfo = {
  phone: string;
  sfia_level: string;
  reported_to: string; // Name of the person reported to
  reportedToId: string; // ID of the person reported to
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditableData({
      ...editableData,
      [name]: value,
    });
  };

  const handleSave = () => {

    console.log(editableData,"editableData")
    // Send both reported_to (name) and reportedToId (ID) to the parent
    const { reported_to, reportedToId, ...restData } = editableData;
    onSave({
      ...restData,
      reported_to: reported_to,
      reportedToId: reportedToId,
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
          value={editableData.reported_to}
          onChange={handleInputChange}
          className="input"
        >
          <option value="">Select Person</option>
          {reportedToOptions.map((person) => (
            <option key={person.id} value={person.name}>
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
