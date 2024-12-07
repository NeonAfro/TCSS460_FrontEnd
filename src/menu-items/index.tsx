// project import
import booksPage from './books-page';
import other from './other';
import pages from './advanced-search';

// types
import { NavItemType } from 'types/menu';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [booksPage, pages, other]
};

export default menuItems;
