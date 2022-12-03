import type { ReactElement } from 'react'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from '@emotion/styled'
import { Box, Button, Grid, Skeleton, Typography } from '@mui/material'
import { Card, WidgetBody, WidgetContainer } from '../styled'
import useSafeInfo from '@/hooks/useSafeInfo'
import { useCurrentChain } from '@/hooks/useChains'
import ChainIndicator from '@/components/common/ChainIndicator'
import EthHashInfo from '@/components/common/EthHashInfo'
import { AppRoutes } from '@/config/routes'
import useSafeAddress from '@/hooks/useSafeAddress'
import type { UrlObject } from 'url'

import { useAppSelector } from '@/store'
import { selectSettings } from '@/store/settingsSlice'

import { formatCurrency } from '@/utils/formatNumber'
import useBalances from '@/hooks/useBalances'
import { selectCurrency } from '@/store/settingsSlice'

const IdenticonContainer = styled.div`
  position: relative;
  margin-bottom: var(--space-2);
`

const StyledText = styled(Typography)`
  margin-top: 8px;
  font-size: 24px;
  font-weight: bold;
`

const NetworkLabelContainer = styled.div`
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);

  & span {
    bottom: auto;
  }
`

const ValueSkeleton = () => <Skeleton variant="text" width={30} />

const SkeletonOverview = (
  <Card>
    <Grid container>
      <Grid item xs={12}>
        <IdenticonContainer>
          <Skeleton variant="circular" width="48px" height="48px" />
        </IdenticonContainer>

        <Box mb={2}>
          <Typography fontSize="lg">
            <Skeleton variant="text" height={28} />
          </Typography>
          <Skeleton variant="text" height={21} />
        </Box>
        <NetworkLabelContainer>
          <Skeleton variant="text" width="80px" />
        </NetworkLabelContainer>
      </Grid>
    </Grid>
    <Grid container>
      <Grid item xs={3}>
        <Typography color="inputDefault" fontSize="lg">
          Tokens
        </Typography>
        <StyledText fontSize="lg">
          <ValueSkeleton />
        </StyledText>
      </Grid>
      <Grid item xs={3}>
        <Typography color="inputDefault" fontSize="lg">
          NFTs
        </Typography>
        <StyledText fontSize="lg">
          <ValueSkeleton />
        </StyledText>
      </Grid>
    </Grid>
  </Card>
)

const Balance = (): ReactElement => {
  const router = useRouter()
  const safeAddress = useSafeAddress()
  const { safe, safeLoading } = useSafeInfo()
  const settings = useAppSelector(selectSettings)

  const currency = useAppSelector(selectCurrency)
  const { balances, loading: balancesLoading } = useBalances()
  
  const [fiatTotal, setFiatTotal] = useState<string>('')

  useEffect(() => {
    setFiatTotal(balancesLoading ? '' : formatCurrency(balances.fiatTotal, currency))
  }, [currency, balances.fiatTotal, balancesLoading])
    
  return (
    <WidgetContainer>
      <WidgetBody>
        {safeLoading ? (
          SkeletonOverview
        ) : (
          <Card>
            <Grid container pb={2}>
              <Grid item xs={2}>
                <Typography mb={2}>
        Balance
                </Typography>
              </Grid>

              <Grid item xs />

              <Grid item>
            <Typography variant="body2" fontWeight={700}>
              {fiatTotal}
            </Typography>
              </Grid>
            </Grid>

            <Box mt={2} mb={4}>
              <EthHashInfo showAvatar={true} address={safeAddress} shortAddress={true} />
            </Box>
            
            <Box mt={2} mb={4}>
                <Typography fontWeight={500} mb={2}>
Deposited balance is the overall sum of all the tokens deposited to your Safe. This balance may not be accurate as balance rate are not available for all tokens.
                </Typography>
            </Box>
            
          </Card>
        )}
      </WidgetBody>
    </WidgetContainer>
  )
}

export default Balance
