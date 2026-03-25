export default function EmptyState({
  icon,
  title,
  description,
  action,
  className = '',
}) {
  return (
    <div className={`text-center py-12 px-4 ${className}`}>
      {icon && (
        <div className="mx-auto w-16 h-16 rounded-2xl bg-burgundy-900/5 flex items-center justify-center text-burgundy-900 mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-display font-semibold text-charcoal-900">
        {title}
      </h3>
      {description && (
        <p className="mt-2 text-charcoal-500 max-w-sm mx-auto">
          {description}
        </p>
      )}
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
}
