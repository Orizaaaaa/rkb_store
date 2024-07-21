
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

type Props = {
    pathname: string,
    title: string,
    icon: any,
}

const NavigationList = ({ pathname, title, icon, }: Props) => {
    const location = useLocation();
    return (
        <li>
            <NavLink
                to={`${pathname}`}
                className={`group relative flex  items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark2 duration-300 text-gray-500
                 ease-in-out hover:bg-primary  hover:text-white dark:hover:bg-meta-4 ${location.pathname.includes(pathname) ? "bg-primary text-white font-medium" : ""} `}
            >
                {icon}
                {title}
            </NavLink>
        </li>
    )
}

export default NavigationList