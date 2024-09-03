import React from 'react';
import Logo from '@components/Logo';

const Loading = () => {
  return (
    <div className='absolute start-0 end-0 top-0 bottom-0 flex justify-center items-center bg-green-500'>
      <Logo includeText={false} size='large' animated={true} />
    </div>
  );
};

export default Loading;
