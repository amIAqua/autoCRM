import React from 'react'
import { Button, Menu } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useLocation, useHistory, NavLink } from 'react-router-dom'
import { findSelectedKey, items } from './navbar-keys-helpers'
import { useAuthentication } from '../../utils/useAuthentication'
import { authService } from '../../store/services/AuthenticationService'
import { useTranslation } from 'react-i18next'

export const Navbar: React.FC = () => {
  // TODO useLocation type !!
  const { logout } = useAuthentication()
  const location: any = useLocation()
  const history = useHistory()
  const [selectedKey, setSelectedKey] = React.useState(
    findSelectedKey(items, location)
  )

  const { i18n, t } = useTranslation()

  const logoutHandler = () => {
    logout()
  }

  const changeLanguageHandler = (language: string) => {
    i18n.changeLanguage(language)
  }

  React.useEffect(() => {
    setSelectedKey(findSelectedKey(items, location))
  }, [location])

  return (
    <div>
      <Menu mode='horizontal' selectedKeys={[selectedKey!]}>
        <Menu.Item
          key='return'
          icon={<ArrowLeftOutlined />}
          onClick={() => history.goBack()}
        >
          {t('Назад')}
        </Menu.Item>
        {items.map((_item) => (
          <Menu.Item key={_item.key}>
            <NavLink to={_item.path}>{t(_item.label)}</NavLink>
          </Menu.Item>
        ))}
        {authService.authenticationStatus ? (
          <Menu.Item
            key='logout'
            icon={<ArrowLeftOutlined />}
            onClick={logoutHandler}
          >
            {t('Выход')}
          </Menu.Item>
        ) : null}
        <Button onClick={() => changeLanguageHandler('en')}>EN</Button>
        <Button onClick={() => changeLanguageHandler('ru')}>RU</Button>
      </Menu>
    </div>
  )
}
