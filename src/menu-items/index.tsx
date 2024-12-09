// project import
import booksPage from './books-page';
import other from './other';
import pages from './advanced-search';
import createNewBook from './create-new-book';

// types
import { NavItemType } from 'types/menu';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [booksPage, createNewBook, pages, other]
};

export default menuItems;
