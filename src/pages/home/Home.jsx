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
  menu = null
}) => {
  const items = [ 
    {
      key: "1",
      icon: <PieChartOutlined />,
      label: "Option 1",
      disabled : true
    },
    {
      key: "2",
      icon: <DesktopOutlined />,
      label: "Option 2",
    },
    {
      key: "3",
      icon: <ContainerOutlined />,
      label: "Option 3",
    },
    {
      key: "sub1",
      label: "Navigation One",
      icon: <MailOutlined />,
      children: [
        {
          key: "5",
          label: "Option 5",
        },
        {
          key: "6",
          label: "Option 6",
        },
        {
          key: "7",
          label: "Option 7",
        },
        {
          key: "8",
          label: "Option 8",
        },
      ],
    },
    {
      key: "sub2",
      label: "Navigation Two",
      icon: <AppstoreOutlined />,
      children: [
        {
          key: "9",
          label: "Option 9",
        },
        {
          key: "10",
          label: "Option 10",
        },
        {
          key: "sub3",
          label: "Submenu",
          children: [
            {
              key: "11",
              label: "Option 11",
            },
            {
              key: "12",
              label: "Option 12",
            },
          ],
        },
      ],
    },
  ];

  const { state } = useTimeOutSession();
  const [collapsed, setCollapsed] = useState(false);
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
          items={menu ? menu : items}
          collapsed={collapsed}
          toggleCollapsed={toggleCollapsed}
        />
        <div className={`contain col-sm-8 col-md-8 col-lg-9 col-xl-10 p-0 m-0 ${collapsed && 'contain_collapse'}`}>
          <HeaderComponent />
          <BodyComponent />
          <FooterComponent />
        </div>
      </div>
  );
};
