import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router";

import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import Popup from "./Main/Popup/Popup.jsx";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";

import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import * as auth from "../utils/auth.js";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isTokenChecked, setIsTokenChecked] = useState(
    () => !localStorage.getItem("jwt"),
  );

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      return;
    }

    auth
      .checkToken(token)
      .then((userData) => {
        setEmail(userData.email);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.error("Error al validar el token:", error);
        localStorage.removeItem("jwt");
      })
      .finally(() => {
        setIsTokenChecked(true);
      });
  }, []);

  useEffect(() => {
    if (!loggedIn) {
      return;
    }

    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((error) => {
        console.error("Error al obtener el usuario:", error);
      });

    api
      .getCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((error) => {
        console.error("Error al obtener las tarjetas:", error);
      });
  }, [loggedIn]);

  function handleOpenPopup(newPopup) {
    setPopup(newPopup);
  }

  function handleClosePopup() {
    if (popup && popup.onClose) {
      popup.onClose();
    }
    setPopup(null);
  }

  function showTooltip(isSuccess, onClose) {
    setPopup({
      children: <InfoTooltip isSuccess={isSuccess} />,
      contentClassName: "popup__content_content_tooltip",
      onClose: onClose,
    });
  }

  function handleRegister(userEmail, userPassword) {
    auth
      .register(userEmail, userPassword)
      .then(() => {
        showTooltip(true, () => navigate("/signin"));
      })
      .catch((error) => {
        console.error("Error al registrar al usuario:", error);
        showTooltip(false);
      });
  }

  function handleLogin(userEmail, userPassword) {
    auth
      .authorize(userEmail, userPassword)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setEmail(userEmail);
        setLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
        showTooltip(false);
      });
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setEmail("");
    setCurrentUser({});
    setCards([]);
    navigate("/signin");
  }

  function handleUpdateUser(userData) {
    api
      .editUserInfo(userData.name, userData.about)
      .then((newUser) => {
        setCurrentUser(newUser);
        handleClosePopup();
      })
      .catch((error) => {
        console.error("Error al actualizar el perfil:", error);
      });
  }

  function handleUpdateAvatar(avatarData) {
    api
      .editAvatar(avatarData.avatar)
      .then((newUser) => {
        setCurrentUser(newUser);
        handleClosePopup();
      })
      .catch((error) => {
        console.error("Error al actualizar el avatar:", error);
      });
  }

  function handleAddCard(cardData) {
    api
      .addCard(cardData.name, cardData.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
      })
      .catch((error) => {
        console.error("Error al agregar la tarjeta:", error);
      });
  }

  function handleCardLike(card, isLiked) {
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard,
          ),
        );
      })
      .catch((error) => {
        console.error("Error al cambiar el estado del like:", error);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id),
        );
        handleClosePopup();
      })
      .catch((error) => {
        console.error("Error al eliminar la tarjeta:", error);
      });
  }

  if (!isTokenChecked) {
    return null;
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleAddCard,
        handleCardLike,
        handleCardDelete,
      }}
    >
      <div className="page__content">
        <Header loggedIn={loggedIn} email={email} onSignOut={handleSignOut} />

        <Routes>
          <Route
            path="/signup"
            element={
              loggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Register onRegister={handleRegister} />
              )
            }
          />

          <Route
            path="/signin"
            element={
              loggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Main
                  cards={cards}
                  onOpenPopup={handleOpenPopup}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={<Navigate to={loggedIn ? "/" : "/signin"} replace />}
          />
        </Routes>

        {loggedIn && <Footer />}

        {popup && (
          <Popup
            onClose={handleClosePopup}
            title={popup.title}
            contentClassName={popup.contentClassName}
          >
            {popup.children}
          </Popup>
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
