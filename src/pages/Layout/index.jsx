import { Outlet } from "react-router-dom";
import { Button } from "antd-mobile";
const Layout = () => 
{
    return (
        
        <div>
            Layout
            <Outlet />
            <Button type="primary" color="primary">Button</Button>
            <div className="puple">
            <Button type="primary" color="primary">Button</Button>

            </div>
        </div>
    )
}

export default Layout;