import React from 'react';

export interface MainProps {
  heading: string;
}

const Main: React.FC<MainProps> = (props) => {
  return (
    <div>
      <h1>{props.heading}</h1>
      <p>{props.children}</p>
    </div>
  );
};

export default Main;