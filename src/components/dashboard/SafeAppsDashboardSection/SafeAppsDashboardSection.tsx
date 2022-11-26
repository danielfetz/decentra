import { useRouter } from 'next/router'
import { Grid, Skeleton, Typography } from '@mui/material'

import { Card, WidgetContainer } from '../styled'
import { AppCard } from '@/components/safe-apps/FeaturedAppCard'
import { useSafeApps } from '@/hooks/safe-apps/useSafeApps'

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

const SafeAppsDashboardSection = () => {
  const { rankedSafeApps, pinnedSafeAppIds } = useSafeApps()
  const { safe, safeLoading } = useSafeInfo()

  return (
    <WidgetContainer>
      {safeLoading ? (
          SkeletonOverview
        ) : (
      <Grid container spacing={3}>
        {rankedSafeApps.map((rankedSafeApp) => (
          <Grid key={rankedSafeApp.id} item xs={12} sm={6} md={3} xl={3}>
            <Card>
              <Typography variant="h5">
                Use {rankedSafeApp.name}
              </Typography>
             </Card>
          </Grid>
        ))}
      </Grid>
        )}
    </WidgetContainer>
  )
}

export default SafeAppsDashboardSection
