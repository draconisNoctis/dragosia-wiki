import { Typography } from '@mui/material';
import React from 'react';

import { useCurrentUser } from '@dragosia/firebase';

export const WikiGmInfo: React.FunctionComponent<React.PropsWithChildren<{}>> = ({ children }) => {
    const [visible, setVisible] = React.useState(false);

    const onClick = React.useCallback(() => setVisible(visible => !visible), [setVisible]);

    const { user } = useCurrentUser();

    return (
        <>
            {user?.roles?.includes('gm') && (
                <>
                    <Typography variant="h3" component="h3">
                        Meisterinformationen [<a onClick={onClick}>{visible ? 'Verbergen' : 'Anzeigen'}</a>]
                    </Typography>

                    {visible && children}
                </>
            )}
        </>
    );
};
