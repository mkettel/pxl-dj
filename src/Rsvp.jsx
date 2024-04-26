import { motion, AnimatePresence } from "framer-motion";
import PlayerContext from './PlayerContext';
import { useContext, useState, useEffect } from 'react';


export default function Rsvp() { 

    const { isModalOpen, toggleModal, setIsModalOpen } = useContext(PlayerContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [buddies, setBuddies] = useState('');
    const [songRequest, setSongRequest] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState(null);

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
            opacity: 0.0,
            scale: 1,
            x: -1500,
            y: 0,
            transition: { // spring
                type: 'spring',
                stiffness: 100,
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
                setSubmissionStatus('success');
                // Reset form fields
                setFirstName('');
                setLastName('');
                setBuddies('');
                setSongRequest('');
            } else {
                console.error('Form submission failed');
                setSubmissionStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    // useEffect to update the submission status so that the alert can be displayed
    useEffect(() => {
        if (submissionStatus) {
            setTimeout(() => {
                setSubmissionStatus(null);
            }, 5000);
        }
    }, [submissionStatus]);      

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
                    layout
                >
                    <motion.div layout className="modal-bucket">
                        <div className="title">
                            <h1>RSVP</h1>
                        </div>
                        <div className="field-container">
                            <div className="modal-field">
                                <div className="marker">
                                    <p>First Name</p>
                                </div>
                                <div className="input">
                                    <input type="text" placeholder="" value={firstName} onChange={(e) => setFirstName(e.target.value)}  />
                                </div>
                            </div>
                            <div className="modal-field">
                                <div className="marker">
                                    <p>Last Name</p>
                                </div>
                                <div className="input">
                                    <input type="text" placeholder="" value={lastName} onChange={(e) => setLastName(e.target.value)}  />
                                </div>
                            </div>
                            <div className="modal-field">
                                <div className="marker">
                                    <p>Buddies</p>
                                </div>
                                <div className="input">
                                    <input type="number" placeholder="" value={buddies} onChange={(e) => setBuddies(e.target.value)} />
                                </div>
                            </div>
                            <div className="modal-field">
                                <div className="marker">
                                    <p>Song Request</p>
                                </div>
                                <div className="input">
                                    <input type="text" placeholder="" value={songRequest} onChange={(e) => setSongRequest(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="submit">
                            <p className="submit-text" onClick={handleSubmit} >Submit</p>
                        </div>
                        {/* Submission Alert */}
                        {submissionStatus === 'success' && (
                            <motion.div className="alert success">
                                Thank you for your RSVP! We look forward to seeing you at the event.
                            </motion.div>
                        )}
                        {submissionStatus === 'error' && (
                            <motion.div layout className="alert error">
                                Oops! Something went wrong. Please try submitting the form again.
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        
        </>
    )
}