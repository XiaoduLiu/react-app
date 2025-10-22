# React Vite Router 7 Application

This is a React application built with Vite and React Router that features a menu bar, home page with a form component containing 5 input fields in a 3-column grid layout.

## Features

- Menu bar with navigation links (Home, About, Contact)
- Home page with a form component
- Form with 5 input fields arranged in a 3-column grid
- Bordered form container with styled inputs
- Two submit buttons with different handlers
- Responsive design that adapts to mobile screens

## Project Structure

```
src/
├── components/
│   ├── Form.jsx          - Form component with 5 input fields
│   ├── Form.css          - Form styling with 3-column grid
│   ├── MenuBar.jsx       - Navigation menu bar
│   └── MenuBar.css       - Menu bar styling
├── pages/
│   ├── Home.jsx          - Home page containing the form
│   ├── Home.css          - Home page styling
│   ├── About.jsx         - About page
│   ├── About.css         - About page styling
│   ├── Contact.jsx       - Contact page
│   └── Contact.css       - Contact page styling
├── App.jsx               - Main app with router configuration
├── App.css               - App layout styling
├── index.css             - Global styles
└── main.jsx              - Entry point
```

## Running the Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173/`

## Form Features

The form component includes:
- 5 text input fields arranged in a 3-column grid
- Bordered form container with shadow
- Two submit buttons:
  - Submit Button 1: Form submit handler
  - Submit Button 2: Alternative submit handler
- Responsive layout that switches to single column on mobile devices
- Form validation and state management using React hooks

## Technologies Used

- React 18
- Vite
- React Router DOM v6
- CSS Grid for layout
