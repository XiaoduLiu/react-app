import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  fullPage?: boolean;
}

function LoadingSpinner({ size = 'medium', fullPage = false }: LoadingSpinnerProps) {
  const sizeMap = {
    small: '24px',
    medium: '48px',
    large: '64px',
  };

  const spinnerStyle = {
    width: sizeMap[size],
    height: sizeMap[size],
  };

  const spinner = (
    <div className="loading-spinner" style={spinnerStyle}>
      <div className="spinner-circle"></div>
    </div>
  );

  if (fullPage) {
    return (
      <div className="loading-spinner-overlay">
        {spinner}
      </div>
    );
  }

  return spinner;
}

export default LoadingSpinner;
