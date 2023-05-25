import type { NavItem } from '@/components/sidebar/SidebarNavigation/config'
import { Tab, Tabs, Typography, type TabProps } from '@mui/material'
import NextLink, { type LinkProps as NextLinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { forwardRef, useState } from 'react'
import css from './styles.module.css'

type Props = TabProps & NextLinkProps

// This is needed in order for the tabs to work properly with Next Link e.g. tabbing with the keyboard
// Based on https://github.com/mui/material-ui/blob/master/examples/nextjs-with-typescript/src/Link.tsx
const NextLinkComposed = forwardRef<HTMLAnchorElement, Props>(function NextComposedLink(props: Props, ref) {
  const { href, as, replace, scroll, shallow, prefetch, legacyBehavior = true, locale, ...other } = props

  return (
    <NextLink
      href={href}
      prefetch={prefetch}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref
      locale={locale}
      legacyBehavior={legacyBehavior}
    >
      {/* @ts-ignore */}
      <a ref={ref} {...other} />
    </NextLink>
  )
})

const NavTabs = ({ tabs, setRoute }: { tabs: NavItem[], setRoute?: any }) => {
  const router = useRouter()
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log({ newValue })
    setValue(newValue);
  };
  const activeTab = tabs.map((tab) => tab.href).indexOf(router.pathname)

  return (
    <Tabs value={value} onChange={handleChange} variant="scrollable" allowScrollButtonsMobile className={css.tabs}>
      {tabs.map((tab, idx) => {
        return (
          <Tab
            // component={NextLinkComposed}
            key={tab.href}
            // href={{ pathname: tab.href, query: { safe: router.query.safe } }}
            onClick={() => setRoute(tab.href)}
            className={css.tab}
            label={
              <Typography
                variant="body2"
                fontWeight={700}
                color={value === idx ? 'primary' : 'primary.light'}
                className={css.label}
              >
                {tab.label}
              </Typography>
            }
          />
        )
      })}
    </Tabs>
  )
}

export default NavTabs
