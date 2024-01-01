"use client";
import Script from "next/script";
import React from "react";

// type GoogleBasicProfile = {
//   getId: () => string;
//   getName: () => string;
//   getImageUrl: () => string;
//   getEmail: () => string;
// };

export const GoogleSignIn = () => {
  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        onReady={() => {
          google.accounts.id.initialize({
            client_id:
              "623102256831-hdiumbt87vdu57pddomcb418o00fpnol.apps.googleusercontent.com",
            callback: handleCredentialResponse,
          });
          google.accounts.id.renderButton(
            document.getElementById("google_btn")!,
            {
              type: "standard",
              shape: "pill",
              theme: "outline",
              text: "signin_with",
              size: "large",
              logo_alignment: "center",
              width: 300,
            },
          );

          function handleCredentialResponse(
            response: google.accounts.id.CredentialResponse,
          ) {
            // actual response {clientId, client_id, credential, select_by}
            const credentialResponse = response as typeof response & {
              clientId: string;
            };
            const SSO_LOADING = "sso-loading";
            console.log("google", response);
            try {
              localStorage.setItem(SSO_LOADING, "true");
              window.dispatchEvent(new Event(SSO_LOADING));

              fetch("/api/user/username-login", {
                method: "POST",
                body: JSON.stringify({
                  credential: response.credential,
                  clientId: credentialResponse.clientId,
                }),
              })
                .then((res) => {
                  setTimeout(() => {
                    res.json().then(console.log).catch(console.log);
                  }, 2000);
                })
                .catch(console.log);
            } catch (e) {
              console.log(e);
              return;
            }
            localStorage.setItem(SSO_LOADING, "false");
            window.dispatchEvent(new Event(SSO_LOADING));
          }
        }}
        onError={(e) => console.log("err google", e)}
        async
      />

      <div id="google_btn"></div>
    </>
  );
};
