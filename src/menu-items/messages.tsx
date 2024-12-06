// third-party
import { FormattedMessage } from 'react-intl';

// assets
import ManageSearchTwoToneIcon from '@mui/icons-material/ManageSearchTwoTone';
import PersonSearchTwoToneIcon from '@mui/icons-material/PersonSearchTwoTone';
import QueryStatsTwoToneIcon from '@mui/icons-material/QueryStatsTwoTone';

// type
import { NavItemType } from 'types/menu';

// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages: NavItemType = {
  id: 'group-pages',
  type: 'group',
  children: [
    {
      id: 'advanced-search',
      title: <FormattedMessage id="Advanced Search" />,
      type: 'collapse',
      icon: ManageSearchTwoToneIcon,
      children: [
        {
          id: 'author',
          title: <FormattedMessage id="Author" />,
          type: 'item',
          url: '/advanced-search/author',
          icon: PersonSearchTwoToneIcon
        },
        {
          id: 'year',
          title: <FormattedMessage id="Year" />,
          type: 'item',
          url: '/advanced-search/year',
          icon: QueryStatsTwoToneIcon
        }
      ]
    }
  ]
};

export default pages;
