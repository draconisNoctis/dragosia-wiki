import { Paper } from '@mui/material';

import { Profile } from '@dragosia/ui';

import { WikiPersonProfile } from './PersonProfile';

export const WikiProfile: React.FunctionComponent<{ profile: Profile }> = ({ profile }) => {
    return (
        <Paper
            sx={theme => ({
                border: `2px solid ${theme.palette.primary.main}`,
                float: 'right',
                mt: '60px',
                width: { xs: '150px', md: '200px' },
                ml: 1,
                mb: 1,
                boxShadow: 8
            })}>
            {profile['@'] === 'person' && <WikiPersonProfile profile={profile} />}
        </Paper>
    );
};
