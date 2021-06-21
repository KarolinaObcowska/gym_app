import React from 'react'
import Showcase from '../viedo/showcase.mp4';

export const BackgroundVideo = () => {
    return (
        <div>
            <video autoPlay='autoplay' loop='loop' muted>
                <source src={Showcase} type='video/mp4'>
                </source>
            </video>
        </div>
    )
}

export default BackgroundVideo
