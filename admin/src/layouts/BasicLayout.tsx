import React, { useState } from "react";
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
import { useTranslation } from "react-i18next";
import classnames from "classnames";
import { routes } from "../router";
import { SelectLang } from "../components/SelectLang";
import { DefaultFooter } from "../components/DefaultFooter";
import "./BasicLayout.scss";

const { Header, Sider, Content } = Layout;

const Container: React.FC<RouteComponentProps> = props => {
  const { t } = useTranslation();
  const [collapsed, toggleCollapse] = useState(false);
  const { history } = props;
  const pathname = history.location.pathname;

  return (
    <Layout className={classnames("container")}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[pathname]}>
          {routes.map(route => (
            <Menu.Item key={route.path}>
              <NavLink to={route.path}>
                <Icon type={route.icon} />
                <span>{t(route.title)}</span>
              </NavLink>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className={classnames("content")}>
        <Header style={{ background: "#fff", padding: 0 }}>
          <Icon
            className="trigger"
            type={collapsed ? "menu-unfold" : "menu-fold"}
            onClick={() => toggleCollapse(!collapsed)}
          />
          <SelectLang />
        </Header>
        <Content style={{ padding: 24 }}>
          {props.children}
          <DefaultFooter />
        </Content>
      </Layout>
    </Layout>
  );
};

export const BasicLayout = withRouter(Container);
