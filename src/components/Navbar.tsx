import styles from './Navbar.module.scss';
import { List } from '@mui/material';
import NavbarCollapse from './NavbarCollapse';
import { getAllTypes } from '@/actions/getAllTypes';

const Navbar = async () => {
  const types = (await getAllTypes()).types;
  return (
    <nav className={styles.container}>
      <div className={styles.links}>
        <List>
          {types.map((type) => {
            return <NavbarCollapse type={type} key={type} />;
          })}
        </List>
      </div>
    </nav>
  );
};

export default Navbar;
