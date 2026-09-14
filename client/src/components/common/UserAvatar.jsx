import React, { useState } from 'react';
import { Camera, User } from 'lucide-react';

const sizeMap = {
  xs: 'w-6 h-6 text-[10px] rounded-lg',
  sm: 'w-8 h-8 text-xs rounded-xl',
  md: 'w-10 h-10 text-sm rounded-xl',
  lg: 'w-14 h-14 text-base rounded-2xl',
  xl: 'w-20 h-20 text-2xl rounded-3xl',
  '2xl': 'w-24 h-24 text-3xl rounded-3xl'
};

const iconSizes = {
  xs: 'w-3 h-3',
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
  xl: 'w-6 h-6',
  '2xl': 'w-7 h-7'
};

export const UserAvatar = ({
  user,
  name,
  avatar,
  size = 'md',
  showStatus = false,
  editable = false,
  onEditClick,
  className = ''
}) => {
  const [imgError, setImgError] = useState(false);

  const finalName = name || user?.name || user?.fullName || 'Candidate';
  const finalAvatar = avatar !== undefined ? avatar : (user?.avatar || '');
  const initial = finalName ? finalName.trim().charAt(0).toUpperCase() : 'C';

  const sizeClass = sizeMap[size] || sizeMap.md;
  const iconSizeClass = iconSizes[size] || iconSizes.md;

  const hasValidImage = Boolean(finalAvatar && !imgError);

  return (
    <div className={`relative inline-flex shrink-0 ${className}`}>
      <div
        className={`${sizeClass} bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-md shadow-indigo-600/20 overflow-hidden relative group`}
      >
        <div className="w-full h-full bg-slate-950 rounded-[inherit] overflow-hidden flex items-center justify-center relative">
          {hasValidImage ? (
            <img
              src={finalAvatar}
              alt={finalName}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover rounded-[inherit] transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <span className="font-black text-transparent bg-clip-text bg-gradient-to-tr from-indigo-300 via-cyan-200 to-white select-none">
              {initial}
            </span>
          )}

          {/* Optional Interactive Edit Overlay */}
          {editable && (
            <button
              type="button"
              onClick={onEditClick}
              className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer backdrop-blur-[2px]"
              title="Change Profile Picture"
            >
              <Camera className={`${iconSizeClass} text-white drop-shadow`} />
              {size === 'xl' || size === '2xl' ? (
                <span className="text-[10px] font-bold text-slate-200 mt-1">Change</span>
              ) : null}
            </button>
          )}
        </div>
      </div>

      {/* Online / Active Telemetry Status Ping */}
      {showStatus && (
        <span
          className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950 shadow flex items-center justify-center z-10"
          title="Active Candidate"
        >
          <span className="w-1 h-1 rounded-full bg-white animate-ping" />
        </span>
      )}
    </div>
  );
};

export default UserAvatar;
