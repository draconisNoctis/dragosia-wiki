import { Box, Paper, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React from 'react';

import { PersonProfile } from '@dragosia/ui';

import { WikiLink } from '../Link';

const Dialog = dynamic(() => import('@mui/material/Dialog'));

const ImageDialog: React.FunctionComponent<{ image: string; open: boolean; onClose?: () => void }> = ({ image, open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} PaperProps={{ sx: { maxWidth: '90vw', maxHeight: '90vh', boxShadow: 8 } }}>
            <Paper
                sx={{
                    width: '90vw',
                    height: '90vh',
                    overflow: 'hidden',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                <img src={image} style={{ maxWidth: '80vw', maxHeight: '80vh' }} alt="" />
                {/* <Image src={image} fill alt="" sizes="100%" style={{ objectFit: 'contain' }} /> */}
            </Paper>
        </Dialog>
    );
};

const keys: Exclude<keyof PersonProfile, '@' | '@Image'>[] = ['Name', 'Beruf'];

export const WikiPersonProfile: React.FunctionComponent<{ profile: PersonProfile }> = ({ profile }) => {
    const [displayImage, setDisplayImage] = React.useState(false);
    return (
        <>
            {profile['@Image'] && (
                <>
                    <Box sx={{ width: '100%', aspectRatio: '4/3', position: 'relative' }}>
                        <Image
                            src={profile['@Image']}
                            fill
                            alt=""
                            sizes="200px"
                            style={{ objectFit: 'cover' }}
                            onClick={() => setDisplayImage(true)}
                        />
                    </Box>
                    <ImageDialog image={profile['@Image']} open={displayImage} onClose={() => setDisplayImage(false)} />
                </>
            )}
            <Typography
                component="dl"
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(max-content, 1fr) 2fr',
                    m: 1,
                    gap: 0.5,
                    '&>dd': { m: 0 }
                }}>
                {keys.map(field => (
                    <React.Fragment key={field}>
                        <dt>{field}</dt>
                        <dd>
                            {Array.isArray(profile[field]) ? (
                                <WikiLink href={profile[field][1]}>{profile[field][0]}</WikiLink>
                            ) : (
                                profile[field]
                            )}
                        </dd>
                    </React.Fragment>
                ))}
            </Typography>
        </>
    );
};
