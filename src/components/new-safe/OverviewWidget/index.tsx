import ChainIndicator from '@/components/common/ChainIndicator'
import WalletInfo from '@/components/common/WalletInfo'
import { useCurrentChain } from '@/hooks/useChains'
import useWallet from '@/hooks/wallets/useWallet'
import { Card, Grid, Typography } from '@mui/material'
import type { ReactElement } from 'react'

import css from './styles.module.css'

const LOGO_DIMENSIONS = '22px'

const OverviewWidget = ({ safeName }: { safeName: string }): ReactElement | null => {
  const wallet = useWallet()
  const chain = useCurrentChain()
  const rows = [
    ...(wallet && chain ? [{ title: 'Wallet', component: <WalletInfo wallet={wallet} chain={chain} /> }] : []),
    ...(chain ? [{ title: 'Network', component: <ChainIndicator chainId={chain?.chainId} inline /> }] : []),
    ...(safeName !== '' ? [{ title: 'Name', component: <Typography>{safeName}</Typography> }] : []),
  ]

  return (
    <Grid item xs={12}>
      <Card className={css.card}>
        <div className={css.header}>
          <img src="/images/logo-no-text.svg" alt="Safe logo" width={LOGO_DIMENSIONS} />
          <Typography variant="h4">Your Safe preview</Typography>
        </div>
        {rows?.map((row) => (
          <div key={row.title} className={css.row}>
            <Typography variant="body2">{row.title}</Typography>
            {row.component}
          </div>
        ))}
      </Card>
    </Grid>
  )
}

export default OverviewWidget