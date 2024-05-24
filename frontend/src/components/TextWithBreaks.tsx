import React from 'react';

type TextWithBreaksProps = {
  text: string;
};


const splitText = (text: string): string[] => {
    // Regular expression to match dots that are not followed by a digit
    const regex = /(?<!\d)\.(?!\d)/;
    return text.split(regex).filter(sentence => sentence.trim() !== '');
  };

const TextWithBreaks: React.FC<TextWithBreaksProps> = ({ text }) => {

  const sentences = splitText(text);

  return (
    <div>
    {sentences.map((sentence, index) => (
      <div key={index}>
        {sentence.split('  ').map((part, partIndex) => (
          <React.Fragment key={partIndex}>
            {part.trim()}
            {partIndex < sentence.split('  ').length - 1 && (
              <>
                <br />
                <br />
              </>
            )}
          </React.Fragment>
        ))}
        {index < sentences.length - 1 && (
          <>
            <br />
          </>
        )}
      </div>
    ))}
  </div>
  );
};

export default TextWithBreaks;
