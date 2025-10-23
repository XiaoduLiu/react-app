import DealForm from '../components/search/DealForm';
import DealList from '../components/search/DealList';
import './Search.css';

function Search() {
  return (
    <div className="home-page">
      <div className="header-bar">
        <h4>Search Trade Blotters</h4>
      </div>
      <DealForm />
      <DealList />
    </div>
  );
}

export default Search;
