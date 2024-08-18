from openai import OpenAI
import json 

client = OpenAI(api_key='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')

#refactor the model to use chat completions and turbo model

def lambda_handler(event, context):
    body = json.loads(event['body'])
    imagePrompt = body['imagePrompt']
    response = client.images.generate(
    model="dall-e-3",
    prompt=imagePrompt,
    n= 1,
    size= "256x256",
    )
    image_url = response.data[0].url
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'imagePrompt': image_url
        }),
        "isBase64Encoded": False
    }

