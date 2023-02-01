import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../Styles/header.css'


const Header = () => {


    return (
        <div className='header'>
            <nav className='header_navbar'>
                <h4>User Authentication</h4>
                <div>
                    <AccountCircleIcon className='header_icon'>Tsdfgsdfg</AccountCircleIcon>
                </div>
            </nav>
        </div>
    )
}

export default Header