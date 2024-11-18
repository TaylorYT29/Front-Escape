import { SignUpCompanies } from "./components/auth/SignUpCompanies.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { SignUpUsers } from "./components/auth/SignUpUsers.jsx";
import { Landing } from "./components/routes/Landing.jsx";
import { SignIn } from "./components/auth/SignIn.jsx";
import { SignInCompanies } from "./components/auth/SignInCompanies.jsx";
import logo from "./assets/imgs/Place1.jpg";
import { CardLocation } from "./components/cards/CardLocation.jsx";
import { Home } from "./components/routes/Home.jsx";
import { AccountSettings } from "./components/profile/AccountSettings.jsx"
import { AccountSettingsCompany } from "./components/profile/AccountSettingsCompany.jsx"
import { MapPage } from './components/map/MapPage.jsx';
import {PersonalInformation} from "./components/profile/PersonalInformation.jsx"
import {PersonalInformationCompany} from "./components/profile/PersonalInformationCompany.jsx"
import { InformationCompany } from "./components/profile/InformationCompany.jsx";
import { SearchResults } from "./components/routes/SearchResults.jsx";
import { ForgotPassword } from './components/password/ForgotPassword.jsx';
import { ForgotPasswordCompany } from './components/password/ForgotPasswordCompany.jsx';
import { ComponentProvider } from './components/hooks/useComponentContext.jsx';
import { CreatePost } from "./components/routes/CreatePost.jsx";
import { Categories } from "./components/routes/Categories.jsx";
import { Favorites } from "./components/routes/Favorites.jsx";
import { UpdatePost } from "./components/routes/UpdatePost.jsx";
import { RouteMap } from "./components/map/RouteMap.jsx";
import { AppProvider  } from "./context/AppContext.jsx";
import { CompanyDetails } from "./components/cards/CompanyDetails.jsx";
import { About } from "./components/ui/landing/About.jsx";
import { Contact } from "./components/ui/landing/Contact.jsx";
import { TermsAndConditions } from "./components/ui/landing/TermsAndConditions.jsx";
export function App() {

 

    return (

        <AppProvider>
        <ComponentProvider >
            <Routes className="dark:bg-[#2a2a2a]">
                <Route path="/" element={<Landing />} /> 
                <Route path="/Card" element={<CardLocation image={logo} name="Soda Maria" city="Esparza Centro" starts="4.2"/>} />  
                <Route path="/signUpCompanies" element={<SignUpCompanies />} /> 
                <Route path="/signUpUser" element={<SignUpUsers/>} />
                <Route path="/Categories" element={<Categories />} />
                <Route path="/signIn" element={<SignIn />} />
                <Route path="/signInCompanies" element={<SignInCompanies />} />
                <Route path="/home" element={<Home />} />
                <Route path="/accountSettings" element={<AccountSettings />} />
                <Route path="/accountSettingsCompany" element={<AccountSettingsCompany />} />
                <Route path="/PersonalInformation" element={<PersonalInformation  />} />
                <Route path="/PersonalInformationCompany" element={<PersonalInformationCompany  />} />
                <Route path="/InformationCompany" element={<InformationCompany  />} />
                <Route path="/map" element={<MapPage />} /> 
                <Route path="/mapWithRoute" element={<RouteMap />} /> 
                <Route path="/search-results" element={<SearchResults />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/forgot-password-company" element={<ForgotPasswordCompany />} />
                <Route path="/favorites" element={<Favorites  />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/company-details" element={<CompanyDetails />} />
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/update-post/:id" element={<UpdatePost />} />
                <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
        </ComponentProvider>
        </AppProvider>
    )
}

