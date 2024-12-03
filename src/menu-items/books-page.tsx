// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import LibraryBooksTwoToneIcon from '@mui/icons-material/LibraryBooksTwoTone';
// type
import { NavItemType } from 'types/menu';

// icons
const icons = { LibraryBooksTwoToneIcon };

// ==============================|| MENU ITEMS - BOOKS PAGE ||============================== //

const booksPage: NavItemType = {
  id: 'books-page',
  title: <FormattedMessage id="Books" />,
  type: 'group',
  url: '/books-page',
  icon: icons.LibraryBooksTwoToneIcon
};

export default booksPage;
