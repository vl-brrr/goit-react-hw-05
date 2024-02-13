import css from './PageTitle.module.css';

export default function PageTitle({ children }) {
  return <h1 className={css.title}>{children}</h1>;
}
