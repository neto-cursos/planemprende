import { Modal } from '@mui/material';
import React from 'react'
import OutsideAlerter from '../../utils/OutsideAlerter';

function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
}
const VideoModal = ({ videoDatos, isOpen, handleClose }) => {
    // const [isOpen, setIsOpen] = React.useState(true);

    const [windowSize, setWindowSize] = React.useState(getWindowSize());
    React.useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);
    return (
        <Modal
            open={isOpen}
            onClose={() => handleClose()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"

        >
            
                <div className='pl-0 md:pl-32 xl:pl-64 pt-16 text-center'>
                    <div className='text-whitish pl-0 md:pl-32 text-2xl cursor-pointer' onClick={handleClose}>X</div>
                    <iframe
                        id="video"
                        width={windowSize.innerWidth > 640 ? "640" : "230"}
                        height={windowSize.innerWidth > 640 ? "480" : "154"}
                        src={"https://www.youtube.com/embed/" + videoDatos}
                        frameBorder="0"
                        allow="accelerometer, autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="pl-2"
                    />
                
                </div>
            


        </Modal>
    )
}

export default VideoModal