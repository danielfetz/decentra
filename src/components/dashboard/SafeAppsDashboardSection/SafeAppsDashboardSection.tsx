import { useRouter } from 'next/router'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { WidgetContainer } from '../styled'
import { useSafeApps } from '@/hooks/safe-apps/useSafeApps'
import { AppCard, AppCardContainer } from '@/components/safe-apps/AppCard'
import { AppRoutes } from '@/config/routes'
import ExploreSafeAppsIcon from '@/public/images/apps/explore.svg'

const SafeAppsDashboardSection = () => {
  const { rankedSafeApps, togglePin, pinnedSafeAppIds } = useSafeApps()

  return (
    <WidgetContainer>
      <Grid container spacing={3}>
        {rankedSafeApps.map((rankedSafeApp) => (
          <Grid key={rankedSafeApp.id} item xs={12} sm={6} md={3} xl={3}>
            <AppCard safeApp={rankedSafeApp} pinned={pinnedSafeAppIds.has(rankedSafeApp.id)} />
          </Grid>
        ))}
      </Grid>
    </WidgetContainer>
  )
}

export default SafeAppsDashboardSection
