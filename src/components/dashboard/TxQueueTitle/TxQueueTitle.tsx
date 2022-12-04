import type { ReactElement } from 'react'
import { Typography } from '@mui/material'
import { WidgetContainer } from '../styled'

const TxQueueTitle = (): ReactElement => {

  return (
    <WidgetContainer>
        <Typography component="h2" variant="subtitle1" fontWeight={700} mb={2}>
          Transaction queue
        </Typography>
    </WidgetContainer>
  )
}

export default TxQueueTitle
