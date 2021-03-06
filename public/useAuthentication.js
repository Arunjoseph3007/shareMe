import { useState, useEffect, useContext, createContext } from "react";

const authContext = createContext();
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => useContext(authContext)
// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = (email, password) => {
  	return {
      const respones = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login`, {
        method: "POST",
        body: JSON.stringify({email, password}),
        headers: {"Content-type": "application/json"}
      });
      const data = await respones.json();
      if (respones.status === 200) {
        setUser(data)
      } else {
        console.error(data);
      }
    } 
  };

  const signup = (username, email, password) => {
    return {
    	const respones = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/register`, {
	      method: "POST",
	      body: JSON.stringify({username, email, password }),
	      headers: { "Content-type": "application/json" },
	    });
	    const data =await respones.json();
	    if (respones.status === 200) {
			setUser(data)
		} else {
			console.error(data);
		}
    }
  };
  const signout = () => setUser(false)

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
  };
}