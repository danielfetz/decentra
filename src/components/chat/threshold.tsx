import { ChangeThresholdDialog } from '@/components/settings/owner/ChangeThresholdDialog'
import { Box, Typography } from '@mui/material'

export const ThresholdOverview = ({ threshold, owners }: { threshold: number; owners: number }) => {
  return (
    <Box>
          <Typography>
            <b>{threshold}</b> out of <b>{owners}</b> members
          </Typography>

          {owners > 1 && <ChangeThresholdDialog />}
    </Box>
  )
}
