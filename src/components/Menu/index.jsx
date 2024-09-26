import {
  LeftCircleOutlined,
  RightCircleOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import logoProvired from "../../assets/images/logo_provired.webp";

export const MenuComponent = ({ items, collapsed, toggleCollapsed }) => {

  return (
    <>
        <div
            className={`menu col-sm-4 col-md-4 col-lg-3 col-xl-2 ${
                collapsed && "menu_collapse"
            }`}
        >
        <div className="menu_logo d-flex justify-content-center align-items-center">
            <img src={logoProvired} />
            <h3 className={`${collapsed && "d-none"}`}>¡Bienvenido!</h3>
        </div>
        <button className="menu_btnCollapse p-0" onClick={toggleCollapsed}>
            {collapsed ? <RightCircleOutlined /> : <LeftCircleOutlined />}
        </button>
        <Menu
            defaultSelectedKeys={["1"]}
            mode="vertical"
            theme="light"
            inlineCollapsed={collapsed}
            items={items}
        />
        </div>
    </>
  );
};
