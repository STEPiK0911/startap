import React, { useState } from "react";
import style from "./AuthorizationPageWrapper.module.css"
import Cookies from "js-cookie";

type User = {
  username: string;
  password: string;
};

type AuthResponse = {
  success: boolean;
  token?: string;
  error?: string;
};

const AuthorizationPageWrapper = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState<User>({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!Cookies.get("token")
  );

  // Имитация API запроса
  const mockAuthApi = async (): Promise<AuthResponse> => {
    // В реальном приложении здесь был бы fetch к вашему API
    return new Promise((resolve) => {
      setTimeout(() => {
        if (user.username === "admin" && user.password === "admin123") {
          resolve({
            success: true,
            token: "mock.jwt.token." + Math.random().toString(36).substring(2),
          });
        } else {
          resolve({
            success: false,
            error: "Неверные учетные данные",
          });
        }
      }, 500);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const response = await mockAuthApi();

    if (response.success && response.token) {
      // Сохраняем токен в cookie
      Cookies.set("token", response.token, { expires: 1 }); // срок действия 1 день
      setIsAuthenticated(true);
    } else {
      setError(response.error || "Ошибка аутентификации");
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser({ username: "", password: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  if (isAuthenticated) {
    return (
      <div style={{ backgroundColor: "white" }}>
        <h2>Вы авторизованы!</h2>
        <p>Токен: {Cookies.get("token")}</p>
        <button onClick={handleLogout}>Выйти</button>
      </div>
    );
  }
  return (
    <div className={style.AuthorizationPageWrapper}>
      <h2>{isLogin ? "Вход" : "Регистрация"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Имя пользователя:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button type="submit">
          {isLogin ? "Войти" : "Зарегистрироваться"}
        </button>
      </form>
      {isLogin ? (
          <p>
            Нет аккаунта?{" "}
            <button onClick={() => setIsLogin(false)}>Зарегистрироваться</button>
          </p>
      ) : (
          <p>
            Уже есть аккаунт?{" "}
            <button onClick={() => setIsLogin(true)}>Войти</button>
          </p>
      )}


      <div style={{ marginTop: "20px", color: "gray" }}>
        <p>Для теста используйте:</p>
        <p>Логин: admin</p>
        <p>Пароль: admin123</p>
      </div>
    </div>
  );
};

export default AuthorizationPageWrapper;
