import SamplePage from 'views/sample-page';
import Pagination from 'components/Pagination';
import RightDrawer from 'views/create-new-book';

// ==============================|| PAGE ||============================== //

export default function SampleViewPage() {
  return (
    <>
      <Pagination/>
      <RightDrawer />;
    </>
  )
}
