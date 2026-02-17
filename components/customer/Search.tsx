import React from 'react'
import { FiSearch, FiX } from 'react-icons/fi'

const Search = ({setSearchOpen}: {setSearchOpen: (o: boolean) => void}) => {
  return (
    <>
    <div onClick={() => setSearchOpen(false)} className='h-screen fixed inset-0 bg-black/30 w-full' />
        <div className='fixed inset-0'>
        <div className='bg-white flex justify-center items-center gap-4 py-3'>
        <div className='flex items-center justify-between px-4 max-w-xl mx-auto w-full bg-white border border-main'>
            <input className='w-full py-2 pr-3 outline-none ' placeholder='search..' type='text' />
            <FiSearch className='' />
        </div>
        <FiX onClick={() => setSearchOpen(false)} />
        </div>
        </div>
    </>
  )
}

export default Search
