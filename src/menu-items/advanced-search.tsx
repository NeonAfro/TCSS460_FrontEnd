// third-party
import { FormattedMessage } from 'react-intl';

// assets
import ManageSearchTwoToneIcon from '@mui/icons-material/ManageSearchTwoTone';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import { LuCalendarSearch } from 'react-icons/lu';

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
          icon: PersonSearchOutlinedIcon
        },
        {
          id: 'year',
          title: <FormattedMessage id="Year" />,
          type: 'item',
          url: '/advanced-search/year',
          icon: LuCalendarSearch
        }
      ]
    }
  ]
};

export default pages;
