import React from 'react';
import Image from 'react-bootstrap/Image';

const Logo = () => {
    return (
        <div>
            <Image src='Logo.jpg' rounded alt='LOGO' fluid width={150} className='image'></Image>
        </div>
    );
}

export default Logo;
