import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { 
  UserCircleIcon, 
  Cog6ToothIcon, 
  ArrowLeftOnRectangleIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export default function UserMenu() {
  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex items-center gap-1 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
        <UserCircleIcon className="h-6 w-6" />
        <ChevronDownIcon className="h-4 w-4" />
      </MenuButton>

      <MenuItems
        className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:ring-gray-700"
      >
        <div className="px-1 py-1">
          <MenuItem>
            {({ active }) => (
              <Link
                to="/profile"
                className={`${
                  active ? 'bg-gray-100 dark:bg-gray-700' : ''
                } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-gray-700 dark:text-gray-200`}
              >
                <UserCircleIcon className="h-4 w-4" />
                Profile
              </Link>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <Link
                to="/settings"
                className={`${
                  active ? 'bg-gray-100 dark:bg-gray-700' : ''
                } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-gray-700 dark:text-gray-200`}
              >
                <Cog6ToothIcon className="h-4 w-4" />
                Settings
              </Link>
            )}
          </MenuItem>
        </div>
        <div className="px-1 py-1">
          <MenuItem>
            {({ active }) => (
              <button
                onClick={() => {
                  // Handle sign out
                  console.log('Sign out');
                }}
                className={`${
                  active ? 'bg-gray-100 dark:bg-gray-700' : ''
                } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm text-red-600 dark:text-red-400`}
              >
                <ArrowLeftOnRectangleIcon className="h-4 w-4" />
                Sign out
              </button>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
