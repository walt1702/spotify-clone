//This file is the state provider
import React, { createContext, useContext, useReducer } from "react";
//DataLayerContext is the context created for the state provider
export const DataLayerContext = createContext();

export const DataLayer = ({ reducer, initialState, children }) => (
	<DataLayerContext.Provider value={useReducer(reducer, initialState)}>
		{children}
	</DataLayerContext.Provider>
);

export const useDataLayerValue = () => useContext(DataLayerContext);