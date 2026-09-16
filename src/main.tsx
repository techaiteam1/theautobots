import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/fonts.css';
import '@fontsource/instrument-serif/latin-400-italic.css';
import './styles/tokens.css';
import './styles/global.css';
import './styles/layout.css';
import './styles/interactions.css';
import App from './app/App';

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
