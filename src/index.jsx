import { h, render } from "preact"; 
import "preact/devtools"; 
import "./styles/index.css"; 
import "aframe"; 
import { Entity, Scene } from "aframe-react";
import "aframe-event-set-component" 
import "./assets/js/aframe-environment"; 
import {Environment} from "./styles/environment";
import { WebSocketProvider } from "./util/WebSocketContext";

//Custom components
import App from "./components/App"; 
import User from "./components/User";
import Tree from "./components/Tree";
import VRScene from "./components/VrScene";

render( 
   <div className="app"> 
      <WebSocketProvider>
      <Scene  
         environment={Environment.default} 
         effects="bloom, film, fxaa" 
         bloom="radius: 0.99" 
         film="sIntensity: 0.15; nIntensity: 0.15" 
         fxaa             
         > 
         <Tree />
         <User />
         <App />
         <Entity light={{ type: "ambient", color: "#BBB" }} /> 
      </Scene> 
      </WebSocketProvider>
   </div>, 
   document.getElementById("root") 
);