import { AddOwner } from '@/components/chat/AddOwner'
import { Box, Typography } from '@mui/material'
import React from 'react'
import { OwnerListOverview } from '@/components/chat/OwnerListOverview'

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
      <OwnerListOverview />
    </>
  )
}

export default Members
