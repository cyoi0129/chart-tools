import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { FiMail } from 'react-icons/fi';
import { RiLockPasswordFill } from 'react-icons/ri';
import { login, signUp, selectUserData } from '../features/UserData';

const Login: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userStore = useAppSelector(selectUserData);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const userLogin = (): void => { // Check email validation before db actions
    if (!/@example.com$/.test(email)) return alert('使用できないメールアドレス');
    setLoading(true);
    setTimeout(() => {
      dispatch(login({ user: email, password: password }));
      setLoading(false);
    }, 1000);
  };

  const userSignUp = (): void => { // Check email validation before db actions
    if (!/@example.com$/.test(email)) return alert('使用できないメールアドレス');
    setLoading(true);
    setTimeout(() => {
      dispatch(signUp({ user: email, password: password }));
      setLoading(false);
    }, 1000);
  };

  useEffect(() => { // Once logined redirect to list page
    if (userStore.login) navigate('/charts');
  }, [userStore]);

  return (
    <section className="login_page">
      <div className="login_box">
        <h2>ログイン・登録</h2>
        <ul>
          <li>
            <FiMail />
            <input type="text" name="email" value={email} autoComplete="off" onChange={(e) => setEmail(e.target.value)} />
          </li>
          <li>
            <RiLockPasswordFill />
            <input type="password" name="password" value={password} autoComplete="off" onChange={(e) => setPassword(e.target.value)} />
          </li>
        </ul>
        <div className="login_action">
          <button onClick={userSignUp}>新規登録</button>
          <button onClick={userLogin}>ログイン</button>
        </div>
      </div>
      {loading ? (
        <div className="loading">
          <div className="loader"></div>
        </div>
      ) : null}
    </section>
  );
};
export default Login;
