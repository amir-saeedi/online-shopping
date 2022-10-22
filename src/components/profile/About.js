import React from 'react'
import { Link } from 'react-router-dom';
import aboutImg from "../../thumbnail.png";

const About = () => {
    return (
        <div style={{ position: "relative", width: "100%" ,height:"100%" }}>
            <div
                className='main-about'
                style={{ background: `url(${aboutImg}) no-repeat fixed center` }}
            >
            </div>
            <div className='text-about'>
                <h3>Created by Amir Saeedi</h3>
                <button className='btn'><a href="mailto:saeedimair1381@gmail.com">saeedimair1381@gmail.com</a></button>
            </div>
        </div>
    )
}

export default About
