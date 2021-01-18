import React from "react";

export function Login(prop: { login: (userName: string) => void }) {

  const inpRef: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();

  return (
    <React.Fragment>
      <span>UserName:</span>
      <input type="text" ref={inpRef} />
      <button onClick={() => prop.login(inpRef.current?.value as string)}>Login</button>
    </React.Fragment>
  )
}