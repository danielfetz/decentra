import type { ReactElement } from 'react'

import { useRouter } from 'next/router'
import { Box, Grid, Skeleton, Typography, Link } from '@mui/material'

import styled from '@emotion/styled'
import { Card, WidgetContainer } from '../styled'
import { useSafeApps } from '@/hooks/safe-apps/useSafeApps'
import useSafeInfo from '@/hooks/useSafeInfo'

import NextLink from 'next/link'
import { AppRoutes } from '@/config/routes'

const StyledImage = styled.img`
  width: 64px;
  height: 64px;
`

const ValueSkeleton = () => <Skeleton variant="text" width={30} />

const SkeletonOverview = (
  <Grid container>
    <Grid item xs={12} sm={6} md={3} xl={3}>
      <Card>
        <Typography variant="h5">
                <Skeleton variant="text" height={28} />
        </Typography>
      </Card>
    </Grid>
  </Grid>
  )

const SafeAppsDashboardSection = (): ReactElement | null => {
  const { rankedSafeApps, pinnedSafeAppIds } = useSafeApps()
  const router = useRouter()
  const { safe, safeLoading } = useSafeInfo()

  return (
    <WidgetContainer>
      {safeLoading ? (
          SkeletonOverview
        ) : (
      <Grid container spacing={3}>
        {rankedSafeApps.map((rankedSafeApp) => (
          <Grid key={rankedSafeApp.id} item xs={12} sm={6} md={3} xl={3}>
            <NextLink passHref href={{ pathname: AppRoutes.apps, query: { ...router.query, appUrl: rankedSafeApp.url } }}>
              <Card>
              <StyledImage src={rankedSafeApp.iconUrl} alt={rankedSafeApp.name} />
                <Box mb={1.01}>
              <Typography fontSize="lg">
                {rankedSafeApp.description}
              </Typography>
              </Box>
              <Link color="primary.main" fontWeight="bold" component="span">
                            Use {rankedSafeApp.name}
              </Link>
             </Card>
            </NextLink>  
          </Grid>
        ))}
      </Grid>
        )}
    </WidgetContainer>
  )
}

export default SafeAppsDashboardSection
