import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  Sparkles,
  Link as LinkIcon,
  Trash2,
  Check,
  Camera,
  Image as ImageIcon,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { presetAvatars } from '../../data/avatarsData';
import { UserAvatar } from '../common/UserAvatar';

export const AvatarPickerModal = ({
  isOpen,
  onClose,
  currentAvatar,
  userName,
  targetRole,
  onSaveAvatar
}) => {
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar || '');
  const [activeTab, setActiveTab] = useState('presets'); // 'presets' | 'upload' | 'url'
  const [urlInput, setUrlInput] = useState('');
  const [urlPreviewError, setUrlPreviewError] = useState(false);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  // Process file upload client-side via HTML5 Canvas (auto-resizes to 256x256 & compresses to base64)
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }

    // Validate size (< 5MB initial)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size should be under 5MB.');
      return;
    }

    setUploadError('');
    setIsProcessingFile(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_DIM = 256;
        let width = img.width;
        let height = img.height;

        // Crop / scale to square
        const minDim = Math.min(width, height);
        const startX = (width - minDim) / 2;
        const startY = (height - minDim) / 2;

        canvas.width = MAX_DIM;
        canvas.height = MAX_DIM;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, startX, startY, minDim, minDim, 0, 0, MAX_DIM, MAX_DIM);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
          setSelectedAvatar(compressedDataUrl);
        }
        setIsProcessingFile(false);
      };
      img.onerror = () => {
        setUploadError('Could not process the selected image file.');
        setIsProcessingFile(false);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) return;
    setUrlPreviewError(false);
    setSelectedAvatar(urlInput.trim());
  };

  const handleSave = () => {
    onSaveAvatar(selectedAvatar);
    onClose();
  };

  const handleRemoveAvatar = () => {
    setSelectedAvatar('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-950 border border-indigo-800/60 flex items-center justify-center text-indigo-400">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Candidate Profile Picture</h2>
              <p className="text-xs text-slate-400">Choose a developer avatar preset, upload a photo, or provide a URL</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* Live Preview Strip */}
          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <UserAvatar
                avatar={selectedAvatar}
                name={userName}
                size="lg"
                showStatus={true}
              />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                  Live Preview
                </span>
                <p className="text-sm font-black text-white">{userName || 'Hardik'}</p>
                <p className="text-xs text-indigo-400 font-semibold">{targetRole || 'Full Stack Engineer'}</p>
              </div>
            </div>

            {selectedAvatar && (
              <button
                type="button"
                onClick={handleRemoveAvatar}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-rose-950/80 border border-slate-800 hover:border-rose-800/50 text-slate-400 hover:text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
                title="Reset to default monogram"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove Picture</span>
              </button>
            )}
          </div>

          {/* Navigation Tabs */}
          <div className="flex p-1 rounded-2xl bg-slate-950 border border-slate-800 gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('presets')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'presets'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Preset Avatars</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'upload'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Photo</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('url')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'url'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Image URL</span>
            </button>
          </div>

          {/* TAB 1: PRESETS */}
          {activeTab === 'presets' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400 font-medium">
                Select a high-resolution software developer avatar:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {presetAvatars.map((preset) => {
                  const isSelected = selectedAvatar === preset.url;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setSelectedAvatar(preset.url)}
                      className={`p-3 rounded-2xl border text-center flex flex-col items-center gap-2 transition-all relative group cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-950/60 border-indigo-500 shadow-md shadow-indigo-600/20 ring-1 ring-indigo-400/40'
                          : 'bg-slate-950 hover:bg-slate-850 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                      )}

                      <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-inner border border-white/10 group-hover:scale-105 transition-transform">
                        <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                      </div>

                      <div className="w-full min-w-0">
                        <span className="text-[11px] font-bold text-white block truncate">
                          {preset.name}
                        </span>
                        <span className="text-[9px] text-slate-500 block truncate">
                          {preset.category}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: UPLOAD PHOTO */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                onChange={handleFileChange}
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-700 hover:border-indigo-500/80 rounded-3xl p-8 text-center bg-slate-950/60 hover:bg-slate-950 cursor-pointer transition-all space-y-3 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-indigo-950/80 border border-indigo-800/60 flex items-center justify-center text-indigo-400 mx-auto group-hover:scale-110 transition-transform">
                  <Upload className="w-7 h-7" />
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-200 group-hover:text-white">
                    Click to browse or drop an image file
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Supports JPG, PNG, WEBP. Automatically auto-crops & optimizes client-side.
                  </p>
                </div>
              </div>

              {isProcessingFile && (
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center gap-2 text-xs text-indigo-400">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing and optimizing image...</span>
                </div>
              )}

              {uploadError && (
                <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-semibold text-center">
                  {uploadError}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: IMAGE URL */}
          {activeTab === 'url' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">Direct Image URL</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <LinkIcon className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      placeholder="https://avatars.githubusercontent.com/... or https://images.unsplash.com/..."
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyUrl}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                  >
                    Load
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
                Tip: You can use your GitHub avatar URL directly by copying your profile picture address.
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-950/50 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Apply Avatar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarPickerModal;
