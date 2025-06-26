import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "./components/ui/provider";
import {IOAppDataRepository} from "./features/matrix/domain/repositories/IOAppDataRepository";
import {AppDataService} from "./features/matrix/domain/services/AppDataService";


const root = ReactDOM.createRoot(document.getElementById('root'));
const appDataRepository = new IOAppDataRepository();
const appDataService = new AppDataService(appDataRepository);

root.render(
    <React.StrictMode>
       <Provider>
        <App service={appDataService}/>
       </Provider>
    </React.StrictMode>
);