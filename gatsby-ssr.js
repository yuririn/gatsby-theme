import React from 'react';

exports.onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: "ja" })
}

export const onRenderBody = ({ setHeadComponents }) => {
    const nodeEnv = process.env.NODE_ENV || 'production';
    console.log('Node Environment:', nodeEnv);

    if (nodeEnv !== 'production') {
        setHeadComponents([
            <script
                key="redirect-script"
                dangerouslySetInnerHTML={{
                    __html: `
            (function() {
              const checkAuthenticationExpiry = () => {
                const authData = JSON.parse(localStorage.getItem("authenticated"));
                if (authData) {
                  const currentTime = new Date().getTime();
                  const expiryTime = 24 * 60 * 60 * 1000; // 24時間 (ミリ秒)
                  if (currentTime - authData.timestamp > expiryTime) {
                    localStorage.removeItem("authenticated");
                    return false; // 認証情報が期限切れ
                  }
                  return true; // 認証情報が有効
                }
                return false; // 認証情報が存在しない
              };

              const isAuthenticated = checkAuthenticationExpiry();
              const isOnLoginPage = window.location.pathname.includes("/login");

              // 認証されていない場合にリダイレクト
              if (!isAuthenticated && !isOnLoginPage) {
                window.location.href = "/login/";
              }

              // 認証されている場合にホームページにリダイレクト
              if (isAuthenticated && isOnLoginPage) {
                window.location.href = "/";
              }
            })();
          `,
                }}
            />,
        ]);
    }
};
