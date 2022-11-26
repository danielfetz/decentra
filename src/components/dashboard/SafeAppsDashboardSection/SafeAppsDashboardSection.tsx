import { useRouter } from 'next/router'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

import { WidgetContainer } from '../styled'
import { AppCard } from '@/components/safe-apps/FeaturedAppCard'
import { useSafeApps } from '@/hooks/safe-apps/useSafeApps'

const SafeAppsDashboardSection = () => {
  const { rankedSafeApps, pinnedSafeAppIds } = useSafeApps()

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
