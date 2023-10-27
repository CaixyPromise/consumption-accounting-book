import { Outlet, useNavigate } from "react-router-dom";
// import { Button } from "antd-mobile";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getBillsList } from "@/store/modules/bills";

// 样式组件
import { TabBar } from 'antd-mobile'
import {
  BillOutline,
  CalculatorOutline,
//   AddCircleOutline,
  UnorderedListOutline,
//   UserOutline,
} from 'antd-mobile-icons'
import "./index.scss"


const Layout = () => 
{
    const tabs = [
        {
          key: '/month',
          title: '月度账单',
          icon: <BillOutline />,
        //   badge: Badge.dot,
        },
        {
          key: '/new',
          title: '记账',
          icon: <UnorderedListOutline />,
        //   badge: '5',
        },

        {
          key: '/year',
          title: '年度账单',
          icon: <CalculatorOutline />,
        },
    ]

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBillsList());
    }, [dispatch]);

    const navigate = useNavigate()
    const switchRoute = (path) =>
    {
        console.log("path: ", path)
        navigate(path)
    }


    return (
        <div className="layout">
            <div className="container">
                <Outlet />
            </div>
            <div className="footer">
                <TabBar onChange={switchRoute}>
                    {tabs.map((item) => (<TabBar.Item key={item.key} icon={item.icon} title={item.title}/>))}
                </TabBar>
            </div>
        </div>        
    )
}

export default Layout;