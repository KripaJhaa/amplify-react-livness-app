import React from 'react';
import { ThemeProvider } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import Auth from 'aws-amplify/auth';
import '@aws-amplify/ui-react/styles.css';
import awsexports from './aws-exports';
import { LivenessQuickStartReact } from './LivenessQuickStartReact';

Amplify.configure(awsexports);

console.log(Amplify.getConfig().Auth)

export default function App() {
  
  return (
    <div className='container'>
    <LivenessQuickStartReact/>
    </div>
  );
}