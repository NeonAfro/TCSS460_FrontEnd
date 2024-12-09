// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { BiBookAdd } from "react-icons/bi";

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { BiBookAdd };

// ==============================|| MENU ITEMS - BOOKS PAGE ||============================== //

const booksPage: NavItemType = {
  id: 'create-new-book',
  title: <FormattedMessage id="Create a Book" />,
  type: 'group',
  url: '/create-new-book',
  icon: icons.BiBookAdd
};

export default booksPage;
