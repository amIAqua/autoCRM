import React from 'react'
import { Menu } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useLocation, useHistory, NavLink } from 'react-router-dom'
import { findSelectedKey, items } from './navbar-keys-helpers'

export const Navbar: React.FC = () => {
  // TODO useLocation type !!
  const location: any = useLocation()
  const history = useHistory()
  const [selectedKey, setSelectedKey] = React.useState(
    findSelectedKey(items, location)
  )

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
          Назад
        </Menu.Item>
        {items.map((_item) => (
          <Menu.Item key={_item.key}>
            <NavLink to={_item.path}>{_item.label}</NavLink>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  )
}
