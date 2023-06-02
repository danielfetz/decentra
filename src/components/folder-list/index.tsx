import { ListItemButton, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Link from 'next/link'
import ListItemText from '@mui/material/ListItemText'
import { AppRoutes } from '@/config/routes'
import { useEffect, useState } from 'react'
import ellipsisAddress from '../../utils/ellipsisAddress'
import useOwnedSafes from '@/hooks/useOwnedSafes'
import { useRouter } from 'next/router'
import useSafeInfo from '@/hooks/useSafeInfo'

export const FolderList: React.FC<{
  resetGroup: () => void
}> = ({ resetGroup }) => {
  const ownedSafes = useOwnedSafes()
  const history = useRouter()
  const [safeFolder, setSafeFolder] = useState([''])
  const { safeAddress } = useSafeInfo()

  //TODO: can be signficantly refactored
  useEffect(() => {
    if (ownedSafes) {
      let folderList: string[] = []
      //getting pre-fix for all networks and creating links
      ownedSafes[42161]?.forEach((safe) => folderList.push(`arbi:${safe}`))
      ownedSafes[56]?.forEach((safe) => folderList.push(`bnb:${safe}`))
      ownedSafes[100]?.forEach((safe) => folderList.push(`gno:${safe}`))
      ownedSafes[137]?.forEach((safe) => folderList.push(`matic:${safe}`))
      ownedSafes[10]?.forEach((safe) => folderList.push(`oeth:${safe}`))
      ownedSafes[1]?.forEach((safe) => folderList.push(`eth:${safe}`))
      if (!folderList) {
        return
      }
      setSafeFolder(folderList)
    }
  }, [ownedSafes])

  const handleListItemClick = (folder: string, index: number) => {
    resetGroup()
    history.push(`${folder}/new-chat`)
  }

  const matchSafe = (safe: string) => {
    return safe.slice(safe.lastIndexOf(':') + 1) === safeAddress
  }
  return (
    <List sx={{ padding: '0px' }}>
      {safeFolder.map((safe, index) => (
        <Link href={{ pathname: AppRoutes.chat, query: { safe: `${safe}` } }} key={`${safe}-${index}`} passHref>
          <ListItemButton
            sx={{ padding: '8px 24px', minHeight: '69px', borderBottom: '1px solid var(--color-border-light)' }}
            //key={folder.name}
            key={safe}
            selected={matchSafe(safe)}
            onClick={() => handleListItemClick(safe, index)}
          >
            {/* <ListItemAvatar>
              {folder.badge ? <BadgeAvatar name={folder.name} /> : <Avatar alt={folder.name} />}
            </ListItemAvatar> */}
            <ListItemAvatar>
              <Avatar sx={{ height: 32, width: 32, borderRadius: '6px' }} alt={safe} />
            </ListItemAvatar>
            <ListItemText
              primary={<Typography sx={{ fontWeight: 500 }}>{ellipsisAddress(safe)}</Typography>}
              //secondary={<Typography sx={{ color: grey[600] }}>{ellipsisAddress(folder.address)}</Typography>}
            />
            
          </ListItemButton>
        </Link>
      ))}
    </List>
  )
}
