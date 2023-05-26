import ModalDialog from '@/components/common/ModalDialog'
import SafeAppList from '@/components/safe-apps/SafeAppList'
import { useSafeApps } from '@/hooks/safe-apps/useSafeApps'
import { DialogContent } from '@mui/material'
import React from 'react'

const ViewAppsModal: React.FC<{
  open: boolean
  onClose: () => void
}> = ({ open, onClose }) => {
  const {
    remoteSafeApps,
    remoteSafeAppsLoading,
    pinnedSafeAppIds: bookmarkedSafeAppsId,
    togglePin: onBookmarkSafeApp,
  } = useSafeApps()
  return (
    <ModalDialog open={open} dialogTitle="View Apps" onClose={onClose} maxWidth="md">
      <DialogContent sx={{ maxHeight: '90vh', overflow: 'auto' }}>
        <SafeAppList
          modal={true}
          safeAppsList={remoteSafeApps}
          safeAppsListLoading={remoteSafeAppsLoading}
          bookmarkedSafeAppsId={bookmarkedSafeAppsId}
          onBookmarkSafeApp={onBookmarkSafeApp}
          showFilters
        />
      </DialogContent>
    </ModalDialog>
  )
}

export default ViewAppsModal
