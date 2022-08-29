import React from "react";

const likeProductContext = React.createContext();

export default likeProductContext;

export const LikeProductProvider = likeProductContext.Provider;
