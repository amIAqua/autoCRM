export const columns = [
  {
    title: 'No.',
    dataIndex: 'order',
    key: 'order',
    render: (order: number) => <p>{order}</p>,
  },

  {
    title: 'Позиция',
    dataIndex: 'position',
    key: 'position',
    render: (text: string) => <h3>{text}</h3>,
  },
  {
    title: 'Стоимость',
    dataIndex: 'price',
    key: 'price',
    render: (price: string) => <h3>{price}</h3>,
  },
]
