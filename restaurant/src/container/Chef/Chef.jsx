import React from 'react';
import { SubHeading } from '../../components';
import { images } from '../../constants';

import './Chef.css';

const Chef = () => (
  <div className='app__bg app__wrapper section__padding'>
    <div className='app__wrapper_img app__wrapper_img-reverse'>
      <img src={images.chef} alt="chef "/>
    </div>

    <div className='app__wrapper_info'>
      <SubHeading title=" Chef's Word"/>
      <h1 className='headtext__cormorant'> What we believe in </h1>

      <div className='app__chef-content'>
        <div className='app__chef-content_quote'> 
          <img src={images.quote} alt="quote"/>
          <p className='p__opensans'>Lorem ipsum Dolor Sit Amet,Consectetur Adipiscing Elit Auctor Sitt</p>
        </div>
        <p className='p__opensans '>Fugiat dolore eiusmod aliquip sunt ea nisi. Nisi officia qui excepteur quis consectetur deserunt consequat est amet anim ea deserunt tempor. Et adipisicing amet ea Lorem adipisicing elit consectetur pariatur eu ut consequat. Duis occaecat velit ut commodo mollit laborum ex esse ut eiusmod dolore nulla dolore labore. Incididunt officia occaecat ut sunt sunt laborum eu elit nostrud. Quis excepteur ut ut velit tempor nulla non aliquip excepteur esse deserunt qui do sunt. Sint cillum eu irure veniam nulla do cillum et laborum sint amet consequat.</p>
      </div>

      <div className='app__chef-sign'>
        <p>Kevin Luo</p>
        <p className='p__opensans'> Chef & Founder</p>
        <img src={images.sign} alt="sign"/>
      </div>
    </div>
  </div>
);

export default Chef;
