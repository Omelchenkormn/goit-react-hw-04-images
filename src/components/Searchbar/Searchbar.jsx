import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { FiSearch } from 'react-icons/fi';

import { Header, FormStyle, Button, Span, Input } from './Searchbar.styled';

const initialValues = {
  query: '',
};

export const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (initialValues, { resetForm }) => {
    onSubmit(initialValues.query);
    if (initialValues.query.trim() === '') {
      toast.error('Type a query');
      return;
    }
    resetForm();
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Header>
        <FormStyle>
          <Button type="submit" className="button">
            <FiSearch size="25" color="black" />
            <Span className="button-label"></Span>
          </Button>
          <Input
            className="input"
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </FormStyle>
      </Header>
    </Formik>
  );
};
