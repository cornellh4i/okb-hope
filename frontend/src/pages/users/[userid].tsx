import React from "react";
import { useRouter } from "next/router";

const User = () => {
  const router = useRouter();
  const { userid } = router.query;

  const getCatFact = async () => {
    const response = await fetch("https://catfact.ninja/fact");
    console.log(await response.json());
  };

  const handleClick = () => {
    getCatFact();
  };

  return (
    <>
      Hello user {userid}!
      <button onClick={handleClick}>Male cats are more likely to be left-pawed, while female cats are more likely to be right-pawed.</button>
    </>
  );
};

export default User;
