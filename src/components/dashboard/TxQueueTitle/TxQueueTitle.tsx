import type { ReactElement } from 'react'
import { Typography } from '@mui/material'
import { Card, WidgetBody, WidgetContainer } from '../styled'

import { getQueuedTransactionCount } from '@/utils/transactions'

const totalQueuedTxs = getQueuedTransactionCount

const TxQueueTitle = (): ReactElement => {

  return (
    <WidgetContainer>
      <WidgetBody>
          <Typhography>
           Transaction queue {(totalQueuedTxs)}
          </Typography>
      </WidgetBody>
    </WidgetContainer>
  )
}

export default TxQueueTitle
