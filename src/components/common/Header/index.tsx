import { type ReactElement } from 'react'
import { useRouter } from 'next/router'
import { IconButton, Paper } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import classnames from 'classnames'
import css from './styles.module.css'
import ChainSwitcher from '@/components/common/ChainSwitcher'
import ConnectWallet from '@/components/common/ConnectWallet'
import NetworkSelector from '@/components/common/NetworkSelector'
import SafeAddress from '@/components/common/SafeAddress'
import NotificationCenter from '@/components/notification-center/NotificationCenter'
import NewTxButton from '@/components/sidebar/NewTxButton'
import { AppRoutes } from '@/config/routes'
import useChainId from '@/hooks/useChainId'
import Link from 'next/link'
import useSafeAddress from '@/hooks/useSafeAddress'

type HeaderProps = {
  onMenuToggle: () => void
}

const Header = ({ onMenuToggle }: HeaderProps): ReactElement => {
  const chainId = useChainId()
  const safeAddress = useSafeAddress()
  const router = useRouter()

  // Logo link: if on Dashboard, link to Welcome, otherwise to the root (which redirects to either Dashboard or Welcome)
  const logoHref = router.pathname === AppRoutes.home ? AppRoutes.welcome : AppRoutes.index

  return (
    <Paper className={css.container}>
      <div className={classnames(css.element, css.menuButton)}>
        <IconButton onClick={onMenuToggle} size="large" edge="start" color="default" aria-label="menu">
          <MenuIcon />
        </IconButton>
      </div>

      <div className={classnames(css.element, css.hideMobile, css.logo)}>
        <Link href={logoHref} passHref>
          <a>
            <h3>Decentra</h3>
          </a>
        </Link>
      </div>

      <div className={classnames(css.element, css.hideMobile)}>
        <SafeAddress />
      </div>

      <div className={classnames(css.element, css.hideMobile, css.newtxbutton)}>
        <NewTxButton />
      </div>

      <div className={classnames(css.element, css.hideMobile)}>
        <NotificationCenter />
      </div>

      <div className={css.element}>
        <ConnectWallet />
      </div>

      <div className={classnames(css.element, css.networkSelector)}>
        <NetworkSelector />
      </div>
    </Paper>
  )
}

export default Header
