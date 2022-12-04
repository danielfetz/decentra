import type { ReactElement } from 'react'
import { Grid } from '@mui/material'
import Overview from '@/components/dashboard/Overview/Overview'
import Balance from '@/components/dashboard/Balance/Balance'
import DiscoverBanner from '@/components/dashboard/Banner/DiscoverBanner'
import TxQueueTitle from '@/components/dashboard/TxQueueTitle/TxQueueTitle'

import useTxQueue from '@/hooks/useTxQueue'
import PaginatedTxns from '@/components/common/PaginatedTxns'

import { SafeAppsDashboardSection } from '@/components/dashboard/SafeAppsDashboardSection/SafeAppsDashboardSection'
import { FeaturedApps } from '@/components/dashboard/FeaturedApps/FeaturedApps'

const Dashboard = (): ReactElement => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={3}>
        <Overview />
        <Balance />
      </Grid>

      <Grid item xs={12} md={12} lg={6}>
          <DiscoverBanner />
          <TxQueueTitle />
          <PaginatedTxns useTxns={useTxQueue} />
      </Grid>
      
      <Grid item xs={12} md={12} lg={3}>
        <SafeAppsDashboardSection />
        <FeaturedApps />
      </Grid>
      
    </Grid>
  )
}

export default Dashboard
