import type { ReactElement } from 'react'
import { Grid } from '@mui/material'
import Overview from '@/components/dashboard/Overview/Overview'
import DiscoverBanner from '@/components/dashboard/Banner/DiscoverBanner'

import useTxQueue from '@/hooks/useTxQueue'
import PaginatedTxns from '@/components/common/PaginatedTxns'

import { SafeAppsDashboardSection } from '@/components/dashboard/SafeAppsDashboardSection/SafeAppsDashboardSection'

const Dashboard = (): ReactElement => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={3}>
        <Overview />
      </Grid>

      <Grid item xs={12} md={12} lg={6}>
          <DiscoverBanner />
          <PaginatedTxns useTxns={useTxQueue} />
      </Grid>
      
      <Grid item xs={12} md={12} lg={3}>
        <SafeAppsDashboardSection />
      </Grid>
      
    </Grid>
  )
}

export default Dashboard
