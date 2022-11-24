import { useState, type ReactElement } from 'react'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'

import useSafeInfo from '@/hooks/useSafeInfo'
import Identicon from '@/components/common/Identicon'
import useBalances from '@/hooks/useBalances'
import { useAppSelector } from '@/store'
import { selectCurrency } from '@/store/settingsSlice'

import css from './styles.module.css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'

import { selectSettings } from '@/store/settingsSlice'
import { useCurrentChain } from '@/hooks/useChains'
import EthHashInfo from '@/components/common/EthHashInfo'
import { trackEvent, OVERVIEW_EVENTS } from '@/services/analytics'
import SafeList from '@/components/sidebar/SafeList'
import { Drawer, IconButton } from '@mui/material'

const SafeAddress = (): ReactElement => {
  const currency = useAppSelector(selectCurrency)
  const { balances, loading: balancesLoading } = useBalances()
  const { safe, safeAddress, safeLoading } = useSafeInfo()
  const chain = useCurrentChain()
  const settings = useAppSelector(selectSettings)
  const addressCopyText = settings.shortName.copy && chain ? `${chain.shortName}:${safeAddress}` : safeAddress
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)

  const onDrawerToggle = () => {
    trackEvent({ ...OVERVIEW_EVENTS.SIDEBAR, label: isDrawerOpen ? 'Close' : 'Open' })
    setIsDrawerOpen((prev) => !prev)
  }
  
  const ExpandIcon = isDrawerOpen ? ExpandLessIcon : ExpandMoreIcon  

  return (
    <div className={css.container}>
      <IconButton className={css.drawerButton} onClick={onDrawerToggle}>
      <div className={css.info}>
        <div className={css.safe}>
          <div>
            {safeLoading ? (
              <Skeleton variant="circular" width={18} height={18} />
            ) : (
              <Identicon address={safeAddress} />
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
      <ExpandIcon color="border" />
      </IconButton>
      <Drawer variant="temporary" anchor="left" open={isDrawerOpen} onClose={onDrawerToggle}>
        <div className={css.drawer}>
          <SafeList closeDrawer={() => setIsDrawerOpen(false)} />
        </div>
      </Drawer>      
    </div>
  )
}

export default SafeAddress
