import DealForm from '../components/home/DealForm';
import DealList from '../components/home/DealList';
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
