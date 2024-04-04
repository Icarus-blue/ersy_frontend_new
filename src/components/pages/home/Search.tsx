import { IconSearch } from '@tabler/icons-react'
import React from 'react'

type Props = {}

function Search({ }: Props) {
    return (
        <div className='trending__selected mb-30 d-flex align-items-center justify-content-center justify-content-lg-between'>
            <div className='select__lefts d-flex align-items-center'>
                <form className="d-flex align-items-center justify-content-between"
                >
                    <input type="text" name="query" placeholder="Search..." />
                    <button type="submit" aria-label="submit button">
                        <IconSearch />
                    </button>
                </form>
            </div>
        </div >
    )
}

export default Search