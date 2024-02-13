import toast from 'react-hot-toast';
import { IoIosSearch } from 'react-icons/io';
import css from './SearchBar.module.css';

export default function SearchBar({ value, onSubmit }) {
  const handleSubmit = event => {
    event.preventDefault();

    if (event.target.elements.query.value.trim() === '') {
      toast.error('EMPTY STRING!');
      return;
    }

    onSubmit(event.target.elements.query.value);
    event.target.reset();
  };
  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        className={css.input}
        name="query"
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
      />
      <button className={css.btn} type="submit">
        <IoIosSearch color="black" size={24} />
      </button>
    </form>
  );
}
