import { BrowserRouter,Routes,Route } from "react-router-dom";
import NotFound from "../componentes/NotFound.jsx"
import App from "../App.jsx";


const Router = ()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;