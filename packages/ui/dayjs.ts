import dayjs from 'dayjs';
import 'dayjs/locale/de';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.locale('de');
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export { dayjs };
