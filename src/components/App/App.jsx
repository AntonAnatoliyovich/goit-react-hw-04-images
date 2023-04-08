import { useState } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import sass from './App.module.scss';


const App = () => {
  const [query, setQuery] = useState('')

  const handleSubmit = query => {
    setQuery(query)
  };

  return (
    <div className={sass.app}>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery query={query} />
    </div>
  );
}

export default App;
