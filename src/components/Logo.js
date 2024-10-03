import React from 'react';
import Image from 'react-bootstrap/Image';

const Logo = () => {
    return (
        <div>
            <Image src='Logo.svg' rounded alt='LOGO' fluid width={150} className='image' style={{background:"white"}}></Image>
        </div>
    );
}

export default Logo;
