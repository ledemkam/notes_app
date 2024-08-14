import ReactDOM from "react-dom/client";

import App from './App.tsx';
import './index.css';
import {QueryProvider} from "./lib/react-query/QueryProvider.tsx";
import {BrowserRouter} from "react-router-dom";
import {Toaster} from "sonner";




ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <QueryProvider>
                <Toaster />
                <App />
        </QueryProvider>
    </BrowserRouter>
);

