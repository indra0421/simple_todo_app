import React from 'react';


const Header = () => {
    const logo = '/photos/logo.jpg'
    return (
        <>
            <div className='header_main_div'>
                <div>
                    <img src={logo} alt="eror" className='header_main_div_logo' />
                </div>


            </div>
        </>
    )
}

export default Header;