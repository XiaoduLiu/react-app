// Simple toast notification utility
// For production, consider using a library like react-hot-toast or sonner

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastOptions {
  duration?: number;
  position?: 'top' | 'bottom';
}

const defaultOptions: ToastOptions = {
  duration: 3000,
  position: 'top',
};

export const toast = {
  show: (message: string, type: ToastType = 'info', options: ToastOptions = {}) => {
    const opts = { ...defaultOptions, ...options };

    // Create toast container if it doesn't exist
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.style.cssText = `
        position: fixed;
        ${opts.position === 'top' ? 'top: 1rem' : 'bottom: 1rem'};
        right: 1rem;
        z-index: 10000;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      `;
      document.body.appendChild(container);
    }

    // Create toast element
    const toast = document.createElement('div');
    const colors = {
      success: { bg: '#d4edda', border: '#28a745', text: '#155724' },
      error: { bg: '#f8d7da', border: '#dc3545', text: '#721c24' },
      warning: { bg: '#fff3cd', border: '#ffc107', text: '#856404' },
      info: { bg: '#d1ecf1', border: '#17a2b8', text: '#0c5460' },
    };

    const color = colors[type];
    toast.style.cssText = `
      padding: 1rem 1.5rem;
      background: ${color.bg};
      border-left: 4px solid ${color.border};
      color: ${color.text};
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      min-width: 250px;
      max-width: 400px;
      animation: slideIn 0.3s ease-out;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 0.9rem;
    `;
    toast.textContent = message;

    // Add animation styles if not present
    if (!document.getElementById('toast-styles')) {
      const style = document.createElement('style');
      style.id = 'toast-styles';
      style.textContent = `
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    container.appendChild(toast);

    // Auto remove
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => {
        container.removeChild(toast);
        if (container.children.length === 0) {
          document.body.removeChild(container);
        }
      }, 300);
    }, opts.duration);
  },

  success: (message: string, options?: ToastOptions) => {
    toast.show(message, 'success', options);
  },

  error: (message: string, options?: ToastOptions) => {
    toast.show(message, 'error', options);
  },

  info: (message: string, options?: ToastOptions) => {
    toast.show(message, 'info', options);
  },

  warning: (message: string, options?: ToastOptions) => {
    toast.show(message, 'warning', options);
  },
};
