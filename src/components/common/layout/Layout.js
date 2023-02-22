import { Outlet } from "react-router-dom";
import Header from "../../common/header/Header";
import Footer from "../../common/footer/Footer";


const Layout = () => {
    return (
        <main className="App">
            <Header />
            <div className="container">
                <Outlet />
            </div>
            <Footer />
        </main>
    )
}

export default Layout