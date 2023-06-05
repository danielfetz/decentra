import EthHashInfo from '@/components/common/EthHashInfo'
import useAddressBook from '@/hooks/useAddressBook'
import useSafeInfo from '@/hooks/useSafeInfo'
import { Box, Grid } from '@mui/material'
import { useMemo } from 'react'
import { EditOwnerDialog } from '@/components/settings/owner/EditOwnerDialog'
import { RemoveOwnerDialog } from '@/components/settings/owner/RemoveOwnerDialog'
import { ReplaceOwnerDialog } from '@/components/settings/owner/ReplaceOwnerDialog'
import EnhancedTable from '@/components/common/EnhancedTable'

import tableCss from '@/components/common/EnhancedTable/styles.module.css'

onst headCells = [
   { id: 'owner', label: 'Name' },
   { id: 'actions', label: '', sticky: true },
 ]

export const OwnerListOverview = () => {
  const addressBook = useAddressBook()
  const { safe } = useSafeInfo()

  const rows = useMemo(() => {
    return safe.owners.map((owner) => {
      const address = owner.value
      const name = addressBook[address]

      return {
        cells: {
          owner: {
            rawValue: address,
            content: <EthHashInfo address={address} showCopyButton shortAddress={true} showName={true} hasExplorer />,
          },
          actions: {
            rawValue: '',
            sticky: true,
            content: (
              <div className={tableCss.actions}>
                <ReplaceOwnerDialog address={address} />
                <EditOwnerDialog address={address} name={name} chainId={safe.chainId} />
                <RemoveOwnerDialog owner={{ address, name }} />
              </div>
            ),
          },
        },
      }
    })
  }, [safe, addressBook])

  return (
    <Box padding="16px 24px">
      <Grid container spacing={3}>
        <Grid item xs>
          <EnhancedTable rows={rows} headCells={headCells} />
        </Grid>
      </Grid>
    </Box>
  )
}
