import React from 'react';
import SubHeading from '../SubHeading/SubHeading';

import './Newsletter.css';

const Newsletter = () => (
  <div className='app__newsletter'>
    <div className='app__newsletter-heading'>
      <SubHeading title="Newsletter"/>
      <h1 className='headtext_cormorant'>Subscribe to Our Newsletter</h1>
      <p className='p__opensans '>And Never Miss Latest Updates!</p>
    </div>
    <div className='app__newsletter-input flex__center'>
      <input type="email" placeholder='Enter your e-mail adress' />
      <button className='custom__buttom'></button>
    </div>
  </div>
);

export default Newsletter;
