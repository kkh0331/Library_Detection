import React  from 'react';
import './Header.css';

const Header = () => {
    return (
        <div className='top_nav'>
            <nav class="navbar bg-body-tertiary">
                <div class="container-fluid">
                    {/* <img src="./logo3.png"></img> */}
                    <p className='text-nav'>
                        KHU college of engineering library
                    </p>
                </div>
            </nav>
        </div>
    );
};

export default Header;