import { NavLink, useParams } from 'react-router-dom';
import { gradeColors } from '../../data/mockData';
import { useLocations } from '../../context/LocationContext';

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-burgundy-900 to-burgundy-700 flex items-center justify-center shadow-lg">
        <svg className="w-6 h-6 text-cream-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      </div>
      <div>
        <h1 className="font-display text-xl font-bold text-charcoal-900">DinerVibe</h1>
        <p className="text-xs text-charcoal-500 -mt-0.5">Review Analytics</p>
      </div>
    </div>
  );
}

function LocationItem({ location, isActive }) {
  const gradeStyle = location.overallGrade ? gradeColors[location.overallGrade] : null;

  return (
    <NavLink
      to={`/dashboard/location/${location.id}`}
      className={({ isActive: navActive }) =>
        `group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
          navActive || isActive
            ? 'bg-burgundy-900/10 text-burgundy-900'
            : 'text-charcoal-700 hover:bg-charcoal-100 hover:text-charcoal-900'
        }`
      }
    >
      {gradeStyle ? (
        <div
          className={`grade-badge grade-badge-sm ${gradeStyle.bg} ${gradeStyle.text} shadow-sm`}
        >
          {location.overallGrade}
        </div>
      ) : (
        <div className="w-10 h-10 rounded-lg bg-charcoal-200 flex items-center justify-center text-charcoal-500 text-xs font-medium">
          NEW
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{location.name}</p>
        <p className="text-xs text-charcoal-500 truncate">{location.cuisine}</p>
      </div>
      <svg
        className="w-4 h-4 text-charcoal-400 opacity-0 group-hover:opacity-100 transition-opacity"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </NavLink>
  );
}

export default function Sidebar({ isOpen, onClose }) {
  const { locationId } = useParams();

  return (
    <>
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-cream-100 border-r border-cream-400 transform transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent locationId={locationId} onClose={onClose} isMobile />
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-cream-100 border-r border-cream-400 px-6 pb-4">
          <SidebarContent locationId={locationId} />
        </div>
      </div>
    </>
  );
}

function SidebarContent({ locationId, onClose, isMobile }) {
  const { locations, openAddModal } = useLocations();

  return (
    <div className="flex h-full flex-col px-6 pb-4">
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-cream-300">
        <Logo />
        {isMobile && (
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-charcoal-500 hover:text-charcoal-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col mt-6">
        {/* Overview link */}
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 mb-2 ${
              isActive
                ? 'bg-burgundy-900 text-cream-50 shadow-md'
                : 'text-charcoal-700 hover:bg-charcoal-100 hover:text-charcoal-900'
            }`
          }
          onClick={isMobile ? onClose : undefined}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span className="font-medium">Overview</span>
        </NavLink>

        {/* Locations section */}
        <div className="mt-4">
          <h3 className="px-3 text-xs font-semibold text-charcoal-500 uppercase tracking-wider mb-3">
            Locations ({locations.length})
          </h3>
          <div className="space-y-1 max-h-[calc(100vh-400px)] overflow-y-auto scrollbar-hide">
            {locations.map((location) => (
              <div key={location.id} onClick={isMobile ? onClose : undefined}>
                <LocationItem
                  location={location}
                  isActive={location.id === locationId}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Add location button */}
        <div className="mt-6">
          <button
            onClick={openAddModal}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border-2 border-dashed border-charcoal-300 text-charcoal-500 hover:border-burgundy-900 hover:text-burgundy-900 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-sm font-medium">Add Location</span>
          </button>
        </div>

        {/* Bottom section */}
        <div className="mt-auto pt-6 border-t border-cream-300">
          <NavLink
            to="/dashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-charcoal-600 hover:bg-charcoal-100 hover:text-charcoal-900 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-medium">Settings</span>
          </NavLink>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-charcoal-600 hover:bg-charcoal-100 hover:text-charcoal-900 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">Help & Support</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
