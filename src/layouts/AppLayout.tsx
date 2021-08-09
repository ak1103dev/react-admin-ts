import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import {
  ShopOutlined,
  DeploymentUnitOutlined,
  ProfileOutlined,
  HeartOutlined,
  LogoutOutlined,
  DashboardOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useLocalization } from '../contexts/LocalizationContext'
import { useAuth } from '../contexts/AuthContext'

interface Props {
  children: JSX.Element
}

const { Footer, Sider, Content } = Layout
const { SubMenu } = Menu

const AppLayout = ({ children }: Props): JSX.Element => {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const { t } = useLocalization()
  const {
    state: { user },
  } = useAuth()

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed)
  }

  if (!user) {
    return <Redirect to="/" />
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <h1
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            color: 'white',
            padding: 20,
          }}
        >
          Admin
        </h1>
        <Menu
          theme="dark"
          defaultSelectedKeys={['/dashboard']}
          selectedKeys={[location.pathname]}
          mode="inline"
        >
          <Menu.Item key="/dashboard" icon={<DashboardOutlined />}>
            <Link to="/dashboard">{t('menu.dashboard')}</Link>
          </Menu.Item>
          <SubMenu
            key="/checklist"
            icon={<ProfileOutlined />}
            title={t('menu.checklist')}
          >
            <Menu.Item key="/vaccines" icon={<ShopOutlined />}>
              <Link to="/vaccines">{t('menu.vaccine')}</Link>
            </Menu.Item>
            <Menu.Item key="/health-check" icon={<HeartOutlined />}>
              <Link to="/health-check">{t('menu.healthCheck')}</Link>
            </Menu.Item>
            <Menu.Item key="/development" icon={<DeploymentUnitOutlined />}>
              <Link to="/development">{t('menu.development')}</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="/users" icon={<UserOutlined />}>
            <Link to="/users">{t('menu.user')}</Link>
          </Menu.Item>
          <Menu.Item key="/logout" icon={<LogoutOutlined />}>
            <Link to="/logout">{t('menu.logout')}</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ backgroundColor: 'white' }}>{children}</Content>
        <Footer style={{ textAlign: 'center' }}>© 2020 Admin Web v1.0.0</Footer>
      </Layout>
    </Layout>
  )
}

AppLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default AppLayout
