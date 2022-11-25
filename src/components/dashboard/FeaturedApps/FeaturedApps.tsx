import type { ReactElement } from 'react'
import styled from '@emotion/styled'
import { Box, Grid, Typography, Link } from '@mui/material'
import { Card, WidgetBody, WidgetContainer } from '../styled'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { AppRoutes } from '@/config/routes'

const StyledImage = styled.img`
  width: 64px;
  height: 64px;
`

const StyledGrid = styled(Grid)`
  gap: 24px;
`

const StyledGridItem = styled(Grid)`
  min-width: 262px;
`

export const FeaturedApps = (): ReactElement | null => {
  const router = useRouter()

  return (
    <Grid item xs={12} md>
      <WidgetContainer id="featured-safe-apps">
        <WidgetBody>
          <StyledGrid container>
              <StyledGridItem item xs md key="">
                <NextLink passHref href="https://decentra-66gs4svaa-danielfetz.vercel.app/eth:0x81058ff64a2D765E73fC04c6a19E051701D101C8/apps?appUrl=https%3A%2F%2Fapps.gnosis-safe.io%2Ftx-builder">
                  <a>
                    <Card>
                      <Grid container alignItems="center" spacing={3}>
                        <Grid item xs={12} md={3}>
                          <StyledImage src="https://apps.gnosis-safe.io/tx-builder/tx-builder.png" alt="Transaction Builder" />
                        </Grid>

                        <Grid item xs={12} md={9}>
                          <Box mb={1.01}>
                            <Typography fontSize="lg">Compose custom contract interactions and batch them into a single transaction</Typography>
                          </Box>

                          <Link color="primary.main" fontWeight="bold" component="span">
                            Use Transaction Builder
                          </Link>
                        </Grid>
                      </Grid>
                    </Card>
                  </a>
                </NextLink>
              </StyledGridItem>          
          </StyledGrid>
        </WidgetBody>
      </WidgetContainer>
    </Grid>
  )
}
