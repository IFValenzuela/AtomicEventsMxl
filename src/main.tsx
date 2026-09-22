import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Self-hosted variable fonts. Nothing is fetched from Google at runtime.
// Lora is the reference site's heading face. Mulish stands in for its Avenir
// Next body face, which is not freely licensable: same humanist skeleton and
// large x-height, so it holds up at the reference's tight 18px/1.2 setting.
import '@fontsource-variable/lora'
import '@fontsource-variable/mulish'

import './styles/index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
