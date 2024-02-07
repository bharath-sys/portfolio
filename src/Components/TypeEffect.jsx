import React from 'react';
import Typewriter from 'typewriter-effect';

function TypingEffect({text}) {

  return (
    <div>
        <Typewriter
          options={{
            strings: text,
            autoStart: true,
            loop: true,
            cursor:'...'
          }}
        />
    </div>
  );
}

export default TypingEffect;
