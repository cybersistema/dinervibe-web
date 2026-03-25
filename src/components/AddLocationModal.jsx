import { useState } from 'react';
import Modal from './ui/Modal';
import LoadingSpinner from './ui/LoadingSpinner';

const CUISINE_OPTIONS = [
  'American',
  'Italian',
  'French',
  'Japanese',
  'Chinese',
  'Mexican',
  'Indian',
  'Thai',
  'Mediterranean',
  'Pan-Asian Fusion',
  'Seafood',
  'Steakhouse',
  'Wine Bar',
  'Bistro',
  'Gastropub',
  'Other',
];

function FormField({ label, error, required, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-charcoal-700 mb-1.5">
        {label}
        {required && <span className="text-burgundy-900 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-sm text-burgundy-900 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

export default function AddLocationModal({ isOpen, onClose, onAdd }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    cuisine: '',
    googleUrl: '',
    yelpUrl: '',
    opentableUrl: '',
  });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Restaurant name is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.cuisine) {
      newErrors.cuisine = 'Please select a cuisine type';
    }

    // URL validation
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;

    if (formData.googleUrl && !urlPattern.test(formData.googleUrl)) {
      newErrors.googleUrl = 'Please enter a valid URL';
    }

    if (formData.yelpUrl && !urlPattern.test(formData.yelpUrl)) {
      newErrors.yelpUrl = 'Please enter a valid URL';
    }

    if (formData.opentableUrl && !urlPattern.test(formData.opentableUrl)) {
      newErrors.opentableUrl = 'Please enter a valid URL';
    }

    // At least one review platform URL required
    if (!formData.googleUrl && !formData.yelpUrl && !formData.opentableUrl) {
      newErrors.platforms = 'Please provide at least one review platform URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Create new location object
    const newLocation = {
      id: `loc-${Date.now()}`,
      name: formData.name.trim(),
      address: formData.address.trim(),
      cuisine: formData.cuisine,
      googleUrl: formData.googleUrl || null,
      yelpUrl: formData.yelpUrl || null,
      opentableUrl: formData.opentableUrl || null,
      active: true,
      createdAt: new Date().toISOString().split('T')[0],
      lastAnalyzed: null,
      overallGrade: null,
      totalReviews: 0,
      sentiment: { positive: 0, neutral: 0, negative: 0 },
      categoryScores: { food: 0, service: 0, atmosphere: 0, value: 0 },
      recentActivity: 'New location',
    };

    onAdd(newLocation);
    setIsSubmitting(false);

    // Reset form
    setFormData({
      name: '',
      address: '',
      cuisine: '',
      googleUrl: '',
      yelpUrl: '',
      opentableUrl: '',
    });
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        name: '',
        address: '',
        cuisine: '',
        googleUrl: '',
        yelpUrl: '',
        opentableUrl: '',
      });
      setErrors({});
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Location" size="lg">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Basic Info */}
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField label="Restaurant Name" required error={errors.name}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., The Golden Fork"
              className={`input ${errors.name ? 'border-burgundy-900 focus:border-burgundy-900 focus:ring-burgundy-900/20' : ''}`}
            />
          </FormField>

          <FormField label="Cuisine Type" required error={errors.cuisine}>
            <select
              name="cuisine"
              value={formData.cuisine}
              onChange={handleChange}
              className={`select ${errors.cuisine ? 'border-burgundy-900 focus:border-burgundy-900 focus:ring-burgundy-900/20' : ''}`}
            >
              <option value="">Select cuisine...</option>
              {CUISINE_OPTIONS.map((cuisine) => (
                <option key={cuisine} value={cuisine}>
                  {cuisine}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        <FormField label="Address" required error={errors.address}>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="e.g., 123 Main St, Portland, OR 97201"
            className={`input ${errors.address ? 'border-burgundy-900 focus:border-burgundy-900 focus:ring-burgundy-900/20' : ''}`}
          />
        </FormField>

        {/* Review Platform URLs */}
        <div className="pt-4 border-t border-cream-300">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="font-medium text-charcoal-900">Review Platform URLs</h3>
            <span className="text-xs text-charcoal-500 bg-charcoal-100 px-2 py-0.5 rounded">
              At least one required
            </span>
          </div>

          {errors.platforms && (
            <p className="mb-4 text-sm text-burgundy-900 flex items-center gap-1 bg-burgundy-900/5 px-3 py-2 rounded-lg">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.platforms}
            </p>
          )}

          <div className="space-y-4">
            <FormField label="Google Maps URL" error={errors.googleUrl}>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </span>
                <input
                  type="text"
                  name="googleUrl"
                  value={formData.googleUrl}
                  onChange={handleChange}
                  placeholder="https://maps.google.com/..."
                  className={`input pl-10 ${errors.googleUrl ? 'border-burgundy-900' : ''}`}
                />
              </div>
            </FormField>

            <FormField label="Yelp URL" error={errors.yelpUrl}>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.16 12.594l-4.995 1.433c-.96.276-1.74-.8-1.176-1.63l2.986-4.38c.514-.753 1.637-.544 1.873.35l.746 2.816c.162.612-.047 1.16-.434 1.41zm-7.127-2.27l4.52-2.867c.847-.537.69-1.727-.26-1.988l-2.845-.78c-.616-.17-1.2.08-1.463.544l-1.845 3.25c-.627 1.104.525 2.2 1.893 1.84zm-1.114 2.343l-4.472 2.94c-.84.553-.69 1.74.248 2.006l2.83.8c.61.173 1.19-.068 1.462-.52l1.91-3.172c.65-1.082-.484-2.22-1.978-2.054zm-2.355 8.063l-.57-5.122c-.11-.977-1.32-1.318-1.834-.518l-2.72 4.238c-.47.732.02 1.69.87 1.792l2.68.32c.55.068 1.07-.21 1.32-.654l.254-.057zM9.23 3.49l.58 5.12c.115.973 1.33 1.305 1.84.503l2.7-4.25c.465-.733-.03-1.683-.882-1.78l-2.67-.307c-.55-.063-1.07.218-1.316.663l-.252.051z" />
                  </svg>
                </span>
                <input
                  type="text"
                  name="yelpUrl"
                  value={formData.yelpUrl}
                  onChange={handleChange}
                  placeholder="https://yelp.com/biz/..."
                  className={`input pl-10 ${errors.yelpUrl ? 'border-burgundy-900' : ''}`}
                />
              </div>
            </FormField>

            <FormField label="OpenTable URL" error={errors.opentableUrl}>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                  </svg>
                </span>
                <input
                  type="text"
                  name="opentableUrl"
                  value={formData.opentableUrl}
                  onChange={handleChange}
                  placeholder="https://opentable.com/r/..."
                  className={`input pl-10 ${errors.opentableUrl ? 'border-burgundy-900' : ''}`}
                />
              </div>
            </FormField>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-cream-300">
          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary min-w-[140px]"
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner size="sm" />
                Adding...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Add Location
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
