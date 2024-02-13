import css from './/LoadMoreBtn.module.css';

export const LoadMoreBtn = ({ loadMore }) => {
  return (
    <div className={css.container}>
      <button className={css.btn} onClick={loadMore}>
        Load more
      </button>
    </div>
  );
};
