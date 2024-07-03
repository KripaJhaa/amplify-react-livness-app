import React from 'react';
import { FaceLivenessDetector } from '@aws-amplify/ui-react-liveness';
import { Loader, ThemeProvider } from '@aws-amplify/ui-react';
import axios from 'axios';


export function LivenessQuickStartReact() {
  const [loading, setLoading] = React.useState(true);
  const [result, setResult] = React.useState("");
  const [createLivenessApiData, setCreateLivenessApiData] =
    React.useState(null);

  React.useEffect(() => {
    const fetchCreateLiveness = async () => {
      /*
       * This should be replaced with a real call to your own backend API
       */
      let sessionId=-1;

      try {
        const res = await axios.get('http://localhost:8080/live/face-liveliness/init');
        console.log(res);
        sessionId = res.data
      } catch (error) {
        console.error('Error during the POST request:', error);
      }
      const mockResponse = { sessionId: sessionId };
      const data = mockResponse;

      setCreateLivenessApiData(data);
      setLoading(false);
    };

    fetchCreateLiveness();
  }, []);

  const handleAnalysisComplete = async () => {
    /*
     * This should be replaced with a real call to your own backend API
     */
    const response = await axios.post(`http://localhost:8080/live/face-liveliness/details?session-id=${createLivenessApiData.sessionId}`);
    console.log("data",response)
    const isLive = parseFloat(response.data) > 50.0 ? true : false;

    if (isLive) {
      console.log('User is live');
      setResult("Live")
    } else {
      console.log('User is not live');
      setResult("Not Live")
    }
    setLoading(true);
  };

  return (
    <ThemeProvider>
    {result.length!=0 ? (
  <div>Result {result}</div>
) : (
  loading ? (
    <Loader />
  ) : (
    <FaceLivenessDetector
      sessionId={createLivenessApiData.sessionId}
      region="us-east-1"
      onAnalysisComplete={handleAnalysisComplete}
      onError={(error) => {
        console.error(error);
      }}
    />
  )
)}

    </ThemeProvider>
  );
}