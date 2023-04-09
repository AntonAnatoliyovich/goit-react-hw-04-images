import { useState, useEffect } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { fetchData } from 'helpers/fetchAPI';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Error } from 'components/Error/Error';
import Modal from 'components/Modal/Modal';
import sass from './ImageGallery.module.scss';
import PropTypes from 'prop-types';

const ImageGallery = (props) => {
    const [images, setImages] = useState([])
    let [page, setPage] = useState(1)
    const [status, setStatus] = useState('idle')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalImg, setModalImg] = useState('')
    const [totalHits, setTotalHits] = useState(0)

    const normalizeData = (hits) => {
        return hits.map(item => ({ id: item.id, webformatURL: item.webformatURL, largeImageURL: item.largeImageURL, tags: item.tags}))
    }

    useEffect(() => {
        try {
            if (props.query.length > 0) {
                fetchData(props.query, 1).then(response => {
                    const normalizeHits = normalizeData(response.hits)

                    if (!response.hits.length) {
                        setStatus('rejected')
                        setImages([])
                        return;
                    }

                    setImages(normalizeHits)
                    setStatus('resolved')
                    setPage(1)
                    setTotalHits(response.totalHits)

                    if (response.totalHits === response.hits.length) {
                        setStatus('idle')
                    }
                });
            }
        } catch (error) {
            console.error(error);
        }
    }, [props.query])

    const onLoadMore = () => {
        setStatus('pending')
        setPage(page = page + 1)

        fetchData(props.query, page).then(response => {
            const normalizeHits = normalizeData(response.hits)

            setImages([...images, ...normalizeHits])
            setStatus('resolved')

            if (response.totalHits === (images.length + response.hits.length)) {
                setStatus('idle')
            }
        });
    };

    const showModal = e => {
        setIsModalOpen(true)
        largeItemFinder(e);
    };

    const closeModal = e => {
        if (e.target === e.currentTarget) {
            setIsModalOpen(false)
        }
    };

    const largeItemFinder = e => {
        const seachItem = images.find(
            el => el.webformatURL === e.target.src
        );
        const largeImage = seachItem.largeImageURL;
        setModalImg(largeImage)
    };

    return (
    <>
        <ul className={sass.imageGallery}>
        {images.map(({ id, webformatURL, tags }) => {
            return (
            <ImageGalleryItem
                key={id}
                image={webformatURL}
                tags={tags}
                showModal={showModal}
            />
            );
        })}
        </ul>
        {status === 'pending' && <Loader />}
        {status !== 'idle' && status !== 'pending' && images.length !== 0 && images.length < totalHits && (
        <Button onLoadMore={onLoadMore} />
        )}
        {status === 'rejected' && <Error />}
        {isModalOpen && (
        <Modal largeImage={modalImg} closeModal={closeModal} />
        )}
    </>
    );
}

ImageGallery.propTypes = {
    query: PropTypes.string.isRequired,
};

export default ImageGallery;
