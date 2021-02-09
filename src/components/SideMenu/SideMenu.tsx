import { FC, useEffect, useState } from 'react'
import { Menu, Button, Divider } from 'antd'
import { findSelectedKey, items } from '../Navbar/navbar-keys-helpers'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { authService } from '../../store/services/AuthenticationService'
import { useAuthentication } from '../../utils/useAuthentication'
import { useTranslation } from 'react-i18next'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ArrowLeftOutlined,
  CommentOutlined,
  LogoutOutlined,
} from '@ant-design/icons'

const { SubMenu } = Menu

export const SideMenu: FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const { logout } = useAuthentication()
  const location: any = useLocation()
  const history = useHistory()
  const { i18n, t } = useTranslation()
  const [selectedKey, setSelectedKey] = useState(
    findSelectedKey(items, location)
  )

  const toggleCollapsed = () => {
    setCollapsed((prev) => !prev)
  }

  const logoutHandler = () => {
    logout()
  }

  const changeLanguageHandler = (language: string) => {
    i18n.changeLanguage(language)
  }

  useEffect(() => {
    setSelectedKey(findSelectedKey(items, location))
  }, [location])

  const renderMenu = () => {
    return (
      <div style={{ width: '256px' }}>
        <Menu
          selectedKeys={[selectedKey!]}
          mode='inline'
          theme='dark'
          inlineCollapsed={collapsed}
        >
          <Menu.Item
            key='return'
            icon={<ArrowLeftOutlined />}
            onClick={() => history.goBack()}
          >
            {t('Назад')}
          </Menu.Item>
          <Divider />
          {items.map((_item) => (
            <Menu.Item key={_item.key} icon={_item.icon}>
              <NavLink to={_item.path}>{t(_item.label)}</NavLink>
            </Menu.Item>
          ))}
          <Divider />
          <SubMenu key='lang' icon={<CommentOutlined />} title='Язык'>
            <Menu.Item
              key='lang_ru'
              onClick={() => changeLanguageHandler('ru')}
            >
              RU
            </Menu.Item>
            <Menu.Item
              key='lang_en'
              onClick={() => changeLanguageHandler('en')}
            >
              EN
            </Menu.Item>
          </SubMenu>
          <Divider />
          {authService.authenticationStatus ? (
            <Menu.Item
              key='logout'
              icon={<LogoutOutlined />}
              onClick={logoutHandler}
            >
              {t('Выход')}
            </Menu.Item>
          ) : null}
        </Menu>
        <Button
          type='primary'
          onClick={toggleCollapsed}
          style={{ margin: '20px 20px' }}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        ></Button>
      </div>
    )
  }

  return <>{authService.authenticationStatus ? renderMenu() : null}</>
}
