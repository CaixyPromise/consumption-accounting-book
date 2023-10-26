import Layout from "@/pages/Layout"
import New from "@/pages/New"
import Year from "@/pages/Year"
import Month from "@/pages/Month"
import {createBrowserRouter} from "react-router-dom"

console.log("Year in router", Year)
console.log("Month in router", Month)
const router = createBrowserRouter(
[
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "month",
                element: <Month />,
            },
            {
                path: "year",
                element: <Year />,
            }
        ]
    },
    {
        path: "/new",
        element: <New />
    }
])

export default router;