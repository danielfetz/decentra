import type { ReactElement } from 'react'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'

import useSafeInfo from '@/hooks/useSafeInfo'
import SafeIcon from '@/components/common/SafeIcon'
import useBalances from '@/hooks/useBalances'
import { useAppSelector } from '@/store'
import { selectCurrency } from '@/store/settingsSlice'

import css from './styles.module.css'

import { selectSettings } from '@/store/settingsSlice'
import { useCurrentChain } from '@/hooks/useChains'
import EthHashInfo from '@/components/common/EthHashInfo'

const SafeAddress = (): ReactElement => {
  const currency = useAppSelector(selectCurrency)
  const { balances, loading: balancesLoading } = useBalances()
  const { safe, safeAddress, safeLoading } = useSafeInfo()
  const { threshold, owners } = safe
  const chain = useCurrentChain()
  const settings = useAppSelector(selectSettings)
  const addressCopyText = settings.shortName.copy && chain ? `${chain.shortName}:${safeAddress}` : safeAddress

  return (
    <div className={css.container}>
      <div className={css.info}>
        <div className={css.safe}>
          <div>
            {safeLoading ? (
              <Skeleton variant="circular" width={18} height={18} />
            ) : (
              <SafeIcon address={safeAddress} threshold={threshold} owners={owners?.length} />
            )}
          </div>

          <div className={css.address}>
            {safeLoading ? (
              <Typography variant="body2">
                <Skeleton variant="text" width={86} />
              </Typography>
            ) : (
              <EthHashInfo address={safeAddress} shortAddress showAvatar={false} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SafeAddress
