import React from 'react';

import { WikiPageContext } from '../contexts';

export function useWikiPage() {
    return React.useContext(WikiPageContext);
}
