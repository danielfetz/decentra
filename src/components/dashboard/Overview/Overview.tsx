import type { ReactElement } from 'react'
import { useMemo } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from '@emotion/styled'
import { Box, Button, Grid, Skeleton, Typography } from '@mui/material'
import { Card, WidgetBody, WidgetContainer } from '../styled'
import useSafeInfo from '@/hooks/useSafeInfo'
import { useCurrentChain } from '@/hooks/useChains'
import SafeIcon from '@/components/common/SafeIcon'
import ChainIndicator from '@/components/common/ChainIndicator'
import EthHashInfo from '@/components/common/EthHashInfo'
import { AppRoutes } from '@/config/routes'
import useSafeAddress from '@/hooks/useSafeAddress'
import type { UrlObject } from 'url'

import { getBlockExplorerLink } from '@/utils/chains'
import CopyButton from '@/components/common/CopyButton'
import QrCodeButton from '@/components/sidebar/QrCodeButton'
import Track from '@/components/common/Track'
import { OVERVIEW_EVENTS } from '@/services/analytics/events/overview'

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

const Overview = (): ReactElement => {
  const router = useRouter()
  const safeAddress = useSafeAddress()
  const { safe, safeLoading } = useSafeInfo()
  const chain = useCurrentChain()
  const { chainId } = chain || {}
  
  const addressCopyText = settings.shortName.copy && chain ? `${chain.shortName}:${safeAddress}` : safeAddress

  const blockExplorerLink = chain ? getBlockExplorerLink(chain, safeAddress) : undefined

  return (
    <WidgetContainer>
      <Typography component="h2" variant="subtitle1" fontWeight={700} mb={2}>
        Overview
      </Typography>

      <WidgetBody>
        {safeLoading ? (
          SkeletonOverview
        ) : (
          <Card>
            <Grid container pb={2}>
              <Grid item xs={2}>
                <Typography fontWeight={700} mb={2}>
        Overview
                </Typography>
              </Grid>

              <Grid item xs />

              <Grid item>
                <ChainIndicator chainId={chainId} inline />
              </Grid>
            </Grid>

            <Box mt={2} mb={4}>
              <EthHashInfo showAvatar={true} address={safeAddress} shortAddress={true} />
            </Box>
            
            <Box mt={2} mb={4}>
                <Typography fontWeight={500} mb={2}>
        This Safe address can only be used on this chain. The threshold for executing transactions is {safe.threshold}/{safe.owners.length}.
                </Typography>
            </Box>
            
        <Box mt={2} mb={4}>
          <Track {...OVERVIEW_EVENTS.SHOW_QR}>
            <QrCodeButton>
              Open QR code
            </QrCodeButton>
          </Track>

          <Track {...OVERVIEW_EVENTS.COPY_ADDRESS}>
            <CopyButton text={addressCopyText} className={css.iconButton}>
             Copy to clipboard
            </CopyButton>
          </Track>

          <Track {...OVERVIEW_EVENTS.OPEN_EXPLORER}>
            <a target="_blank" rel="noreferrer" href={blockExplorerLink?.href || '#'}>
             {blockExplorerLink?.title || ''}
            </a>
          </Track>
        </Box>
            
          </Card>
        )}
      </WidgetBody>
    </WidgetContainer>
  )
}

export default Overview
