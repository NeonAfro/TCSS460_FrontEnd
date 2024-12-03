import SamplePage from 'views/sample-page';
import Pagination from 'components/Pagination';
import RightDrawer from 'views/create-new-book';
import HoverRating from 'components/Rating';

// ==============================|| PAGE ||============================== //

export default function SampleViewPage() {
  return (
    <>
      <RightDrawer />
      <SamplePage />
    </>
  )
}
