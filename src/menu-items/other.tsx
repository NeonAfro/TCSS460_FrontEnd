// third-party
import { FormattedMessage } from 'react-intl';

// assets
import QuestionOutlined from '@ant-design/icons/QuestionOutlined';
import StopOutlined from '@ant-design/icons/StopOutlined';
import PhoneOutlined from '@ant-design/icons/PhoneOutlined';
import FullscreenOutlined from '@ant-design/icons/FullscreenOutlined';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  QuestionOutlined,
  StopOutlined,
  PhoneOutlined,
  FullscreenOutlined
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const other: NavItemType = {
  id: 'other',
  title: <FormattedMessage id="Support" />,
  type: 'group',
  children: [
    {
      id: 'documentation',
      title: <FormattedMessage id="documentation" />,
      type: 'item',
      url: 'https://huyhuynh2k2.github.io/Back-End/',
      icon: icons.QuestionOutlined,
      external: true,
      target: true
    }
  ]
};

export default other;
