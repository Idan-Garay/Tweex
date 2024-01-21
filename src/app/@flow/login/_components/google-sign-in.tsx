"use client";
import { useRouter } from "next/navigation";
import Script from "next/script";
import React, { useState } from "react";
export const GoogleSignIn = ({
  setLoading,
}: {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [googleSsoLoading, setGoogleSsoLoading] = useState(true);

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        onLoad={() => {
          setGoogleSsoLoading(true);
        }}
        onReady={() => {
          google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_SSO_CLIENT_ID ?? "",
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
            try {
              localStorage.setItem(SSO_LOADING, "true");
              window.dispatchEvent(new Event(SSO_LOADING));
              setLoading(true);

              fetch("/api/auth/google", {
                method: "POST",
                body: JSON.stringify({
                  credential: response.credential,
                  clientId: credentialResponse.clientId,
                }),
              })
                .then((res) => {
                  setTimeout(() => {
                    res
                      .json()
                      .then(
                        (json: {
                          success: boolean;
                          data?: { accessToken: string };
                          message?: string;
                        }) => {
                          const accessToken = json.data?.accessToken ?? "";
                          localStorage.setItem("accessToken", accessToken);
                          if (res.status === 200) {
                            router.replace("/home");
                          } else if (res.status === 201) {
                            router.replace("/single-sign-on");
                          }
                        },
                      )
                      .catch(console.log);
                  }, 2000);
                })
                .catch(console.log)
                .finally(() => {
                  setLoading(false);
                });
            } catch (e) {
              console.log(e);
              return;
            }
            localStorage.setItem(SSO_LOADING, "false");
            window.dispatchEvent(new Event(SSO_LOADING));
          }
          setGoogleSsoLoading(false);
        }}
        onError={(e) => {
          setGoogleSsoLoading(false);
          console.log("err google", e);
        }}
        async
      />

      <div className="">
        <div id="google_btn"></div>
        {googleSsoLoading && (
          <div className="mx-auto h-6 w-6 animate-spin rounded-full border-[2px] border-muted border-r-secondary"></div>
        )}
      </div>
    </>
  );
};
