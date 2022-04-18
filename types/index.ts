import { Indicators } from "cryptocurrency-trading-indicators"

export type PoolInfo = {
  isLoading: boolean
  symbol: string,
  indicators?: Indicators
  maFast: any,
  maSlow: any,
  price: any
}