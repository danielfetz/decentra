import type { ReactElement } from 'react'
import { Box, Typography } from '@mui/material'
import { Card, WidgetBody, WidgetContainer } from '../styled'

const StyledCard = styled(Card)`
    background-image: url(https://github.githubassets.com/images/modules/memexes/projects-beta-banner-dark.png);
    background-size: cover;
    box-shadow: 0 3px 6px #010409;
`

const DiscoverBanner = (): ReactElement => {

  return (
    <WidgetContainer>
      <WidgetBody>
          <StyledCard>            
            <Box mt={2} mb={4}>
                <Typography fontWeight={500} mb={2}>
        Discover a collaborative and social Safe interface
                </Typography>
            </Box> 
            <Box mt={2} mb={4}>
                <Typography fontWeight={500} mb={2}>
Your news feed helps you keep up with recent on repositories you watch or star and people.
                </Typography>
            </Box> 
          </StyledCard>
      </WidgetBody>
    </WidgetContainer>
  )
}

export default DiscoverBanner
