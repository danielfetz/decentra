import type { ReactElement, ReactNode, SyntheticEvent } from 'react'
import { useCallback } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import type { LinkProps } from 'next/link'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import type { IconButtonTypeMap } from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import type { SafeAppData } from '@gnosis.pm/safe-react-gateway-sdk'
import ShareIcon from '@/public/images/common/share.svg'
import CopyButton from '@/components/common/CopyButton'
import BookmarkIcon from '@/public/images/apps/bookmark.svg'
import BookmarkedIcon from '@/public/images/apps/bookmarked.svg'
import DeleteIcon from '@/public/images/common/delete.svg'
import { AppRoutes } from '@/config/routes'
import styles from './styles.module.css'
import { useCurrentChain } from '@/hooks/useChains'
import { SvgIcon } from '@mui/material'
import type { UrlObject } from 'url'
import { resolveHref } from 'next/dist/shared/lib/router/router'
import { SAFE_APPS_EVENTS, trackSafeAppEvent } from '@/services/analytics'

export type SafeAppCardVariants = 'default' | 'compact'

type AppCardProps = {
  safeApp: SafeAppData
  pinned?: boolean
  variant?: SafeAppCardVariants
}

type CompactSafeAppCardProps = {
  safeApp: SafeAppData
  url: LinkProps['href']
  pinned?: boolean
  onPin?: (appId: number) => void
  onShareClick?: (event: SyntheticEvent) => void
  shareUrl: string
}

type AppCardContainerProps = {
  url?: LinkProps['href']
  children: ReactNode
  variant?: SafeAppCardVariants
}

const enum AppCardVariantHeights {
  compact = '120px',
  default = '240px',
}

const enum AppCardVariantAspectRatio {
  compact = '1 / 1',
  default = 'auto',
}

const AppCardContainer = ({ url, children, variant }: AppCardContainerProps): ReactElement => {
  const height = variant === 'compact' ? AppCardVariantHeights.compact : AppCardVariantHeights.default
  const aspectRatio = variant === 'compact' ? AppCardVariantAspectRatio.compact : AppCardVariantAspectRatio.default

  const card = (
    <Card
      sx={({ palette }) => ({
        height,
        aspectRatio,
        transition: 'background-color 0.3s ease-in-out, border 0.3s ease-in-out',
        border: '1px solid var(--color-border-light)',
        borderRadius: '8px',
        '&:hover': {
          backgroundColor: palette.background.light,
          border: `1px solid ${palette.secondary.light}`,
        },
      })}
    >
      {children}
    </Card>
  )

  if (url) {
    return (
      <Link href={url} passHref>
        <a rel="noreferrer">{card}</a>
      </Link>
    )
  }

  return card
}

const AppCard = ({ safeApp, pinned, onPin, onDelete, variant = 'default' }: AppCardProps): ReactElement => {
  const router = useRouter()
  const currentChain = useCurrentChain()

  const shareUrlObj: UrlObject = {
    protocol: typeof window !== 'undefined' ? window.location.protocol : '',
    host: typeof window !== 'undefined' ? window.location.host : '',
    pathname: AppRoutes.share.safeApp,
    query: { appUrl: safeApp.url, chain: currentChain?.shortName },
  }

  const url: UrlObject = router.query.safe
    ? { pathname: AppRoutes.apps, query: { safe: router.query.safe, appUrl: safeApp.url } }
    : shareUrlObj

  const shareUrl = resolveHref(router, shareUrlObj)

  if (variant === 'compact') {
    return <CompactAppCard url={url} safeApp={safeApp} pinned={pinned} onPin={onPin} shareUrl={shareUrl} />
  }

  return (
    <AppCardContainer url={url}>
      <CardHeader
        avatar={
          <Avatar
            src={safeApp.iconUrl}
            alt={`${safeApp.name} logo`}
            variant="square"
            sx={{
              '.MuiAvatar-img': {
                objectFit: 'contain',
              },
            }}
          />
        }
      />

      <CardContent sx={{ paddingTop: 0 }}>
        <Typography className={styles.truncateDescription} variant="body2" color="text.secondary">
          {safeApp.description}
        </Typography>
        <Typography gutterBottom variant="h5">
          Use {safeApp.name}
        </Typography>
      </CardContent>
    </AppCardContainer>
  )
}

export { AppCard, AppCardContainer }
