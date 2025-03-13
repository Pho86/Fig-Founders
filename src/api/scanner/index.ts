import { Env } from '@env';

const PAT = Env.CLARIFAI_API_KEY;
const USER_ID = 'clarifai';
const APP_ID = 'main';
const MODEL_ID = Env.CLARIFAI_MODEL_ID;
const MODEL_VERSION_ID = Env.CLARIFAI_MODEL_VERSION_ID;

export const detectFridgeItems = async (imageUri: string) => {
  try {
    const blob = await fetch(imageUri).then((response) => response.blob());
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              base64: base64.split(',')[1], // Extract base64 string from data URL
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Key ${PAT}`,
      },
      body: raw,
    };

    const response = await fetch(
      `https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`,
      requestOptions
    );

    if (!response.ok) {
      return [];
    }

    const result = await response.json();
    const concepts = result.outputs[0].data.concepts;
    const labelsWithProbabilities = concepts.map((item: any) => ({
      label: item.name,
      probability: item.value,
    }));

    return labelsWithProbabilities;
  } catch (error) {
    console.error('Clarifai error:', error);
    return []; // Return an empty array in case of error
  }
};
