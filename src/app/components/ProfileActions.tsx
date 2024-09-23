// components/ProfileActions.tsx

import { FC } from "react";

const ProfileActions: FC = () => {
  return (
    <div className="flex items-center lg:pb-4 gap-2.5">
      <button className="dropdown-toggle btn btn-sm btn-primary">
        <i className="ki-filled ki-users"></i> Connect
      </button>
      <button className="btn btn-sm btn-icon btn-light" style={{zIndex:-10}}>
        <i className="ki-filled ki-messages"></i>
      </button>
      <div className="dropdown" data-dropdown="true" data-dropdown-placement="bottom-end">
        <button style={{zIndex:-10}} className="dropdown-toggle btn btn-sm btn-icon btn-light">
          <i   className="ki-filled ki-dots-vertical"></i>
        </button>
        <div className="dropdown-content menu-default w-full max-w-[220px]">
          <div className="menu-item">
            <button className="menu-link">
              <span className="menu-icon"><i className="ki-filled ki-coffee"></i></span>
              <span className="menu-title">Share Profile</span>
            </button>
          </div>
          <div className="menu-item">
            <button className="menu-link">
              <span className="menu-icon"><i className="ki-filled ki-award"></i></span>
              <span className="menu-title">Give Award</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileActions;
