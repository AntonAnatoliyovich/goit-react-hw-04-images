import { useEffect } from 'react';
import sass from './Modal.module.scss';
import PropTypes from 'prop-types';

const Modal = (props) => {

    const onPressESC = ({ code }) => {
        if (code === 'Escape') {
        props.closeModal(largeImage);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', onPressESC);
    
        return () => {
            window.removeEventListener('keydown', onPressESC);
        }
    })

    const { closeModal, largeImage, tags } = props;

    return (
    <div className={sass.overlay} onClick={closeModal}>
        <div className={sass.modal}>
        <img src={largeImage} alt={tags} />
        </div>
    </div>
    );
}

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    largeImage: PropTypes.string.isRequired,
};

export default Modal;
