import type { ReactElement } from 'react'
import { Grid } from '@mui/material'
import { SafeAppsDashboardSection } from '@/components/dashboard/SafeAppsDashboardSection/SafeAppsDashboardSection'
import PendingTxsList from '@/components/dashboard/PendingTxs/PendingTxsList'
import Overview from '@/components/dashboard/Overview/Overview'
import Balances from '@/pages/balances'

const Dashboard = (): ReactElement => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <SafeAppsDashboardSection />
      </Grid>
      
      <Grid item xs={12} md={12} lg={6}>
        <Overview />
      </Grid>

      <Grid item xs={12} md={12} lg={6}>
        <PendingTxsList size={5} />
      </Grid>
      
      <Grid item xs={12}>
        <Balances />
      </Grid>
      
    </Grid>
  )
}

export default Dashboard
