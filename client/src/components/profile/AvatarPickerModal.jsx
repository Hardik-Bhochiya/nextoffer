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

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }

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
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg max-w-xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-[#30363d] flex items-center justify-between bg-[#161b22]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-[#0d1117] border border-[#30363d] flex items-center justify-center text-[#58a6ff]">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#e6edf3] tracking-tight">Candidate Profile Picture</h2>
              <p className="text-xs text-[#8b949e]">Choose a preset avatar, upload a file, or provide an image URL</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md hover:bg-[#21262d] text-[#8b949e] hover:text-[#e6edf3] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-5 overflow-y-auto flex-1">
          
          {/* Live Preview Strip */}
          <div className="p-3.5 rounded-md bg-[#0d1117] border border-[#30363d] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <UserAvatar
                avatar={selectedAvatar}
                name={userName}
                size="md"
                showStatus={true}
              />
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#8b949e] tracking-wider block">
                  Preview
                </span>
                <p className="text-xs font-bold text-[#e6edf3]">{userName || 'Developer'}</p>
                <p className="text-[11px] text-[#58a6ff]">{targetRole || 'Software Engineer'}</p>
              </div>
            </div>

            {selectedAvatar && (
              <button
                type="button"
                onClick={handleRemoveAvatar}
                className="px-2.5 py-1 rounded-md bg-[#21262d] hover:bg-[#da3633]/20 border border-[#30363d] text-[#8b949e] hover:text-[#f85149] text-xs font-medium flex items-center gap-1.5 transition-all"
                title="Reset to default monogram"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove Picture</span>
              </button>
            )}
          </div>

          {/* Navigation Tabs */}
          <div className="flex p-1 rounded-md bg-[#0d1117] border border-[#30363d] gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('presets')}
              className={`flex-1 py-1.5 px-3 rounded text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'presets'
                  ? 'bg-[#1f6feb] text-white shadow-sm'
                  : 'text-[#8b949e] hover:text-[#e6edf3]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Presets</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`flex-1 py-1.5 px-3 rounded text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'upload'
                  ? 'bg-[#1f6feb] text-white shadow-sm'
                  : 'text-[#8b949e] hover:text-[#e6edf3]'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Photo</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('url')}
              className={`flex-1 py-1.5 px-3 rounded text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'url'
                  ? 'bg-[#1f6feb] text-white shadow-sm'
                  : 'text-[#8b949e] hover:text-[#e6edf3]'
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Image URL</span>
            </button>
          </div>

          {/* TAB 1: PRESETS */}
          {activeTab === 'presets' && (
            <div className="space-y-3">
              <p className="text-xs text-[#8b949e]">
                Select a developer avatar preset:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {presetAvatars.map((preset) => {
                  const isSelected = selectedAvatar === preset.url;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setSelectedAvatar(preset.url)}
                      className={`p-2.5 rounded-md border text-center flex flex-col items-center gap-2 transition-all relative group cursor-pointer ${
                        isSelected
                          ? 'bg-[#0d1117] border-[#388bfd] ring-1 ring-[#388bfd]'
                          : 'bg-[#0d1117] hover:bg-[#21262d] border-[#30363d] text-[#8b949e] hover:text-[#e6edf3]'
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#1f6feb] text-white flex items-center justify-center shadow">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                      )}

                      <div className="w-10 h-10 rounded-md overflow-hidden border border-[#30363d]">
                        <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                      </div>

                      <div className="w-full min-w-0">
                        <span className="text-[11px] font-semibold text-[#e6edf3] block truncate">
                          {preset.name}
                        </span>
                        <span className="text-[9px] text-[#8b949e] block truncate">
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
                className="border-2 border-dashed border-[#30363d] hover:border-[#58a6ff] rounded-lg p-6 text-center bg-[#0d1117] cursor-pointer transition-all space-y-2 group"
              >
                <div className="w-10 h-10 rounded-md bg-[#161b22] border border-[#30363d] flex items-center justify-center text-[#58a6ff] mx-auto">
                  <Upload className="w-5 h-5" />
                </div>

                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-[#e6edf3] group-hover:text-[#58a6ff]">
                    Click to browse or drop an image file
                  </p>
                  <p className="text-[11px] text-[#8b949e]">
                    JPG, PNG, WEBP up to 5MB. Auto-cropped & optimized locally.
                  </p>
                </div>
              </div>

              {isProcessingFile && (
                <div className="p-2.5 rounded-md bg-[#0d1117] border border-[#30363d] flex items-center justify-center gap-2 text-xs text-[#58a6ff]">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Optimizing image...</span>
                </div>
              )}

              {uploadError && (
                <div className="p-2.5 rounded-md bg-[#da3633]/15 border border-[#da3633]/40 text-[#f85149] text-xs font-medium text-center">
                  {uploadError}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: IMAGE URL */}
          {activeTab === 'url' && (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-[#c9d1d9]">Direct Image URL</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <LinkIcon className="w-4 h-4 text-[#8b949e] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      placeholder="https://avatars.githubusercontent.com/..."
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      className="w-full bg-[#0d1117] border border-[#30363d] rounded-md pl-9 pr-3 py-1.5 text-xs text-[#e6edf3] placeholder-[#8b949e] focus:outline-none focus:border-[#58a6ff]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyUrl}
                    className="px-3 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] text-xs font-medium transition-colors"
                  >
                    Load
                  </button>
                </div>
              </div>

              <div className="p-2.5 rounded-md bg-[#0d1117] border border-[#30363d] text-[11px] text-[#8b949e]">
                Tip: You can use your GitHub avatar URL directly by copying your profile picture address.
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-[#30363d] bg-[#161b22] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] text-xs font-medium transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-medium shadow-sm flex items-center gap-1.5 transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Apply Avatar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarPickerModal;
