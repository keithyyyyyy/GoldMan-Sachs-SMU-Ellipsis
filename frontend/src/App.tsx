import React from "react";
import './App.css';
import { Link } from 'react-router-dom';
import NavBar from "./Components/NavBar/NavBar";

import { Amplify } from "aws-amplify";
import {
  AmplifyProvider,
  Authenticator,
  Button,
  Flex,
  Image,
  Text,
  View,
} from "@aws-amplify/ui-react";
import aws_exports from "./aws-exports";

import "@aws-amplify/ui-react/styles.css";
import theme from "./theme";
import logo from "./logo.svg";

Amplify.configure(aws_exports);

const App = () => {
  return (
    // <AmplifyProvider theme={theme}>
    //   <Authenticator>
    //     {({ signOut, user }) => (
    //       <Flex
    //         direction="column"
    //         justifyContent="flex-start"
    //         alignItems="center"
    //         alignContent="flex-start"
    //         wrap="nowrap"
    //         gap="1rem"
    //         textAlign="center"
    //       >

    //         {user && (
    //           <View width="100%">
    //             <Text>Hello {user.username}</Text>
    //             <Button onClick={signOut}>
    //               <Text>Sign Out</Text>
    //             </Button>
    //           </View>
    //         )}
    //       </Flex>
    //     )}
    //   </Authenticator>
      
    // </AmplifyProvider>
    <div>
      {/* <Link to="/dashboard">Dashboard</Link>
      <Link to="/about">About</Link> */}
      <NavBar></NavBar>
    </div>
    

    
  );
};

export default App;