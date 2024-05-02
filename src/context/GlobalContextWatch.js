import { createContext } from 'react';


const globalContext = createContext();

export const GlobalContextWatchProvider = ({ children }) => {

      const SEARCH='SEARCH';
      const GET_EPISODES='GET_EPISODES';
      const GET_SOURCE_LINKS='GET_SOURCE_LINKS';


      const reducer(state,action){

            switch(action.type){
            case SEARCH:
                  return{
                        ...state,
                        search:action.payload,
                  }
            case GET_EPISODES:
                  return{
                        ...state,
                        episodes:action.payload,
                  }
            case GET_SOURCE_LINKS:
                  return{
                        ...state,
                        sourceLinks:action.payload,
                  }     
            default:
                  return state;
      }
}

      const initialState={
            search:[],
            episodes:[],
            sourceLinks:[],
      }

      const [state,dispatch]=useReducer(reducer,initialState);

  return (
    <globalContext.Provider>
      {children}
    </globalContext.Provider>
  )
}