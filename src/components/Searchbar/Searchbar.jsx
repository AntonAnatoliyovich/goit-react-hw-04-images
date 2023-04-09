import { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import sass from './Searchbar.module.scss';
import PropTypes from 'prop-types';

const Searchbar = (props) => {
    const [value, setValue] = useState('')

    const handleChange = ({ target: { value } }) => {
        setValue(value)
    };

    const handleSubmit = e => {
        e.preventDefault();
        props.onSubmit(value.trim());
    };

    return (
    <header className={sass.searchbar}>
        <form className={sass.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={sass.searchFormButton}>
            <IoSearchOutline size={30} />
        </button>

        <input
            className={sass.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
            value={value}
        />
        </form>
    </header>
    );
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
