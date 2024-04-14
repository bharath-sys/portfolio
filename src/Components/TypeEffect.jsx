import React from 'react';
import Typewriter from 'typewriter-effect';

function TypingEffect({text,isLoading}) {

  return (
    <>
        <Typewriter
          options={{
            strings: text,
            autoStart: !isLoading,
            loop: true,
            cursor:'...'
          }}
        />
    </>
  );
}

export default TypingEffect;
