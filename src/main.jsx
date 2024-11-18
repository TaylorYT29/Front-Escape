import ReactDOM from 'react-dom/client'
import './index.css'
import { App } from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './i18n';
import { UserProvider } from './context/UserContext.jsx';
import { PostDropdown } from './components/dropdown/PostDropdown.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
      <BrowserRouter>
        <UserProvider>
          <App/>
        </UserProvider>
      </BrowserRouter>
  </>
)

