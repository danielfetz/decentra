import type { ReactElement, ReactNode, SyntheticEvent } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import type { LinkProps } from 'next/link'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import type { SafeAppData } from '@gnosis.pm/safe-react-gateway-sdk'
import { AppRoutes } from '@/config/routes'
import styles from './styles.module.css'
import { useCurrentChain } from '@/hooks/useChains'
import { SvgIcon } from '@mui/material'
import type { UrlObject } from 'url'
import { resolveHref } from 'next/dist/shared/lib/router/router'
import { SAFE_APPS_EVENTS, trackSafeAppEvent } from '@/services/analytics'

export type SafeAppCardVariants = 'default'

type AppCardProps = {
  safeApp: SafeAppData
  pinned?: boolean
  variant?: SafeAppCardVariants
}

type AppCardContainerProps = {
  url?: LinkProps['href']
  children: ReactNode
  variant?: SafeAppCardVariants
}

const enum AppCardVariantHeights {
  default = '240px',
}

const enum AppCardVariantAspectRatio {
  default = 'auto',
}

const AppCardContainer = ({ url, children, variant }: AppCardContainerProps): ReactElement => {
  const height = AppCardVariantHeights.default
  const aspectRatio = AppCardVariantAspectRatio.default

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

const AppCard = ({ safeApp, pinned, variant = 'default' }: AppCardProps): ReactElement => {
  const router = useRouter()
  const currentChain = useCurrentChain()

  const url: UrlObject = { pathname: AppRoutes.apps, query: { safe: router.query.safe, appUrl: safeApp.url } }

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
