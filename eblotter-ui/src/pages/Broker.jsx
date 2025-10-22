import BrokerForm from '../components/broker/BrokerForm';
import BrokerGrid from '../components/broker/BrokerGrid';
import './Broker.css';

function Broker() {
  return (
    <div className="broker-page">
      <div className="header-bar">
        <h4>Broker Management</h4>
      </div>
      <BrokerForm />
      <BrokerGrid />
    </div>
  );
}

export default Broker;
