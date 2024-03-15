import React from "react";
import { ReactMediaRecorder } from 'react-media-recorder'
import microphone from '../../src/assets/microphone.png'



export const Microphone = ({transcribe}) => {

    const getBlob = (mediaBlobUrl) => {
        transcribe(mediaBlobUrl);
      };

    return (
        <ReactMediaRecorder
            audio
            onStop={getBlob}
            render={({ status, startRecording, stopRecording }) => (
                <div>
                    <button 
                     className="recordBtn"
                     onMouseDown={startRecording}
                     onMouseUp={stopRecording}
                     onTouchStart={startRecording}
                     onTouchEnd={stopRecording}
                     >
                        <p>{status}</p>
                        <img className="microphoneImg" src={microphone}/>
                    </button>
                </div>
            )}
        />
    )
}