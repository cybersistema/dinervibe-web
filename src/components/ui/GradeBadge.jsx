import { gradeColors } from '../../data/mockData';

export default function GradeBadge({ grade, size = 'md', className = '' }) {
  const gradeStyle = gradeColors[grade] || gradeColors['C'];

  const sizeClasses = {
    sm: 'w-10 h-10 text-lg',
    md: 'w-14 h-14 text-2xl',
    lg: 'w-20 h-20 text-4xl',
    xl: 'w-28 h-28 text-5xl',
  };

  return (
    <div
      className={`inline-flex items-center justify-center font-display font-bold rounded-xl shadow-lg ${gradeStyle.bg} ${gradeStyle.text} ${sizeClasses[size]} ${className}`}
      style={{
        boxShadow: `0 4px 14px -2px ${gradeStyle.hex}40`,
      }}
    >
      {grade}
    </div>
  );
}
