import { FC, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaTools } from 'react-icons/fa';
import { MdAccountCircle } from 'react-icons/md';
import { IoLogInOutline, IoLogOutOutline } from 'react-icons/io5';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectUserData, logout } from '../features/UserData';

const Header: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userStore = useAppSelector(selectUserData);
  const [user, setUser] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const go2Login = (): void => {
    navigate('/login');
  };

  const userLogout = (): void => {
    dispatch(logout()); // Logout will remove firebase side information & cookie
  };

  useEffect(() => {
    if (userStore.login) {
      setIsLogin(true);
      setUser(userStore.user.substr(0, userStore.user.indexOf('@'))); // Set email address before @ as user name
    } else {
      setIsLogin(false);
      setUser('');
    }
  }, [userStore]);

  return (
    <header>
      <h1>
        <Link to="/">
          <FaTools />
          Chart Tools
        </Link>
      </h1>
      <nav>
        <ul>
          <li>
            <Link to="/charts">グラフ一覧</Link>
          </li>
          {/* <li>
            <Link to="/performance">業績グラフ</Link>
          </li> */}
        </ul>
        <div className="account">
          {isLogin ? (
            <>
              <MdAccountCircle />
              <span>{user}</span>
              <div className="account_icon" onClick={userLogout}>
                <IoLogOutOutline />
              </div>
            </>
          ) : (
            <div className="account_icon" onClick={go2Login}>
              <IoLogInOutline />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Header;
