import { Outlet } from "react-router-dom";
import { Header, } from "../../common";


const Layout = () => {
    return (
        <main className="App">
            <Header />
            <div className="container">
                <Outlet />
            </div>
        </main>
    )
}

export default Layout