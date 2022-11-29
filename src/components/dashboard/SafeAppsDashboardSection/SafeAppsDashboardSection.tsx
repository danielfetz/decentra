import type { ReactElement } from 'react'

import { useRouter } from 'next/router'
import { Box, Grid, Typography, Link } from '@mui/material'

import styled from '@emotion/styled'
import { Card, WidgetContainer } from '../styled'
import { useSafeApps } from '@/hooks/safe-apps/useSafeApps'

import NextLink from 'next/link'
import { AppRoutes } from '@/config/routes'

const StyledImage = styled.img`
  width: 64px;
  height: 64px;
  margin-bottom: 8px;
`
export const SafeAppsDashboardSection = (): ReactElement | null => {
  const { rankedSafeApps, pinnedSafeAppIds } = useSafeApps()
  const router = useRouter()
  
  return (
    <WidgetContainer>
      <Grid container spacing={3}>
        {rankedSafeApps.map((rankedSafeApp) => (
          <Grid key={rankedSafeApp.id} item xs={12} sm={6} md={3} xl={3}>
            <NextLink passHref href={{ pathname: AppRoutes.apps, query: { ...router.query, appUrl: rankedSafeApp.url } }}>
              <a>
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
              </a>
            </NextLink>  
          </Grid>
        ))}
      </Grid>
    </WidgetContainer>
  )
}
