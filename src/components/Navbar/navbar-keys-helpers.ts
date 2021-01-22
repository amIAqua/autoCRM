type Key = {
  key: string
  label: string
  path: string
}

export const items: Array<Key> = [
  { key: '1', label: 'Управление заявками', path: '/specify' },
]

export const findSelectedKey = (items: Array<Key>, location: Location) =>
  items.find((_item: Key) => location.pathname.startsWith(_item.path))?.key
