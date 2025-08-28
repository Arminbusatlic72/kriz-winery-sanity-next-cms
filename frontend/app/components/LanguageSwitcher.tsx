'use client'

import {Fragment, useState} from 'react'
import {Menu, MenuButton, MenuItem, MenuItems, Transition} from '@headlessui/react'

import BritishFlag from '@/app/components/language-icons/BritishFlag'
import CroatianFlag from '@/app/components/language-icons/CroatianFlag'

const LanguageSwitcher = () => {
  const [lang, setLang] = useState('en')
  console.log('Current language:', lang)

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="hover:text-primary-500 dark:hover:text-primary-400 flex items-center space-x-2">
        {lang === 'en' ? (
          <BritishFlag width={24} height={16} />
        ) : (
          <CroatianFlag width={24} height={16} />
        )}
        <span className="font-semibold">{lang.toUpperCase()}</span>
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="ring-opacity-5 absolute right-0 z-50 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white ring-1 shadow-lg ring-black focus:outline-none dark:bg-gray-800">
          <div className="p-1">
            <MenuItem>
              {({active}) => (
                <button
                  className={`${active ? 'bg-primary-600 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={() => setLang('en')}
                >
                  <BritishFlag width={24} height={16} />
                  <span className="ml-2">English</span>
                </button>
              )}
            </MenuItem>

            <MenuItem>
              {({active}) => (
                <button
                  className={`${active ? 'bg-primary-600 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={() => setLang('hr')}
                >
                  <CroatianFlag width={24} height={16} />
                  <span className="ml-2">Croatian</span>
                </button>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  )
}

export default LanguageSwitcher
