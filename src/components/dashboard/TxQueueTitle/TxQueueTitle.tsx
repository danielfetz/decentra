import type { ReactElement } from 'react'
import { Typography } from '@mui/material'
import { WidgetContainer } from '../styled'

import { getQueuedTransactionCount } from '@/utils/transactions'

const totalQueuedTxs = getQueuedTransactionCount

const TxQueueTitle = (): ReactElement => {

  return (
    <WidgetContainer>
        <Typography component="h2" variant="subtitle1" fontWeight={700} mb={2}>
          Transaction queue (${totalQueuedTxs})
        </Typography>
    </WidgetContainer>
  )
}

export default TxQueueTitle
