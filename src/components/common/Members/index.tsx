import { AddOwner } from '@/components/chat/AddOwner'
import ellipsisAddress from '@/utils/ellipsisAddress'
import { Box, List, Typography } from '@mui/material'
import React from 'react'
import OwnerList from '@/components/settings/owner/OwnerList/index.tsx'

interface TypeMembers {
  members: any[]
}

const Members: React.FC<TypeMembers> = ({ members }) => {
  return (
    <>
      <Box sx={{ pt: 2, px: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ fontWeight: 600 }}>Members</Typography>
        <AddOwner />
      </Box>
      <List sx={{ px: 1, pb: 2 }}>
        <OwnerList />
      </List>
    </>
  )
}

export default Members
