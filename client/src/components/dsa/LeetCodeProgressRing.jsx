import React from 'react';

/**
 * LeetCode-Style Circular Progress Ring Component
 * Standard LeetCode color scheme:
 * Easy:   #00b8a3 (Teal Green)
 * Medium: #ffc01e (Amber Yellow)
 * Hard:   #ef4743 (Bright Red)
 */
export const LeetCodeProgressRing = ({
  easySolved = 0,
  easyTotal = 0,
  mediumSolved = 0,
  mediumTotal = 0,
  hardSolved = 0,
  hardTotal = 0,
  totalSolved = 0,
  totalQuestions = 0,
  size = 140,
  strokeWidth = 9,
  className = ''
}) => {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  const effTotal = totalQuestions > 0 ? totalQuestions : Math.max(1, easyTotal + mediumTotal + hardTotal);
  const effSolved = totalSolved > 0 ? totalSolved : (easySolved + mediumSolved + hardSolved);

  // Calculate arc lengths for segmented doughnut
  const easyRatio = effTotal > 0 ? easySolved / effTotal : 0;
  const mediumRatio = effTotal > 0 ? mediumSolved / effTotal : 0;
  const hardRatio = effTotal > 0 ? hardSolved / effTotal : 0;

  const easyStroke = Math.max(0, easyRatio * circumference);
  const mediumStroke = Math.max(0, mediumRatio * circumference);
  const hardStroke = Math.max(0, hardRatio * circumference);

  const easyOffset = 0;
  const mediumOffset = -easyStroke;
  const hardOffset = -(easyStroke + mediumStroke);

  return (
    <div className={`flex flex-col sm:flex-row items-center gap-6 ${className}`}>
      {/* 1. Multi-Segmented LeetCode Circular SVG Ring */}
      <div className="relative shrink-0 flex items-center justify-center" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
        >
          {/* Background Track Circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="#21262d"
            strokeWidth={strokeWidth}
          />

          {/* Easy Arc (Teal #00b8a3) */}
          {easyStroke > 0 && (
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke="#00b8a3"
              strokeWidth={strokeWidth}
              strokeDasharray={`${easyStroke} ${circumference}`}
              strokeDashoffset={easyOffset}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
          )}

          {/* Medium Arc (Amber #ffc01e) */}
          {mediumStroke > 0 && (
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke="#ffc01e"
              strokeWidth={strokeWidth}
              strokeDasharray={`${mediumStroke} ${circumference}`}
              strokeDashoffset={mediumOffset}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
          )}

          {/* Hard Arc (Red #ef4743) */}
          {hardStroke > 0 && (
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke="#ef4743"
              strokeWidth={strokeWidth}
              strokeDasharray={`${hardStroke} ${circumference}`}
              strokeDashoffset={hardOffset}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
          )}
        </svg>

        {/* Center Label (Solved Count / Total) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-2xl font-bold font-mono text-[#f0f6fc] leading-none">
            {effSolved}
          </span>
          <span className="text-[10px] text-[#8b949e] uppercase font-semibold tracking-wider mt-1">
            Solved
          </span>
          <span className="text-[9px] text-[#6e7681] font-mono">
            / {effTotal} total
          </span>
        </div>
      </div>

      {/* 2. Difficulty Breakdown Bars (LeetCode Colors) */}
      <div className="flex-1 w-full space-y-2.5">
        {/* Easy Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#00b8a3] font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00b8a3]" /> Easy
            </span>
            <span className="text-[#c9d1d9] font-mono text-[11px]">
              <strong className="text-[#f0f6fc]">{easySolved}</strong>
              <span className="text-[#8b949e]">/{easyTotal || easySolved}</span>
            </span>
          </div>
          <div className="w-full bg-[#21262d] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#00b8a3] h-full rounded-full transition-all duration-500"
              style={{ width: `${easyTotal > 0 ? Math.min(100, Math.round((easySolved / easyTotal) * 100)) : (easySolved > 0 ? 100 : 0)}%` }}
            />
          </div>
        </div>

        {/* Medium Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#ffc01e] font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#ffc01e]" /> Medium
            </span>
            <span className="text-[#c9d1d9] font-mono text-[11px]">
              <strong className="text-[#f0f6fc]">{mediumSolved}</strong>
              <span className="text-[#8b949e]">/{mediumTotal || mediumSolved}</span>
            </span>
          </div>
          <div className="w-full bg-[#21262d] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#ffc01e] h-full rounded-full transition-all duration-500"
              style={{ width: `${mediumTotal > 0 ? Math.min(100, Math.round((mediumSolved / mediumTotal) * 100)) : (mediumSolved > 0 ? 100 : 0)}%` }}
            />
          </div>
        </div>

        {/* Hard Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#ef4743] font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#ef4743]" /> Hard
            </span>
            <span className="text-[#c9d1d9] font-mono text-[11px]">
              <strong className="text-[#f0f6fc]">{hardSolved}</strong>
              <span className="text-[#8b949e]">/{hardTotal || hardSolved}</span>
            </span>
          </div>
          <div className="w-full bg-[#21262d] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#ef4743] h-full rounded-full transition-all duration-500"
              style={{ width: `${hardTotal > 0 ? Math.min(100, Math.round((hardSolved / hardTotal) * 100)) : (hardSolved > 0 ? 100 : 0)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
