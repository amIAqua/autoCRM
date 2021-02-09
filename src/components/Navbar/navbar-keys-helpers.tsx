import { BookOutlined, SnippetsOutlined } from '@ant-design/icons'

type Key = {
  key: string
  label: string
  path: string
  icon: any
}

export const items: Array<Key> = [
  {
    key: '1',
    label: 'Управление заявками',
    path: '/specify',
    icon: <BookOutlined />,
  },
  {
    key: '2',
    label: 'Прайс-лист',
    path: '/prices',
    icon: <SnippetsOutlined />,
  },
]

export const findSelectedKey = (items: Array<Key>, location: Location) =>
  items.find((_item: Key) => location.pathname.startsWith(_item.path))?.key
