import React, { useEffect, useState } from "react";
import { MenuComponent } from "../../components/Menu";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined
} from "@ant-design/icons";
import { HeaderComponent } from "./components/Header";
import { BodyComponent } from "./components/Body";
import { FooterComponent } from "./components/Footer";
import useTimeOutSession from "../../hooks/useTimeOutSession";

export const Home = ({
  timeLogOut,
  menu = null,
  defaultKeyMenu={defaultKeyMenu}
}) => {
  const { state } = useTimeOutSession();
  const [collapsed, setCollapsed] = useState(false);
  const [itemSelected, setItemSelected] = useState(defaultKeyMenu);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  useEffect(()=>{
    if(state){
      timeLogOut();
    }
  },[state])
  
  return (
      <div className="row home">
        <MenuComponent 
          items={menu}
          collapsed={collapsed}
          defaultKeyMenu={defaultKeyMenu}
          toggleCollapsed={toggleCollapsed}
          setItemSelected={setItemSelected}
        />
        <div className={`contain col-sm-8 col-md-8 col-lg-9 col-xl-10 p-0 m-0 ${collapsed && 'contain_collapse'}`}>
          <HeaderComponent />
          <BodyComponent items={menu} itemSelected={itemSelected} />
          <FooterComponent />
        </div>
      </div>
  );
};
