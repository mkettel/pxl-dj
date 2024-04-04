import { motion, AnimatePresence } from "framer-motion";
import PlayerContext from './PlayerContext';
import { useContext, useState } from 'react';


export default function Rsvp() { 

    const { isModalOpen, toggleModal, setIsModalOpen } = useContext(PlayerContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [buddies, setBuddies] = useState('');
    const [songRequest, setSongRequest] = useState('');

    const modalVariants = {
        visible: {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            transition: { // spring
                type: 'spring',
                stiffness: 160,
                damping: 20,
                mass: 1.2,
            }
        },
        hidden: {
            opacity: 0,
            scale: 1,
            x: -2000,
            y: 0,
            transition: { // spring
                type: 'spring',
                stiffness: 160,
                damping: 20,
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://formspree.io/f/xjvnaqjo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    buddies,
                    songRequest
                })
            });

            if (response.ok) {
                console.log('Form submitted successfully');
                // Reset form fields
                setFirstName('');
                setLastName('');
                setBuddies('');
                setSongRequest('');
            } else {
                console.error('Form submission failed');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
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
                        <div className="title">
                            <h1>RSVP</h1>
                        </div>
                        <div className="field-container">
                            <div className="modal-field">
                                <div className="marker">
                                    <p>First Name</p>
                                </div>
                                <div className="input">
                                    <input type="text" placeholder="Renni" value={firstName} onChange={(e) => setFirstName(e.target.value)}  />
                                </div>
                            </div>
                            <div className="modal-field">
                                <div className="marker">
                                    <p>Last Name</p>
                                </div>
                                <div className="input">
                                    <input type="text" placeholder="Meehow" value={lastName} onChange={(e) => setLastName(e.target.value)}  />
                                </div>
                            </div>
                            <div className="modal-field">
                                <div className="marker">
                                    <p>Buddies</p>
                                </div>
                                <div className="input">
                                    <input type="number" placeholder="1" value={buddies} onChange={(e) => setBuddies(e.target.value)} />
                                </div>
                            </div>
                            <div className="modal-field">
                                <div className="marker">
                                    <p>Song Request</p>
                                </div>
                                <div className="input">
                                    <input type="text" placeholder="Dabeull" value={songRequest} onChange={(e) => setSongRequest(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="submit">
                            <p className="submit-text" onClick={handleSubmit} >Submit</p>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        
        </>
    )
}