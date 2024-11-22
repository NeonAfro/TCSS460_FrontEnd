import SamplePage from 'views/sample-page';
import Pag from 'components/Pagination';
import BarebonesDrawer from 'views/create-new-book';


// ==============================|| PAGE ||============================== //

export default function SampleViewPage() {
  //return <SamplePage />;
  return (
  <>
    <Pag />
    <BarebonesDrawer />
  </>
  );
}
