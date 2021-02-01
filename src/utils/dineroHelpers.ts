import Dinero from 'dinero.js'

export const dinero = (startAmount: number | string) => {
  if (typeof startAmount === 'string') {
    startAmount = parseInt(startAmount)
  }

  return Dinero({ amount: startAmount, currency: 'USD' })
}

export const formatedPrice = (price: number) =>
  dinero(price).toFormat('$0,0.00')
