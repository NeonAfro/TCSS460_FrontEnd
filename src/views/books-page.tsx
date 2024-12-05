// material-ui
// import Typography from '@mui/material/Typography';

// project imports
// import MainCard from 'components/MainCard';
import Pagination from 'components/Pagination';
import NewBookDrawer from 'views/create-new-book';

// ==============================|| BOOKS PAGE ||============================== //

export default function BooksPage() {
  return (
    <>
      <Pagination />
      <NewBookDrawer />
    </>
  );
}
