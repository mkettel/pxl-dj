import { motion, AnimatePresence } from "framer-motion";
import PlayerContext from './PlayerContext';
import { useContext } from 'react';


export default function Rsvp() { 

    const { isModalOpen, toggleModal, setIsModalOpen } = useContext(PlayerContext);

    const modalVariants = {
        visible: {
            opacity: 1,
            scale: 1,
            x: 0,
            y: -10,
            transition: { // spring
                type: 'spring',
                stiffness: 260,
                damping: 20,
                mass: 0.5,
            }
        },
        hidden: {
            opacity: 0,
            scale: 0,
            x: 0,
            y: 0,
            transition: { // spring
                type: 'spring',
                stiffness: 160,
                damping: 10,
                mass: 0.5,
            }
        }
    }

     // Function to close the modal if the backdrop is clicked
     const handleCloseModal = (e) => {
        // Prevent closing modal when clicking inside the modal content
        if (e.target.id === "backdrop") {
            setIsModalOpen(false);
        }
    };

    return (
        <>
            <AnimatePresence>
                <motion.div 
                    className="modal-container"
                    initial='hidden' 
                    animate={isModalOpen ? 'visible' : 'hidden'}
                    exit={{ opacity: 0 }}
                    variants={modalVariants} 
                    id="backdrop"
                    onClick={handleCloseModal}
                    style={{ borderRadius: isModalOpen ? "0px" : "25px" }} 
                >
                    <div className="modal-bucket">
                        <div className="modal-field">
                            <div className="marker">
                                <p>First Name</p>
                            </div>
                            <div className="input">
                                <input type="text" placeholder="John" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        
        </>
    )
}