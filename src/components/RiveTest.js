
import { useRive, RiveComponent } from "rive-react";
import React, { useState } from "react";


function RiveTest() {

   
        const { rive, RiveComponent } = useRive({
          src: '/4868-9848-enter-button.riv',
          autoplay: false,
          stateMachines: "EnterButton"
        });
        const [isPlaying, setIsPlaying] = useState(false);
      
        function handleClick() {
          setIsPlaying(true);
          rive.play("Click");
        }
      
        return (
          <div onClick={handleClick}>
            <RiveComponent artboardName="EnterButton" />
          </div>
        );
      }
      


export default RiveTest