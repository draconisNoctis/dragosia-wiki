import React from 'react';

import { NavigationContext } from '../contexts';

export function useNavigation() {
    return React.useContext(NavigationContext);
}
