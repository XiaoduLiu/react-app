import Form from '../components/Form';
import DealList from '../components/DealList';
import './Home.css';

function Home() {
  return (
    <div className="home-page">
      <div className="header-bar">
        <h4>Search Trade Blotters</h4>
      </div>
      <Form />
      <DealList />
    </div>
  );
}

export default Home;
