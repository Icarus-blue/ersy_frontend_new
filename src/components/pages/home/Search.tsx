import { IconSearch } from '@tabler/icons-react'
import React from 'react'

type Props = {}

function Search({ }: Props) {
    return (
        <div className='w-100 d-flex justify-content-center'>
            <div className='d-flex justify-content-center align-items-center w-50 searchareasty'>
                <IconSearch size={30} />
                <input className='w-100 p-3  text-dark rounded-left searchinpsty' placeholder='Search ...' />
                <button className='btnsty'>Find</button>
            </div>
        </div>
    )
}

export default Search