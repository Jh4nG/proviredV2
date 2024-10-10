import {
  LeftCircleOutlined,
  RightCircleOutlined,
  MenuOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import logoProvired from "../../assets/images/logo_provired.webp";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const MenuComponent = ({ items, collapsed, defaultKeyMenu = [0], toggleCollapsed }) => {
  const [showMobile, setShowMobile] = useState(false);
  const navigate = useNavigate()

  const handleShowMobile = ()=> {
    setShowMobile(!showMobile);
  }

  const handleRoute = (e)=> {
    navigate(e.key);
  }

  return (
    <>
        <div
            className={`menu d-none d-sm-block col-sm-4 col-md-4 col-lg-3 col-xl-2 ${
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
              onClick={handleRoute}
              defaultSelectedKeys={defaultKeyMenu}
              mode="vertical"
              theme="light"
              inlineCollapsed={collapsed}
              items={items}
          />

        </div>
        <div className={`menu menu_mobile d-block d-sm-none ${!showMobile && 'menu_collapseMobile'}`}>
          <div className="menu_logo d-flex justify-content-between align-items-center">
            <img src={logoProvired} />
            <h3 className={`${collapsed && "d-none"}`}>¡Bienvenido!</h3>
            <button className="menu_btnMobile" onClick={handleShowMobile}>
              <MenuOutlined />
            </button>
          </div>
          <div className={`${!showMobile && 'd-none'}`}>
            <Menu
                onClick={handleRoute}
                defaultSelectedKeys={["1"]}
                mode="inline"
                theme="light"
                inlineCollapsed={false} 
                items={items}
            />
          </div>
        </div>
    </>
  );
};
